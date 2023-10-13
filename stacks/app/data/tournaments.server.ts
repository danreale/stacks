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
  time: string;
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

export type TournamentAddEntry = {
  name: string;
  date: Date;
  time: string;
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

export async function addTournament(data: TournamentAddEntry) {
  try {
    return await prisma.tournament.create({
      data: data,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add tournament.");
  }
}

export async function updateTournament(data: TournamentEntry, id: any) {
  try {
    return await prisma.tournament.update({
      where: { id },
      data: data,
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update tournament.");
  }
}
export async function deleteTournament(id: any) {
  try {
    const tournament = await prisma.tournament.delete({
      where: { id },
    });
    return tournament;
  } catch (error) {
    console.log(error);
    return;
  }
}
export type Status = {
  id: any;
  status: string;
};
export async function getTournamentStatuses() {
  try {
    const tournamentStatuses = await prisma.tournamentStatus.findMany({});
    return tournamentStatuses;
  } catch (error) {
    console.log(error);
    return;
  }
}
export interface GameType {
  id: any;
  name: string;
}
export async function getTournamentGameTypes() {
  try {
    const tournamentGameTypes = await prisma.tournamentGameType.findMany({});
    return tournamentGameTypes;
  } catch (error) {
    console.log(error);
    return;
  }
}
