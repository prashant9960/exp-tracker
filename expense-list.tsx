import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Expense = {
  id: string
  description: string
  amount: number
  category: string
  date: string
}

type ExpenseListProps = {
  expenses: Expense[]
  onDeleteExpense: (id: string) => void
  onUpdateExpense: (expense: Expense) => void
  baseCurrency: string
}

export function ExpenseList({ expenses, onDeleteExpense, onUpdateExpense, baseCurrency }: ExpenseListProps) {
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editedExpense, setEditedExpense] = useState<Expense | null>(null)

  const handleEdit = (expense: Expense) => {
    setEditingId(expense.id)
    setEditedExpense(expense)
  }

  const handleSave = () => {
    if (editedExpense) {
      onUpdateExpense(editedExpense)
      setEditingId(null)
      setEditedExpense(null)
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditedExpense(null)
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Description</TableHead>
          <TableHead>Amount ({baseCurrency})</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {expenses.map((expense) => (
          <TableRow key={expense.id}>
            <TableCell>
              {editingId === expense.id ? (
                <Input
                  value={editedExpense?.description}
                  onChange={(e) => setEditedExpense({ ...editedExpense!, description: e.target.value })}
                />
              ) : (
                expense.description
              )}
            </TableCell>
            <TableCell>
              {editingId === expense.id ? (
                <Input
                  type="number"
                  value={editedExpense?.amount}
                  onChange={(e) => setEditedExpense({ ...editedExpense!, amount: Number.parseFloat(e.target.value) })}
                />
              ) : (
                expense.amount.toFixed(2)
              )}
            </TableCell>
            <TableCell>
              {editingId === expense.id ? (
                <Select
                  value={editedExpense?.category}
                  onValueChange={(value) => setEditedExpense({ ...editedExpense!, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="food">Food</SelectItem>
                    <SelectItem value="transportation">Transportation</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="utilities">Utilities</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                expense.category
              )}
            </TableCell>
            <TableCell>
              {editingId === expense.id ? (
                <Input
                  type="date"
                  value={editedExpense?.date}
                  onChange={(e) => setEditedExpense({ ...editedExpense!, date: e.target.value })}
                />
              ) : (
                expense.date
              )}
            </TableCell>
            <TableCell>
              {editingId === expense.id ? (
                <>
                  <Button onClick={handleSave} className="mr-2">
                    Save
                  </Button>
                  <Button onClick={handleCancel} variant="outline">
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={() => handleEdit(expense)} className="mr-2">
                    Edit
                  </Button>
                  <Button onClick={() => onDeleteExpense(expense.id)} variant="destructive">
                    Delete
                  </Button>
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

