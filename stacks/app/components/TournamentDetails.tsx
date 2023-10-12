import { TournamentEntry } from "~/data/tournaments.server";

export default function TournamentList({
  tournament,
}: {
  tournament: TournamentEntry;
}) {
  return (
    <>
      <div className="grid justify-center text-center">
        <div className="flex justify-left">
          <label className="font-bold px-2">Name:</label>
          <p>{tournament.name}</p>
        </div>
        <div className="flex justify-left">
          <label className="font-bold px-2">Date:</label>
          <p>{new Date(tournament.date).toLocaleDateString()}</p>
        </div>
        <div className="flex justify-left">
          <label className="font-bold px-2">Game:</label>
          <p>{tournament.gameType}</p>
        </div>
        <div className="flex justify-left">
          <label className="font-bold px-2">Buy In:</label>
          <p>${tournament.buyin}</p>
        </div>
        <div className="flex justify-left">
          <label className="font-bold px-2">Registered Players:</label>
          <p>{tournament.registeredPlayers}</p>
        </div>
        <div className="flex justify-left">
          <label className="font-bold px-2">Type:</label>
          <p className="text-wrap w-24">{tournament.attributes.join(", ")}</p>
        </div>
        <div className="flex justify-left">
          <label className="font-bold px-2">Status:</label>
          <p>{tournament.status}</p>
        </div>
        {tournament.description && (
          <div className="flex justify-left">
            <label className="font-bold px-2">Description:</label>
            <p>{tournament.description}</p>
          </div>
        )}

        <div className="flex justify-left">
          <label className="font-bold px-2">Minimum Players:</label>
          <p>{tournament.minimumPlayers}</p>
        </div>
        {tournament.maximumPlayers && (
          <div className="flex justify-left">
            <label className="font-bold px-2">Maximuim Players:</label>
            <p>{tournament.maximumPlayers}</p>
          </div>
        )}
        <div className="flex justify-left">
          <label className="font-bold px-2">Remaining Players:</label>
          <p>{tournament.remainingPlayers}</p>
        </div>
        <div className="flex justify-left">
          <label className="font-bold px-2">Starting Chips:</label>
          <p>{tournament.startingChips}</p>
        </div>
        <div className="flex justify-left">
          <label className="font-bold px-2">Blinds:</label>
          <p>{tournament.blindIncreaseMinutes} Minutes</p>
        </div>
        <div className="flex justify-left">
          <label className="font-bold px-2">
            Late Registration Until Level:
          </label>
          <p>{tournament.lateRegistrationLevel}</p>
        </div>
        {tournament.rebuyNumber && (
          <div className="flex justify-left">
            <label className="font-bold px-2">Number Of Rebuys Allowed:</label>
            <p>{tournament.rebuyNumber}</p>
          </div>
        )}
        {tournament.rebuyCost && (
          <div className="flex justify-left">
            <label className="font-bold px-2">Rebuy Cost:</label>
            <p>${tournament.rebuyCost}</p>
          </div>
        )}
        {tournament.rebuyChips && (
          <div className="flex justify-left">
            <label className="font-bold px-2">Number Of Rebuy Chips:</label>
            <p>{tournament.rebuyChips}</p>
          </div>
        )}
        {tournament.maximumRebuyChips && (
          <div className="flex justify-left">
            <label className="font-bold px-2">Max Rebuy Chips:</label>
            <p>{tournament.maximumRebuyChips}</p>
          </div>
        )}
        {tournament.rebuyTimeMinutes && (
          <div className="flex justify-left">
            <label className="font-bold px-2">Rebuy Time:</label>
            <p>{tournament.rebuyTimeMinutes} Minutes</p>
          </div>
        )}
        {tournament.addOnsNumber && (
          <div className="flex justify-left">
            <label className="font-bold px-2">Add Ons Allowed:</label>
            <p>{tournament.addOnsNumber}</p>
          </div>
        )}
        {tournament.addOnsCost && (
          <div className="flex justify-left">
            <label className="font-bold px-2">Add On Cost:</label>
            <p>${tournament.addOnsCost}</p>
          </div>
        )}
        {tournament.addOnsChips && (
          <div className="flex justify-left">
            <label className="font-bold px-2">Add On Chips:</label>
            <p>{tournament.addOnsChips}</p>
          </div>
        )}
        <div className="flex justify-left">
          <label className="font-bold px-2">Deal Making:</label>
          <p>{tournament.dealMaking ? "Yes" : "No"}</p>
        </div>
      </div>
    </>
  );
}
