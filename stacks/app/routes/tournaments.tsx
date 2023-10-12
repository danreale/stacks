import { Outlet } from "@remix-run/react";
import Header from "~/components/TournamentsHeader";

export default function WaitingListLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
