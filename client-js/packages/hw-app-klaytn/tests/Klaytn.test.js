import {
  createTransportReplayer,
  RecordStore
} from "@ledgerhq/hw-transport-mocker";
import Klaytn from "../src/Klaytn";
import { BigNumber } from "bignumber.js";
import { byContractAddress } from "../src/kct"

test("getAppConfiguration", async () => {
  const Transport = createTransportReplayer(
    RecordStore.fromString(`
    => e006000000
    <= 000100009000
    `)
  );
  const transport = await Transport.open();
  const klay = new Klaytn(transport);
  const result = await klay.getAppConfiguration();
  expect(result).toEqual({ arbitraryDataEnabled: 0, kctProvisioningNecessary: 0, version: "1.0.0" });
});

test("getAddress", async () => {
  const Transport = createTransportReplayer(
    RecordStore.fromString(`
    => e002010015058000002c80002019800000000000000000000000
    <= 410413d56dc5a439e3f97aa1439e6e6ced59cca75951e68992728c792a3fcdd1f8c5a89ee0968ea213025bb2e0c443c11521a567f10b1e324d79bd252e392d86612c28304362653735334532433437663338334542384339313836663230423636306336453346373941459000      
    `)
  );
  const transport = await Transport.open();
  const klay = new Klaytn(transport);
  const result = await klay.getAddress("44'/8217'/0'/0/0");
  expect(result).toEqual({
    address: "0x0Cbe753E2C47f383EB8C9186f20B660c6E3F79AE",
    publicKey:
      "0413d56dc5a439e3f97aa1439e6e6ced59cca75951e68992728c792a3fcdd1f8c5a89ee0968ea213025bb2e0c443c11521a567f10b1e324d79bd252e392d86612c"
  });
});

// test("signTransaction", async () => {
//   const Transport = createTransportReplayer(
//     RecordStore.fromString(`
//     => e00400003e058000002c8000003c800000008000000000000000e8018504e3b292008252089428ee52a8f3d6e5d15f8b131996950d7f296c7952872bd72a2487400080
//     <= 1b3694583045a85ada8d15d5e01b373b00e86a405c9c52f7835691dcc522b7353b30392e638a591c65ed307809825ca48346980f52d004ab7a5f93657f7e62a4009000
//     `)
//   );
//   const transport = await Transport.open();
//   const klay = new Klaytn(transport);
//   const result = await klay.signTransaction(
//     "44'/8217'/0'/0/0",
//     "e8018504e3b292008252089428ee52a8f3d6e5d15f8b131996950d7f296c7952872bd72a2487400080"
//   );
//   expect(result).toEqual({
//     r: "3694583045a85ada8d15d5e01b373b00e86a405c9c52f7835691dcc522b7353b",
//     s: "30392e638a591c65ed307809825ca48346980f52d004ab7a5f93657f7e62a400",
//     v: "1b"
//   });
// });

test("signPersonalMessage", async () => {
  const Transport = createTransportReplayer(
    RecordStore.fromString(`
    => e00800001d058000002c800020198000000000000000000000000000000474657374
    <= 1b140d643acfa91c20f3ef4f7e28e12be1c867e60bf439bf650582ba78b866c5ce45a7bf09e627865ebc899aecb0c4223f788110d73cc728bd0f428299503e6b769000
    `)
  );
  const transport = await Transport.open();
  const klay = new Klaytn(transport);
  const result = await klay.signPersonalMessage(
    "44'/8217'/0'/0/0",
    Buffer.from("test").toString("hex")
  );
  expect(result).toEqual({
    r: "140d643acfa91c20f3ef4f7e28e12be1c867e60bf439bf650582ba78b866c5ce",
    s: "45a7bf09e627865ebc899aecb0c4223f788110d73cc728bd0f428299503e6b76",
    v: 27
  });
});

// test("provideKctTokenInformation", async () => {
//   const Transport = createTransportReplayer(
//     RecordStore.fromString(`
//     => e00a000066035a5258e41d2489571d322189246dafa5ebde1f4699f4980000001200000001304402200ae8634c22762a8ba41d2acb1e068dcce947337c6dd984f13b820d396176952302203306a49d8a6c35b11a61088e1570b3928ca3a0db6bd36f577b5ef87628561ff7
//     <= 9000
//     `)
//   );
//   const transport = await Transport.open();
//   const klay = new Klaytn(transport);
//   const zrxInfo = byContractAddress("0xe41d2489571d322189246dafa5ebde1f4699f498");
//   const result = await klay.provideKctTokenInformation(zrxInfo);
//   expect(result).toEqual(true);
// });

