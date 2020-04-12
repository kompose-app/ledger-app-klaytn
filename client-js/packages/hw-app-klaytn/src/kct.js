// @flow
import blob from "../data/kct.js";

export type TokenInfo = {
  contractAddress: string,
  ticker: string,
  decimals: number,
  chainId: number,
  signature: Buffer,
  data: Buffer
};

type _Cached = {
  byContract: string => ?TokenInfo,
  list: () => TokenInfo[]
};

/**
 * Klaytn KCT Tokens
 *
 * @example
 * import KCT from "@kompose-app/hw-app-klaytn/kct";
 * const kctList = new KCT().list();
 */
export default class KCT {
  /**
   * Retrieve the token information by a given contract address if any
   */
  byContractAddress(contract: string): ?TokenInfo {
    return this.get().byContract(this.asContractAddress(contract));
  }

  /**
   * List all the KCT tokens informations
   */
  list(): TokenInfo[] {
    return this.get().list();
  }

  asContractAddress(addr: string) {
    const a = addr.toLowerCase();
    return a.startsWith("0x") ? a : "0x" + a;
  }

  // this internal get() will lazy load and cache the data from the KCT data blob
  get(): _Cached {
    return (() => {
      let cache;
      return () => {
        if (cache) return cache;
        const buf = Buffer.from(blob, "base64");
        const byContract = {};
        const entries = [];
        let i = 0;
        while (i < buf.length) {
          const length = buf.readUInt32BE(i);
          i += 4;
          const item = buf.slice(i, i + length);
          let j = 0;
          const tickerLength = item.readUInt8(j);
          j += 1;
          const ticker = item.slice(j, j + tickerLength).toString("ascii");
          j += tickerLength;
          const contractAddress = this.asContractAddress(
            item.slice(j, j + 20).toString("hex")
          );
          j += 20;
          const decimals = item.readUInt32BE(j);
          j += 4;
          const chainId = item.readUInt32BE(j);
          j += 4;
          const signature = item.slice(j);
          const entry: $Exact<TokenInfo> = {
            ticker,
            contractAddress,
            decimals,
            chainId,
            signature,
            data: item
          };
          entries.push(entry);
          byContract[contractAddress] = entry;
          i += length;
        }
        const api = {
          list: () => entries,
          byContract: contractAddress => byContract[contractAddress]
        };
        cache = api;
        return api;
      };
    })();
  }
}
