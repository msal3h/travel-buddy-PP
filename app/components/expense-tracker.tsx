"use client"

import { useState } from "react"
import { ArrowRight, DollarSign, Filter, Plus, Receipt, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample data for the expense tracker
const TRAVELERS = [
  { id: 1, name: "You", avatar: "/diverse-avatars.png" },
  { id: 2, name: "Alex", avatar: "/diverse-avatars.png" },
  { id: 3, name: "Jamie", avatar: "/diverse-avatars.png" },
  { id: 4, name: "Taylor", avatar: "/diverse-avatars.png" },
]

const EXPENSE_CATEGORIES = ["Food & Drinks", "Accommodation", "Transportation", "Activities", "Shopping", "Other"]

// Update the SAMPLE_EXPENSES array to use USD instead of JPY
const SAMPLE_EXPENSES = [
  {
    id: 1,
    description: "Dinner at Ichiran Ramen",
    amount: 40,
    currency: "USD",
    category: "Food & Drinks",
    date: "2024-04-10",
    paidBy: 1,
    splitBetween: [1, 2, 3, 4],
    equalSplit: true,
    author: "You",
  },
  {
    id: 2,
    description: "Tokyo Metro Day Pass",
    amount: 5.5,
    currency: "USD",
    category: "Transportation",
    date: "2024-04-11",
    paidBy: 2,
    splitBetween: [1, 2],
    equalSplit: true,
    author: "You",
  },
  {
    id: 3,
    description: "TeamLab Planets Tickets",
    amount: 85,
    currency: "USD",
    category: "Activities",
    date: "2024-04-12",
    paidBy: 1,
    splitBetween: [1, 2, 3, 4],
    equalSplit: true,
    author: "You",
  },
  {
    id: 4,
    description: "Kyoto Hotel Room",
    amount: 230,
    currency: "USD",
    category: "Accommodation",
    date: "2024-04-12",
    paidBy: 3,
    splitBetween: [1, 2, 3, 4],
    equalSplit: true,
    author: "You",
  },
]

export function ExpenseTracker() {
  const [expenses, setExpenses] = useState(SAMPLE_EXPENSES)
  const [activeTab, setActiveTab] = useState("summary")
  const [showAddExpense, setShowAddExpense] = useState(false)

  // Calculate total expenses
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  // Calculate balances
  const balances = calculateBalances(expenses, TRAVELERS)

  // Add a new expense
  const addExpense = (newExpense) => {
    setExpenses([...expenses, { id: expenses.length + 1, ...newExpense }])
    setShowAddExpense(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Expenses</h2>
          <p className="text-muted-foreground">Track and split expenses with your travel companions</p>
        </div>
        <Button onClick={() => setShowAddExpense(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Expense
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Trip Expenses</CardTitle>
          </CardHeader>
          {/* Update the currency display in the Total Trip Expenses card */}
          <CardContent>
            <div className="text-2xl font-bold">${totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total expenses in USD</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Your Expenses</CardTitle>
          </CardHeader>
          {/* Update the currency display in the Your Expenses card */}
          <CardContent>
            <div className="text-2xl font-bold">${calculatePersonalExpenses(expenses, 1).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              You paid for {expenses.filter((e) => e.paidBy === 1).length} expenses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Your Balance</CardTitle>
          </CardHeader>
          {/* Update the currency display in the Your Balance card */}
          <CardContent>
            {balances.find((b) => b.personId === 1)?.balance > 0 ? (
              <div className="text-2xl font-bold text-green-600">
                +${Math.abs(balances.find((b) => b.personId === 1)?.balance || 0).toLocaleString()}
              </div>
            ) : (
              <div className="text-2xl font-bold text-red-600">
                -${Math.abs(balances.find((b) => b.personId === 1)?.balance || 0).toLocaleString()}
              </div>
            )}
            <p className="text-xs text-muted-foreground">
              {balances.find((b) => b.personId === 1)?.balance > 0 ? "You are owed money" : "You owe money"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="expenses">All Expenses</TabsTrigger>
          <TabsTrigger value="settlements">Settlements</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
              <CardDescription>How expenses are distributed by category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {EXPENSE_CATEGORIES.map((category) => {
                  const categoryExpenses = expenses.filter((e) => e.category === category)
                  const categoryTotal = categoryExpenses.reduce((sum, e) => sum + e.amount, 0)
                  const percentage = totalExpenses > 0 ? (categoryTotal / totalExpenses) * 100 : 0

                  return (
                    <div key={category} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{category}</span>
                        {/* Update the currency display in the Expense Breakdown card */}
                        <span className="font-medium">${categoryTotal.toLocaleString()}</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${percentage}%` }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Expenses</CardTitle>
              <CardDescription>Last 5 expenses added</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expenses
                  .slice(-5)
                  .reverse()
                  .map((expense) => (
                    <div key={expense.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="bg-muted p-2 rounded-full">
                          <Receipt className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">{expense.description}</p>
                          <p className="text-sm text-muted-foreground">
                            Paid by {TRAVELERS.find((t) => t.id === expense.paidBy)?.name}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        {/* Update the currency display in the Recent Expenses section */}
                        <p className="font-medium">${expense.amount.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">{expense.date}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full" onClick={() => setActiveTab("expenses")}>
                View All Expenses
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="expenses">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>All Expenses</CardTitle>
                <CardDescription>Complete list of trip expenses</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {expenses.map((expense) => (
                    <Card key={expense.id} className="overflow-hidden">
                      <div className="flex flex-col sm:flex-row">
                        <div className="p-4 flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold">{expense.description}</h4>
                              <div className="flex items-center gap-1.5 mt-1">
                                <p className="text-sm text-muted-foreground">{expense.date}</p>
                                <span className="text-xs text-muted-foreground">•</span>
                                <div className="flex items-center gap-1">
                                  <div className="h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center">
                                    <User className="h-2 w-2 text-primary" />
                                  </div>
                                  <p className="text-xs text-muted-foreground">Added by You</p>
                                </div>
                              </div>
                            </div>
                            <Badge variant="outline">{expense.category}</Badge>
                          </div>
                          <div className="mt-4 flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={TRAVELERS.find((t) => t.id === expense.paidBy)?.avatar || "/placeholder.svg"}
                              />
                              <AvatarFallback>{TRAVELERS.find((t) => t.id === expense.paidBy)?.name[0]}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{TRAVELERS.find((t) => t.id === expense.paidBy)?.name} paid</span>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm">Split between:</p>
                            <div className="flex mt-1 gap-1">
                              {expense.splitBetween.map((personId) => (
                                <Avatar key={personId} className="h-6 w-6">
                                  <AvatarImage
                                    src={TRAVELERS.find((t) => t.id === personId)?.avatar || "/placeholder.svg"}
                                  />
                                  <AvatarFallback>{TRAVELERS.find((t) => t.id === personId)?.name[0]}</AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="bg-muted p-4 flex flex-col justify-center items-center sm:w-32">
                          {/* Update the currency display in the All Expenses section */}
                          <p className="text-xl font-bold">${expense.amount.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">USD</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settlements">
          <Card>
            <CardHeader>
              <CardTitle>Settlements</CardTitle>
              <CardDescription>Who owes whom</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {calculateSettlements(balances).map((settlement, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={TRAVELERS.find((t) => t.id === settlement.from)?.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>{TRAVELERS.find((t) => t.id === settlement.from)?.name[0]}</AvatarFallback>
                      </Avatar>
                      <span>{TRAVELERS.find((t) => t.id === settlement.from)?.name}</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      <Avatar>
                        <AvatarImage
                          src={TRAVELERS.find((t) => t.id === settlement.to)?.avatar || "/placeholder.svg"}
                        />
                        <AvatarFallback>{TRAVELERS.find((t) => t.id === settlement.to)?.name[0]}</AvatarFallback>
                      </Avatar>
                      <span>{TRAVELERS.find((t) => t.id === settlement.to)?.name}</span>
                    </div>
                    {/* Update the currency display in the Settlements section */}
                    <div className="font-bold">${settlement.amount.toLocaleString()}</div>
                  </div>
                ))}

                {calculateSettlements(balances).length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    All expenses are settled! Everyone has paid their fair share.
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
              <Button variant="outline">Mark All as Settled</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <AddExpenseDialog
        open={showAddExpense}
        onOpenChange={setShowAddExpense}
        onAddExpense={addExpense}
        travelers={TRAVELERS}
        categories={EXPENSE_CATEGORIES}
      />
    </div>
  )
}

// Helper component for adding a new expense
function AddExpenseDialog({ open, onOpenChange, onAddExpense, travelers, categories }) {
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  // Update the default currency in the AddExpenseDialog
  const [currency, setCurrency] = useState("USD")
  const [category, setCategory] = useState(categories[0])
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [paidBy, setPaidBy] = useState(1)
  const [splitBetween, setSplitBetween] = useState(travelers.map((t) => t.id))
  const [equalSplit, setEqualSplit] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddExpense({
      description,
      amount: Number.parseFloat(amount),
      currency,
      category,
      date,
      paidBy,
      splitBetween,
      equalSplit,
      author: "You", // Add this line
    })

    // Reset form
    setDescription("")
    setAmount("")
    setCurrency("USD")
    setCategory(categories[0])
    setDate(new Date().toISOString().split("T")[0])
    setPaidBy(1)
    setSplitBetween(travelers.map((t) => t.id))
    setEqualSplit(true)
  }

  const togglePersonInSplit = (personId) => {
    if (splitBetween.includes(personId)) {
      if (splitBetween.length > 1) {
        // Ensure at least one person is selected
        setSplitBetween(splitBetween.filter((id) => id !== personId))
      }
    } else {
      setSplitBetween([...splitBetween, personId])
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Expense</DialogTitle>
          <DialogDescription>Enter the details of the expense to split with your travel companions.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="e.g., Dinner at Restaurant"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="flex">
                  <div className="flex items-center justify-center border rounded-l-md px-3 bg-muted">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    className="rounded-l-none"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  {/* Update the currency SelectContent to have USD as the first option */}
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="JPY">JPY (¥)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="paidBy">Paid by</Label>
              <Select value={paidBy.toString()} onValueChange={(value) => setPaidBy(Number.parseInt(value))}>
                <SelectTrigger id="paidBy">
                  <SelectValue placeholder="Select person" />
                </SelectTrigger>
                <SelectContent>
                  {travelers.map((person) => (
                    <SelectItem key={person.id} value={person.id.toString()}>
                      {person.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Split between</Label>
              <div className="flex flex-wrap gap-2 border rounded-md p-3">
                {travelers.map((person) => (
                  <div key={person.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`person-${person.id}`}
                      checked={splitBetween.includes(person.id)}
                      onCheckedChange={() => togglePersonInSplit(person.id)}
                    />
                    <label
                      htmlFor={`person-${person.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {person.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="equalSplit" checked={equalSplit} onCheckedChange={setEqualSplit} />
              <label htmlFor="equalSplit" className="text-sm font-medium leading-none">
                Split equally
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Expense</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Helper functions for expense calculations
function calculatePersonalExpenses(expenses, personId) {
  return expenses.filter((expense) => expense.paidBy === personId).reduce((sum, expense) => sum + expense.amount, 0)
}

function calculateBalances(expenses, travelers) {
  // Initialize balances for each traveler
  const balances = travelers.map((traveler) => ({
    personId: traveler.id,
    paid: 0,
    owes: 0,
    balance: 0,
  }))

  // Calculate what each person paid and what they owe
  expenses.forEach((expense) => {
    // Add the full amount to what the payer paid
    const payerBalance = balances.find((b) => b.personId === expense.paidBy)
    payerBalance.paid += expense.amount

    // Calculate each person's share
    const perPersonAmount = expense.amount / expense.splitBetween.length

    // Add the share to what each person owes
    expense.splitBetween.forEach((personId) => {
      const personBalance = balances.find((b) => b.personId === personId)
      personBalance.owes += perPersonAmount
    })
  })

  // Calculate the final balance for each person
  balances.forEach((balance) => {
    balance.balance = balance.paid - balance.owes
  })

  return balances
}

function calculateSettlements(balances) {
  // Deep copy the balances to avoid modifying the original
  const workingBalances = JSON.parse(JSON.stringify(balances))

  // Filter to only those with non-zero balances
  const debtors = workingBalances.filter((b) => b.balance < 0).sort((a, b) => a.balance - b.balance) // Sort by balance ascending (most negative first)

  const creditors = workingBalances.filter((b) => b.balance > 0).sort((a, b) => b.balance - a.balance) // Sort by balance descending (most positive first)

  const settlements = []

  // Calculate settlements
  while (debtors.length > 0 && creditors.length > 0) {
    const debtor = debtors[0]
    const creditor = creditors[0]

    // Calculate the amount to settle
    const amount = Math.min(Math.abs(debtor.balance), creditor.balance)

    // Add the settlement
    settlements.push({
      from: debtor.personId,
      to: creditor.personId,
      amount: Math.round(amount), // Round to nearest whole number
    })

    // Update balances
    debtor.balance += amount
    creditor.balance -= amount

    // Remove settled parties
    if (Math.abs(debtor.balance) < 1) {
      debtors.shift()
    }

    if (creditor.balance < 1) {
      creditors.shift()
    }
  }

  return settlements
}
