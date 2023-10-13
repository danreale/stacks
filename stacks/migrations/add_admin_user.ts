import { PrismaClient, ROLE } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const room = await prisma.room.createMany({
    data: [
      {
        roomName: "Stacks",
        description: "Main User",
        address: "test",
        city: "Test",
        state: "test",
        zip: "test",
        phone: "test",
        managerName: "Dan",
      },
    ],
  });

  console.log(room);
  const user = await prisma.roomAdmin.createMany({
    data: [
      {
        firstName: "Dan",
        lastName: "James",
        email: "support@stackspoker.com",
        password: "analtonight",
        role: ROLE.STACKS,
        roomId: "12345",
      },
    ],
  });

  console.log(user);
}

main()
  .catch(async (e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
