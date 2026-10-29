import React from "react";
import Header from "./Header/Header.jsx";
import EventsList from "./Events/EventsList.jsx";
import Particless from "../Common/Particles/Particless";

const EventsPage = () => {
  return (
    <>
      <Header />
      <EventsList />
      <Particless />
    </>
  );
};

export default EventsPage;