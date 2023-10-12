import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const tournyAttributes = await prisma.tournamentAttributes.createMany({
    data: [
      // { name: "Heads Up" },
      // { name: "Private" },
      // { name: "Deep Stack" },
      // { name: "Teams" },
      // { name: "6-Handed" },
      // { name: "8-Handed" },
      // { name: "Knock Out" },
      // { name: "Rebuy/Add-On" },
      // { name: "Turbo" },
      // { name: "Hyper Turbo" },
      // { name: "Satellite" },
      // { name: "Guaranteed" },
      // { name: "Special Series" },
    ],
  });

  console.log(tournyAttributes);
}

main()
  .catch(async (e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
