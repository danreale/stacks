import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  addWaitingList,
  getGameTypes,
  WaitingList,
} from "~/data/stacks.server";
import { redirect } from "@remix-run/node";
import WaitingListForm from "~/components/WaitingListForm";

export default function AddWaitingList() {
  return (
    <>
      <h1 className="flex justify-center text-center py-5 text-2xl">
        Add Waiting List
      </h1>
      <WaitingListForm />
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const waitingListData = Object.fromEntries(formData);
  console.log(waitingListData);
  const data: WaitingList = {
    gameType: waitingListData.gameType.toString(),
    open: waitingListData.open === "true",
  };
  try {
    await addWaitingList(data);
    return redirect("/waitinglist");
  } catch (error) {
    return error;
  }
}

export const loader = async ({}: LoaderFunctionArgs) => {
  const gameTypes = await getGameTypes();
  return { gameTypes };
};
