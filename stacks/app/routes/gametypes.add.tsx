import { ActionFunctionArgs } from "@remix-run/node";
import { addGameType, GameType } from "~/data/stacks.server";
import { redirect } from "@remix-run/node";
import GameTypeForm from "~/components/GameTypeForm";

export default function AddGameType() {
  return (
    <>
      <h1 className="flex justify-center text-center py-5 text-2xl">
        Add Game Type
      </h1>
      <GameTypeForm />
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const gameTypeData = Object.fromEntries(formData);
  console.log(gameTypeData);
  const data: GameType = {
    name: gameTypeData.name.toString(),
  };
  try {
    await addGameType(data);
    return redirect("/gametypes");
  } catch (error) {
    return error;
  }
}
