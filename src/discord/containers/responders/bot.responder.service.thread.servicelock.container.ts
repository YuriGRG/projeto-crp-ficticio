import { brBuilder, createContainer, createSection, createSeparator } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle, GuildMember, User } from "discord.js";
import { icon } from "../../../functions/utils/emojis.js";

export function threadServiceLockContainer(solicitante: GuildMember, solicitacao_motivo: string, interaction: User) {
    return createContainer({
        components: [
            createSection(
                brBuilder(
                    `## ${icon.user} Atendimento ao Usuário`,
                    `-# Usuário Solicitante: ${solicitante.user}`,
                    `-# ID do Usuário: ${solicitante.user.id}`,
                    `-# Motivo do Usuário: ${solicitacao_motivo}`,
                    `-# Atendimento Finalizado: ${interaction}`
                ),
                {
                    media: {
                        url: solicitante.user.displayAvatarURL()
                    },
                    description: `Perfil de ${solicitante.user.username}`
                }
            ),
            createSeparator(true, true),
            createSection(
                brBuilder(
                    `### ${icon.user_remove}  Deletar Atendimento`,
                    "-# Delete este atendimento!"
                ),
                new ButtonBuilder({
                    customId: `/staff/service/delete`,
                    emoji: icon.clipboard_x,
                    label: "Deletar",
                    style: ButtonStyle.Danger,
                })
            )
        ]
    });
}