import { createResponder, ResponderType } from "#base";
import { ChannelType } from "discord.js";
import { handleWhitelistQuestions } from "../../../functions/whitelist/bot.whitelist.handlequestions.js";
import { initWLThreadButtonContainer } from "../../containers/responders/whitelist/bot.responder.whitelist.initThread.js";
import { initWLThreadContainer } from "../../containers/responders/whitelist/bot.responder.whitelist.thread.init.js";
import { whitelistInitLogContainer } from "../../containers/responders/whitelist/bot.whitelist.open.container.log.js";

createResponder({
    customId: "whitelist/open",
    types: [ResponderType.Button], cache: "cached",
    async run(interaction) {
        const channellog = await interaction.guild.channels.fetch(constants.channels.logsChannelId);

        // await interaction.reply({
        //     flags: ["Ephemeral"],
        //     content: `${icon.action_x} A Whitelist está desativada no momento. Caso não funcione em 24h, entre em contato com a equipe.`
        // })

        if (interaction.channel && interaction.channel.type === ChannelType.GuildText) {
            const whitelistthread = await interaction.channel.threads.create({
                name: `${interaction.user.username} | ${interaction.user.id}`,
                autoArchiveDuration: 60,
                type: ChannelType.PrivateThread,
                reason: `Whitelist | ${interaction.user.username}`,
            });

            await interaction.reply({
                flags: ["Ephemeral", "IsComponentsV2"],
                components: [initWLThreadButtonContainer(interaction.user, interaction.guild, whitelistthread)]
            })

            setTimeout(() => {
                handleWhitelistQuestions(whitelistthread, interaction.user.id);
            }, 10_000);

            await whitelistthread.send({
                flags: ["IsComponentsV2"],
                components: [initWLThreadContainer(interaction.user)]
            });

            const messageinit = await whitelistthread.send({
                content: `<@&${constants.roles.equipeRoleId}>`
            });

            await messageinit.delete();
        }

        if (channellog && channellog.isTextBased()) {
            await channellog.send({
                flags: ["IsComponentsV2"],
                allowedMentions: { parse: [] },
                components: [whitelistInitLogContainer(interaction.member)]
            });
        }
    },
});