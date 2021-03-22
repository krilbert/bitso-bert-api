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
      getWithdrawals: (params?: WithdrawalsQueryParams) => PromiseResponse<Withdrawal[]>
      getWithdrawalById: (wid: string) => PromiseResponse<Withdrawal>
      getWithdrawalsById: (wid: string[]) => PromiseResponse<Withdrawal[]>
      getWithdrawalsByOriginIds: (originIds: string[]) => PromiseResponse<Withdrawal[]>
    }
    fundings: {
      getFundings: (params?: FundingsQueryParams) => PromiseResponse<Funding[]>
      getFundingById: (fid: string) => PromiseResponse<Funding>
      getFundingsByIds: (fids: string[]) => PromiseResponse<Funding[]>
    }
    orderTrades: {
      getOrderTrades: (oid: string) => PromiseResponse<OrderTrade[]>
      getOrderTradesByOriginId: (originId: string) => PromiseResponse<OrderTrade[]>
    }
    userTrades: {
      getUserTrades: (book: Book, params?: PaginationQueryParams) => PromiseResponse<UserTrade[]>
      getUserTradeById: (tid: string) => PromiseResponse<UserTrade>
      getUserTradesById: (tids: string[]) => PromiseResponse<UserTrade[]>
    }
    getOpenOrders: (params?: OpenOrdersQueryParams) => PromiseResponse<OpenOrder[]>
    lookupOrders: {
      getOrder: (oid: string) => PromiseResponse<Order>
      getOrders: (oids: string[]) => PromiseResponse<Order[]>
      getOrdersByOriginId: (originIds: string[]) => PromiseResponse<Order[]>
    }
    cancelOrder: {
      cancelAllOrders: () => PromiseResponse<string[]>
      cancelOrder: (oid: string) => PromiseResponse<string[]>
      cancelOrdersById: (oids: string[]) => PromiseResponse<string[]>
      cancelOrdersByOrderId: (originIds: string[]) => PromiseResponse<string[]>
    }
    getFundingDestination: (currency: Currency) => PromiseResponse<FundingDestination>
    getBankCodes: () => PromiseResponse<BankCode[]>
  }
}
