import React from "react";
import Header from "./Header/Header";
import EventsList from "./Events/EventsList";
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