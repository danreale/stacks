import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  getWaitingListOne,
  updateWaitingList,
  deleteWaitingList,
  getGameTypes,
  WaitingList,
} from "~/data/stacks.server";
import { redirect } from "@remix-run/node";
import WaitingListForm from "~/components/WaitingListForm";

export default function EditWaitingList() {
  return (
    <>
      <h1 className="flex justify-center text-center py-5 text-2xl">
        Update Waiting List
      </h1>
      <WaitingListForm />
    </>
  );
}

export async function action({ params, request }: ActionFunctionArgs) {
  const tableId = params.id;
  if (request.method === "PUT") {
    const formData = await request.formData();
    const waitingListData = Object.fromEntries(formData);
    const data: WaitingList = {
      gameType: waitingListData.gameType.toString(),
      open: waitingListData.open === "true",
    };
    try {
      await updateWaitingList(tableId, data);
      return redirect("/waitinglist");
    } catch (error) {
      return error;
    }
  }
  if (request.method === "DELETE") {
    try {
      await deleteWaitingList(tableId);
      return redirect("/waitinglist");
    } catch (error) {
      return error;
    }
  }
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const waitingListId = params.id;
  const waitingListData = await getWaitingListOne(waitingListId);
  const gameTypes = await getGameTypes();
  return { waitingListData, gameTypes };
};
