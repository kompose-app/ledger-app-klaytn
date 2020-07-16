#include "shared_context.h"
#include "apdu_constants.h"
#ifdef TARGET_BLUE
#include "ui_blue.h"
#endif
#ifdef HAVE_UX_FLOW
#include "ui_flow.h"
#endif

//TODO(Klaytn) - establish a verified public key for token provisioning
static const uint8_t const TOKEN_SIGNATURE_PUBLIC_KEY[] = {};

void handleProvideTokenInformation(uint8_t p1, uint8_t p2, uint8_t *workBuffer, uint16_t dataLength, unsigned int *flags, unsigned int *tx) {
  UNUSED(p1);
  UNUSED(p2);
  UNUSED(flags);
  uint32_t offset = 0;
  uint8_t tickerLength, contractNameLength;
  uint32_t chainId;
  uint8_t hash[32];
  cx_sha256_t sha256;
  cx_ecfp_public_key_t tokenKey;

  cx_sha256_init(&sha256);

  tmpCtx.transactionContext.currentTokenIndex = (tmpCtx.transactionContext.currentTokenIndex + 1) % MAX_TOKEN;
  tokenDefinition_t* token = &tmpCtx.transactionContext.tokens[tmpCtx.transactionContext.currentTokenIndex];
  
  if (dataLength < 1) {
    THROW(0x6A80);
  }
  tickerLength = workBuffer[offset++];
  dataLength--;
  if ((tickerLength + 2) >= sizeof(token->ticker)) { // +2 because ' \0' is appended to ticker
    THROW(0x6A80);
  }
  if (dataLength < tickerLength + 1) {
    THROW(0x6A80);
  }
  cx_hash((cx_hash_t*)&sha256, 0, workBuffer + offset, tickerLength, NULL, 0);
  os_memmove(token->ticker, workBuffer + offset, tickerLength);
  token->ticker[tickerLength] = ' ';
  token->ticker[tickerLength + 1] = '\0';
  offset += tickerLength;
  dataLength -= tickerLength;

  contractNameLength = workBuffer[offset++];
  dataLength--;
  if (dataLength < contractNameLength + 20 + 4 + 4) {
    THROW(0x6A80);
  }
  cx_hash((cx_hash_t*)&sha256, CX_LAST, workBuffer + offset, contractNameLength + 20 + 4 + 4, hash, 32);
  os_memmove(token->contractName, workBuffer + offset, MIN(contractNameLength, sizeof(token->contractName)-1));
  token->contractName[MIN(contractNameLength, sizeof(token->contractName)-1)] = '\0';
  offset += contractNameLength;
  dataLength -= contractNameLength;

  os_memmove(token->address, workBuffer + offset, 20);
  offset += 20;
  dataLength -= 20;
  token->decimals = U4BE(workBuffer, offset);
  offset += 4;
  dataLength -= 4;
  chainId = U4BE(workBuffer, offset);
  if ((chainConfig->chainId != 0) && (chainConfig->chainId != chainId)) {
    PRINTF("ChainId token mismatch\n");
    THROW(0x6A80);
  }
  offset += 4;
  dataLength -= 4;
  cx_ecfp_init_public_key(CX_CURVE_256K1, TOKEN_SIGNATURE_PUBLIC_KEY, sizeof(TOKEN_SIGNATURE_PUBLIC_KEY), &tokenKey);
  if (!cx_ecdsa_verify(&tokenKey, CX_LAST, CX_SHA256, hash, 32, workBuffer + offset, dataLength)) {
    PRINTF("Invalid token signature\n");
    THROW(0x6A80);
  }
  tmpCtx.transactionContext.tokenSet[tmpCtx.transactionContext.currentTokenIndex] = 1;
  THROW(0x9000);
}
