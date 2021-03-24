import {
  AccountStatus,
  BitsoBook,
  BitsoChart,
  BitsoCurrency,
  BitsoMakerSide,
  CellphoneStatus,
  DocumentStatus,
  EmailStatus,
  FundingStatus,
  LedgerOperation,
  MethodFee,
  WithdrawalStatus,
} from './common.types'

// Available Books
interface MakerTaker {
  maker: string
  taker: string
}

interface StructureFee extends MakerTaker {
  volume: string
}

interface Fees {
  flatRate: MakerTaker
  structure: StructureFee[]
}

export interface BitsoAvailableBook {
  book: BitsoBook
  minimumPrice: string
  maximumPrice: string
  minimumAmount: string
  maximumAmount: string
  minimumValue: string
  maximumValue: string
  tickSize: string
  defaultChart: BitsoChart
  fees: Fees
}

// Ticker
export interface BitsoTicker {
  book: BitsoBook
  volume: string
  high: string
  last: string
  low: string
  vwap: string
  ask: string
  bid: string
  createdAt: string
}

// Order Book
interface OpenOrders {
  book: BitsoBook
  price: string
  amount: string
}

export interface BitsoOrderBook {
  asks: OpenOrders[]
  bids: OpenOrders[]
  updatedAt: string
  sequence: string
}

// Trades
export interface BitsoTrade {
  book: BitsoBook
  createdAt: string
  amount: string
  makerSide: BitsoMakerSide
  price: string
  tid: number
}

// Account
export interface BitsoAccount {
  clientId: string
  firstName: string
  lastName: string
  status: AccountStatus
  dailyLimit: string
  monthlyLimit: string
  dailyRemaining: string
  monthlyRemaining: string
  cashDepositAllowance: string
  cellphoneNumber: CellphoneStatus
  cellphoneNumberStored: string
  email: EmailStatus
  emailStored: string
  officialId: DocumentStatus
  proofOfResidency: DocumentStatus
  signedContract: DocumentStatus
  originOfFunds: DocumentStatus
  verificationLevel: number
  referralCode: string
  countryOfReidence: string // TODO: MX
  gravatarImg: string
  accountCreationDate: string
  preferredCurrency: string // TODO: mxn Currency?
  enabledTwoFactorMethods: string[] // TODO: totp define
  taxPayerType: string // TODO: person
  bornInResidence: string
}

// Mobile Phone Number
export interface BitsoMobilePhoneNumber {
  phone: string
}

// Balance
interface BitsoBalance {
  currency: BitsoCurrency
  total: string
  locked: string
  available: string
  pendingDeposit: string
  pendingWithdrawal: string
}

export interface BitsoAccountBalance {
  balances: BitsoBalance[]
}

// Customer Fees
interface OrderBookFee {
  book: BitsoBook
  feePercent: string
  feeDecimal: string
  takerFeePercent: string
  takerFeeDecimal: string
  makerFeePercent: string
  makerFeeDecimal: string
  volumeCurrency: BitsoCurrency
  currentVolume: string
  nextVolume: string
  nextMakerFeePercent: string
  nextTakerFeePercent: string
  nextFee: string
  nextTakerFee: string
}

interface DepositFee {
  currency: BitsoCurrency
  method: MethodFee
  fee: string
  isFixed: boolean
}

export interface BitsoCustomerFee {
  fees: OrderBookFee[]
  depositFees: DepositFee[]
  withdrawalFees: {
    [key in BitsoCurrency]: string
  }
}

// Ledger
// TODO: define details
export type BitsoLedger = BitsoLedgerTrade | BitsoLedgerFee | BitsoLedgerFunding | BitsoLedgerWithdrawal

interface BalanceUpdate {
  currency: BitsoCurrency
  amount: string
}

interface BaseLedger {
  eid: string
  operation: LedgerOperation
  createdAT: string
  balanceUpdates: BalanceUpdate[]
}

export interface BitsoLedgerTrade extends BaseLedger {
  operation: 'trade'
  details: {
    oid: string
    tid: string
  }
}

export interface BitsoLedgerFee extends BaseLedger {
  operation: 'fee'
  details: {
    tid: string
    oid: string
  }
}

export interface BitsoLedgerFunding extends BaseLedger {
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

export interface BitsoLedgerWithdrawal extends BaseLedger {
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

// Withdrawal
export type BitsoWithdrawal = PendingWithdrawal | CompleteWithdrawal

interface BaseWithdrawal {
  wid: string
  status: WithdrawalStatus
  createdAt: string
  currency: BitsoCurrency
  method: string
  methodName: string
  amount: string
}

interface PendingWithdrawal extends BaseWithdrawal {
  status: 'pending'
  details: {
    withdrawalAddres: string
    txHash: string
  }
}

interface CompleteWithdrawal extends BaseWithdrawal {
  status: 'complete'
  asset: string
  network: string
  protocol: string
  integration: string
  senderName: string
  details: {
    clientWithdrawalId: string
    beneficiaryName: string
    beneficiaryClabe: string
    beneficiaryBankCode: string
    cep: any
    claveDeRastreo: string
    concepto: string
  }
}

// Funding
export type BitsoFunding = PendingFunding | CompleteFunding

interface BaseFunding {
  fid: string
  status: FundingStatus
  createdAt: string
  currency: BitsoCurrency
  method: string
  amount: string
}

interface PendingFunding extends BaseFunding {
  status: 'pending'
  details: {
    txHash: string
  }
}

interface CompleteFunding extends BaseFunding {
  status: 'complete'
  methodName: string
  asset: string
  network: string
  protocol: string
  integration: string
  details: {
    senderName: string
    senderClabe: string
    senderBank: string
    clave: string
    claveRastreo: string
    numericReference: string
    concepto: string
  }
}

// Order Trade
export interface BitsoOrderTrade {
  book: BitsoBook
  createdAt: string
  minor: string
  major: string
  feesAmount?: string
  feesCurrency?: BitsoCurrency
  minorCurrency: BitsoCurrency
  majorCurrency: BitsoCurrency
  oid: string
  tid?: number
  price: string
  originId?: string
  side: BitsoMakerSide
  makerSide: BitsoMakerSide
}

// User Trade
export interface BitsoUserTrade {
  book: BitsoBook
  createdAt: string
  minor: string
  major: string
  feesAmount?: string
  feesCurrency?: BitsoCurrency
  minorCurrency: BitsoCurrency
  majorCurrency: BitsoCurrency
  oid: string
  tid: number
  price: string
  originId?: string
  side: BitsoMakerSide
  makerSide: BitsoMakerSide
}

// Open Order
export interface BitsoOpenOrder {
  book: BitsoBook
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

// Lookup Order
export interface BitsoLookupOrder {
  book: BitsoBook
  originalAmount: string
  unfilledAmount: string
  originalValue: string
  createdAt: string
  updatedAt: string
  price: string
  oid: string
  side: BitsoMakerSide
  status: string
  type: string
}

// Funding destination
export interface BitsoFundingDestination {
  accountIdentifierName: string
  accountIdentifier: string
}

// Bank Code
export interface BitsoBankCode {
  code: string
  name: string
}

// Ohlc Charting
export interface BitsoOhlcItem {
  bucketStartTime: number
  firstRate: string
  firstTradeTime: number
  lastRate: string
  lastTradeTime: string
  maxRate: string
  minRate: string
  tradeCount: number
  volume: string
  vwap: string
}
