import prisma from "../lib/prisma.js";

async function main() {
  // just try to read users
  const users = await prisma.user.findMany();
  console.log("Users:", users);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
