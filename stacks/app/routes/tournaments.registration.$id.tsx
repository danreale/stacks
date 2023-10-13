import { ActionFunctionArgs } from "@remix-run/node";
import TournamentRegistrationForm from "~/components/TournamentRegistrationForm";
import {
  PLAYER,
  getTournamentPlayerCount,
  registerPlayer,
  updateTournamentPlayerCount,
} from "~/data/tournaments.server";
import { json } from "@remix-run/node";

export default function TournamentsRegistration() {
  return (
    <>
      <h1 className="flex justify-center text-center py-5 text-2xl">
        Tournament Registration
      </h1>
      <TournamentRegistrationForm />
    </>
  );
}

export async function action({ request, params }: ActionFunctionArgs) {
  const tournamentId = params.id;
  const formData = await request.formData();
  const registrationData = Object.fromEntries(formData);

  const data: PLAYER = {
    firstName: registrationData.firstName.toString(),
    lastName: registrationData.lastName.toString(),
    phoneNumber: registrationData.phoneNumber.toString(),
    tournamentId: tournamentId!!,
  };

  try {
    const player = await registerPlayer(data);
    const count = await getTournamentPlayerCount(data);
    await updateTournamentPlayerCount(tournamentId!!, count);
    return json({ message: player });
  } catch (error) {
    return error;
  }
}
