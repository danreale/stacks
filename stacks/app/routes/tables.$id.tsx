import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  getTable,
  updateTable,
  deleteTable,
  getGameTypes,
  Table,
} from "~/data/stacks.server";
import { redirect } from "@remix-run/node";
import MyTable from "~/components/TableForm";

export default function EditTable() {
  return (
    <>
      <h1 className="flex justify-center text-center py-5 text-2xl">
        Update Table
      </h1>
      <MyTable />
    </>
  );
}

export async function action({ params, request }: ActionFunctionArgs) {
  const tableId = params.id;
  if (request.method === "PUT") {
    const formData = await request.formData();
    const tableData = Object.fromEntries(formData);
    console.log(tableData);
    const data: Table = {
      gameType: tableData.gameType.toString(),
      seats: parseInt(tableData.seats.toString()),
      tableNumber: parseInt(tableData.tableNumber.toString()),
    };
    try {
      await updateTable(tableId, data);
      return redirect("/tables");
    } catch (error) {
      return error;
    }
  }
  if (request.method === "DELETE") {
    try {
      await deleteTable(tableId);
      return redirect("/tables");
    } catch (error) {
      return error;
    }
  }
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const tableId = params.id;
  const tableData = await getTable(tableId);
  const gameTypes = await getGameTypes();
  return { tableData, gameTypes };
};
