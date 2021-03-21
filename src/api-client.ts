import crypto from 'crypto'
import camelcaseKeys from 'camelcase-keys'
import fetch, { RequestInit } from 'node-fetch'

const client = (method: 'GET' | 'POST' | 'DELETE', isPrivate: boolean = false) => {
  return async function request<T>(
    path: string,
    queryParams?: BitsoQueryParams,
    bodyParams?: BitsoBodyParams,
  ): Promise<T> {
    if (isPrivate && (!process.env.BITSO_API_KEY || !process.env.BITSO_API_SECRET))
      throw new Error('[BITSO_API_KEY, BITSO_API_SECRET] enviroment variables are required for private endpoints')

    const queryString =
      queryParams &&
      Object.keys(queryParams)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
        .join('&')

    const requestPath = `/v3${path}?${queryString}`

    const config: RequestInit = {
      method,
      headers: { 'Content-Type': 'application/json' },
    }

    if (isPrivate) {
      const nonce = new Date().getTime()
      let message = nonce + method + requestPath
      if (method === 'POST') {
        config.body = JSON.stringify(bodyParams || {})
        message += config.body
      }
      const signature = crypto
        .createHmac('sha256', process.env.BITSO_API_SECRET)
        .update(message)
        .digest('hex')

      config.headers = { ...config.headers, Authorization: `Bitso ${process.env.BITSO_API_KEY}:${nonce}:${signature}` }
    }

    try {
      const url = `${process.env.BITSO_API_URL}${requestPath}`
      const response = await fetch(url, config)
      const data = await response.json()
      if (response.ok) {
        return camelcaseKeys(data.payload, { deep: true })
      } else {
        return Promise.reject(data.error)
      }
    } catch (err) {
      return Promise.reject(new Error(err))
    }
  }
}

export const publicGet = client('GET')
export const privateGet = client('GET', true)
export const privateDelete = client('DELETE', true)
export const privatePost = client('POST', true)
