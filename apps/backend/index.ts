import express from "express";
import { prismaClint } from "@repo/db/client";

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
    const users = await prismaClint.user.findMany(
        {
            include: {
                todos: true
            }
        }

    );
    res.json(users);
})

app.post("/", async (req, res) => {
    const username = `Arslan ${Math.floor(1000 + Math.random() * 9000)}`
    const password = `Password ${Math.floor(1000 + Math.random() * 9000)}`
    const task = `Task ${Math.floor(1000 + Math.random() * 9000)}`
    const user = await prismaClint.user.create({
        data: {
            username, password,
            todos: {
                create: {
                    task,
                    done: true
                }
            }
        }
    })
    res.send(`user is created ${user.id}  `);

})


app.listen(3001, () => {
    console.log("Server is running on port 3001");
})