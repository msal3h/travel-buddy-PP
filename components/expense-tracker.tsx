"use client"

import React, { useState } from "react"
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  Avatar,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Paper,
} from "@mui/material"
import { Add, Receipt, FilterList, ArrowForward, AttachMoney, Person } from "@mui/icons-material"

function TabPanel(props) {
  // TabPanel component props:
  // - children: React elements to display when tab is active
  // - index: The index of this tab panel
  // - value: The currently selected tab index
  const { children, value, index, ...other } = props
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ py: 2 }}>{children}</Box>}
    </div>
  )
}

const TRAVELERS = [
  { id: 1, name: "You", avatar: "/diverse-avatars.png" },
  { id: 2, name: "Alex", avatar: "/diverse-avatars.png" },
  { id: 3, name: "Jamie", avatar: "/diverse-avatars.png" },
  { id: 4, name: "Taylor", avatar: "/diverse-avatars.png" },
]

const EXPENSE_CATEGORIES = ["Food & Drinks", "Accommodation", "Transportation", "Activities", "Shopping", "Other"]

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
  const [activeTab, setActiveTab] = useState(0)
  const [showAddExpense, setShowAddExpense] = useState(false)

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const balances = calculateBalances(expenses, TRAVELERS)

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue)
  }

  const addExpense = (newExpense) => {
    setExpenses([...expenses, { id: expenses.length + 1, ...newExpense }])
    setShowAddExpense(false)
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 4, gap: 2 }}>
        <Box>
          <Typography variant="h2" sx={{ mb: 1 }}>
            Expenses
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track and split expenses with your travel companions
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setShowAddExpense(true)}
          sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}
        >
          Add Expense
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Total Trip Expenses
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                ${totalExpenses.toLocaleString()}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Total expenses in USD
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Your Expenses
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                ${calculatePersonalExpenses(expenses, 1).toLocaleString()}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                You paid for {expenses.filter((e) => e.paidBy === 1).length} expenses
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Your Balance
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 600,
                  color: balances.find((b) => b.personId === 1)?.balance > 0 ? "success.main" : "error.main",
                }}
              >
                {balances.find((b) => b.personId === 1)?.balance > 0 ? "+" : "-"}$
                {Math.abs(balances.find((b) => b.personId === 1)?.balance || 0).toLocaleString()}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {balances.find((b) => b.personId === 1)?.balance > 0 ? "You are owed money" : "You owe money"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ bgcolor: "primary.light" }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          sx={{
            "& .MuiTab-root.Mui-selected": {
              bgcolor: "primary.main",
              color: "primary.contrastText",
            },
          }}
        >
          <Tab label="Summary" />
          <Tab label="All Expenses" />
          <Tab label="Settlements" />
        </Tabs>
      </Paper>

      <TabPanel value={activeTab} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Expense Breakdown
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  How expenses are distributed by category
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {EXPENSE_CATEGORIES.map((category) => {
                    const categoryExpenses = expenses.filter((e) => e.category === category)
                    const categoryTotal = categoryExpenses.reduce((sum, e) => sum + e.amount, 0)
                    const percentage = totalExpenses > 0 ? (categoryTotal / totalExpenses) * 100 : 0

                    return (
                      <Box key={category}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                          <Typography variant="body2">{category}</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            ${categoryTotal.toLocaleString()}
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={percentage}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: "grey.200",
                            "& .MuiLinearProgress-bar": {
                              bgcolor: "primary.main",
                            },
                          }}
                        />
                      </Box>
                    )
                  })}
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Expenses
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Last 5 expenses added
                </Typography>
                <List>
                  {expenses
                    .slice(-5)
                    .reverse()
                    .map((expense, index) => (
                      <React.Fragment key={expense.id}>
                        <ListItem sx={{ px: 0 }}>
                          <ListItemAvatar>
                            <Avatar sx={{ bgcolor: "primary.light", color: "primary.contrastText" }}>
                              <Receipt />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={expense.description}
                            secondary={`Paid by ${TRAVELERS.find((t) => t.id === expense.paidBy)?.name}`}
                          />
                          <Box sx={{ textAlign: "right" }}>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              ${expense.amount.toLocaleString()}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {expense.date}
                            </Typography>
                          </Box>
                        </ListItem>
                        {index < 4 && <Divider />}
                      </React.Fragment>
                    ))}
                </List>
                <Button fullWidth variant="text" onClick={() => setActiveTab(1)} sx={{ mt: 2 }}>
                  View All Expenses
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={activeTab} index={1}>
        <Card>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Box>
                <Typography variant="h6">All Expenses</Typography>
                <Typography variant="body2" color="text.secondary">
                  Complete list of trip expenses
                </Typography>
              </Box>
              <Button variant="outlined" startIcon={<FilterList />} size="small">
                Filter
              </Button>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxHeight: 400, overflow: "auto" }}>
              {expenses.map((expense) => (
                <Card key={expense.id} variant="outlined">
                  <CardContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                      <Typography variant="h6">{expense.description}</Typography>
                      <Chip label={expense.category} variant="outlined" size="small" />
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        {expense.date}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        •
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Avatar sx={{ width: 16, height: 16, bgcolor: "primary.light" }}>
                          <Person sx={{ fontSize: 10 }} />
                        </Avatar>
                        <Typography variant="caption" color="text.secondary">
                          Added by You
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Avatar sx={{ width: 24, height: 24 }}>
                          {TRAVELERS.find((t) => t.id === expense.paidBy)?.name[0]}
                        </Avatar>
                        <Typography variant="body2">
                          {TRAVELERS.find((t) => t.id === expense.paidBy)?.name} paid
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: "right", bgcolor: "primary.light", p: 2, borderRadius: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: "primary.contrastText" }}>
                          ${expense.amount.toLocaleString()}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          USD
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </CardContent>
        </Card>
      </TabPanel>

      <TabPanel value={activeTab} index={2}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Settlements
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Who owes whom
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {calculateSettlements(balances).map((settlement, index) => (
                <Box key={index} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar>{TRAVELERS.find((t) => t.id === settlement.from)?.name[0]}</Avatar>
                    <Typography>{TRAVELERS.find((t) => t.id === settlement.from)?.name}</Typography>
                    <ArrowForward color="action" />
                    <Avatar>{TRAVELERS.find((t) => t.id === settlement.to)?.name[0]}</Avatar>
                    <Typography>{TRAVELERS.find((t) => t.id === settlement.to)?.name}</Typography>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    ${settlement.amount.toLocaleString()}
                  </Typography>
                </Box>
              ))}
              {calculateSettlements(balances).length === 0 && (
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <Typography color="text.secondary">
                    All expenses are settled! Everyone has paid their fair share.
                  </Typography>
                </Box>
              )}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3, pt: 2, borderTop: 1, borderColor: "divider" }}>
              <Button variant="outlined">Mark All as Settled</Button>
            </Box>
          </CardContent>
        </Card>
      </TabPanel>

      <AddExpenseDialog
        open={showAddExpense}
        onClose={() => setShowAddExpense(false)}
        onAddExpense={addExpense}
        travelers={TRAVELERS}
        categories={EXPENSE_CATEGORIES}
      />
    </Box>
  )
}

