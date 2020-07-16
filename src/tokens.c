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

#ifdef HAVE_TOKENS_LIST

#include "tokens.h"

const tokenDefinition_t const TOKENS_KLAYTN[NUM_TOKENS_KLAYTN] = {
	{"KUSD Stablecoin", {0x5f,0xaa,0xd3,0x20,0x4b,0x3c,0xa6,0x81,0xa6,0xa3,0x12,0xe1,0x5f,0xf5,0x2a,0x4c,0xc7,0x6a,0xde,0x06}, "KUSD ", 2},
	{"Wrapped KLAY", {0x43,0xf9,0xce,0x2a,0xd0,0xe9,0x8a,0x69,0x46,0x15,0x4b,0xef,0x37,0xb1,0x82,0xb5,0x91,0x5e,0xd1,0x3d}, "WKLAY ", 18},
};

const tokenDefinition_t const TOKENS_KLAYTN_TESTNET[NUM_TOKENS_KLAYTN_TESTNET] = {
	{"Wrapped KLAY (Test)", {0x93,0x30,0xdd,0x67,0x13,0xc8,0x32,0x8a,0x8d,0x82,0xb1,0x4e,0x3f,0x60,0xa0,0xf0,0xb4,0xcc,0x7b,0xfb}, "WKLAY ", 18},
};

#endif
