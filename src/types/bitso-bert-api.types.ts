import { chartingTimeFrame } from '..'
import { BitsoBook, BitsoCurrency } from './common.types'
import {
  FundingsQueryParams,
  OpenOrdersQueryParams,
  OrderBookQueryParams,
  PaginationQueryParams,
  WithdrawalsQueryParams,
} from './query-params.types'
import {
  BitsoAccount,
  BitsoAccountBalance,
  BitsoAvailableBook,
  BitsoBankCode,
  BitsoCustomerFee,
  BitsoFunding,
  BitsoFundingDestination,
  BitsoLedger,
  BitsoLedgerFee,
  BitsoLedgerFunding,
  BitsoLedgerTrade,
  BitsoLedgerWithdrawal,
  BitsoLookupOrder,
  BitsoMobilePhoneNumber,
  BitsoOpenOrder,
  BitsoOrderBook,
  BitsoOrderTrade,
  BitsoTicker,
  BitsoTrade,
  BitsoUserTrade,
  BitsoWithdrawal,
  BitsoOhlcItem,
  BitsoSettings,
  Countries,
  BitsoCurrencies,
  BitsoAvailableCurrencyConversionsPublic,
  BitsoAvailableCurrencyConversionsPrivate,
} from './responses.types'

type ChartingTimeFrame = keyof typeof chartingTimeFrame

export interface BitsoAPI {
  public: {
    getAvailableBooks: () => Promise<BitsoAvailableBook[]>
    getTicker: (book: BitsoBook) => Promise<BitsoTicker>
    getOrderBook: (book: BitsoBook, params?: OrderBookQueryParams) => Promise<BitsoOrderBook>
    getTrades: (book: BitsoBook, params?: PaginationQueryParams) => Promise<BitsoTrade[]>
  }
  private: {
    getAccountStatus: () => Promise<BitsoAccount>
    mobilePhone: {
      register: (phoneNumber: string) => Promise<BitsoMobilePhoneNumber>
      verify: (verificationCode: string) => Promise<BitsoMobilePhoneNumber>
    }
    getBalance: () => Promise<BitsoAccountBalance>
    getFees: () => Promise<BitsoCustomerFee>
    ledger: {
      getLedger: (params?: PaginationQueryParams) => Promise<BitsoLedger[]>
      getTrades: (params?: PaginationQueryParams) => Promise<BitsoLedgerTrade[]>
      getFees: (params?: PaginationQueryParams) => Promise<BitsoLedgerFee[]>
      getFundings: (params?: PaginationQueryParams) => Promise<BitsoLedgerFunding[]>
      getWithdrawals: (params?: PaginationQueryParams) => Promise<BitsoLedgerWithdrawal[]>
    }
    withdrawals: {
      getAll: (params?: WithdrawalsQueryParams) => Promise<BitsoWithdrawal[]>
      getByWid: (wid: string) => Promise<BitsoWithdrawal>
      getByWids: (wid: string[]) => Promise<BitsoWithdrawal[]>
      getByOriginIds: (originIds: string[]) => Promise<BitsoWithdrawal[]>
    }
    fundings: {
      getAll: (params?: FundingsQueryParams) => Promise<BitsoFunding[]>
      getByFid: (fid: string) => Promise<BitsoFunding>
      getByFids: (fids: string[]) => Promise<BitsoFunding[]>
    }
    orderTrades: {
      getByOid: (oid: string) => Promise<BitsoOrderTrade[]>
      getByOriginId: (originId: string) => Promise<BitsoOrderTrade[]>
    }
    userTrades: {
      getByBook: (book: BitsoBook, params?: PaginationQueryParams) => Promise<BitsoUserTrade[]>
      getByTid: (tid: string) => Promise<BitsoUserTrade>
      getByTids: (tids: string[]) => Promise<BitsoUserTrade[]>
    }
    getOpenOrders: (params?: OpenOrdersQueryParams) => Promise<BitsoOpenOrder[]>
    lookupOrders: {
      getByOid: (oid: string) => Promise<BitsoLookupOrder>
      getByOids: (oids: string[]) => Promise<BitsoLookupOrder[]>
      getByOriginIds: (originIds: string[]) => Promise<BitsoLookupOrder[]>
    }
    cancelOrder: {
      cancelAll: () => Promise<string[]>
      cancelByOid: (oid: string) => Promise<string[]>
      cancelByOids: (oids: string[]) => Promise<string[]>
      cancelByOrderIds: (originIds: string[]) => Promise<string[]>
    }
    getFundingDestination: (currency: BitsoCurrency) => Promise<BitsoFundingDestination>
    getBankCodes: () => Promise<BitsoBankCode[]>
  }
  undocumented: {
    getChartInfo: (
      book: BitsoBook,
      timeBucket: ChartingTimeFrame,
      startDate: Date,
      endDate: Date,
    ) => Promise<BitsoOhlcItem[]>
    getSettings: () => Promise<BitsoSettings>
    catalogues: {
      availableCurrencyConversions: {
        public: () => Promise<BitsoAvailableCurrencyConversionsPublic>
        private: () => Promise<BitsoAvailableCurrencyConversionsPrivate>
      }
      getCountries: () => Promise<Countries>
      getCurrencies: () => Promise<BitsoCurrencies>
    }
  }
}
