type PromiseResponse<T> = Promise<T>

type BitsoQueryParams = Record<string, any>
type BitsoBodyParams = Record<string, any>

interface OrderBookQueryParams {
  aggregate?: boolean
}

interface PaginationQueryParams {
  marker?: string
  sort?: BitsoSortDirection
  limit?: number
}

interface OpenOrdersQueryParams {
  book?: Book
  marker?: string
  sort?: BitsoSortDirection
  limit?: number
}

interface WithdrawalsQueryParams {
  marker?: string
  limit?: number
  status?: 'pending' | 'processing' | 'complete' | 'failed'
  method?: string
}

interface FundingsQueryParams {
  marker?: string
  limit?: number
  status?: 'pending' | 'in_progress' | 'complete' | 'failed'
  method?: string
  txids?: string
}

interface BitsoAPI {
  public: {
    getAvailableBooks: () => PromiseResponse<AvailableBook[]>
    getTicker: (book: Book) => PromiseResponse<Ticker>
    getOrderBook: (book: Book, params?: OrderBookQueryParams) => PromiseResponse<OrderBook>
    getTrades: (book: Book, params?: PaginationQueryParams) => PromiseResponse<Trade[]>
  }
  private: {
    getAccountStatus: () => PromiseResponse<AccountStatus>
    mobilePhone: {
      register: (phoneNumber: string) => PromiseResponse<MobilePhoneNumber>
      verify: (verificationCode: string) => PromiseResponse<MobilePhoneNumber>
    }
    getBalance: () => PromiseResponse<AccountBalance>
    getFees: () => PromiseResponse<CustomerFee>
    ledger: {
      getLedger: (params?: PaginationQueryParams) => PromiseResponse<AccountLedger[]>
      getTrades: (params?: PaginationQueryParams) => PromiseResponse<LedgerTrade[]>
      getFees: (params?: PaginationQueryParams) => PromiseResponse<LedgerFee[]>
      getFundings: (params?: PaginationQueryParams) => PromiseResponse<LedgerFunding[]>
      getWithdrawals: (params?: PaginationQueryParams) => PromiseResponse<LedgerWithdrawal[]>
    }
    withdrawals: {
      getAll: (params?: WithdrawalsQueryParams) => PromiseResponse<Withdrawal[]>
      getByWid: (wid: string) => PromiseResponse<Withdrawal>
      getByWids: (wid: string[]) => PromiseResponse<Withdrawal[]>
      getByOriginIds: (originIds: string[]) => PromiseResponse<Withdrawal[]>
    }
    fundings: {
      getAll: (params?: FundingsQueryParams) => PromiseResponse<Funding[]>
      getByFid: (fid: string) => PromiseResponse<Funding>
      getByFids: (fids: string[]) => PromiseResponse<Funding[]>
    }
    orderTrades: {
      getByOid: (oid: string) => PromiseResponse<OrderTrade[]>
      getByOriginId: (originId: string) => PromiseResponse<OrderTrade[]>
    }
    userTrades: {
      getByBook: (book: Book, params?: PaginationQueryParams) => PromiseResponse<UserTrade[]>
      getByTid: (tid: string) => PromiseResponse<UserTrade>
      getByTids: (tids: string[]) => PromiseResponse<UserTrade[]>
    }
    getOpenOrders: (params?: OpenOrdersQueryParams) => PromiseResponse<OpenOrder[]>
    lookupOrders: {
      getByOid: (oid: string) => PromiseResponse<Order>
      getByOids: (oids: string[]) => PromiseResponse<Order[]>
      getByOriginIds: (originIds: string[]) => PromiseResponse<Order[]>
    }
    cancelOrder: {
      cancelAll: () => PromiseResponse<string[]>
      cancelByOid: (oid: string) => PromiseResponse<string[]>
      cancelByOids: (oids: string[]) => PromiseResponse<string[]>
      cancelByOrderIds: (originIds: string[]) => PromiseResponse<string[]>
    }
    getFundingDestination: (currency: Currency) => PromiseResponse<FundingDestination>
    getBankCodes: () => PromiseResponse<BankCode[]>
  }
}
