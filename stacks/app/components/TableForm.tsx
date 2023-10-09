import {
  Form,
  useNavigation,
  useParams,
  useLoaderData,
} from "@remix-run/react";
import { GameTypeList } from "~/data/stacks.server";
import { useState } from "react";

export default function TableForm() {
  const params = useParams();
  const { tableData, gameTypes } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";
  const defaultValues = tableData
    ? {
        gameType: tableData.gameType,
        seats: tableData.seats,
        tableNumber: tableData.tableNumber,
      }
    : {
        gameType: "",
        seats: 9,
        tableNumber: "",
      };
  const [game, setGame] = useState(defaultValues.gameType);

  const handleChangeGame = (e: any) => {
    const gameType = e.target.value;
    setGame(gameType);
  };
  return (
    <>
      <div className="flex justify-center text-center">
        <Form
          method={tableData ? "put" : "post"}
          className="grid justify-center items-center text-center space-y-2"
        >
          <label className="">Game Type</label>
          <div className="space-x-2">
            <select
              id="game"
              name="gameType"
              onChange={handleChangeGame}
              className="border-2 border-white rounded text-center w-80"
              defaultValue={game}
            >
              {gameTypes.map((game: GameTypeList) => {
                return (
                  <option key={game.id} value={game.name}>
                    {game.name}
                  </option>
                );
              })}
            </select>
          </div>
          <label className="">Number of Seats</label>
          <div className="space-x-2">
            <input
              type="number"
              className="border-2 border-green-700 rounded"
              name="seats"
              defaultValue={defaultValues.seats}
            />
          </div>
          <label className="">Table Number</label>
          <div className="space-x-2">
            <input
              type="number"
              className="border-2 border-green-700 rounded"
              name="tableNumber"
              defaultValue={defaultValues.tableNumber}
            />
          </div>

          <div>
            <button disabled={isSubmitting} className="px-1 border-2 rounded">
              {isSubmitting ? "Saving..." : tableData ? "Update" : "Add"}
            </button>
          </div>
        </Form>
      </div>
      {params.id && (
        <div className="flex justify-center text-center pt-10">
          <Form method="delete">
            <div>
              <button className="border-2 border-red-500 px-2 rounded">
                {isSubmitting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </Form>
        </div>
      )}
    </>
  );
}
