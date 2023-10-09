import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { useLoaderData, useFetcher, Link } from "@remix-run/react";
import { GameTypeList, getGameTypes } from "~/data/stacks.server";

export default function GameTypes() {
  const fetcher = useFetcher();
  const gameTypes = useLoaderData<typeof loader>();

  function deleteGameTypeHandler(gameType: GameTypeList) {
    const proceed = confirm(
      `Are you sure? Do you want to delete this game type? (${gameType.name}`
    );

    if (!proceed) {
      return;
    }
    fetcher.submit(
      { intent: "delete" },
      {
        method: "delete",
        action: `/gametypes/${gameType.id}`,
      }
    );
  }
  return (
    <>
      <div className="flex justify-center text-center py-5">
        <h1>Game Types</h1>
      </div>
      {/* <ul className="flex justify-center text-center">
        <li>Game Types</li>
      </ul> */}
      <ul className="flex-col justify-center text-center space-y-5">
        {gameTypes.map((gameType: GameTypeList) => (
          <li key={gameType.id} className="space-x-2">
            <label>{gameType.name}</label>

            <button className="border-2 rounded px-2">
              {" "}
              <Link to={gameType.id}> View</Link>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export const loader = async ({}: LoaderFunctionArgs) => {
  const gameTypes = await getGameTypes();
  return gameTypes;
};
