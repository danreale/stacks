import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import {
  addTournament,
  getTournamentAttributes,
  getTournamentGameTypes,
  getTournamentStatuses,
  TournamentAddEntry,
} from "~/data/tournaments.server";
import TournamentForm from "~/components/TournamentForm";

export default function AddTournament() {
  return (
    <>
      <h1 className="flex justify-center text-center py-5 text-2xl">
        Add Tournament
      </h1>
      <TournamentForm />
    </>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const tournamentData = Object.fromEntries(formData);
  console.log("Tourny Form Data", tournamentData);

  const attributesA: Array<string> = [];
  for (const key in tournamentData) {
    if (tournamentData[key] === "on") {
      if (key !== "dealMaking") {
        attributesA.push(key);
      }
    }
  }
  console.log("Atts", attributesA);

  const data: TournamentAddEntry = {
    name: tournamentData.name.toString(),
    date: new Date(tournamentData.date.toString()),
    time: tournamentData.time.toString(),
    gameType: tournamentData.gameType.toString(),
    buyin: parseInt(tournamentData.buyin.toString()),
    registeredPlayers: parseInt(tournamentData.registeredPlayers.toString()),
    status: tournamentData.status.toString(),
    // attributes: ["6-Handed", "Knock Out", "Freeze Out"],
    attributes: attributesA,
    description: tournamentData.description.toString(),
    minimumPlayers: parseInt(tournamentData.minimumPlayers.toString()),
    maximumPlayers: parseInt(tournamentData.maximumPlayers.toString()),
    remainingPlayers: parseInt(tournamentData.remainingPlayers.toString()),
    startingChips: parseInt(tournamentData.startingChips.toString()),
    blindIncreaseMinutes: parseInt(
      tournamentData.blindIncreaseMinutes.toString()
    ),
    lateRegistrationLevel: parseInt(
      tournamentData.lateRegistrationLevel.toString()
    ),
    dealMaking: tournamentData.dealMaking === "on",
  };
  try {
    const te = await addTournament(data);
    console.log(te);
    return redirect("/tournaments");
  } catch (error) {
    return error;
  }
}

export const loader = async ({}: LoaderFunctionArgs) => {
  const tournamentStatuses = await getTournamentStatuses();
  const tournamentGameTypes = await getTournamentGameTypes();
  const tournamentAttributes = await getTournamentAttributes();
  return { tournamentStatuses, tournamentGameTypes, tournamentAttributes };
};
