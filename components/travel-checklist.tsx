"use client"

import React, { useState } from "react"
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
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
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
} from "@mui/material"
import { Add, Delete, Search, Label, Person } from "@mui/icons-material"

const CHECKLIST_CATEGORIES = [
  "Essentials",
  "Documents",
  "Clothing",
  "Electronics",
  "Toiletries",
  "Health",
  "Miscellaneous",
]

const SAMPLE_CHECKLIST_ITEMS = [
  {
    id: 1,
    text: "Passport",
    category: "Documents",
    isCompleted: true,
    author: "You",
    isCommon: true,
  },
  {
    id: 2,
    text: "Flight tickets",
    category: "Documents",
    isCompleted: true,
    author: "You",
    isCommon: true,
  },
  {
    id: 3,
    text: "Hotel reservations",
    category: "Documents",
    isCompleted: false,
    author: "You",
    isCommon: true,
  },
  {
    id: 4,
    text: "Travel insurance",
    category: "Documents",
    isCompleted: false,
    author: "Alex",
    isCommon: true,
  },
  {
    id: 5,
    text: "Phone charger",
    category: "Electronics",
    isCompleted: false,
    author: "You",
    isCommon: true,
  },
  {
    id: 6,
    text: "Camera",
    category: "Electronics",
    isCompleted: false,
    author: "Jamie",
    isCommon: true,
  },
  {
    id: 7,
    text: "Adapter plug",
    category: "Electronics",
    isCompleted: false,
    author: "You",
    isCommon: true,
  },
  {
    id: 8,
    text: "Toothbrush",
    category: "Toiletries",
    isCompleted: false,
    author: "You",
    isCommon: true,
  },
  {
    id: 9,
    text: "Sunscreen",
    category: "Toiletries",
    isCompleted: false,
    author: "Taylor",
    isCommon: true,
  },
  {
    id: 10,
    text: "First aid kit",
    category: "Health",
    isCompleted: false,
    author: "You",
    isCommon: true,
  },
  {
    id: 11,
    text: "Prescription medications",
    category: "Health",
    isCompleted: false,
    author: "You",
    isCommon: true,
  },
  {
    id: 12,
    text: "T-shirts",
    category: "Clothing",
    isCompleted: false,
    author: "You",
    isCommon: true,
  },
  {
    id: 13,
    text: "Underwear",
    category: "Clothing",
    isCompleted: false,
    author: "You",
    isCommon: true,
  },
  {
    id: 14,
    text: "Socks",
    category: "Clothing",
    isCompleted: false,
    author: "You",
    isCommon: true,
  },
  {
    id: 15,
    text: "Comfortable walking shoes",
    category: "Clothing",
    isCompleted: false,
    author: "You",
    isCommon: true,
  },
  {
    id: 16,
    text: "Book JR Pass online",
    category: "Miscellaneous",
    isCompleted: false,
    author: "You",
    isCommon: false,
  },
  {
    id: 17,
    text: "Download offline maps",
    category: "Miscellaneous",
    isCompleted: true,
    author: "Alex",
    isCommon: false,
  },
  {
    id: 18,
    text: "Exchange currency",
    category: "Essentials",
    isCompleted: false,
    author: "You",
    isCommon: true,
  },
]

