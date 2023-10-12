import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const tournyGames = await prisma.tournamentGameType.createMany({
    data: [
      //   { name: "No Limit Holdem" },
      //   { name: "Pot Limit Omaha" },
      //   { name: "Limit Holdem" },
    ],
  });

  console.log(tournyGames);
}

main()
  .catch(async (e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
