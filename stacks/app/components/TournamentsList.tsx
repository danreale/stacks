import { Link } from "@remix-run/react";
import { TournamentEntry } from "~/data/tournaments.server";

export default function TournamentList({
  tournaments,
  tournamentType,
}: {
  tournaments: Array<any>;
  tournamentType: string;
}) {
  return (
    <>
      <div className="flex-col justify-center text-center">
        <h1 className="text-4xl font-bold">{tournamentType}</h1>

        <div className="flex justify-center">
          <table className="table-auto">
            <thead className="text-2xl">
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Game</th>
                <th>Buy In</th>
                <th>Players</th>
                <th>Type</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tournaments.map((tournyData: TournamentEntry) => (
                <tr key={tournyData.id} className="text-center">
                  <td className="px-4">
                    {new Date(tournyData.date).toLocaleDateString()}
                  </td>
                  <td className="px-4">{tournyData.name}</td>
                  <td className="px-4">{tournyData.gameType}</td>
                  <td className="px-4">{tournyData.buyin}</td>
                  <td className="px-4">{tournyData.registeredPlayers}</td>
                  <td className="px-4">{tournyData.attributes.join(",")}</td>
                  <td className="px-4">
                    {" "}
                    <button className="border-2 rounded px-2">
                      {" "}
                      <Link to={`details/${tournyData.id}`}> View</Link>
                    </button>
                  </td>
                  {tournamentType !== "Running" &&
                    tournamentType !== "Complete" && (
                      <td className="px-4">
                        {" "}
                        <button className="border-2 rounded px-2">
                          {" "}
                          <Link to={`registration/${tournyData.id}`}>
                            {" "}
                            Register
                          </Link>
                        </button>
                      </td>
                    )}
                  <td className="px-4">
                    {" "}
                    <button className="border-2 rounded px-2">
                      {" "}
                      <Link to={`admin/${tournyData.id}`}> Admin</Link>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
