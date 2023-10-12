import { LoaderFunctionArgs } from "@remix-run/node";
import TournamentList from "~/components/TournamentDetails";
import { getTournmentById } from "~/data/tournaments.server";
import { useLoaderData } from "@remix-run/react";

export default function TournamentDetails() {
  const tournament = useLoaderData();
  return (
    <>
      <h1 className="flex justify-center text-center py-5 text-2xl">
        Tournament Details
      </h1>
      <TournamentList tournament={tournament} />
    </>
  );
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const tournamentId = params.id;
  const tournament = await getTournmentById(tournamentId);
  return tournament;
};
