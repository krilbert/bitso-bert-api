type PromiseResponse<T> = Promise<BitsoResponse<T>>

type BitsoQueryParams = Record<string, any>

interface TickerQueryParams {
  book: Book
}

interface OrderBookQueryParams {
  book: Book
  aggregate?: boolean
}

interface TradesQueryParams {
  book: Book
  marker?: string
  sort?: BitsoSortDirection
  limit?: number
}

interface LedgerQueryParams {
  marker?: string
  sort?: BitsoSortDirection
  limit?: number
}

interface OrderTradesByOrigin {
  origin_id: string
}

interface UserTradesQueryParams {
  book: Book
  marker?: string
  sort?: BitsoSortDirection
  limit?: number
}

interface BitsoAPI {
  public: {
    getAvailableBooks: () => PromiseResponse<AvailableBook[]>
    getTicker: (params: TickerQueryParams) => PromiseResponse<Ticker>
    getOrderBook: (params: OrderBookQueryParams) => PromiseResponse<OrderBook>
    getTrades: (params: TradesQueryParams) => PromiseResponse<Trade[]>
  }
  private: {
    getAccountStatus: () => PromiseResponse<AccountStatus>
    getBalance: () => PromiseResponse<AccountBalance>
    getFees: () => PromiseResponse<CustomerFee>
    ledger: {
      getLedger: (params?: LedgerQueryParams) => PromiseResponse<AccountLedger[]>
      getTrades: (params?: LedgerQueryParams) => PromiseResponse<LedgerTrade[]>
      getFees: (params?: LedgerQueryParams) => PromiseResponse<LedgerFee[]>
      getFundings: (params?: LedgerQueryParams) => PromiseResponse<LedgerFunding[]>
      getWithdrawals: (params?: LedgerQueryParams) => PromiseResponse<LedgerWithdrawal[]>
    }
    orderTrades: {
      getOrderTrades: (oid: string) => PromiseResponse<OrderTrade[]>
      getOrderTradesByOriginId: (params: OrderTradesByOrigin) => PromiseResponse<OrderTrade[]>
    }
    userTrades: {
      getUserTrades: (params: UserTradesQueryParams) => PromiseResponse<UserTrade[]>
      getUserTradeById: (tid: string) => PromiseResponse<UserTrade>
      getUserTradesById: (tids: string[]) => PromiseResponse<UserTrade[]>
    }
    getBankCodes: () => PromiseResponse<BankCode[]>
  }
}
