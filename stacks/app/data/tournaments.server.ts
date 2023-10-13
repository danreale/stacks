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
export type Attribute = {
  id: any;
  name: string;
};
export async function getTournamentAttributes() {
  try {
    const tournamentAttributes = await prisma.tournamentAttributes.findMany({});
    return tournamentAttributes;
  } catch (error) {
    console.log(error);
    return;
  }
}

export interface PLAYER {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  tournamentId: string;
}

export async function registerPlayer(data: PLAYER) {
  try {
    const player = await prisma.tournamentPlayer.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        tournamentId: data.tournamentId,
        phoneNumber: data.phoneNumber,
      },
    });
    console.log(player.id);
    return player.id;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to register player.");
  }
}

export async function getTournamentPlayerCount(data: PLAYER) {
  try {
    const pc = await prisma.tournamentPlayer.aggregate({
      _count: { tournamentId: true },
      where: { tournamentId: data.tournamentId },
    });

    console.log(pc._count.tournamentId);
    return pc._count.tournamentId;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get tournament player count.");
  }
}

export async function updateTournamentPlayerCount(
  tournamentId: string,
  count: number
) {
  try {
    return await prisma.tournament.update({
      where: { id: tournamentId },
      data: {
        registeredPlayers: count,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update tournament.");
  }
}
