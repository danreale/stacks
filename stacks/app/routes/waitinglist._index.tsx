import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";

import { useLoaderData, Link } from "@remix-run/react";
import {
  getWaitingList,
  closeWaitingLists,
  openWaitingLists,
} from "~/data/stacks.server";
import { redirect } from "@remix-run/node";
import CloseWaitingList from "~/components/CloseWaitingLists";
import OpenWaitingList from "~/components/OpenWaitingLists";

export default function WaitingList() {
  const waitingList = useLoaderData<typeof loader>();

  return (
    <>
      <div className="flex justify-center text-center py-5">
        <h1>Waiting List</h1>
      </div>

      <div className="flex justify-center">
        <table className="table-auto">
          <thead className="text-2xl">
            <tr>
              <th className="px-2">Game</th>
              <th className="px-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {waitingList.map((tableData: any) => (
              <tr key={tableData.id} className="text-center">
                <td>{tableData.gameType}</td>
                <td>{tableData.open ? "Open" : "Closed"}</td>
                <td>
                  {" "}
                  <button className="border-2 rounded px-2">
                    {" "}
                    <Link to={tableData.id}>Edit</Link>
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
      <div className="flex justify-center py-10">
        <CloseWaitingList />
      </div>
      <div className="flex justify-center">
        <OpenWaitingList />
      </div>
    </>
  );
}

export const loader = async ({}: LoaderFunctionArgs) => {
  const waitingList = await getWaitingList();
  return waitingList;
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
