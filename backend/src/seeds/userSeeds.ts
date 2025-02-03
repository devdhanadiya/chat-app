import prisma from "../lib/db";

async function main() {
  const seedUsers = [
    {
      email: "william.clark@example.com",
      fullname: "William Clark",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      email: "benjamin.taylor@example.com",
      fullname: "Benjamin Taylor",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      email: "lucas.moore@example.com",
      fullname: "Lucas Moore",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      email: "henry.jackson@example.com",
      fullname: "Henry Jackson",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      email: "alexander.martin@example.com",
      fullname: "Alexander Martin",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
    },
    {
      email: "daniel.rodriguez@example.com",
      fullname: "Daniel Rodriguez",
      password: "123456",
      profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
    },
  ];

  await Promise.all(
    seedUsers.map((user) =>
      prisma.user.create({
        data: user,
      }),
    ),
  );
}

// Call the main function and handle errors
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
