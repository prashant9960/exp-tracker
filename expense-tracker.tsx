"use client"

import { useState, useEffect } from "react"
import { ExpenseForm } from "./expense-form"
import { ExpenseList } from "./expense-list"
import { CurrencyConverter } from "./currency-converter"
import { SpendingChart } from "./spending-chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Expense = {
  id: string
  description: string
  amount: number
  category: string
  date: string
}

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [baseCurrency, setBaseCurrency] = useState("USD")

  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses")
    if (storedExpenses) {
      setExpenses(JSON.parse(storedExpenses))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses))
  }, [expenses])

  const addExpense = (expense: Omit<Expense, "id">) => {
    const newExpense = { ...expense, id: Date.now().toString() }
    setExpenses([...expenses, newExpense])
  }

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id))
  }

  const updateExpense = (updatedExpense: Expense) => {
    setExpenses(expenses.map((expense) => (expense.id === updatedExpense.id ? updatedExpense : expense)))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Personal Budget & Expense Tracker</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Add New Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <ExpenseForm onAddExpense={addExpense} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Currency Converter</CardTitle>
          </CardHeader>
          <CardContent>
            <CurrencyConverter baseCurrency={baseCurrency} setBaseCurrency={setBaseCurrency} />
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="list" className="mt-6">
        <TabsList>
          <TabsTrigger value="list">Expense List</TabsTrigger>
          <TabsTrigger value="chart">Spending Breakdown</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <ExpenseList
                expenses={expenses}
                onDeleteExpense={deleteExpense}
                onUpdateExpense={updateExpense}
                baseCurrency={baseCurrency}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="chart">
          <Card>
            <CardHeader>
              <CardTitle>Spending Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <SpendingChart expenses={expenses} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

