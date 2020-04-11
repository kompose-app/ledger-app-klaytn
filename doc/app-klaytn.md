# Klaytn Ledger App: Common Technical Specifications 

Application version 1.0.0 

### 1.0
  - Initial release for Klaytn
  - Returns App Configuration
  - Return the chain code with Public Address
  - Sign Klay Personal Message
  - KCT tokens information and defines

### TODO

  - Sign non-legacy Klaytn transactions
  - Fee delegated transactions
  - Klaytn Accounts

### About

This application describes the APDU messages interface to communicate with the
Klaytn application. 

The application covers the following functionalities:

  - Retrieve a public Klaytn address given a BIP 32 path  Sign a basic Klaytn
  - transaction given a BIP 32 path Provide callbacks to validate the data
  - associated to an Klaytn transaction

The application interface can be accessed over HID or BLE

## General purpose APDUs

### 1. Get Klaytn Public Key and Address

#### Description

This command returns the public key and Klaytn address for the given BIP 32
path.

The address can be optionally checked on the device before being returned.

#### Coding

_Command_


| **CLA** | **INS**  | **P1**               | **P2**       | **Lc**     | **Le**
| ------- | -------- | ---------------------| ------------ | ---------- | ------ |
|   E0  |   02   |  <p>`00`: return address<br/>`01`: display address and confirm before returning</p> | <p>`00`: do not return the chain code<br/>`01`: return the chain code</p> | variable | variable

_Input data_

| **Description**                                     | **Length**
| ------------- | ------------- |
| Number of BIP 32 derivations to perform (max 10)  | 1
| First derivation index (big endian)               | 4
| ...                                               | 4
| Last derivation index (big endian)                | 4

_Output data_

| **Description**                                     | **Length**
| ------------- | ------------- |
| Public Key length                                 | 1
| Uncompressed Public Key                           | var
| Klaytn address length                             | 1
| Klaytn address                                    | var
| Chain code if requested                           | 32

### Sign Klaytn Legacy Transaction

#### Description

This command signs a Klaytn legacy transaction after having the user validate
the following parameters

  - Gas price
  - Gas limit
  - Recipient address
  - Value

The input data is the RLP encoded transaction.

#### Coding

_Command_


| **CLA** | **INS**  | **P1**               | **P2**       | **Lc**     | **Le** 
| ------- | -------- | ---------------------| ------------ | ---------- | ------ |
|   E0  |   04   |  <p>`00`: first transaction data block<br/>`80`: subsequent transaction data block</p> |   00 | variable | variable |


_Input data (first transaction data block)_

| **Description**                                       | **Length**
| ------------- | ------------- |
| Number of BIP 32 derivations to perform (max 10)    | 1
| First derivation index (big endian)                 | 4
| ...                                                 | 4
| Last derivation index (big endian)                  | 4
| RLP transaction chunk                               | variable


_Input data (other transaction data block)_


| **Description**                                       | **Length**
| ------------- | ------------- |
| RLP transaction chunk                               | variable

_Output data_

| **Description**                                        | **Length**
| ------------- | ------------- |
| v                                                    | 1
| r                                                    | 32
| s                                                    | 32

### Sign Klaytn Personal Message

#### Description

