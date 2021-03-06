import { basicGet, privateDelete, privateGet, privatePost, publicGet, publicPost } from './api-client'
import { BitsoAPI } from './types/bitso-bert-api.types'
import { generatePlaceOrderParams } from './utils'

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
    placeOrder: {
      buy: {
        market: (book, amount, currency) => {
          const genParams = generatePlaceOrderParams(book, amount, currency)
          const params = { ...genParams, side: 'buy', type: 'market' }
          return privatePost('/orders', undefined, params)
        },
        limit: (book, amount, currency, price, executionType = 'goodtillcancelled') => {
          const genParams = generatePlaceOrderParams(book, amount, currency)
          const params = { ...genParams, side: 'buy', type: 'limit', price, time_in_force: executionType }
          return privatePost('/orders', undefined, params)
        },
        stopLoss: (book, amount, stopPrice) => {
          const genParams = generatePlaceOrderParams(book, amount)
          const params = { ...genParams, side: 'buy', type: 'limit', stop: stopPrice }
          return privatePost('/orders', undefined, params)
        },
        stopLimit: (book, amount, currency, price, stopPrice, executionType = 'goodtillcancelled') => {
          const genParams = generatePlaceOrderParams(book, amount, currency)
          const params = {
            ...genParams,
            side: 'buy',
            type: 'limit',
            price,
            stop: stopPrice,
            time_in_force: executionType,
          }
          return privatePost('/orders', undefined, params)
        },
      },
      sell: {
        market: (book, amount, currency) => {
          const genParams = generatePlaceOrderParams(book, amount, currency)
          const params = { ...genParams, side: 'sell', type: 'market' }
          return privatePost('/orders', undefined, params)
        },
        limit: (book, amount, currency, price, executionType = 'goodtillcancelled') => {
          const genParams = generatePlaceOrderParams(book, amount, currency)
          const params = { ...genParams, side: 'sell', type: 'limit', price, time_in_force: executionType }
          return privatePost('/orders', undefined, params)
        },
        stopLoss: (book, amount, stopPrice) => {
          const genParams = generatePlaceOrderParams(book, amount)
          const params = { ...genParams, side: 'sell', type: 'limit', stop: stopPrice }
          return privatePost('/orders', undefined, params)
        },
        stopLimit: (book, amount, currency, price, stopPrice, executionType = 'goodtillcancelled') => {
          const genParams = generatePlaceOrderParams(book, amount, currency)
          const params = {
            ...genParams,
            side: 'sell',
            type: 'limit',
            price,
            stop: stopPrice,
            time_in_force: executionType,
          }
          return privatePost('/orders', undefined, params)
        },
      },
    },
    getFundingDestination: (currency) => privateGet('/funding_destination', { fund_currency: currency }),
    getBankCodes: () => privateGet('/mx_bank_codes'),
  },
  undocumented: {
    charts: {
      getChartInfo: (book, timeBucket, startDate, endDate) => {
        if (endDate <= startDate) throw new Error('date range is incorrect')
        const time_bucket = chartingTimeFrame[timeBucket]
        const start = startDate.getTime()
        const end = endDate.getTime()
        return publicGet('/ohlc', { book, time_bucket, start, end })
      },
      getChartTrades: (book, timeframe) => basicGet(`https://bitso.com/trade/chartJSON/${book}/${timeframe}`),
    },
    getTickers: () => publicPost('/ticker', undefined, { book: 'all' }),
    getSettings: () => privateGet('/settings'),
    catalogues: {
      availableCurrencyConversions: {
        public: () => publicGet('/catalogues/available_currency_conversions'),
        private: () => privateGet('/catalogues/available_currency_conversions'),
      },
      getCountries: () => publicGet('/catalogues/countries'),
      getCurrencies: () => publicGet('/catalogues/currencies'),
    },
  },
}

export const chartingTimeFrame = {
  '1 min': 60,
  '5 min': 300,
  '15 min': 900,
  '30 min': 1800,
  '1 h': 3600,
  '4 h': 14400,
  '6 h': 21600,
  '12 h': 43200,
  '1 d': 86400,
  '3 d': 259200,
  '7 d': 604800,
}

if (!process.env.BITSO_API_URL)
  throw new Error(
    'Check your env vars: [BITSO_API_URL] is required, and [BITSO_API_KEY, BITSO_API_SECRET] only if you need the private endpoints',
  )

export default BitsoAPI
