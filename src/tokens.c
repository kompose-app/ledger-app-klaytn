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
    {"KUSD Stablecoin",     {0x5f,0xaa,0xd3,0x20,0x4b,0x3c,0xa6,0x81,0xa6,0xa3,0x12,0xe1,0x5f,0xf5,0x2a,0x4c,0xc7,0x6a,0xde,0x06}, "KUSD ",     2  },
    {"Klaytn Dai",          {0x5c,0x74,0x07,0x0f,0xde,0xa0,0x71,0x35,0x9b,0x86,0x08,0x2b,0xd9,0xf9,0xb3,0xde,0xaa,0xfb,0xe3,0x2b}, "KDAI ",     18 },
    {"Wrapped KLAY",        {0x43,0xf9,0xce,0x2a,0xd0,0xe9,0x8a,0x69,0x46,0x15,0x4b,0xef,0x37,0xb1,0x82,0xb5,0x91,0x5e,0xd1,0x3d}, "WKLAY ",    18 },
    {"Six Network",         {0xef,0x82,0xb1,0xc6,0xa5,0x50,0xe7,0x30,0xd8,0x28,0x3e,0x1e,0xdd,0x49,0x77,0xcd,0x01,0xfa,0xf4,0x35}, "SIX ",      8  },
    {"Piction Network",     {0x54,0x25,0xb8,0x10,0x43,0x2b,0xc7,0xe7,0xdb,0xc7,0x48,0x59,0xed,0x3c,0x37,0xbb,0x39,0xd9,0xdf,0x00}, "PXL ",      18 },
    {"Hint Chain",          {0x8a,0x47,0x27,0xb9,0x3d,0x16,0x44,0xfc,0x73,0x2b,0xda,0x43,0x11,0x2b,0xdd,0x3c,0xac,0x7b,0x68,0x6f}, "HINT ",     18 },
    {"Antube Token",        {0xbe,0x73,0x77,0xdb,0x70,0x06,0x64,0x33,0x1b,0xeb,0x28,0x02,0x3c,0xfb,0xd4,0x6d,0xe0,0x79,0xef,0xac}, "ATT ",      18 },
    {"Insureum Token",      {0x96,0x57,0xfb,0x39,0x98,0x47,0xd8,0x5a,0x9c,0x1a,0x23,0x4e,0xce,0x9c,0xa0,0x9d,0x5c,0x00,0xf4,0x66}, "ISR ",      18 },
    {"Temco Token",         {0x3b,0x3b,0x30,0xa7,0x6d,0x16,0x9f,0x72,0xa0,0xa3,0x8a,0xe0,0x1b,0x0d,0x6e,0x0f,0xbe,0xe3,0xcc,0x2e}, "TEMCO ",    18 },
    {"Inconvenience Box",   {0x52,0x88,0xf8,0x0f,0x41,0x45,0x03,0x58,0x66,0xac,0x4c,0xb4,0x5a,0x4d,0x8d,0xea,0x88,0x9e,0xc8,0x27}, "BOX ",      18 },
    {"Pibble App",          {0xaf,0xde,0x91,0x01,0x30,0xc3,0x35,0xfa,0x5b,0xd5,0xfe,0x99,0x10,0x53,0xe3,0xe0,0xa4,0x9d,0xce,0x7b}, "PIB ",      18 },
    {"BlockNation XYZ",     {0x69,0xeb,0x6e,0x14,0xce,0x94,0x1d,0x4d,0x9d,0x1c,0x96,0x9d,0xcf,0x31,0xbb,0x10,0x5b,0x7a,0xe3,0xd0}, "XYZ ",      6  },
    {"Cloudbric",           {0xc4,0x40,0x7f,0x7d,0xc4,0xb3,0x72,0x75,0xc9,0xce,0x0f,0x83,0x96,0x52,0xb3,0x93,0xe1,0x3f,0xf3,0xd1}, "CLBK ",     18 },
    {"SkyPeople Mineral",   {0x27,0xdc,0xd1,0x81,0x45,0x9b,0xcd,0xdc,0x63,0xc3,0x7b,0xab,0x1e,0x40,0x4a,0x31,0x3c,0x0d,0xfd,0x79}, "MNR ",      6  },
    {"ThetaTV Beans",       {0x67,0xb7,0x9d,0xf9,0x94,0x16,0xad,0x63,0x82,0x67,0xec,0x8d,0x89,0xeb,0x61,0xea,0xe3,0x30,0xa0,0x05}, "BNS ",      18 },
    {"Blockchain PetToken", {0xb1,0xa7,0xab,0xe0,0xc5,0xa9,0xe0,0x6c,0xc7,0x58,0x5a,0x43,0x5e,0x74,0x97,0x6d,0x2d,0xee,0x07,0xf3}, "BPT ",      2  },
    {"Boltt Play",          {0xa9,0xcb,0x73,0x45,0xdb,0x22,0x03,0x4f,0x60,0x7c,0x12,0xdd,0x8e,0x10,0xee,0x70,0x3f,0x6b,0xad,0x61}, "BOLTT ",    8  },
    {"ProjectWith Wiken",   {0x27,0x5f,0x94,0x29,0x85,0x50,0x3d,0x8c,0xe9,0x55,0x8f,0x83,0x77,0xcc,0x52,0x6a,0x3a,0xba,0x35,0x66}, "WIKEN ",    18 },
    {"Somesing Exchange",   {0xdc,0xd6,0x2c,0x57,0x18,0x2e,0x78,0x0e,0x23,0xd2,0x31,0x3c,0x47,0x82,0x70,0x9d,0xa8,0x5b,0x9d,0x6c}, "SSX ",      18 },
    {"Data Token",          {0x81,0x77,0xac,0x20,0x45,0x5f,0x31,0xd8,0xcb,0x77,0x79,0x23,0xf0,0xc6,0x32,0x43,0x65,0x68,0xc7,0x19}, "DTA ",      18 },
    {"Airbloc Token",       {0x46,0xf3,0x07,0xb5,0x8b,0xf0,0x5f,0xf0,0x89,0xba,0x23,0x79,0x9f,0xae,0x0e,0x51,0x85,0x57,0xf8,0x7c}, "ABL ",      18 },
    {"Bitfrost Klay",       {0x29,0x30,0x73,0xd1,0x35,0xc3,0x77,0x41,0x45,0x59,0x1b,0xd2,0xcc,0xb0,0x4f,0x3b,0xcc,0xf5,0x2b,0xee}, "BFCK ",     18 },
    {"0x Protocol Token",   {0xe4,0x43,0x16,0x90,0xf9,0xfb,0x37,0x3d,0xb7,0x3c,0xc0,0x5e,0x8c,0xb0,0xb2,0xa3,0x94,0xde,0x6f,0x3f}, "ZRX ",      18 },
};

const tokenDefinition_t const TOKENS_KLAYTN_TESTNET[NUM_TOKENS_KLAYTN_TESTNET] = {
    {"Wrapped KLAY (Test)", {0x93,0x30,0xdd,0x67,0x13,0xc8,0x32,0x8a,0x8d,0x82,0xb1,0x4e,0x3f,0x60,0xa0,0xf0,0xb4,0xcc,0x7b,0xfb}, "WKLAY ",    18},
    {"Hint Chain (Test)",   {0x29,0x80,0xe1,0xce,0x34,0x2d,0x9a,0x23,0x43,0x31,0xab,0xce,0x8b,0xb4,0x6f,0x64,0xb3,0x70,0xff,0x50}, "HINT ",     18},
    {"0x Protocol (Test)",  {0xcc,0x60,0xb9,0xac,0x77,0xc9,0xac,0x9a,0x3c,0xcb,0x9d,0x61,0x6c,0x17,0xfc,0x8a,0x58,0x03,0xc5,0xa8}, "ZRX ",      18},
};




#endif
