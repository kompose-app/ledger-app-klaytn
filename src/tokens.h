/*******************************************************************************
*   Ledger Klaytn App
*   (c) 2016-2019 Ledger
*   (c) 2020 Kompose, Inc. adaptation for Klaytn
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License.
********************************************************************************/

#ifndef _TOKENS_H_
#define _TOKENS_H_

#include <stdint.h>

typedef struct tokenDefinition_t {
    uint8_t contractName[20];
    uint8_t address[20];
    uint8_t ticker[12]; // 10 characters + ' \0'
    uint8_t decimals;
} tokenDefinition_t;

#ifdef HAVE_TOKENS_LIST

#define NUM_TOKENS_KLAYTN 23
#define NUM_TOKENS_KLAYTN_TESTNET 3

extern tokenDefinition_t const TOKENS_KLAYTN[NUM_TOKENS_KLAYTN];
extern tokenDefinition_t const TOKENS_KLAYTN_TESTNET[NUM_TOKENS_KLAYTN_TESTNET];

#endif /* HAVE_TOKENS_LIST */

#endif /* _TOKENS_H_ */
