import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { addPlayer, getGameTypes, PLAYER } from "~/data/stacks.server";
import { redirect } from "@remix-run/node";
import AddPlayerForm from "~/components/AddPlayerForm";

export default function AddPlayerToWaitingList() {
  return (
    <>
      <h1 className="flex justify-center text-center py-5 text-2xl">
        Add Player To Waiting List
      </h1>
      <AddPlayerForm />
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const playerData = Object.fromEntries(formData);
  console.log(playerData);

  const fnInitial = playerData.firstName.toString().charAt(0).toUpperCase();
  const flnInitial = playerData.lastName.toString().charAt(0).toUpperCase();
  const data: PLAYER = {
    firstName: playerData.firstName.toString(),
    lastName: playerData.lastName.toString(),
    initials: `${fnInitial}${flnInitial}`,
    phoneNumber: playerData.phoneNumber.toString(),
  };
  try {
    await addPlayer(data);
    return redirect("/waitinglistplayers");
  } catch (error) {
    return error;
  }
}

export const loader = async ({}: LoaderFunctionArgs) => {
  const gameTypes = await getGameTypes();
  return { gameTypes };
};
