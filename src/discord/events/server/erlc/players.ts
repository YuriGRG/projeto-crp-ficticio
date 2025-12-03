import { createEvent } from "#base";
import { createTextDisplay } from "@magicyan/discord";
import { Message } from "discord.js";
import { getPlayerListMessageId, setPlayerListMessageId } from "../../../../functions/utils/playerListStorage.js";
import { playersListContainer } from "../../../containers/events/bot.event.erlc.players.js";

createEvent({
    name: "playerListUpdate",
    event: "ready",
    async run(client) {
        const guild = client.guilds.cache.get(constants.guilds.capitalrpGuildId);
        if (!guild) return;

        const channel = await guild.channels.fetch(constants.channels.listPlayersChannelId);
        if (!channel?.isTextBased()) return;

        let containerMessage: Message<true> | null = null;

        const savedId = getPlayerListMessageId();
        if (savedId) {
            try {
                const msg = await channel.messages.fetch(savedId);
                containerMessage = msg;
            } catch {
                console.warn("[ERLC] Mensagem anterior não encontrada. Nova será criada.");
            }
        }

        if (!containerMessage) {
            containerMessage = await channel.send({
                flags: ["IsComponentsV2"],
                components: [createTextDisplay("Carregando Lista de Jogadores...")],
                allowedMentions: { parse: [] }
            });
            setPlayerListMessageId(containerMessage.id);
        }

        async function atualizar() {
            try {
                const resp = await fetch("https://api.policeroleplay.community/v1/server/players", {
                    method: "GET",
                    headers: {
                        "server-key": constants.keys.apiERLCKey,
                        Accept: "*/*"
                    }
                });

                const data = await resp.json() as Array<{
                    Team: string;
                    Player: string;
                    Callsign?: string;
                    Permission: string;
                }>;

                await containerMessage!.edit({
                    flags: ["IsComponentsV2"],
                    allowedMentions: { parse: [] },
                    components: [await playersListContainer(data, guild!)]
                });

            } catch (error) {
                console.error("[ERLC] Falha ao atualizar lista de jogadores:", error);
            }
        }

        await atualizar();
        setInterval(atualizar, 30 * 1000);
    }
});