This command signs an Klaytn message following the [personal_sign
specification](https://github.com/ethereum/go-ethereum/pull/2940) after having
the user validate the KECCAK256 hash of the message being signed. 

This command has been supported since firmware version 1.0.8

The input data is the message to sign, streamed to the device in 255 bytes
maximum data chunks

#### Coding

_Command_


| **CLA** | **INS**  | **P1**               | **P2**       | **Lc**     | **Le**   
| ------- | -------- | ---------------------| ------------ | ---------- | ------ |
|   E0  |   08   |  <p>`00`: first message data block<br/>`80`: subsequent message data block</p>|   00       | variable | variable|

_Input data (first message data block)_

| **Description**                                    | **Length**
| ------------- | ------------- |
| Number of BIP 32 derivations to perform (max 10) | 1
| First derivation index (big endian)              | 4
| ...                                              | 4
| Last derivation index (big endian)               | 4
| Message length                                   | 4
| Message chunk                                    | variable

_Input data (other transaction data block)_

| **Description**                                    | **Length**
| ------------- | ------------- |
| Message chunk                                    | variable

_Output data_

| **Description**                                    | **Length**
| ------------- | ------------- |
| v                                                | 1
| r                                                | 32
| s                                                | 32

### Provide KCT Token Information

#### Description

This commands provides a trusted description of an KCT token to associate a
contract address with a ticker and number of decimals. 

It shall be run immediately before performing a transaction involving a contract
calling this contract address to display the proper token information to the
user if necessary, as marked in GET APP CONFIGURATION flags.

The signature is computed on 

```
  ticker || address || number of decimals (uint4be) || chainId (uint4be)
```

#### Coding

_Command_

| **CLA** | **INS**  | **P1**               | **P2**       | **Lc**     | **Le** 
| ------- | -------- | ---------------------| ------------ | ---------- | ------ |
|   E0  |   0A   |  00   |   00       | variable | 00


_Input data_

| **Description**                           | **Length**
| ------------- | ------------- |
| Length of KCT ticker                    | 1
| KCT ticker                              | variable
| KCT contract address                    | 20
| Number of decimals (big endian encoded) | 4
| Chain ID (big endian encoded)           | 4
| Token information signature             | variable

_Output data_

None

### Get App Configuatrion

#### Description

This command returns specific application configuration

#### Coding

_Command_

| **CLA** | **INS**  | **P1**               | **P2**       | **Lc**     | **Le** 
| ------- | -------- | ---------------------| ------------ | ---------- | ------ |
|   E0  |   06   |  00                |   00       | 00       | 04

_Input data_

None

_Output data_

| **Description**                                                       | **Length**
| ------------- | ------------- |
| <p>Flags<br />`01`: Arbitrary data signature enabled by user<br />`02`: KCT token information needs to be provided externally</p> | 01
| Application major version                                           | 01
| Application minor version                                           | 01
| Application patch version                                           | 01

## Transport protocol

### General transport description

Ledger APDUs requests and responses are encapsulated using a flexible protocol
allowing to fragment large payloads over different underlying transport
mechanisms. 

The common transport header is defined as follows: 

| **Description**                          | **Length**
| ------------- | ------------- |
| Communication channel ID (big endian)  | 2
| Command tag                            | 1
| Packet sequence index (big endian)     | 2
| Payload                                | var

The Communication channel ID allows commands multiplexing over the same physical
link. It is not used for the time being, and should be set to `0101` to avoid
compatibility issues with implementations ignoring a leading `00` byte.

The Command tag describes the message content. Use `TAG_APDU (0x05)` for standard
APDU payloads, or `TAG_PING (0x02)` for a simple link test.

The Packet sequence index describes the current sequence for fragmented
payloads. The first fragment index is `0x00`.

### APDU Command payload encoding

APDU Command payloads are encoded as follows:

| **Description**             | **Length**
| ------------- | ------------- |
| APDU length (big endian)  | 2
| APDU CLA                  | 1
| APDU INS                  | 1
| APDU P1                   | 1
| APDU P2                   | 1
| APDU length               | 1
| Optional APDU data        | var

APDU payload is encoded according to the APDU case 

| Case Number  | **Lc** | **Le** | Case description |
| ------------ | ------ | -------| ---------------- |
|   1          |  0   |  0   | No data in either direction - L is set to 00
|   2          |  0   |  !0  | Input Data present, no Output Data - L is set to Lc
|   3          |  !0  |  0   | Output Data present, no Input Data - L is set to Le
|   4          |  !0  |  !0  | Both Input and Output Data are present - L is set to Lc

### APDU Response payload encoding

APDU Response payloads are encoded as follows:

| **Description**                      | **Length**
| ------------- | ------------- |
| APDU response length (big endian)  | 2
| APDU response data and Status Word | var

### USB mapping

Messages are exchanged with the dongle over HID endpoints over interrupt
transfers, with each chunk being 64 bytes long. The HID Report ID is ignored.

## Status Words 

The following standard Status Words are returned for all APDUs - some specific
Status Words can be used for specific commands and are mentioned in the command
description.

_Status Words_

| **SW**     | **Description**
| ------------- | ------------- |
|   6700   | Incorrect length
|   6982   | Security status not satisfied (Canceled by user)
|   6A80   | Invalid data
|   6B00   | Incorrect parameter P1 or P2
|   6Fxx   | Technical problem (Internal error, please report)
|   9000   | Normal ending of the command

