import type { LoaderFunctionArgs } from "@remix-run/node";

import { useLoaderData, useFetcher, Link } from "@remix-run/react";
import { GameTypeList, getGameTypes } from "~/data/stacks.server";

export default function GameTypes() {
  const fetcher = useFetcher();
  const gameTypes = useLoaderData<typeof loader>();

  return (
    <>
      <div className="flex justify-center text-center py-5">
        <h1 className="text-2xl">Game Types</h1>
      </div>
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
