import { createResponder, ResponderType } from "#base";
import { ChannelType } from "discord.js";
import { initThreadSelectContainer } from "../../containers/responders/bot.responder.service.select.initThread.js";
import { initThreadContainer } from "../../containers/responders/bot.responders.service.thread.initThread.js";
import { getSolicitacaoMotivo } from "./bot.responder.service.select.js";

createResponder({
    customId: "/staff/service/open/confirm",
    types: [ResponderType.Button], cache: "cached",
    async run(interaction) {
        if (interaction.channelId != constants.channels.serviceChannelId) {
            interaction.reply({
                flags: ["Ephemeral"],
                content: "Como Você Usou Isso Em Outro Canal Cara?"
            })
            return;
        }

        if (interaction.channel && interaction.channel.type === ChannelType.GuildText) {
            const ticketthread = await interaction.channel.threads.create({
                name: `${interaction.user.username} | ${interaction.user.id}`,
                autoArchiveDuration: 60,
                type: ChannelType.PrivateThread,
                reason: `Atendimento Ao Usuário | ${interaction.user.username} | ${getSolicitacaoMotivo()}`,
            });

            await interaction.update({
                flags: ["IsComponentsV2"],
                components: [initThreadSelectContainer(interaction.user, interaction.guild, ticketthread)]
            })

            await ticketthread.send({
                flags: ["IsComponentsV2"],
                components: [initThreadContainer(interaction.user, getSolicitacaoMotivo())]
            });

            const messageinit = await ticketthread.send({
                content: `<@&${constants.roles.equipeRoleId}>`
            });

            await messageinit.delete();
        }
    },
});