import {
  Form,
  useNavigation,
  useParams,
  useLoaderData,
} from "@remix-run/react";
import { useState } from "react";
import { GameTypeList } from "~/data/stacks.server";
import Checkbox from "./Checkbox";
import { Attribute, Status } from "~/data/tournaments.server";

export default function TournamentForm() {
  const params = useParams();
  const { tournamentStatuses, tournamentGameTypes, tournamentAttributes } =
    useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  //   const defaultValues = waitingListData
  //     ? {
  //         gameType: waitingListData.gameType,
  //         open: waitingListData.open,
  //       }
  //     : {
  //         gameType: "",
  //         open: false,
  //       };
  const [game, setGame] = useState("No Limit Holdem");

  const handleChangeGame = (e: any) => {
    const gameType = e.target.value;
    setGame(gameType);
  };

  const [status, setStatus] = useState("Announced");

  const handleChangeStatus = (e: any) => {
    const status = e.target.value;
    setStatus(status);
  };

  // const [open_cb, setOpenCB] = useState(defaultValues.open);
  // const handleOpenCB = (e) => {
  //   setOpenCB(e.target.checked);
  // };
  return (
    <>
      <div className="flex justify-center text-center">
        <Form
          //   method={waitingListData ? "put" : "post"}
          method="post"
          className="grid justify-center items-center text-center space-y-2"
        >
          <div className="flex justify-left text-center space-x-2">
            <label className="">Name</label>
            <input
              type="text"
              className="border-2 border-green-700 rounded"
              name="name"
              //   defaultValue={defaultValues.name}
              required
            />
          </div>
          <div className="flex justify-left text-center space-x-2">
            <label className="">Date</label>
            <input
              type="date"
              className="border-2 border-green-700 rounded"
              name="date"
              required
              //   defaultValue={defaultValues.name}
            />
          </div>
          <div className="flex justify-left text-center space-x-2">
            <label className="">Time</label>
            <input
              type="time"
              className="border-2 border-green-700 rounded"
              name="time"
              required
              //   defaultValue={defaultValues.name}
            />
          </div>
          <div className="flex justify-left text-center space-x-2">
            <label className="">Game Type</label>
            <select
              id="game"
              name="gameType"
              onChange={handleChangeGame}
              className="border-2 border-green-700 rounded text-center w-80"
              defaultValue={game}
              required
            >
              {tournamentGameTypes.map((game: GameTypeList) => {
                return (
                  <option key={game.id} value={game.name}>
                    {game.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex justify-left text-center space-x-2">
            <label className="">Attributes</label>
            <ul>
              {tournamentAttributes.map((attribute: Attribute) => (
                <li key={attribute.id}>
                  <Checkbox label={attribute.name} id={attribute.name} />
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-left text-center space-x-2">
            <label className="">Status</label>
            <select
              id="status"
              name="status"
              onChange={handleChangeStatus}
              className="border-2 border-green-700 rounded text-center w-80"
              defaultValue={status}
              required
            >
              {tournamentStatuses.map((status: Status) => {
                return (
                  <option key={status.id} value={status.status}>
                    {status.status}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex justify-left text-center space-x-2">
            <label className="">Buy In</label>
            <input
              type="number"
              className="border-2 border-green-700 rounded"
              name="buyin"
              required
              //   defaultValue={defaultValues.name}
            />
          </div>
          <div className="flex justify-left text-center space-x-2">
            <label className="">Registered Players</label>
            <input
              type="number"
              className="border-2 border-green-700 rounded"
              name="registeredPlayers"
              defaultValue={0}
            />
          </div>
          <div className="flex justify-left text-center space-x-2">
            <label className="">Description</label>
            <input
              type="text"
              className="border-2 border-green-700 rounded"
              name="description"
              // defaultValue={""}
            />
          </div>
          <div className="flex justify-left text-center space-x-2">
            <label className="">Minimum Players</label>
            <input
              type="number"
              className="border-2 border-green-700 rounded"
              name="minimumPlayers"
              required
              //   defaultValue={defaultValues.name}
            />
          </div>
          <div className="flex justify-left text-center space-x-2">
            <label className="">Maximum Players</label>
            <input
              type="number"
              className="border-2 border-green-700 rounded"
              name="maximumPlayers"
              //   defaultValue={defaultValues.name}
            />
          </div>
          <div className="flex justify-left text-center space-x-2">
            <label className="">Remaining Players</label>
            <input
              type="number"
              className="border-2 border-green-700 rounded"
              name="remainingPlayers"
              defaultValue={0}
            />
          </div>
          <div className="flex justify-left text-center space-x-2">
            <label className="">Starting Chips</label>
            <input
              type="number"
              className="border-2 border-green-700 rounded"
              name="startingChips"
              required
              //   defaultValue={defaultValues.name}
            />
          </div>
          <div className="flex justify-left text-center space-x-2">
            <label className="">Blind Increase In Minutes</label>
            <input
              type="number"
              className="border-2 border-green-700 rounded"
              name="blindIncreaseMinutes"
              required
              //   defaultValue={defaultValues.name}
            />
          </div>
          <div className="flex justify-left text-center space-x-2">
            <label className="">Late Registration Level</label>
            <input
              type="number"
              className="border-2 border-green-700 rounded"
              name="lateRegistrationLevel"
              required
              //   defaultValue={defaultValues.name}
            />
          </div>
          <div className="flex justify-left text-center space-x-2">
            <label className="">Number Of Rebuys</label>
            <input
              type="number"
              className="border-2 border-green-700 rounded"
              name="rebuyNumber"
              //   defaultValue={defaultValues.name}
            />
          </div>
          <div className="flex justify-left text-center space-x-2">
            <label className="">Rebuy Cost</label>
            <input
              type="number"
              className="border-2 border-green-700 rounded"
              name="rebuyCost"
              //   defaultValue={defaultValues.name}
            />
          </div>
          <div className="flex justify-left text-center space-x-2">
            <label className="">Rebuy Chips</label>
            <input
              type="number"
              className="border-2 border-green-700 rounded"
              name="rebuyChips"
              //   defaultValue={defaultValues.name}
            />
          </div>
          <div className="flex justify-left text-center space-x-2">
            <label className="">Maximum Chips Allowed To Rebuy</label>
            <input
              type="number"
              className="border-2 border-green-700 rounded"
              name="maximumRebuyChips"
              //   defaultValue={defaultValues.name}
            />
          </div>
          <div className="flex justify-left text-center space-x-2">
            <label className="">Rebuy Time In Minutes</label>
            <input
              type="number"
              className="border-2 border-green-700 rounded"
              name="rebuyTimeMinutes"
              //   defaultValue={defaultValues.name}
            />
          </div>
          <div className="flex justify-left text-center space-x-2">
            <label className="">Number of Add Ons</label>
            <input
              type="number"
              className="border-2 border-green-700 rounded"
              name="addOnsNumber"
              //   defaultValue={defaultValues.name}
            />
          </div>
          <div className="flex justify-left text-center space-x-2">
            <label className="">Add On Cost</label>
            <input
              type="number"
              className="border-2 border-green-700 rounded"
              name="addOnsCost"
              //   defaultValue={defaultValues.name}
            />
          </div>
          <div className="flex justify-left text-center space-x-2">
            <label className="">Add Ons Chips</label>
            <input
              type="number"
              className="border-2 border-green-700 rounded"
              name="addOnsChips"
              //   defaultValue={defaultValues.name}
            />
          </div>
          <Checkbox label="Deal Making" id="dealMaking" />
          <div>
            <button
              disabled={isSubmitting}
              className="px-1 border-2 rounded border-blue-500"
            >
              {/* {isSubmitting ? "Saving..." : waitingListData ? "Update" : "Add"} */}
              {isSubmitting ? "Saving..." : "Add"}
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
