import { WebSocketServer } from "ws";
import { prismaClint } from "@repo/db/client"

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', async (ws) => {

    console.log('client connected');

    const users = await prismaClint.user.findMany(
        {
            include: {
                todos: true
            }
        }

    );
    ws.send(`Welcome to the WebSocket server! Here are the users: ${JSON.stringify(users)}`);


    ws.on('message', (msg) => {
        console.log('received from client:', msg.toString());
        ws.send(`Server received: ${msg}`);
    });

    ws.on('close', () => {
        console.log('client disconnected');
    });
});