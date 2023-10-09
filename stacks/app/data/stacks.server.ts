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
    const gameTypes = await prisma.gameType.findMany({});
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