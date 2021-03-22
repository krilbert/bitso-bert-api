import { privateDelete, privateGet, privatePost, publicGet } from './api-client'

const BitsoAPI: BitsoAPI = {
  public: {
    getAvailableBooks: () => publicGet('/available_books'),
    getTicker: (book) => publicGet('/ticker', { book }),
    getOrderBook: (book, params) => publicGet('/order_book', { ...params, book }),
    getTrades: (book, params) => publicGet('/trades', { ...params, book }),
  },
  private: {
    getAccountStatus: () => privateGet('/account_status'),
    mobilePhone: {
      register: (phoneNumber) => privatePost('/phone_number', undefined, { phone_number: phoneNumber }),
      verify: (code) => privatePost('/phone_verification', undefined, { verification_code: code }),
    },
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
      getAll: (params) => privateGet('/withdrawals', params),
      getByWid: (wid) => privateGet(`/withdrawals/${wid}`),
      getByWids: (wids) => privateGet('/withdrawals', { wids: wids.join(',') }),
      getByOriginIds: (originIds) => privateGet('/withdrawals', { origin_ids: originIds.join(',') }),
    },
    fundings: {
      getAll: (params) => privateGet('/fundings', params),
      getByFid: (fid) => privateGet(`/fundings/${fid}`),
      getByFids: (fids) => privateGet(`/fundings/${fids.join('-')}`),
    },
    orderTrades: {
      getByOid: (oid) => privateGet(`/order_trades/${oid}`),
      getByOriginId: (originId) => privateGet('/order_trades', { origin_id: originId }),
    },
    userTrades: {
      getByBook: (book, params) => privateGet(`/user_trades`, { ...params, book }),
      getByTid: (tid) => privateGet(`/user_trades/${tid}`),
      getByTids: (tids) => privateGet(`/user_trades/${tids.join('-')}`),
    },
    getOpenOrders: (params) => privateGet('/open_orders', params),
    lookupOrders: {
      getByOid: (oid) => privateGet(`/orders/${oid}`),
      getByOids: (oids) => privateGet(`/orders`, { oids: oids.join(',') }),
      getByOriginIds: (originIds) => privateGet(`/orders`, { origin_ids: originIds.join(',') }),
    },
    cancelOrder: {
      cancelAll: () => privateDelete('/orders/all'),
      cancelByOid: (oid) => privateDelete(`/orders/${oid}`),
      cancelByOids: (oids) => privateDelete('/orders', { oids: oids.join(',') }),
      cancelByOrderIds: (originIds) => privateDelete('/orders', { origin_ids: originIds.join(',') }),
    },
    getFundingDestination: (currency) => privateGet('/funding_destination', { fund_currency: currency }),
    getBankCodes: () => privateGet('/mx_bank_codes'),
  },
}

if (!process.env.BITSO_API_URL)
  throw new Error(
    'Check your env vars: [BITSO_API_URL] is required, and [BITSO_API_KEY, BITSO_API_SECRET] only if you need the private endpoints',
  )

export default BitsoAPI
