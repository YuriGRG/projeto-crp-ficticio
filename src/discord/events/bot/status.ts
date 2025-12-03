import { createEvent } from "#base";
import { ActivityType } from "discord.js";

createEvent({
    name: "statusdcbot",
    event: "ready",
    async run(client) {
        client.user.setStatus("dnd");

        const statuses = [
            { name: "Servidor Em Desenvolvimento (12/2025)", type: ActivityType.Watching },
            { name: "Capital Roleplay Bot Oficial", type: ActivityType.Playing },
            { name: "Sistema Em Desenvolvimento (12/2025)", type: ActivityType.Listening },
            { name: "Visual Studio Code", type: ActivityType.Playing },
            { name: "Node.js", type: ActivityType.Playing },
            { name: ".env <- meu token está aqui", type: ActivityType.Playing },
        ];

        let index = 0;

        setInterval(() => {
            const status = statuses[index];
            client.user.setActivity(status.name, { type: status.type });

            index = (index + 1) % statuses.length;
        }, 10_000);
    },
});
