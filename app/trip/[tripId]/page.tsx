
// app/trip/[tripId]/page.tsx
import { getTripById } from "@/lib/getTrip"; //imports data fetching function
import HomePage from "@/components/homepage"; //imports ui for trip so the information can be displayed

export default async function TripPage({ params }: { params: { tripId: string } }) {
  const {tripId} = await params
  const trip = await getTripById(tripId);
  if (!trip) return <div>Trip not found</div>;

  return (
    <HomePage
      tripId={tripId}
      tripName={trip.name}
      startDate={trip.startDate ?? undefined}
      endDate={trip.endDate ?? undefined}
    />
  );
}

// params :-
//by naming a file trip/[tripId]/page.tsx,im telling next that this part of the URL [tripId] is dynamic 
// like a variable. so if user visits /trip/123, next will pass us me an object params = { tripId = "123"} .
