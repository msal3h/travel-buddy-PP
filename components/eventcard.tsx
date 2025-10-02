import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive'; 
import BlindIcon from '@mui/icons-material/Blind';
import BedIcon from '@mui/icons-material/Bed';
import { events } from '@/src/db/schema';

export default function ActivityCard({
  category,
  flightnumber,
  flightdeparture,
  flightarrival,
  flightduration,
  flightairline,
  flightnotes,
  flightbookedby,
  accommodationname,
  accommodationcheckin,
  accommodationcheckout,
  accommodationaddress,
  accommodationbookedby,
  accommodationnotes,
  activityname,
  activitylocation,
  activitytime,
  activitynotes,
  activitybookedby,
}: {
  category?: string;
  flightnumber?: string;
  flightdeparture?: string;
  flightarrival?: string;
  flightduration?: string;
  flightairline?: string;
  flightnotes?: string;
  flightbookedby?: string;
  accommodationname?: string;
  accommodationcheckin?: string;
  accommodationcheckout?: string;
  accommodationaddress?: string;
  accommodationbookedby?: string;
  accommodationnotes?: string;
  activityname?: string;
  activitylocation?: string;
  activitytime?: string;
  activitynotes?: string;
  activitybookedby?: string;
}) {
  return (
    
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
        {category === "flight" ? (
          <>
            <div>{`Flight Number: ${flightnumber ?? ""}`}</div>
            <div>{`Departure: ${flightdeparture ?? ""}`}</div>
            <div>{`Arrival: ${flightarrival ?? ""}`}</div>
            <div>{`Duration: ${flightduration ?? ""}`}</div>
            <div>{`Airline: ${flightairline ?? ""}`}</div>
            <div>{`Notes: ${flightnotes ?? ""}`}</div>
            <div>{`Booked By: ${flightbookedby ?? ""}`}</div>
          </>
        ) : category === "accommodation" ? (
         <>
            <div>{`Accommodation Name: ${accommodationname ?? ""}`}</div>
            <div>{`Check-in: ${accommodationcheckin ?? ""}`}</div>
            <div>{`Check-out: ${accommodationcheckout ?? ""}`}</div>
            <div>{`Address: ${accommodationaddress ?? ""}`}</div>
            <div>{`Booked By: ${accommodationbookedby ?? ""}`}</div>
            <div>{`Notes: ${accommodationnotes ?? ""}`}</div>
         </>

        ) : (
          category === "activity" ? (
            <>
              <div>{`Activity Name: ${activityname ?? ""}`}</div>
              <div>{`Location: ${activitylocation ?? ""}`}</div>
              <div>{`Time: ${activitytime ?? ""}`}</div>
              <div>{`Notes: ${activitynotes ?? ""}`}</div>
            <div>{`Booked By: ${activitybookedby ?? ""}`}</div>
            </>
          ) : null
        )}
        </div>
  );
}