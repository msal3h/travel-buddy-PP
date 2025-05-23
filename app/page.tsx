import Link from "next/link"
import { CalendarDays, CreditCard, Home, Luggage, MapPin, Plane, Plus, Settings, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExpenseTracker } from "./components/expense-tracker"
import { TravelChecklist } from "./components/travel-checklist"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Luggage className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Travel Buddy</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Dashboard
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              My Trips
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Explore
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Help
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-6 md:py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Japan Adventure 2024</h1>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-muted-foreground">April 10 - April 24, 2024</p>
                <span className="text-muted-foreground">•</span>
                <div className="flex items-center gap-1.5">
                  <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-3 w-3 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">Created by You</p>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Share</Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Event
              </Button>
            </div>
          </div>

          <Tabs defaultValue="timeline" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="expenses">Expenses</TabsTrigger>
              <TabsTrigger value="checklist">Checklist</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>
            <TabsContent value="timeline" className="space-y-4">
              <TravelTimeline />
            </TabsContent>
            <TabsContent value="expenses">
              <ExpenseTracker />
            </TabsContent>
            <TabsContent value="checklist">
              <TravelChecklist />
            </TabsContent>
            <TabsContent value="documents">
              <div className="flex items-center justify-center h-64 border rounded-lg">
                <p className="text-muted-foreground">Travel documents will appear here</p>
              </div>
            </TabsContent>
            <TabsContent value="notes">
              <div className="flex items-center justify-center h-64 border rounded-lg">
                <p className="text-muted-foreground">Trip notes will appear here</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-16">
          <p className="text-sm text-muted-foreground">© 2024 Travel Buddy. All rights reserved.</p>
          <div className="md:hidden flex items-center gap-6">
            <Link href="#" className="text-sm font-medium text-muted-foreground">
              Dashboard
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground">
              My Trips
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground">
              Explore
            </Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground">
              Help
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function TravelTimeline() {
  return (
    <div className="space-y-8">
      {/* Day 1 */}
      <div>
        <div className="flex items-center mb-4">
          <div className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
            Day 1 - April 10
          </div>
        </div>
        <div className="space-y-4 pl-4 border-l-2 border-muted">
          <TimelineEvent
            time="08:30 AM"
            title="Flight to Tokyo"
            icon={<Plane className="h-5 w-5" />}
            category="flight"
            details={{
              flightNumber: "JL 7302",
              departure: "SFO 08:30 AM",
              arrival: "NRT 11:45 AM (next day)",
              duration: "11h 15m",
            }}
          />
          <TimelineEvent
            time="1:30 PM"
            title="Check-in: Shibuya Stream Excel Hotel"
            icon={<Home className="h-5 w-5" />}
            category="accommodation"
            details={{
              address: "3-21-3 Shibuya, Tokyo 150-0002",
              checkIn: "April 11, 3:00 PM",
              checkOut: "April 14, 11:00 AM",
              confirmation: "BK7291043",
            }}
          />
          <TimelineEvent
            time="7:00 PM"
            title="Dinner at Ichiran Ramen"
            icon={<MapPin className="h-5 w-5" />}
            category="activity"
            details={{
              address: "1-22-7 Jinnan, Shibuya City, Tokyo",
              notes: "Famous for tonkotsu ramen, expect a wait",
              cost: "$10 per person (est.)",
            }}
          />
        </div>
      </div>

      {/* Day 2 */}
      <div>
        <div className="flex items-center mb-4">
          <div className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
            Day 2 - April 11
          </div>
        </div>
        <div className="space-y-4 pl-4 border-l-2 border-muted">
          <TimelineEvent
            time="9:00 AM"
            title="Tokyo Metropolitan Government Building"
            icon={<MapPin className="h-5 w-5" />}
            category="activity"
            details={{
              address: "2-8-1 Nishi-Shinjuku, Shinjuku City, Tokyo",
              notes: "Free observation deck with city views",
              duration: "1-2 hours",
            }}
          />
          <TimelineEvent
            time="12:00 PM"
            title="Lunch at Tsukiji Outer Market"
            icon={<MapPin className="h-5 w-5" />}
            category="activity"
            details={{
              address: "4-16-2 Tsukiji, Chuo City, Tokyo",
              notes: "Fresh seafood and street food",
              cost: "$15-20 per person (est.)",
            }}
          />
          <TimelineEvent
            time="2:30 PM"
            title="Senso-ji Temple & Nakamise Shopping Street"
            icon={<MapPin className="h-5 w-5" />}
            category="activity"
            details={{
              address: "2-3-1 Asakusa, Taito City, Tokyo",
              notes: "Tokyo's oldest temple, great for souvenirs",
              duration: "2-3 hours",
            }}
          />
          <TimelineEvent
            time="7:00 PM"
            title="Robot Restaurant Show"
            icon={<CreditCard className="h-5 w-5" />}
            category="expense"
            details={{
              cost: "$55 per person",
              paymentMethod: "Credit Card",
              confirmation: "RR239087",
            }}
          />
        </div>
      </div>

      {/* Day 3 */}
      <div>
        <div className="flex items-center mb-4">
          <div className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
            Day 3 - April 12
          </div>
        </div>
        <div className="space-y-4 pl-4 border-l-2 border-muted">
          <TimelineEvent
            time="10:00 AM"
            title="TeamLab Planets"
            icon={<CalendarDays className="h-5 w-5" />}
            category="reservation"
            details={{
              address: "6-1-16 Toyosu, Koto City, Tokyo",
              confirmation: "TL87654",
              notes: "Digital art museum, wear comfortable clothes",
              cost: "$22 per person",
            }}
          />
          <TimelineEvent
            time="3:00 PM"
            title="Shinkansen to Kyoto"
            icon={<Plane className="h-5 w-5" />}
            category="transportation"
            details={{
              departure: "Tokyo Station 3:00 PM",
              arrival: "Kyoto Station 5:15 PM",
              trainNumber: "Nozomi 223",
              carriage: "Car 8, Seats 3A-3B",
            }}
          />
          <TimelineEvent
            time="6:00 PM"
            title="Check-in: Kyoto Century Hotel"
            icon={<Home className="h-5 w-5" />}
            category="accommodation"
            details={{
              address: "680 Higashi Shiokoji-cho, Shimogyo-ku, Kyoto",
              checkIn: "April 12, 3:00 PM",
              checkOut: "April 15, 11:00 AM",
              confirmation: "KY8765432",
            }}
          />
        </div>
      </div>
    </div>
  )
}

function TimelineEvent({ time, title, icon, category, details, author = "You" }) {
  const getCategoryColor = (category) => {
    switch (category) {
      case "flight":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "accommodation":
        return "bg-green-100 text-green-800 border-green-200"
      case "activity":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "transportation":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "expense":
        return "bg-red-100 text-red-800 border-red-200"
      case "reservation":
        return "bg-amber-100 text-amber-800 border-amber-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="relative">
      <div className="absolute -left-[37px] flex h-7 w-7 items-center justify-center rounded-full bg-background border-2 border-muted">
        {icon}
      </div>
      <Card>
        <CardContent className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="font-medium">{title}</div>
            <div className="text-sm text-muted-foreground">{time}</div>
          </div>
          <div
            className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${getCategoryColor(category)} mb-3`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </div>
          <div className="flex items-center gap-1.5 mb-3 text-xs text-muted-foreground">
            <div className="h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-2 w-2 text-primary" />
            </div>
            <span>Added by {author}</span>
          </div>
          <div className="space-y-1 text-sm">
            {Object.entries(details).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-muted-foreground capitalize">{key}:</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
