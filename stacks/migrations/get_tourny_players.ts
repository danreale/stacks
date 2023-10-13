import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  //   const tournyAttributes = await prisma.tournament.findMany({
  //     where: { id: "652945ca78965458cd8edbfa" },
  //     include: { TournamentPlayer: true },
  //   });
  //   const tournyAttributes = await prisma.tournamentPlayer.aggregate({
  //     _count: { tournamentId: true },
  //     where: { tournamentId: "652945ca78965458cd8edbfa" },
  //   });
  //   console.log(tournyAttributes);
}

main()
  .catch(async (e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
