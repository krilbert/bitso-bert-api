import { BitsoBook, BitsoSortDirection, FundingStatus, WithdrawalStatus } from './common.types'

export interface OrderBookQueryParams {
  aggregate?: boolean
}

interface BasicPaginationQueryParams {
  marker?: string
  limit?: number
}

export interface PaginationQueryParams extends BasicPaginationQueryParams {
  sort?: BitsoSortDirection
}

export interface OpenOrdersQueryParams extends PaginationQueryParams {
  book?: BitsoBook
}

export interface WithdrawalsQueryParams extends BasicPaginationQueryParams {
  status?: WithdrawalStatus
  method?: string // TODO: define
}

export interface FundingsQueryParams extends BasicPaginationQueryParams {
  status?: FundingStatus
  method?: string // TODO: define
  txids?: string
}
