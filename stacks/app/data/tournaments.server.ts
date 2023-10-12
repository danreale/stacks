import { prisma } from "./database.server";

export const TOURNAMENT_STATUS = [
  "Registration Open",
  "Late Registration",
  "Announced",
  "Running",
  "Completed",
];

export const TOURNAMENT_ATTRIBUTES: Array<string> = [
  "Heads Up",
  "Private",
  "Deep Stack",
  "Teams",
  "6 Handed",
  "8 Handed",
  "Knock Out",
  "Rebuy/Add-On",
  "Turbo",
  "Hyper Turbo",
  "Satellite",
  "Guaranteed",
  "Special Series",
  "Freezeout",
];

export type TournamentEntry = {
  id: string;
  name: string;
  date: Date;
  gameType: string;
  buyin: number;
  registeredPlayers: number;
  status: string;
  attributes: Array<string>;
  description?: string;
  minimumPlayers: number;
  maximumPlayers?: number;
  remainingPlayers: number;
  startingChips: number;
  blindIncreaseMinutes: number;
  lateRegistrationLevel: number;
  rebuyNumber?: number;
  rebuyCost?: number;
  rebuyChips?: number;
  maximumRebuyChips?: number;
  rebuyTimeMinutes?: number;
  addOnsNumber?: number;
  addOnsCost?: number;
  addOnsChips?: number;
  dealMaking: boolean;
};

export async function getTournaments() {
  try {
    const tournaments = await prisma.tournament.findMany({
      orderBy: { date: "asc" },
    });
    return tournaments;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function getTournmentById(id: any) {
  try {
    const tournament = await prisma.tournament.findFirst({
      where: { id },
    });
    return tournament;
  } catch (error) {
    console.log(error);
    return;
  }
}
