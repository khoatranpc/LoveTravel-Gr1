import React from "react";
import { Outlet } from "react-router-dom";
import Intro from '../Intro'
import Categories from '../Categories'
import Suggest from '../Suggest'
import Footer from '../Footer'
import ListTour from '../ListTour'

export default function BodyMainPage() {
  return (
    <div>
      {/* <Outlet /> */}
      <Intro />
      <Categories />
      <Suggest />
      <Footer />
      {/* <ListTour /> */}
    </div>
  );
}
