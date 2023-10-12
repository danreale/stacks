import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const tournyStatuses = await prisma.tournamentStatus.createMany({
    data: [
      //   { status: "Announced" },
      //   { status: "Registration Open" },
      //   { status: "Late Registration" },
      //   { status: "Running" },
      //   { status: "Completed" },
    ],
  });

  console.log(tournyStatuses);
}

main()
  .catch(async (e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
