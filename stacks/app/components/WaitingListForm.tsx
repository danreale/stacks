import {
  Form,
  useNavigation,
  useParams,
  useLoaderData,
} from "@remix-run/react";
import { useState } from "react";
import { GameTypeList } from "~/data/stacks.server";

export default function WaitingListForm() {
  const params = useParams();
  const { waitingListData, gameTypes } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";
  const defaultValues = waitingListData
    ? {
        gameType: waitingListData.gameType,
        open: waitingListData.open,
      }
    : {
        gameType: "",
        open: false,
      };
  const [game, setGame] = useState(defaultValues.gameType);

  const handleChangeGame = (e: any) => {
    const gameType = e.target.value;
    setGame(gameType);
  };

  const [open_cb, setOpenCB] = useState(defaultValues.open);
  const handleOpenCB = (e) => {
    setOpenCB(e.target.checked);
  };
  return (
    <>
      <div className="flex justify-center text-center">
        <Form
          method={waitingListData ? "put" : "post"}
          className="grid justify-center items-center text-center space-y-2"
        >
          <label className="">Game Type</label>
          <select
            id="game"
            name="gameType"
            onChange={handleChangeGame}
            className="border-2 border-green-700 rounded text-center w-80"
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

          <div className="flex justify-center items-center space-x-2">
            <input
              id="open"
              type="checkbox"
              name="open"
              className="rounded"
              checked={open_cb}
              value={open_cb === true ? "true" : "false"}
              onChange={handleOpenCB}
            />
            <label htmlFor="finished-radio" className="">
              Open Waiting List?
            </label>
          </div>

          <div>
            <button
              disabled={isSubmitting}
              className="px-1 border-2 rounded border-blue-500"
            >
              {isSubmitting ? "Saving..." : waitingListData ? "Update" : "Add"}
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
