import {
  Form,
  useNavigation,
  useParams,
  useLoaderData,
} from "@remix-run/react";
import { useState } from "react";
import { Status } from "~/data/tournaments.server";

export default function TournamentForm() {
  const params = useParams();
  const { tournamentData, tournamentStatuses } = useLoaderData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  const [status, setStatus] = useState(tournamentData.status);

  const handleChangeStatus = (e: any) => {
    const status = e.target.value;
    setStatus(status);
  };

  return (
    <>
      <div className="flex justify-center text-center">
        <Form
          method="put"
          className="grid justify-center items-center text-center space-y-2"
        >
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
            <label className="">Remaining Players</label>
            <input
              type="number"
              className="border-2 border-green-700 rounded"
              name="remainingPlayers"
              defaultValue={tournamentData.remainingPlayers}
            />
          </div>

          <div>
            <button
              disabled={isSubmitting}
              className="px-1 border-2 rounded border-blue-500"
            >
              {/* {isSubmitting ? "Saving..." : waitingListData ? "Update" : "Add"} */}
              {isSubmitting ? "Saving..." : "Update"}
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
