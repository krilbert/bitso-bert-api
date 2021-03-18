type Book =
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

type Chart = 'candle' | 'depth'

type Major = 'btc' | 'eth' | 'xrp' | 'ltc' | 'bch' | 'tusd' | 'bat' | 'dai' | 'gnt' | 'mana'
type Minor = 'mxn' | 'usd' | 'ars' | 'brl' | Major
type Currency = Minor
type BitsoSortDirection = 'asc' | 'desc'
type BitsoMakerSide = 'buy' | 'sell'

interface BitsoAPISuccess<BitsoPayload> {
  success: true
  payload: BitsoPayload
}

interface BitsoAPIError {
  success: false
  error: { code: string; message: string }
}

type BitsoResponse<BitsoPayload> = BitsoAPIError | BitsoAPISuccess<BitsoPayload>

interface FlatRate {
  maker: string
  taker: string
}

interface StructureFee {
  volume: string
  maker: string
  taker: string
}

interface Fees {
  flatRate: FlatRate
  structure: StructureFee[]
}

interface AvailableBook {
  book: Book
  minimumPrice: string
  maximumPrice: string
  minimumAmount: string
  maximumAmount: string
  minimumValue: string
  maximumValue: string
  defaultChart: Chart
  fees: Fees
}

interface Ticker {
  book: Book
  volume: string
  high: string
  last: string
  low: string
  vwap: string
  ask: string
  bid: string
  createdAt: string
}

interface OpenOrders {
  book: Book
  price: string
  amount: string
}

interface OrderBook {
  asks: OpenOrders[]
  bids: OpenOrders[]
  updatedAt: string
  sequence: string
}

interface Trade {
  book: Book
  createdAt: string
  amount: string
  maker_side: BitsoMakerSide
  price: string
  tid: number
}

interface AccountStatus {
  clientId: string
  firstName: string
  lastName: string
  status: 'active' | 'inactive'
  dailyLimit: string
  dailyRemaining: string
  monthlyRemaining: string
  cashDepositAllowance: string
  cellphoneNumber: CellphoneStatus
  cellphoneNumberStored: string
  emailStored: string
  officialId: DocumentStatus
  proofOfResidency: DocumentStatus
  signedContract: DocumentStatus
  originOfFunds: DocumentStatus
  verificationLevel: number
  referralCode: string
  countryOfReidence: string
  gravatarImg: string
  accountCreationDate: string
  preferredCurrency: string // mxn
  taxPayerType: string // person
  bornInResidence: string
}

interface Balance {
  currency: Currency
  total: string
  locked: string
  available: string
  pendingDeposit: string
  pendingWithdrawal: string
}

interface AccountBalance {
  balances: Balance[]
}

interface BalanceUpdate {
  currency: Currency
  amount: string
}

// TODO: what to do regarding details
type AccountLedger = LedgerTrade | LedgerFee | LedgerFunding | LedgerWithdrawal

interface LedgerBase {
  eid: string
  operation: string
  createdAT: string
  balanceUpdates: BalanceUpdate[]
}

interface LedgerTrade extends LedgerBase {
  operation: 'trade'
  details: {
    oid: string
    tid: string
  }
}

interface LedgerFee extends LedgerFee {
  operation: 'fee'
  details: {
    tid: string
    oid: string
  }
}

interface LedgerFunding extends LedgerBase {
  operation: 'funding'
  details: {
    method: string
    methodName: string
    asset: string
    protocol: string
    network: string
    integration: string
    fid: string
  }
}

interface LedgerWithdrawal extends LedgerBase {
  operation: 'withdrawal'
  details: {
    method: string
    methodName: string
    asset: string
    protocol: string
    network: string
    integration: string
    wid: string
  }
}

interface OrderTrade {
  book: Book
  createdAt: string
  minor: string
  major: string
  feesAmount?: string
  feesCurrency?: Currency
  minorCurrency: Currency
  majorCurrency: Currency
  oid: string
  tid?: number
  price: stringf
  originId?: string
  side: BitsoMakerSide
  makerSide: BitsoMakerSide
}

interface OrderBookFee {
  book: Book
  feePercent: string
  feeDecimal: string
  takerFeePercent: string
  takerFeeDecimal: string
  makerFeePercent: string
  makerFeeDecimal: string
  volumeCurrency: Currency
  currentVolume: string
  nextVolume: string
  nextMakerFeePercent: string
  nextTakerFeePercent: string
  nextFee: string
  nextTakerFee: string
}

interface DepositFee {
  currency: Currency
  method: string
  fee: string
  isFixed: boolean
}

interface CustomerFee {
  fees: OrderBookFee[]
  depositFees: DepositFee[]
  withdrawalFees: {
    [key in Currency]: string
  }
}

interface BankCode {
  code: string
  name: string
}

// TODO: seems that this is not the same as OrderTrade (tid?)
interface UserTrade {
  book: Book
  createdAt: string
  minor: string
  major: string
  feesAmount?: string
  feesCurrency?: Currency
  minorCurrency: Currency
  majorCurrency: Currency
  oid: string
  tid: number
  price: stringf
  originId?: string
  side: BitsoMakerSide
  makerSide: BitsoMakerSide
}

interface OpenOrder {
  book: Book
  originalAmount: string
  unfilledAmount: string
  originalValue: string
  createdAt: string
  updatedAt: string
  price: string
  oid: string
  originId: string
  side: BitsoMakerSide
  status: string
  type: string
}
