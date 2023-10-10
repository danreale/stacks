import { Form, useNavigation, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { GameTypeList } from "~/data/stacks.server";

export default function WaitingListForm() {
  const { gameTypes } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  const [game, setGame] = useState("");

  const handleChangeGame = (e: any) => {
    const gameType = e.target.value;
    setGame(gameType);
  };

  return (
    <>
      <div className="flex justify-center text-center">
        <Form
          method="post"
          className="grid justify-center items-center text-center space-y-5"
        >
          <label className="">Game Type</label>
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

          <div className="space-x-2">
            <input
              type="text"
              className="border-2 border-green-700 rounded"
              name="firstName"
              placeholder="First Name"
              required
            />
          </div>
          <div className="space-x-2">
            <input
              type="text"
              className="border-2 border-green-700 rounded"
              name="lastName"
              placeholder="Last Name"
              required
            />
          </div>

          {/* <div className="space-x-2">
            <input
              type="text"
              className="border-2 border-green-700 rounded"
              name="initials"
              placeholder="Initials"
              required
            />
          </div> */}

          <div className="space-x-2">
            <input
              type="tel"
              className="border-2 border-green-700 rounded"
              name="phoneNumber"
              placeholder="Phone Number"
              required
            />
          </div>

          <div>
            <button disabled={isSubmitting} className="px-1 border-2 rounded">
              {isSubmitting ? "Joining..." : "Join Waiting List"}
            </button>
          </div>
        </Form>
      </div>
    </>
  );
}