export function TravelChecklist() {
  const [checklistItems, setChecklistItems] = useState(SAMPLE_CHECKLIST_ITEMS)
  const [activeCategory, setActiveCategory] = useState("all")
  const [showAddItem, setShowAddItem] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const totalItems = checklistItems.length
  const completedItems = checklistItems.filter((item) => item.isCompleted).length
  const completionPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0

  const filteredItems = checklistItems.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory
    const matchesSearch = item.text.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleItemCompletion = (id) => {
    setChecklistItems(
      checklistItems.map((item) => (item.id === id ? { ...item, isCompleted: !item.isCompleted } : item)),
    )
  }

  const deleteItem = (id) => {
    setChecklistItems(checklistItems.filter((item) => item.id !== id))
  }

  const addItem = (newItem) => {
    setChecklistItems([
      ...checklistItems,
      {
        id: checklistItems.length + 1,
        ...newItem,
        isCompleted: false,
        author: "You",
      },
    ])
    setShowAddItem(false)
  }

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 4, gap: 2 }}>
        <Box>
          <Typography variant="h2" sx={{ mb: 1 }}>
            Checklist
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Keep track of everything you need for your trip
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setShowAddItem(true)}
          sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}
        >
          Add Item
        </Button>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Completion Status
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
                {completionPercentage}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={completionPercentage}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  bgcolor: "grey.200",
                  "& .MuiLinearProgress-bar": {
                    bgcolor: "primary.main",
                  },
                  mb: 1,
                }}
              />
              <Typography variant="caption" color="text.secondary">
                {completedItems} of {totalItems} items completed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Essential Items
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {checklistItems.filter((item) => item.category === "Essentials" && item.isCompleted).length}/
                {checklistItems.filter((item) => item.category === "Essentials").length}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Essential items you shouldn't forget
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                Documents
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {checklistItems.filter((item) => item.category === "Documents" && item.isCompleted).length}/
                {checklistItems.filter((item) => item.category === "Documents").length}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Important documents for your trip
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Categories
              </Typography>
              <List dense>
                <ListItem
                  button
                  selected={activeCategory === "all"}
                  onClick={() => setActiveCategory("all")}
                  sx={{
                    borderRadius: 1,
                    mb: 0.5,
                    "&.Mui-selected": {
                      bgcolor: "primary.main",
                      color: "primary.contrastText",
                      "&:hover": {
                        bgcolor: "primary.dark",
                      },
                    },
                  }}
                >
                  <ListItemText primary="All Items" />
                  <Chip label={totalItems} size="small" variant="outlined" />
                </ListItem>
                {CHECKLIST_CATEGORIES.map((category) => (
                  <ListItem
                    key={category}
                    button
                    selected={activeCategory === category}
                    onClick={() => setActiveCategory(category)}
                    sx={{
                      borderRadius: 1,
                      mb: 0.5,
                      "&.Mui-selected": {
                        bgcolor: "primary.main",
                        color: "primary.contrastText",
                        "&:hover": {
                          bgcolor: "primary.dark",
                        },
                      },
                    }}
                  >
                    <ListItemText primary={category} />
                    <Chip
                      label={checklistItems.filter((item) => item.category === category).length}
                      size="small"
                      variant="outlined"
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={9}>
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6">{activeCategory === "all" ? "All Items" : activeCategory}</Typography>
                <TextField
                  size="small"
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: <Search sx={{ mr: 1, color: "text.secondary" }} />,
                  }}
                  sx={{ maxWidth: 250 }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {activeCategory === "all"
                  ? "All checklist items for your trip"
                  : `Items in the ${activeCategory} category`}
              </Typography>
              <Box sx={{ maxHeight: 400, overflow: "auto" }}>
                <List>
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => (
                      <React.Fragment key={item.id}>
                        <ListItem
                          sx={{
                            bgcolor: item.isCompleted ? "primary.light" : "transparent",
                            borderRadius: 1,
                            mb: 1,
                          }}
                        >
                          <ListItemIcon>
                            <Checkbox
                              checked={item.isCompleted}
                              onChange={() => toggleItemCompletion(item.id)}
                              color="primary"
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography
                                sx={{
                                  textDecoration: item.isCompleted ? "line-through" : "none",
                                  color: item.isCompleted ? "text.secondary" : "text.primary",
                                  fontWeight: 500,
                                }}
                              >
                                {item.text}
                              </Typography>
                            }
                            secondary={
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5, flexWrap: "wrap" }}>
                                <Chip icon={<Label />} label={item.category} size="small" variant="outlined" />
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                  <Avatar sx={{ width: 16, height: 16, bgcolor: "primary.light" }}>
                                    <Person sx={{ fontSize: 10 }} />
                                  </Avatar>
                                  <Typography variant="caption" color="text.secondary">
                                    Added by {item.author}
                                  </Typography>
                                </Box>
                                {item.isCommon && (
                                  <Chip label="Common" size="small" color="secondary" variant="outlined" />
                                )}
                              </Box>
                            }
                          />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" onClick={() => deleteItem(item.id)} color="error" size="small">
                              <Delete />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                        {index < filteredItems.length - 1 && <Divider />}
                      </React.Fragment>
                    ))
                  ) : (
                    <Box sx={{ textAlign: "center", py: 4 }}>
                      <Typography color="text.secondary">
                        No items found. Try a different category or search term.
                      </Typography>
                    </Box>
                  )}
                </List>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <AddChecklistItemDialog
        open={showAddItem}
        onClose={() => setShowAddItem(false)}
        onAddItem={addItem}
        categories={CHECKLIST_CATEGORIES}
      />
    </Box>
  )
}

function AddChecklistItemDialog({ open, onClose, onAddItem, categories }) {
  const [text, setText] = useState("")
  const [category, setCategory] = useState(categories[0])
  const [isCommon, setIsCommon] = useState(false)

  const handleSubmit = () => {
    onAddItem({
      text,
      category,
      isCommon,
    })

    setText("")
    setCategory(categories[0])
    setIsCommon(false)
  }

  const handleCategoryChange = (event) => {
    setCategory(event.target.value)
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Checklist Item</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
          <TextField
            fullWidth
            label="Item"
            placeholder="e.g., Passport, Phone charger"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select value={category} onChange={handleCategoryChange} label="Category">
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel
            control={<Checkbox checked={isCommon} onChange={(e) => setIsCommon(e.target.checked)} />}
            label="Mark as common item (helpful for others)"
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
          Add Item
        </Button>
      </DialogActions>
    </Dialog>
  )
}
