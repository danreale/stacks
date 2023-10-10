import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";

import { useLoaderData, Link } from "@remix-run/react";
import {
  getPlayersList,
  closeWaitingLists,
  openWaitingLists,
} from "~/data/stacks.server";
import { redirect } from "@remix-run/node";
import CloseWaitingList from "~/components/CloseWaitingLists";
import OpenWaitingList from "~/components/OpenWaitingLists";

export default function WaitingListPlayers() {
  const playersList = useLoaderData<typeof loader>();

  return (
    <>
      <div className="flex justify-center text-center py-5">
        <h1>Waiting List Players</h1>
      </div>

      <div className="flex justify-center">
        <table className="table-auto">
          <thead className="text-2xl">
            <tr>
              <th className="px-2">First Name</th>
              <th className="px-2">Last Name</th>
              <th className="px-2">Initials</th>
              <th className="px-2">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {playersList.map((tableData: any) => (
              <tr key={tableData.id} className="text-center">
                <td>{tableData.firstName}</td>
                <td>{tableData.lastName}</td>
                <td>{tableData.initials}</td>
                <td>{tableData.phoneNumber}</td>
                <td>
                  {" "}
                  <button className="border-2 rounded px-2">
                    {" "}
                    <Link to={tableData.id}>Remove</Link>
                  </button>
                </td>
                <td>
                  {" "}
                  <button className="border-2 rounded px-2">
                    {" "}
                    <Link to={tableData.id}>Contact</Link>
                  </button>
                </td>
                {/* <td>
                  {" "}
                  <button className="border-2 rounded px-2">
                    {" "}
                    <Link to={tableData.id}> Edit</Link>
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <div className="flex justify-center py-10">
        <CloseWaitingList />
      </div>
      <div className="flex justify-center">
        <OpenWaitingList />
      </div> */}
    </>
  );
}

export const loader = async ({}: LoaderFunctionArgs) => {
  const playersList = await getPlayersList();
  return playersList;
};

export async function action({ request }: ActionFunctionArgs) {
  if (request.method === "PATCH") {
    try {
      await closeWaitingLists();
      return redirect("/waitinglist");
    } catch (error) {
      return error;
    }
  }
  if (request.method === "POST") {
    try {
      await openWaitingLists();
      return redirect("/waitinglist");
    } catch (error) {
      return error;
    }
  }
}
