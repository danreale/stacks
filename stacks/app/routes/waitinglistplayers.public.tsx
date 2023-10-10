import type { LoaderFunctionArgs } from "@remix-run/node";

import { useLoaderData, Link } from "@remix-run/react";
import {
  getPlayersListPublic,
  getPlayersListCount,
  getTablesCount,
} from "~/data/stacks.server";

export default function WaitingListPlayers() {
  const { gameCount, playersList, tableCount } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="flex justify-center text-center py-5">
        <h1 className="text-2xl">Waiting List</h1>
      </div>
      <div className="flex justify-center text-center pt-2 pb-5">
        <Link to="/waitinglistplayers/add" className="">
          <img
            src="../images/casino-chips.png"
            alt="pokerchip"
            className="h-24 w-24"
          />
          Join Waiting List
        </Link>
      </div>
      <div className="flex justify-center py-5">
        <table className="table-auto">
          <thead className="text-2xl">
            <tr>
              <th className="px-2">Game</th>
              <th className="px-2">Tables</th>
            </tr>
          </thead>
          <tbody>
            {tableCount.map((tableData: any, index: number) => (
              <tr key={index} className="text-center">
                <td>{tableData.gameType}</td>
                <td>{tableData._count.gameType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center py-5">
        <table className="table-auto">
          <thead className="text-2xl">
            <tr>
              <th className="px-2">Game</th>
              <th className="px-2">Waiting</th>
            </tr>
          </thead>
          <tbody>
            {gameCount.map((gameData: any, index: number) => (
              <tr key={index} className="text-center">
                <td>{gameData.gameType}</td>
                <td>{gameData._count.gameType}</td>
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
  const tableCount = await getTablesCount();

  return { gameCount, playersList, tableCount };
};
