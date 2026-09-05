import React from "react";
import "./EventsList.css";
import EventsCard from "./EventsCard";
import events from "./EventsStatic";

const dummy = [0, 1, 2, 3, 4, 5, 6, 7];

const EventsList = () => {
  // To be used later
  // const [blogs, setBlogs] = useState();

  return (
    <>
      {events?.map((event) => {
        return <EventsCard key={event.id} event={event} />;
      }) ||
        dummy.map((id) => {
          return <EventsCard key={id} />;
        })}
    </>
  );
};

export default EventsList;