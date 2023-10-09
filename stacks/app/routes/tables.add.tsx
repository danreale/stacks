import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { addTable, getGameTypes, Table } from "~/data/stacks.server";
import { redirect } from "@remix-run/node";
import MyTable from "~/components/TableForm";

export default function AddTable() {
  return (
    <>
      <h1 className="flex justify-center text-center py-5 text-2xl">
        Add Table
      </h1>
      <MyTable />
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const tableData = Object.fromEntries(formData);
  console.log(tableData);
  const data: Table = {
    seats: parseInt(tableData.seats.toString()),
    tableNumber: parseInt(tableData.tableNumber.toString()),
    gameType: tableData.gameType.toString(),
  };
  try {
    await addTable(data);
    return redirect("/tables");
  } catch (error) {
    return error;
  }
}

export const loader = async ({}: LoaderFunctionArgs) => {
  const gameTypes = await getGameTypes();
  return { gameTypes };
};
