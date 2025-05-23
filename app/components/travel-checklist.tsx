"use client"

import { useState } from "react"
import { Plus, Tag, Trash2, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Sample data for the checklist
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

  // Calculate completion stats
  const totalItems = checklistItems.length
  const completedItems = checklistItems.filter((item) => item.isCompleted).length
  const completionPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0

  // Filter items based on active category and search query
  const filteredItems = checklistItems.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory
    const matchesSearch = item.text.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Toggle item completion
  const toggleItemCompletion = (id) => {
    setChecklistItems(
      checklistItems.map((item) => (item.id === id ? { ...item, isCompleted: !item.isCompleted } : item)),
    )
  }

  // Delete an item
  const deleteItem = (id) => {
    setChecklistItems(checklistItems.filter((item) => item.id !== id))
  }

  // Add a new item
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Checklist</h2>
          <p className="text-muted-foreground">Keep track of everything you need for your trip</p>
        </div>
        <Button onClick={() => setShowAddItem(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completion Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completionPercentage}%</div>
            <div className="mt-2 h-2 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary" style={{ width: `${completionPercentage}%` }} />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {completedItems} of {totalItems} items completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Essential Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {checklistItems.filter((item) => item.category === "Essentials" && item.isCompleted).length}/
              {checklistItems.filter((item) => item.category === "Essentials").length}
            </div>
            <p className="text-xs text-muted-foreground">Essential items you shouldn't forget</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {checklistItems.filter((item) => item.category === "Documents" && item.isCompleted).length}/
              {checklistItems.filter((item) => item.category === "Documents").length}
            </div>
            <p className="text-xs text-muted-foreground">Important documents for your trip</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-64 flex-shrink-0">
          <Card>
            <CardHeader>
              <CardTitle>Categories</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1 px-4 pb-4">
                <Button
                  variant={activeCategory === "all" ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveCategory("all")}
                >
                  All Items
                  <Badge className="ml-auto" variant="outline">
                    {totalItems}
                  </Badge>
                </Button>
                {CHECKLIST_CATEGORIES.map((category) => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                    <Badge className="ml-auto" variant="outline">
                      {checklistItems.filter((item) => item.category === category).length}
                    </Badge>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>{activeCategory === "all" ? "All Items" : activeCategory}</CardTitle>
                <Input
                  placeholder="Search items..."
                  className="max-w-xs"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <CardDescription>
                {activeCategory === "all"
                  ? "All checklist items for your trip"
                  : `Items in the ${activeCategory} category`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-4">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <div
                        key={item.id}
                        className={`flex items-start justify-between p-3 border rounded-lg ${
                          item.isCompleted ? "bg-muted/50" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <Checkbox
                            id={`item-${item.id}`}
                            checked={item.isCompleted}
                            onCheckedChange={() => toggleItemCompletion(item.id)}
                            className="mt-1"
                          />
                          <div>
                            <label
                              htmlFor={`item-${item.id}`}
                              className={`font-medium ${item.isCompleted ? "line-through text-muted-foreground" : ""}`}
                            >
                              {item.text}
                            </label>
                            <div className="flex items-center gap-3 mt-1">
                              <Badge variant="outline" className="text-xs">
                                <Tag className="h-3 w-3 mr-1" />
                                {item.category}
                              </Badge>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <div className="h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center">
                                  <User className="h-2 w-2 text-primary" />
                                </div>
                                <span>Added by {item.author}</span>
                              </div>
                              {item.isCommon && (
                                <Badge variant="secondary" className="text-xs">
                                  Common
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteItem(item.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No items found. Try a different category or search term.
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      <AddChecklistItemDialog
        open={showAddItem}
        onOpenChange={setShowAddItem}
        onAddItem={addItem}
        categories={CHECKLIST_CATEGORIES}
      />
    </div>
  )
}

// Helper component for adding a new checklist item
function AddChecklistItemDialog({ open, onOpenChange, onAddItem, categories }) {
  const [text, setText] = useState("")
  const [category, setCategory] = useState(categories[0])
  const [isCommon, setIsCommon] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddItem({
      text,
      category,
      isCommon,
    })

    // Reset form
    setText("")
    setCategory(categories[0])
    setIsCommon(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Checklist Item</DialogTitle>
          <DialogDescription>Add a new item to your travel checklist.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="item-text">Item</Label>
              <Input
                id="item-text"
                placeholder="e.g., Passport, Phone charger"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
              />
            </div>

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

            <div className="flex items-center space-x-2">
              <Checkbox id="isCommon" checked={isCommon} onCheckedChange={setIsCommon} />
              <label htmlFor="isCommon" className="text-sm font-medium leading-none">
                Mark as common item (helpful for others)
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add Item</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
