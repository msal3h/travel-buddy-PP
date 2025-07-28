import type React from "react"
// Common types used across the application

export interface Traveler {
  id: number
  name: string
  avatar: string
}

export interface Expense {
  id: number
  description: string
  amount: number
  currency: string
  category: string
  date: string
  paidBy: number
  splitBetween: number[]
  equalSplit: boolean
  author: string
}

export interface Balance {
  personId: number
  paid: number
  owes: number
  balance: number
}

export interface Settlement {
  from: number
  to: number
  amount: number
}

export interface ChecklistItem {
  id: number
  text: string
  category: string
  isCompleted: boolean
  author: string
  isCommon: boolean
}

export interface TimelineEvent {
  time: string
  title: string
  icon: React.ReactNode
  category: string
  details: Record<string, string | number>
  author?: string
}

export interface DayEvents {
  day: string
  events: TimelineEvent[]
}
