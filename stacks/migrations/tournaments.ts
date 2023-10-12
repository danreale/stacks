import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const tournaments = await prisma.tournament.createMany({
    data: [
      {
        name: "Dans First Tourny",
        date: new Date("2023-10-05"),
        gameType: "No Limit Holdem",
        buyin: 125,
        registeredPlayers: 0,
        status: "Announced",
        attributes: ["6-Handed", "Knock Out", "Freeze Out"],
        description: "Testing this out",
        minimumPlayers: 9,
        maximumPlayers: 1500,
        remainingPlayers: 0,
        startingChips: 30000,
        blindIncreaseMinutes: 30,
        lateRegistrationLevel: 10,
        dealMaking: true,
      },
    ],
  });

  console.log(tournaments);
}

main()
  .catch(async (e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
