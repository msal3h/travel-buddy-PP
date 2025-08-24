import HomePage from "@/components/homepage";
import {getUserById} from "@/lib/getUser";
import { getTripByUserId } from "@/lib/getTbyID";

export default async function UserPage({params} : {params:{userId: string} }){
    const {userId} =  params;

    const user = await getUserById(userId);

    if(!user) return <div>User not found</div>;
      const trip = await getTripByUserId(user.id);


    return(
    <HomePage
    userId={userId}
    userName={user.name}
    email={user.email}
      tripId={trip?.id}
      tripName={trip?.name}
      startDate={trip?.startDate}
      endDate={trip?.endDate}
    
    />
)
}