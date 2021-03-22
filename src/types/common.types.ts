export type BitsoBook =
  | 'btc_mxn'
  | 'eth_btc'
  | 'eth_mxn'
  | 'xrp_btc'
  | 'xrp_mxn'
  | 'ltc_btc'
  | 'ltc_mxn'
  | 'bch_btc'
  | 'bch_mxn'
  | 'tusd_btc'
  | 'tusd_mxn'
  | 'mana_btc'
  | 'mana_mxn'
  | 'bat_btc'
  | 'bat_mxn'
  | 'btc_ars'
  | 'btc_dai'
  | 'dai_mxn'
  | 'btc_usd'
  | 'xrp_usd'
  | 'eth_usd'
  | 'dai_ars'
  | 'btc_brl'
  | 'eth_ars'

type Major = 'btc' | 'eth' | 'xrp' | 'ltc' | 'bch' | 'tusd' | 'bat' | 'dai' | 'gnt' | 'mana'
type Minor = 'mxn' | 'usd' | 'ars' | 'brl' | Major
export type BitsoCurrency = Minor

export type BitsoSortDirection = 'asc' | 'desc'
export type BitsoChart = 'candle' | 'depth'

export type LedgerOperation = 'trade' | 'fee' | 'funding' | 'withdrawal'
export type MethodFee = 'bind' | 'ted' | 'ca' | 'pix' | 'mt'
export type BitsoMakerSide = 'buy' | 'sell'

export type WithdrawalStatus = 'pending' | 'processing' | 'complete' | 'failed'
export type FundingStatus = 'pending' | 'in_progress' | 'complete' | 'failed'
export type AccountStatus = 'active' | 'inactive'
export type CellphoneStatus = 'unsubmitted' | 'submitted' | 'verified'
export type EmailStatus = string // TODO: verified
export type DocumentStatus = 'unsubmitted' | 'submitted' | 'verified' | 'rejected'