function AddExpenseDialog({ open, onClose, onAddExpense, travelers, categories }) {
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState("USD")
  const [category, setCategory] = useState(categories[0])
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])
  const [paidBy, setPaidBy] = useState(1)
  const [splitBetween, setSplitBetween] = useState(travelers.map((t) => t.id))
  const [equalSplit, setEqualSplit] = useState(true)

  const handleSubmit = () => {
    onAddExpense({
      description,
      amount: Number.parseFloat(amount),
      currency,
      category,
      date,
      paidBy,
      splitBetween,
      equalSplit,
      author: "You",
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

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value)
  }

  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
  }

  const handlePaidByChange = (event) => {
    setPaidBy(Number(event.target.value))
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Expense</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
          <TextField
            fullWidth
            label="Description"
            placeholder="e.g., Dinner at Restaurant"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              InputProps={{
                startAdornment: <AttachMoney />,
              }}
              sx={{ flex: 1 }}
            />
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Currency</InputLabel>
              <Select value={currency} onChange={handleCurrencyChange} label="Currency">
                <MenuItem value="USD">USD ($)</MenuItem>
                <MenuItem value="JPY">JPY (¥)</MenuItem>
                <MenuItem value="EUR">EUR (€)</MenuItem>
                <MenuItem value="GBP">GBP (£)</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <FormControl sx={{ flex: 1 }}>
              <InputLabel>Category</InputLabel>
              <Select value={category} onChange={handleCategoryChange} label="Category">
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              type="date"
              label="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ flex: 1 }}
            />
          </Box>
          <FormControl fullWidth>
            <InputLabel>Paid by</InputLabel>
            <Select value={paidBy.toString()} onChange={handlePaidByChange} label="Paid by">
              {travelers.map((person) => (
                <MenuItem key={person.id} value={person.id.toString()}>
                  {person.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel
            control={<Checkbox checked={equalSplit} onChange={(e) => setEqualSplit(e.target.checked)} />}
            label="Split equally"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}
        >
          Add Expense
        </Button>
      </DialogActions>
    </Dialog>
  )
}

// Helper functions
function calculatePersonalExpenses(expenses, personId) {
  return expenses.filter((expense) => expense.paidBy === personId).reduce((sum, expense) => sum + expense.amount, 0)
}

function calculateBalances(expenses, travelers) {
  const balances = travelers.map((traveler) => ({
    personId: traveler.id,
    paid: 0,
    owes: 0,
    balance: 0,
  }))

  expenses.forEach((expense) => {
    const payerBalance = balances.find((b) => b.personId === expense.paidBy)
    if (payerBalance) payerBalance.paid += expense.amount

    const perPersonAmount = expense.amount / expense.splitBetween.length
    expense.splitBetween.forEach((personId) => {
      const personBalance = balances.find((b) => b.personId === personId)
      if (personBalance) personBalance.owes += perPersonAmount
    })
  })

  balances.forEach((balance) => {
    balance.balance = balance.paid - balance.owes
  })

  return balances
}

function calculateSettlements(balances) {
  const workingBalances = JSON.parse(JSON.stringify(balances))
  const debtors = workingBalances.filter((b) => b.balance < 0).sort((a, b) => a.balance - b.balance)
  const creditors = workingBalances.filter((b) => b.balance > 0).sort((a, b) => b.balance - a.balance)
  const settlements = []

  while (debtors.length > 0 && creditors.length > 0) {
    const debtor = debtors[0]
    const creditor = creditors[0]
    const amount = Math.min(Math.abs(debtor.balance), creditor.balance)

    settlements.push({
      from: debtor.personId,
      to: creditor.personId,
      amount: Math.round(amount),
    })

    debtor.balance += amount
    creditor.balance -= amount

    if (Math.abs(debtor.balance) < 1) debtors.shift()
    if (creditor.balance < 1) creditors.shift()
  }

  return settlements
}
