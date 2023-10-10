import type { LoaderFunctionArgs } from "@remix-run/node";

import { useLoaderData, Link } from "@remix-run/react";
import { TableList, getTables } from "~/data/stacks.server";

export default function Tables() {
  const tables = useLoaderData<typeof loader>();

  return (
    <>
      <div className="flex justify-center text-center py-5">
        <h1 className="text-2xl">Tables</h1>
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
  return tables;
};
