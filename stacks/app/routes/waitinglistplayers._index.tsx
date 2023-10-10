import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";

import {
  useLoaderData,
  Form,
  useNavigation,
  useActionData,
} from "@remix-run/react";
import {
  getPlayersList,
  deletePlayerFromWaitingList,
  getPlayersListCount,
} from "~/data/stacks.server";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";

export default function WaitingListPlayers() {
  const { gameCount, playersList } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";
  const data = useActionData<typeof action>();

  return (
    <>
      <div className="flex justify-center text-center py-5">
        <h1 className="text-2xl">Waiting List</h1>
      </div>
      <div className="flex justify-center py-5">
        <table className="table-auto">
          <thead className="text-2xl">
            <tr>
              <th className="px-2">Game</th>
              <th className="px-2">Count</th>
            </tr>
          </thead>
          <tbody>
            {gameCount.map((tableData: any, index: number) => (
              <tr key={index} className="text-center">
                <td>{tableData.gameType}</td>
                <td>{tableData._count.gameType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {data && (
        <div className="flex-col justify-center text-center">
          <p className="text-green-800 py-1">{data.message}</p>
        </div>
      )}
      <div className="flex justify-center py-5">
        <table className="table-auto">
          <thead className="text-2xl">
            <tr>
              <th className="px-2">Game</th>
              <th className="px-2">Initials</th>
              <th className="px-2">ID</th>
            </tr>
          </thead>
          <tbody>
            {playersList.map((tableData: any) => (
              <tr key={tableData.id} className="text-center">
                <td>{tableData.gameType}</td>
                <td>{tableData.initials}</td>
                <td className="pr-2">{tableData.id}</td>
                <td>
                  <Form
                    method="delete"
                    onSubmit={(event) => {
                      if (!confirm("Are you sure?")) {
                        event.preventDefault();
                      }
                    }}
                  >
                    <input
                      type="hidden"
                      name="id"
                      id="id"
                      value={tableData.id}
                    />
                    <input
                      type="hidden"
                      name="gameType"
                      id="gameType"
                      value={tableData.gameType}
                    />
                    <input
                      type="hidden"
                      name="initials"
                      id="initials"
                      value={tableData.initials}
                    />
                    <button className="border-2 boreder-red-500 rounded px-2">
                      {" "}
                      {isSubmitting ? "Deleting..." : "Delete"}
                    </button>
                  </Form>
                </td>
                <td>
                  <Form
                    method="post"
                    onSubmit={(event) => {
                      if (!confirm("Are you sure?")) {
                        event.preventDefault();
                      }
                    }}
                  >
                    <input
                      type="hidden"
                      name="id"
                      id="id"
                      value={tableData.id}
                    />
                    <input
                      type="hidden"
                      name="gameType"
                      id="gameType"
                      value={tableData.gameType}
                    />
                    <input
                      type="hidden"
                      name="initials"
                      id="initials"
                      value={tableData.initials}
                    />
                    <button className="border-2 boreder-blue-500 rounded px-2">
                      {" "}
                      {isSubmitting ? "Contacting..." : "Contact"}
                    </button>
                  </Form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export const loader = async ({}: LoaderFunctionArgs) => {
  const gameCount = await getPlayersListCount();
  const playersList = await getPlayersList();
  return { gameCount, playersList };
};

export async function action({ request }: ActionFunctionArgs) {
  if (request.method === "DELETE") {
    const formData = await request.formData();
    const playerData = Object.fromEntries(formData);
    console.log(playerData);
    try {
      await deletePlayerFromWaitingList(playerData.id);
      return json({
        message: `${playerData.initials} for ${playerData.gameType} has been removed from the list!`,
      });
    } catch (error) {
      return error;
    }
  }
  if (request.method === "POST") {
    const formData = await request.formData();
    const playerData = Object.fromEntries(formData);
    console.log(playerData);
    return json({
      message: `${playerData.initials} for ${playerData.gameType} has been contacted successfully!`,
    });
  }
}
