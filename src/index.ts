import { privateDelete, privateGet, publicGet } from './api-client'

const BitsoAPI: BitsoAPI = {
  public: {
    getAvailableBooks: () => publicGet('/available_books'),
    getTicker: (book) => publicGet('/ticker', { book }),
    getOrderBook: (book, params) => publicGet('/order_book', { ...params, book }),
    getTrades: (book, params) => publicGet('/trades', { ...params, book }),
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
    withdrawals: {
      getWithdrawals: (params) => privateGet('/withdrawals', params),
      getWithdrawalById: (wid) => privateGet(`/withdrawals/${wid}`),
      getWithdrawalsById: (wids) => privateGet('/withdrawals', { wids: wids.join(',') }),
      getWithdrawalsByOriginIds: (originIds) => privateGet('/withdrawals', { origin_ids: originIds.join(',') }),
    },
    fundings: {
      getFundings: (params) => privateGet('/fundings', params),
      getFundingById: (fid) => privateGet(`/fundings/${fid}`),
      getFundingsByIds: (fids) => privateGet(`/fundings/${fids.join('-')}`),
    },
    orderTrades: {
      getOrderTrades: (oid) => privateGet(`/order_trades/${oid}`),
      getOrderTradesByOriginId: (originId) => privateGet('/order_trades', { origin_id: originId }),
    },
    userTrades: {
      getUserTrades: (book, params) => privateGet(`/user_trades`, { ...params, book }),
      getUserTradeById: (tid) => privateGet(`/user_trades/${tid}`),
      getUserTradesById: (tids) => privateGet(`/user_trades/${tids.join('-')}`),
    },
    getOpenOrders: (params) => privateGet('/open_orders', params),
    lookupOrders: {
      getOrder: (oid) => privateGet(`/orders/${oid}`),
      getOrders: (oids) => privateGet(`/orders`, { oids: oids.join(',') }),
      getOrdersByOriginId: (originIds) => privateGet(`/orders`, { origin_ids: originIds.join(',') }),
    },
    cancelOrder: {
      cancelAllOrders: () => privateDelete('/orders/all'),
      cancelOrder: (oid) => privateDelete(`/orders/${oid}`),
      cancelOrdersById: (oids) => privateDelete('/orders', { oids: oids.join(',') }),
      cancelOrdersByOrderId: (originIds) => privateDelete('/orders', { origin_ids: originIds.join(',') }),
    },
    getBankCodes: () => privateGet('/mx_bank_codes'),
  },
}

if (!process.env.BITSO_API_URL)
  throw new Error(
    'Check your env vars: [BITSO_API_URL] is required, and [BITSO_API_KEY, BITSO_API_SECRET] only if you need the private endpoints',
  )

export default BitsoAPI
