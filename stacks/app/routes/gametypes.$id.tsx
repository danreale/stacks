import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  getGameType,
  GameType,
  updateGameType,
  deleteGameType,
} from "~/data/stacks.server";
import { redirect } from "@remix-run/node";
import GameTypeForm from "~/components/GameTypeForm";

export default function AddGameType() {
  return (
    <>
      <h1 className="flex justify-center text-center py-5 text-2xl">
        Update Game Type
      </h1>
      <GameTypeForm />
    </>
  );
}

export async function action({ params, request }: ActionFunctionArgs) {
  const gameTypeId = params.id;
  if (request.method === "PUT") {
    const formData = await request.formData();
    const gameTypeData = Object.fromEntries(formData);
    const data: GameType = {
      name: gameTypeData.name.toString(),
    };
    try {
      await updateGameType(gameTypeId, data);
      return redirect("/gametypes");
    } catch (error) {
      return error;
    }
  }
  if (request.method === "DELETE") {
    try {
      await deleteGameType(gameTypeId);
      return redirect("/gametypes");
    } catch (error) {
      return error;
    }
  }
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const gameTypeId = params.id;
  const gameType = await getGameType(gameTypeId);
  return gameType;
};
