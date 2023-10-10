import { prisma } from "./database.server";

export interface GameType {
  name: string;
}
export interface GameTypeList {
  id: any;
  name: string;
}

export async function addGameType(data: GameType) {
  const existingGameType = await prisma.gameType.findFirst({
    where: { name: data.name },
  });

  if (existingGameType) {
    const error = new Error(`Game Type ${data.name} exists already.`);
    throw error;
  }

  try {
    return await prisma.gameType.create({
      data: {
        name: data.name,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add game type.");
  }
}
export async function getGameTypes() {
  try {
    const gameTypes = await prisma.gameType.findMany({
      orderBy: { name: "asc" },
    });
    return gameTypes;
  } catch (error) {
    console.log(error);
    return;
  }
}
export async function getGameType(id: any) {
  try {
    const gameType = await prisma.gameType.findFirst({ where: { id } });
    return gameType;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function updateGameType(id: any, gameTypeData: GameType) {
  try {
    const gameType = await prisma.gameType.update({
      where: { id },
      data: {
        name: gameTypeData.name,
      },
    });
    return gameType;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function deleteGameType(id: any) {
  try {
    const gameType = await prisma.gameType.delete({
      where: { id },
    });
    return gameType;
  } catch (error) {
    console.log(error);
    return;
  }
}

export interface Table {
  name?: string;
  tableNumber: number;
  gameType: string;
  seats: number;
}
export interface TableList {
  id: any;
  tableNumber: number;
  gameType: string;
  seats: number;
}

export async function getTables() {
  try {
    const tables = await prisma.table.findMany({
      orderBy: { gameType: "asc" },
    });
    return tables;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function addTable(data: Table) {
  try {
    return await prisma.table.create({
      data: {
        tableNumber: data.tableNumber,
        seats: data.seats,
        gameType: data.gameType,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add table.");
  }
}
export async function getTable(id: any) {
  try {
    const table = await prisma.table.findFirst({ where: { id } });
    return table;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function updateTable(id: any, data: Table) {
  try {
    const table = await prisma.table.update({
      where: { id },
      data: {
        tableNumber: data.tableNumber,
        seats: data.seats,
        gameType: data.gameType,
      },
    });
    return table;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function deleteTable(id: any) {
  try {
    const table = await prisma.table.delete({
      where: { id },
    });
    return table;
  } catch (error) {
    console.log(error);
    return;
  }
}
export async function getWaitingList() {
  try {
    const waitingList = await prisma.waitingList.findMany({
      orderBy: { gameType: "asc" },
    });
    return waitingList;
  } catch (error) {
    console.log(error);
    return;
  }
}
export async function getOpenWaitingListGames() {
  try {
    const waitingList = await prisma.waitingList.findMany({
      where: { open: true },
      orderBy: { gameType: "asc" },
    });
    return waitingList;
  } catch (error) {
    console.log(error);
    return;
  }
}
export async function addWaitingList(data: WaitingList) {
  try {
    return await prisma.waitingList.create({
      data: {
        gameType: data.gameType,
        open: data.open,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add waiting list.");
  }
}

export interface WaitingList {
  gameType: string;
  open: boolean;
}
export interface WaitingListFull {
  id: any;
  gameType: string;
  open: boolean;
}

export async function updateWaitingList(id: any, data: WaitingList) {
  try {
    const waitingList = await prisma.waitingList.update({
      where: { id },
      data: {
        gameType: data.gameType,
        open: data.open,
      },
    });
    return waitingList;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function deleteWaitingList(id: any) {
  try {
    const waitingList = await prisma.waitingList.delete({
      where: { id },
    });
    return waitingList;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function getWaitingListOne(id: any) {
  try {
    const waitingList = await prisma.waitingList.findFirst({ where: { id } });
    return waitingList;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function closeWaitingLists() {
  try {
    // const waitingLists = await prisma.waitingList.findMany({});
    const waitingList = await prisma.waitingList.updateMany({
      // where: { id }, // when this opens to more than one user this filter needs to be uncommented
      data: {
        open: false,
      },
    });
    return waitingList;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function openWaitingLists() {
  try {
    // const waitingLists = await prisma.waitingList.findMany({});
    const waitingList = await prisma.waitingList.updateMany({
      // where: { id }, // when this opens to more than one user this filter needs to be uncommented
      data: {
        open: true,
      },
    });
    return waitingList;
  } catch (error) {
    console.log(error);
    return;
  }
}

export interface PLAYER {
  firstName: string;
  lastName: string;
  initials: string;
  phoneNumber: string;
  gameType: string;
}
export async function addPlayer(data: PLAYER) {
  try {
    const player = await prisma.player.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        initials: data.initials,
        phoneNumber: data.phoneNumber,
        gameType: data.gameType,
      },
    });
    return player.id;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to add player.");
  }
}

export async function getPlayersList() {
  try {
    const playersList = await prisma.player.findMany({
      select: { gameType: true, initials: true, id: true },
      orderBy: { gameType: "asc" },
    });
    return playersList;
  } catch (error) {
    console.log(error);
    return;
  }
}
export async function getPlayersListPublic() {
  try {
    const playersList = await prisma.player.findMany({
      select: { gameType: true, initials: true, id: true },
      orderBy: { gameType: "asc" },
    });
    return playersList;
  } catch (error) {
    console.log(error);
    return;
  }
}

export async function deletePlayerFromWaitingList(id: any) {
  try {
    const player = await prisma.player.delete({
      where: { id },
    });
    return player;
  } catch (error) {
    console.log(error);
    return;
  }
}
export async function getPlayersListCount() {
  try {
    const playersListCount = await prisma.player.groupBy({
      by: ["gameType"],
      _count: { gameType: true },
    });
    return playersListCount;
  } catch (error) {
    console.log(error);
    return;
  }
}
