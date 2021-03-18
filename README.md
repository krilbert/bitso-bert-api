<h1 align="center">bitso-bert-api</h1>

### Getting started

The first step will be to get your API Keys (for private endpoints). In order to get your API Keys, please refer to their [documentation](https://bitso.com/api_info#generating-api-keys)

You will need the following environment variables in your project

```
API_KEY=""
API_SECRET=""
API_URL="https://api.bitso.com"
API_VERSION="v3"
```

> When working on integrations, bitso recommends that you use their dev server before running your code against production. The URL for this server is https://api-dev.bitso.com/v3/

```
npm install bitso-bert-api
```

usage

```javascript
const ticker = await BitsoAPI.public.getTicker({ book: 'btc_mxn' })
if (ticker.success) {
  const { book, last, volume, low, high } = ticker.payload
  // ...
}
```

### Rate Limits

Rate limits are based on one minute windows. For public API requests, the limit is by IP address and allows 60 requests per minute. For private API requests, the limit is by user and allows 300 requests per minute. If you exceed these limits, you will get locked out for one minute. Continuous one minute lockouts may result in a 24-hour block. Order cancellations aren’t subject to API rate limiting.

### Implemented REST API

|     |                                  |     |
| --- | -------------------------------- | --- |
|     | Available Books                  | ✅  |
|     | Ticker                           | ✅  |
|     | Order Book                       | ✅  |
|     | Trades                           | ✅  |
| 🔒  | Account Status                   | ✅  |
| 🔒  | Document Upload                  | ☑️  |
| 🔒  | Mobile Phone Number Registration | ☑️  |
| 🔒  | Mobile Phone Number Verification | ☑️  |
| 🔒  | Account Balance                  | ✅  |
| 🔒  | Fees                             | ✅  |
| 🔒  | Ledger                           | ✅  |
| 🔒  | Withdrawals                      | ☑️  |
| 🔒  | Fundings                         | ☑️  |
| 🔒  | User Trades                      | ✅  |
| 🔒  | Order Trades                     | ✅  |
| 🔒  | Open Orders                      | ☑️  |
| 🔒  | Lookup Orders                    | ☑️  |
| 🔒  | Cancel Order                     | ☑️  |
| 🔒  | Place an Order                   | ☑️  |
| 🔒  | Funding Destination              | ☑️  |
| 🔒  | Crypto Withdrawals               | ☑️  |
| 🔒  | SPEI Withdrawal                  | ☑️  |
| 🔒  | Bank Codes                       | ✅  |
| 🔒  | Debit Card Withdrawal            | ☑️  |
| 🔒  | Phone Number Withdrawal          | ☑️  |

### Want to support this project?

|                                  |                                                                                                                                                                            |                                                                                               |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Bitcoin<br />(BTC)               | <img src="https://bitso.com/getqrcode/btc/35DjJ7w9ZmLLBg7fsQFXwmcE2JsroYpXBX" width="100" title="35DjJ7w9ZmLLBg7fsQFXwmcE2JsroYpXBX" />                                    | `35DjJ7w9ZmLLBg7fsQFXwmcE2JsroYpXBX`                                                          |
| Ethereum<br />(ETH)              | <img src="https://bitso.com/getqrcode/eth/0x13d5a9e4c2e8fb21fa11dadbd6cec2bc58794b0d" width="100" title="0x13d5a9e4c2e8fb21fa11dadbd6cec2bc58794b0d" />                    | `0x13d5a9e4c2e8fb21fa11dadbd6cec2bc58794b0d`                                                  |
| (XRP)                            | <img src="https://bitso.com/getqrcode/xrp/rLSn6Z3T8uCxbcd1oxwfGQN1Fdn5CyGujK/27170099" width="100" title="rLSn6Z3T8uCxbcd1oxwfGQN1Fdn5CyGujK Destination TAG: 27170099" /> | `rLSn6Z3T8uCxbcd1oxwfGQN1Fdn5CyGujK` <br /> Destination TAG: `27170099`                       |
| Litecoin<br />(LTC)              | <img src="https://bitso.com/getqrcode/ltc/MX6oGTU3YAgm5FiLnzmy2Thrib9UXXwfJL" width="100" title="MX6oGTU3YAgm5FiLnzmy2Thrib9UXXwfJL" />                                    | `MX6oGTU3YAgm5FiLnzmy2Thrib9UXXwfJL`                                                          |
| Bitcoin Cash<br />(BCH)          | <img src="https://bitso.com/getqrcode/bch/pqgjd3f8jv9nee98pc2r03u5uvhmxmqu45773wre8q" width="100" title="pqgjd3f8jv9nee98pc2r03u5uvhmxmqu45773wre8q" />                    | `pqgjd3f8jv9nee98pc2r03u5uvhmxmqu45773wre8q` <br /> Old: `33FhrbpJHSB8aPFSVD5Ngfve7giiPTpnNc` |
| (TUSD)                           | <img src="https://bitso.com/getqrcode/tusd/0x13d5a9e4c2e8fb21fa11dadbd6cec2bc58794b0d" width="100" title="0x13d5a9e4c2e8fb21fa11dadbd6cec2bc58794b0d" />                   | `0x13d5a9e4c2e8fb21fa11dadbd6cec2bc58794b0d`                                                  |
| Basic Attention Token<br />(BAT) | <img src="https://bitso.com/getqrcode/bat/0x13d5a9e4c2e8fb21fa11dadbd6cec2bc58794b0d" width="100" title="0x13d5a9e4c2e8fb21fa11dadbd6cec2bc58794b0d" />                    | `0x13d5a9e4c2e8fb21fa11dadbd6cec2bc58794b0d`                                                  |
| (DAI)                            | <img src="https://bitso.com/getqrcode/dai/0x13d5a9e4c2e8fb21fa11dadbd6cec2bc58794b0d" width="100" title="0x13d5a9e4c2e8fb21fa11dadbd6cec2bc58794b0d" />                    | `0x13d5a9e4c2e8fb21fa11dadbd6cec2bc58794b0d`                                                  |
| Decentraland<br />(MANA)         | <img src="https://bitso.com/getqrcode/mana/0x13d5a9e4c2e8fb21fa11dadbd6cec2bc58794b0d" width="100" title="0x13d5a9e4c2e8fb21fa11dadbd6cec2bc58794b0d" />                   | `0x13d5a9e4c2e8fb21fa11dadbd6cec2bc58794b0d`                                                  |
