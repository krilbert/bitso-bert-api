import { privateGet, publicGet } from './api-client'

const BitsoAPI: BitsoAPI = {
  public: {
    getAvailableBooks: () => publicGet('/available_books'),
    getTicker: (params) => publicGet('/ticker', params),
    getOrderBook: (params) => publicGet('/order_book', params),
    getTrades: (params) => publicGet('/trades', params),
  },
  private: {
    getAccountStatus: () => privateGet('/account_status'),
    getBalance: () => privateGet('/balance'),
    getFees: () => privateGet('/fees'),
    ledger: {
      getLedger: (params) => privateGet('/ledger', params),
      getTrades: (params) => privateGet('/ledger/trades', params),
      getFees: (params) => privateGet('/ledger/fees', params),
      getFundings: (params) => privateGet('/ledger/fundings', params),
      getWithdrawals: (params) => privateGet('/ledger/withdrawals', params),
    },
    orderTrades: {
      getOrderTrades: (oid) => privateGet(`/order_trades/${oid}`),
      getOrderTradesByOriginId: (params) => privateGet('/order_trades', params),
    },
    userTrades: {
      getUserTrades: (params) => privateGet(`/user_trades`, params),
      getUserTradeById: (tid) => privateGet(`/user_trades/${tid}`),
      getUserTradesById: (tids) => privateGet(`/user_trades/${tids.join('-')}`),
    },
    getOpenOrders: (params) => privateGet('/open_orders', params),
    lookupOrders: {
      getOrder: (oid) => privateGet(`/orders/${oid}`),
      getOrders: (params) => privateGet(`/orders`, params),
      getOrdersByOriginId: (params) => privateGet(`/orders`, params),
    },
    getBankCodes: () => privateGet('/mx_bank_codes'),
  },
}

if (!process.env.BITSO_API_URL || !process.env.BITSO_API_VERSION)
  throw new Error(
    'Check your env vars: [BITSO_API_URL, BITSO_API_VERSION] are required, and [BITSO_API_KEY, BITSO_API_SECRET] only if you need the private endpoints',
  )

export default BitsoAPI
