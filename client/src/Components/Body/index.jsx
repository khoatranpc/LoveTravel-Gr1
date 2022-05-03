import React from "react";
import { Outlet } from "react-router-dom";
import Intro from '../Intro'
import Categories from '../Categories'
import Marketing from '../Marketing'

export default function BodyMainPage() {
  return (
    <div>
      {/* <Outlet /> */}
      <Intro />
      <Categories />
      <Marketing />
    </div>
  );
}
