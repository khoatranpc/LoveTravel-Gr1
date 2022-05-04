import React from "react";
import { Outlet } from "react-router-dom";
import Intro from '../Intro'
import Categories from '../Categories'
import Marketing from '../Marketing'
import Footer from '../Footer'

export default function BodyMainPage() {
  return (
    <div>
      {/* <Outlet /> */}
      <Intro />
      <Categories />
      <Marketing />
      <Footer />
    </div>
  );
}
