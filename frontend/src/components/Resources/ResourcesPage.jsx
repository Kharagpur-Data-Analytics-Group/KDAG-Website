import React from "react";
import Header from "./Header/Header";
import ResourcesList from "./Resources/ResourcesList";
import Particless from "../Common/Particles/Particless";

const ResourcesPage = () => {
  return ( 
    <>
      <Header />
      <ResourcesList />
      <Particless />
    </>
  );
};

export default ResourcesPage;