import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

type Expense = {
  id: string
  description: string
  amount: number
  category: string
  date: string
}

type SpendingChartProps = {
  expenses: Expense[]
}

export function SpendingChart({ expenses }: SpendingChartProps) {
  const categoryTotals = expenses.reduce(
    (acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount
      return acc
    },
    {} as Record<string, number>,
  )

  const data = Object.entries(categoryTotals).map(([name, value]) => ({ name, value }))

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

