import type { LoaderFunctionArgs } from "@remix-run/node";

import { useLoaderData } from "@remix-run/react";
import {
  getPlayersListPublic,
  getPlayersListCount,
} from "~/data/stacks.server";

export default function WaitingListPlayers() {
  const { gameCount, playersList } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="flex justify-center text-center py-5">
        <h1 className="text-2xl">Waiting List Players</h1>
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
      <div className="flex justify-center">
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
  const playersList = await getPlayersListPublic();
  return { gameCount, playersList };
};
