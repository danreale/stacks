import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { addGameType, GameType } from "~/data/stacks.server";
import { redirect } from "@remix-run/node";
import GameTypeForm from "~/components/GameTypeForm";
import {
  addTournament,
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
  // console.log(tournamentData.time.toString());
  const data: TournamentAddEntry = {
    name: tournamentData.name.toString(),
    date: new Date(tournamentData.date),
    time: tournamentData.time.toString(),
    gameType: tournamentData.gameType.toString(),
    buyin: tournamentData.buyin.toString(),
    registeredPlayers: parseInt(tournamentData.registeredPlayers.toString()),
    status: "Announced",
    attributes: ["6-Handed", "Knock Out", "Freeze Out"],
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
    dealMaking: tournamentData.dealMaking === "true",
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
  return { tournamentStatuses, tournamentGameTypes };
};
