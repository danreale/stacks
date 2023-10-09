import { Outlet } from "@remix-run/react";
import Header from "~/components/Header";

export default function TablesLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
