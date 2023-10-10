import { Outlet } from "@remix-run/react";
import Header from "~/components/Header";

export default function WaitingListPlayersLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
