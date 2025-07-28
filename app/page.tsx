"use client";

import HomePage from "@/components/homepage";

export default function RootPage() {
  // You might not have a tripId yet for this page,
  // so you can pass a placeholder or remove trip-specific stuff from here
  return <HomePage tripId="default" />;
}