// test("signAllowance", async () => {
//   const Transport = createTransportReplayer(
//     RecordStore.fromString(`
//     => e00a0000670455534454dac17f958d2ee523a2206206994597c13d831ec700000006000000013044022078c66ccea3e4dedb15a24ec3c783d7b582cd260daf62fd36afe9a8212a344aed0220160ba8c1c4b6a8aa6565bed20632a091aeeeb7bfdac67fc6589a6031acbf511c
//     <= 9000
//     => e004000084058000002c8000003c800000000000000000000000f86d018504e3b2920082520894dac17f958d2ee523a2206206994597c13d831ec7872bd72a24874000b844095ea7b30000000000000000000000000102030405060708090a0b0c0d0e0f101112131400000000000000000000000000000000000000000000000000000000000186a0
//     <= 1b0a5a7a8732d95ee05e6dd11b28500c0482fd9ef24028eb5448b5c9c713f13bbb1ef940556853fc8b3883e6ef810d18566f13019e6bea70f340cbfde36947408b9000
//     `)
//   );
//   const transport = await Transport.open();
//   const klay = new Klaytn(transport);
//   const tokenInfo = byContractAddress("0xdac17f958d2ee523a2206206994597c13d831ec7");
//   await klay.provideKctTokenInformation(tokenInfo);  
//   const result = await klay.signTransaction(
//     "44'/8217'/0'/0/0",
//     "f86d018504e3b2920082520894dac17f958d2ee523a2206206994597c13d831ec7872bd72a24874000b844095ea7b30000000000000000000000000102030405060708090a0b0c0d0e0f101112131400000000000000000000000000000000000000000000000000000000000186a0"
//   );
//   expect(result).toEqual({
//     r: "0a5a7a8732d95ee05e6dd11b28500c0482fd9ef24028eb5448b5c9c713f13bbb",
//     s: "1ef940556853fc8b3883e6ef810d18566f13019e6bea70f340cbfde36947408b",
//     v: "1b"
//   });
// });

// test("signAllowanceUnlimited", async () => {
//   const Transport = createTransportReplayer(
//     RecordStore.fromString(`
//     => e00a0000670455534454dac17f958d2ee523a2206206994597c13d831ec700000006000000013044022078c66ccea3e4dedb15a24ec3c783d7b582cd260daf62fd36afe9a8212a344aed0220160ba8c1c4b6a8aa6565bed20632a091aeeeb7bfdac67fc6589a6031acbf511c
//     <= 9000
//     => e004000084058000002c8000003c800000000000000000000000f86d018504e3b2920082520894dac17f958d2ee523a2206206994597c13d831ec7872bd72a24874000b844095ea7b30000000000000000000000000102030405060708090a0b0c0d0e0f1011121314ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
//     <= 1b3fa6a78fb25f87f063fc8db5cb4efc1794e01c973994e26a6fa1603c3ac3db9d3dc98795b5f99ba1eeae84ef01ecbfad188f00446d56b6e9a0eb9ec6f4bae7fe9000
//     `)
//   );
//   const transport = await Transport.open();
//   const klay = new Klaytn(transport);
//   const tokenInfo = byContractAddress("0xdac17f958d2ee523a2206206994597c13d831ec7");
//   await klay.provideKctTokenInformation(tokenInfo);  
//   const result = await klay.signTransaction(
//     "44'/8217'/0'/0/0",
//     "f86d018504e3b2920082520894dac17f958d2ee523a2206206994597c13d831ec7872bd72a24874000b844095ea7b30000000000000000000000000102030405060708090a0b0c0d0e0f1011121314ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
//   );
//   expect(result).toEqual({
//     r: "3fa6a78fb25f87f063fc8db5cb4efc1794e01c973994e26a6fa1603c3ac3db9d",
//     s: "3dc98795b5f99ba1eeae84ef01ecbfad188f00446d56b6e9a0eb9ec6f4bae7fe",
//     v: "1b"
//   });
// });

