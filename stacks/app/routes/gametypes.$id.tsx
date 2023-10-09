import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useNavigation } from "@remix-run/react";
import {
  getGameType,
  GameType,
  updateGameType,
  deleteGameType,
} from "~/data/stacks.server";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export default function AddGameType() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";
  const gameType = useLoaderData<typeof loader>();

  return (
    <>
      <h1 className="flex justify-center text-center py-5">
        Add Game Type Page
      </h1>
      <div className="flex justify-center text-center">
        <Form
          method="put"
          className="grid justify-center items-center text-center space-y-2"
        >
          <label>Game Type</label>
          <div className="space-x-2">
            <input
              type="text"
              className="border-2 border-green-700 rounded"
              name="name"
              defaultValue={gameType?.name}
            />
          </div>

          <div>
            <button disabled={isSubmitting} className="px-1 border-2 rounded">
              {isSubmitting ? "Saving..." : "Update"}
            </button>
          </div>
        </Form>
      </div>
      <div className="flex justify-center text-center pt-10">
        <Form method="delete">
          <div>
            <button className="border-2 border-red-500 px-2 rounded">
              {isSubmitting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </Form>
      </div>
    </>
  );
}

export async function action({ params, request }: ActionFunctionArgs) {
  const gameTypeId = params.id;
  console.log("GTID", gameTypeId);

  if (request.method === "PUT") {
    const formData = await request.formData();
    const gameTypeData = Object.fromEntries(formData);
    console.log(gameTypeData);
    const data: GameType = {
      name: gameTypeData.name.toString(),
    };
    try {
      await updateGameType(params.id, data);
      return redirect("/gametypes");
    } catch (error) {
      return error;
    }
  }
  if (request.method === "DELETE") {
    try {
      await deleteGameType(params.id);
      return redirect("/gametypes");
    } catch (error) {
      return error;
    }
  }
  return;
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const gameTypeId = params.id;
  const gameType = await getGameType(gameTypeId);
  return gameType;
};
