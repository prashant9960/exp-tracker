"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"


const API_KEY = process.env.NEXT_PUBLIC_OPEN_EXCHANGE_RATES_API_KEY

type CurrencyConverterProps = {
  baseCurrency: string
  setBaseCurrency: (currency: string) => void
}

export function CurrencyConverter({ baseCurrency, setBaseCurrency }: CurrencyConverterProps) {
  const [amount, setAmount] = useState("1")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null)
  const [exchangeRates, setExchangeRates] = useState<Record<string, number> | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchExchangeRates()
  }, []) // Removed unnecessary baseCurrency dependency

  const fetchExchangeRates = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `https://openexchangerates.org/api/latest.json?app_id=${API_KEY}&base=${baseCurrency}`,
      )
      if (!response.ok) {
        throw new Error("Failed to fetch exchange rates")
      }
      const data = await response.json()
      setExchangeRates(data.rates)
    } catch (error) {
      console.error("Error fetching exchange rates:", error)
      setError("Failed to fetch exchange rates. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (exchangeRates && exchangeRates[toCurrency]) {
      const converted = Number.parseFloat(amount) * exchangeRates[toCurrency]
      setConvertedAmount(converted)
    }
  }, [amount, toCurrency, exchangeRates])

  if (isLoading) {
    return <div>Loading exchange rates...</div>
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="amount">Amount</Label>
        <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
      </div>
      <div>
        <Label htmlFor="fromCurrency">From Currency</Label>
        <Select
          value={baseCurrency}
          onValueChange={(value) => {
            setBaseCurrency(value)
            fetchExchangeRates()
          }}
        >
          <SelectTrigger id="fromCurrency">
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USD">USD</SelectItem>
            <SelectItem value="EUR">EUR</SelectItem>
            <SelectItem value="GBP">GBP</SelectItem>
            <SelectItem value="JPY">JPY</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="toCurrency">To Currency</Label>
        <Select value={toCurrency} onValueChange={setToCurrency}>
          <SelectTrigger id="toCurrency">
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="USD">USD</SelectItem>
            <SelectItem value="EUR">EUR</SelectItem>
            <SelectItem value="GBP">GBP</SelectItem>
            <SelectItem value="JPY">JPY</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {convertedAmount !== null && (
        <div>
          <p className="text-lg font-semibold">
            {amount} {baseCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
          </p>
        </div>
      )}
    </div>
  )
}

