import {
  LoaderFunctionArgs,
  ActionFunctionArgs,
  redirect,
} from "@remix-run/node";
import EditTournamentForm from "~/components/EditTournamentForm";
import {
  UPDATE_TOURNAMENT,
  deleteTournament,
  getTournamentStatuses,
  getTournmentById,
  updateTournamentStatus,
} from "~/data/tournaments.server";
import { useLoaderData } from "@remix-run/react";

export default function EditTournament() {
  return (
    <>
      <h1 className="flex justify-center text-center py-5 text-2xl">
        Tournament Details
      </h1>
      <EditTournamentForm />
    </>
  );
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const tournamentId = params.id;
  const tournamentData = await getTournmentById(tournamentId);
  const tournamentStatuses = await getTournamentStatuses();
  return { tournamentData, tournamentStatuses };
};

export async function action({ request, params }: ActionFunctionArgs) {
  const tournamentId = params.id;
  if (request.method === "PUT") {
    const formData = await request.formData();
    const tournamentData = Object.fromEntries(formData);

    const data: UPDATE_TOURNAMENT = {
      status: tournamentData.status.toString(),
      remainingPlayers: parseInt(tournamentData.remainingPlayers.toString()),
    };
    try {
      await updateTournamentStatus(tournamentId!!, data);
      return redirect("/tournaments");
    } catch (error) {
      return error;
    }
  }

  if (request.method === "DELETE") {
    try {
      await deleteTournament(tournamentId);
      return redirect("/tournaments");
    } catch (error) {
      return error;
    }
  }
}
