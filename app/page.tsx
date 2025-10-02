// "use client";

import HomePage from "@/components/homepage";
import {trips,events} from "@/src/db/schema";
import {db} from "@/src/db";
import { eq } from "drizzle-orm";
import { auth, signOut } from "@/auth"; //importing auth here allows us to access all session info
import { Dashboard } from "@mui/icons-material";
import { redirect } from "next/navigation";
import { getTripByUserId } from "@/lib/data";

export default async function Home() {
  const session = await auth();
  const userId = session?.user?.id;
  const trip = userId ? await getTripByUserId(userId) : null;

  return (
    <main>
      {!session ? ( <a href="/api/auth/signin">Sign in</a>) : (
        <>
          <p>Welcome {session.user?.name }</p>
          if (session) {
            redirect("/dashboard")
          }
          {/* {!session.trips.id?  (<a href="/tripform/page">Create a Trip</a>) : (<HomePage tripId={session.trips.id} tripName={session.trips.name} startDate={session.trips.startDate} endDate={session.trips.endDate} userName={session.user?.name} userId={session.user?.id} email={session.user?.email} />)} */}
          

          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button type="submit">Sign out</button>
          </form>
        </>
      )}
    </main>
  );
}
