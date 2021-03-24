import { BitsoBook, BitsoCurrency } from '../types/common.types'
import { availableBooks, availableConversions } from './constants'

export const isBookAvailable = (book: BitsoBook) => availableBooks.includes(book)

export const isValidConversion = (from: string, to: string) => {
  const item = availableConversions.find((x) => x.currency === from)
  if (!item || !item.allowedConversions.includes(to)) return false
  return true
}

export const generatePlaceOrderParams = (book: BitsoBook, amount: string, currency?: BitsoCurrency) => {
  if (!isBookAvailable(book)) throw new Error(`Book ${book} unavailable`)

  const currencies = book.split('_')
  if (currency && !currencies.includes(currency))
    throw new Error(`Invalid currency, must be one of [${currencies.join(', ')}]`)

  const [major, minor] = currencies
  const useMajor = !currency || major === currency

  const fromCurrency = useMajor ? major : minor
  const toCurrency = useMajor ? minor : major

  if (!isValidConversion(fromCurrency, toCurrency))
    throw new Error(`Transactions from ${fromCurrency} to ${toCurrency} are not allowed`)

  return { book, [useMajor ? 'major' : 'minor']: amount }
}
