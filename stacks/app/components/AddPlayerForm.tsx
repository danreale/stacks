import {
  Form,
  useNavigation,
  useLoaderData,
  useActionData,
  Link,
} from "@remix-run/react";
import { useState } from "react";
import { WaitingListFull } from "~/data/stacks.server";

export default function WaitingListForm() {
  const data = useActionData<typeof action>();
  const waitingListGames = useLoaderData();
  console.log(waitingListGames);
  const waitingListOpen = waitingListGames.length > 0 ? true : false;
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  const [game, setGame] = useState("");

  const handleChangeGame = (e: any) => {
    const gameType = e.target.value;
    setGame(gameType);
  };

  return (
    <>
      {!waitingListOpen && (
        <div className="flex justify-center text-center">
          <p className="text-red-500 font-bold">
            We're not accepting any players right now. Please check back later.
          </p>
        </div>
      )}
      {waitingListOpen && (
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
              className="border-2 border-green-700 rounded text-center w-80"
              defaultValue={game}
              required
            >
              {waitingListGames.map((game: WaitingListFull) => {
                return (
                  <option key={game.id} value={game.gameType}>
                    {game.gameType}
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
                maxLength={10}
                pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
              />
            </div>

            <div>
              <button
                disabled={isSubmitting}
                className="px-1 border-2 rounded border-blue-500"
              >
                {isSubmitting ? "Joining..." : "Join Waiting List"}
              </button>
            </div>

            {data && (
              <div className="flex-col justify-center text-center">
                <p className="text-green-800 py-1">{`You have been added to the waiting list!`}</p>
                <p className="text py-1">{`Please save this confirmation id.`}</p>
                <p className="text py-1">{`You will need to present this to the manager.`}</p>
                <p className="text-red-500 py-10">{`${data.message}`}</p>
                <Link
                  to="/waitinglistplayers/public"
                  className="underline text-blue-500"
                >
                  View Waiting List
                </Link>
              </div>
            )}
          </Form>
        </div>
      )}
    </>
  );
}
