import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany();
  console.log("Users:", users);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error("Error:", e);
    prisma.$disconnect();
  });
