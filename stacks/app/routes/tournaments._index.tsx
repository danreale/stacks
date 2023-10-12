import { TOURNAMENT_STATUS, getTournaments } from "~/data/tournaments.server";
import { useLoaderData, Link } from "@remix-run/react";
import TournamentList from "~/components/TournamentsList";

export default function Tournaments() {
  const {
    registrationOpenGames,
    lateRegistrationGames,
    runningGames,
    completedGames,
    announcedGames,
  } = useLoaderData<typeof loader>();
  return (
    <>
      <TournamentList
        tournamentType="Registration Open"
        tournaments={registrationOpenGames}
      />
      <TournamentList
        tournamentType="Late Registration"
        tournaments={lateRegistrationGames}
      />
      <TournamentList tournamentType="Announced" tournaments={announcedGames} />
      <TournamentList tournamentType="Running" tournaments={runningGames} />
      <TournamentList tournamentType="Completed" tournaments={completedGames} />
    </>
  );
}

export const loader = async ({}) => {
  const tournaments = await getTournaments();

  const registrationOpenGames = tournaments?.filter(
    (tourny) => tourny.status === "Registration Open"
  );
  const lateRegistrationGames = tournaments?.filter(
    (tourny) => tourny.status === "Late Registration"
  );
  const runningGames = tournaments?.filter(
    (tourny) => tourny.status === "Running"
  );
  const completedGames = tournaments?.filter(
    (tourny) => tourny.status === "Completed"
  );
  const announcedGames = tournaments?.filter(
    (tourny) => tourny.status === "Announced"
  );
  return {
    registrationOpenGames,
    lateRegistrationGames,
    runningGames,
    completedGames,
    announcedGames,
  };
};
