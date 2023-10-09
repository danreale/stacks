import { ActionFunctionArgs } from "@remix-run/node";
import { Form, useNavigation } from "@remix-run/react";
import { addGameType, GameType } from "~/data/stacks.server";
import { redirect } from "@remix-run/node";

export default function AddGameType() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";
  return (
    <>
      <h1 className="flex justify-center text-center py-5">
        Add Game Type Page
      </h1>
      <div className="flex justify-center text-center">
        <Form
          method="post"
          className="grid justify-center items-center text-center space-y-2"
        >
          <label>Game Type</label>
          <div className="space-x-2">
            <input
              type="text"
              className="border-2 border-green-700"
              name="name"
            />
          </div>

          <div>
            <button disabled={isSubmitting} className="px-1 border-2 rounded">
              {isSubmitting ? "Saving..." : "Add"}
            </button>
          </div>
        </Form>
      </div>
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
