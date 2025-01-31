import { prisma } from "../lib/db";

async function main() {
    const seedUsers = [
        {
            email: "william.clark@example.com",
            fullname: "William Clark",
            username: "william_clark",
            password: "123456",
            profilePic: "https://randomuser.me/api/portraits/men/2.jpg",
        },
        {
            email: "benjamin.taylor@example.com",
            fullname: "Benjamin Taylor",
            username: "benjamin_taylor",
            password: "123456",
            profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
        },
        {
            email: "lucas.moore@example.com",
            fullname: "Lucas Moore",
            username: "lucas_moore",
            password: "123456",
            profilePic: "https://randomuser.me/api/portraits/men/4.jpg",
        },
        {
            email: "henry.jackson@example.com",
            fullname: "Henry Jackson",
            username: "henry_jackson",
            password: "123456",
            profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
        },
        {
            email: "alexander.martin@example.com",
            fullname: "Alexander Martin",
            username: "alexander_martin",
            password: "123456",
            profilePic: "https://randomuser.me/api/portraits/men/6.jpg",
        },
        {
            email: "daniel.rodriguez@example.com",
            fullname: "Daniel Rodriguez",
            username: "daniel_rodriguez",
            password: "123456",
            profilePic: "https://randomuser.me/api/portraits/men/7.jpg",
        },
    ];

    for (const user of seedUsers) {
        await prisma.user.create({
            data: user,
        });
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });