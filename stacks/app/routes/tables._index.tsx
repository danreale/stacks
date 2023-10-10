import type { LoaderFunctionArgs } from "@remix-run/node";

import { useLoaderData, Link } from "@remix-run/react";
import { TableList, getTables, getTablesCount } from "~/data/stacks.server";

export default function Tables() {
  const { tables, tableCount } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="flex justify-center text-center py-5">
        <h1 className="text-2xl">Tables</h1>
      </div>
      <div className="flex justify-center text-center pt-2 pb-5">
        <Link to="add" className="">
          <img
            src="../images/poker-table (1).png"
            alt="pokerchip"
            className="h-12 w-12"
          />
          Add Table
        </Link>
      </div>
      <div className="flex justify-center py-5">
        <table className="table-auto">
          <thead className="text-2xl">
            <tr>
              <th className="px-2">Game</th>
              <th className="px-2">Count</th>
            </tr>
          </thead>
          <tbody>
            {tableCount.map((tableData: any, index: number) => (
              <tr key={index} className="text-center">
                <td>{tableData.gameType}</td>
                <td>{tableData._count.gameType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center">
        <table className="table-auto">
          <thead className="text-2xl">
            <tr>
              <th className="px-2">Table#</th>
              <th className="px-2">Seats</th>
              <th className="px-2">Game</th>
            </tr>
          </thead>
          <tbody>
            {tables.map((tableData: TableList) => (
              <tr key={tableData.id} className="text-center">
                <td>{tableData.tableNumber}</td>
                <td>{tableData.seats}</td>
                <td>{tableData.gameType}</td>
                <td>
                  {" "}
                  <button className="border-2 rounded px-2">
                    {" "}
                    <Link to={tableData.id}> View</Link>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export const loader = async ({}: LoaderFunctionArgs) => {
  const tables = await getTables();
  const tableCount = await getTablesCount();
  return { tables, tableCount };
};
