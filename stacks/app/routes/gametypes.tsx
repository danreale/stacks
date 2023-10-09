import { Outlet } from "@remix-run/react";
import Header from "~/components/Header";

export default function GameTypesLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
