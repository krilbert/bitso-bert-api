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
const ticker = await BitsoAPI.public.getTicker('btc_mxn')
if (ticker.success) {
  const { book, last, volume, low, high } = ticker.payload
  // ...
} else {
  console.log(ticker.error)
}
```

### Rate Limits

Rate limits are based on one minute windows. For public API requests, the limit is by IP address and allows 60 requests per minute. For private API requests, the limit is by user and allows 300 requests per minute. If you exceed these limits, you will get locked out for one minute. Continuous one minute lockouts may result in a 24-hour block. Order cancellations aren’t subject to API rate limiting.

### Implemented REST API

The API is divided in two sections: `public` and `private`

|     |                                  |     |                                                               |                                                                          |
| --- | -------------------------------- | --- | ------------------------------------------------------------- | ------------------------------------------------------------------------ |
|     | Available Books                  | ✅  | getAvailableBooks()                                           |                                                                          |
|     | Ticker                           | ✅  | getTicker('btc_mxn')                                          |                                                                          |
|     | Order Book                       | ✅  | getOrderBook('btc_mxn')                                       | `{ aggregate?: boolean }`                                                |
|     | Trades                           | ✅  | getTrades('btc_mxn', params?)                                 | `{ marker?: string, sort?: 'asc'\|'desc', limit?: number }`              |
| 🔒  | Account Status                   | ✅  | getAccountStatus()                                            |                                                                          |
| 🔒  | Document Upload                  | ☑️  |                                                               |                                                                          |
| 🔒  | Mobile Phone Number Registration | ☑️  |                                                               |                                                                          |
| 🔒  | Mobile Phone Number Verification | ☑️  |                                                               |                                                                          |
| 🔒  | Account Balance                  | ✅  | getBalance()                                                  |                                                                          |
| 🔒  | Fees                             | ✅  | getFees()                                                     |                                                                          |
| 🔒  | Ledger                           |     |                                                               |                                                                          |
| 🔒  | - all                            | ✅  | ledger.getLedger(params?)                                     | `{ marker?: string, sort?: 'asc'\|'desc', limit?: number }`              |
| 🔒  | - trades                         | ✅  | ledger.getTrades(params?)                                     | `{ marker?: string, sort?: 'asc'\|'desc', limit?: number }`              |
| 🔒  | - fees                           | ✅  | ledger.getFees(params?)                                       | `{ marker?: string, sort?: 'asc'\|'desc', limit?: number }`              |
| 🔒  | - fundings                       | ✅  | ledger.getFundings(params?)                                   | `{ marker?: string, sort?: 'asc'\|'desc', limit?: number }`              |
| 🔒  | - withdrawals                    | ✅  | ledger.getWithdrawals(params?)                                | `{ marker?: string, sort?: 'asc'\|'desc', limit?: number }`              |
| 🔒  | Withdrawals                      | ☑️  |                                                               |                                                                          |
| 🔒  | Fundings                         | ☑️  |                                                               |                                                                          |
| 🔒  | User Trades                      |     |                                                               |                                                                          |
| 🔒  | - by book                        | ✅  | userTrades.getUserTrades('btc_mxn', params?)                  | `{ marker?: string, sort?: 'asc'\|'desc', limit?: number }`              |
| 🔒  | - by id                          | ✅  | userTrades.getUserTradeById('tid')                            |                                                                          |
| 🔒  | - by ids                         | ✅  | userTrades.getUserTradesById(['tid1', 'tid2'])                |                                                                          |
| 🔒  | Order Trades                     |     |                                                               |                                                                          |
| 🔒  | - by oid                         | ✅  | orderTrades.getOrderTrades('oid')                             |                                                                          |
| 🔒  | - by origin id                   | ✅  | orderTrades.getOrderTradesByOriginId('originId')              |                                                                          |
| 🔒  | Open Orders                      | ✅  | getOpenOrders(params?)                                        | `{ marker?: string, sort?: 'asc'\|'desc', limit?: number, book?: Book }` |
| 🔒  | Lookup Orders                    |     |                                                               |                                                                          |
| 🔒  | - by oid                         | ✅  | lookupOrders.getOrder('oid')                                  |                                                                          |
| 🔒  | - by list of oids                | ✅  | lookupOrders.getOrders(['oid1', 'oid2'])                      |                                                                          |
| 🔒  | - by list of origin_ids          | ✅  | lookupOrders.getOrdersByOriginId(['originId1', 'originId2'])  |                                                                          |
| 🔒  | Cancel Order                     |     |                                                               |                                                                          |
| 🔒  | - all                            | ✅  | cancelOrder.cancelAllOrders()                                 |                                                                          |
| 🔒  | - by oid                         | ✅  | cancelOrder.cancelOrder('oid')                                |                                                                          |
| 🔒  | - by list of oids                | ✅  | cancelOrder.cancelOrdersById(['oid1', 'oid2'])                |                                                                          |
| 🔒  | - by list of origin_ids          | ✅  | cancelOrder.cancelOrdersByOrderId(['originId1', 'originId2']) |                                                                          |
| 🔒  | Place an Order                   | ☑️  |                                                               |                                                                          |
| 🔒  | Funding Destination              | ☑️  |                                                               |                                                                          |
| 🔒  | Crypto Withdrawals               | ☑️  |                                                               |                                                                          |
| 🔒  | SPEI Withdrawal                  | ☑️  |                                                               |                                                                          |
| 🔒  | Bank Codes                       | ✅  | getBankCodes()                                                |                                                                          |
| 🔒  | Debit Card Withdrawal            | ☑️  |                                                               |                                                                          |
| 🔒  | Phone Number Withdrawal          | ☑️  |                                                               |                                                                          |

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
