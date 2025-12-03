import { brBuilder, createContainer, createSection, createSeparator } from "@magicyan/discord";
import { ComponentType, GuildMember, UserSelectMenuBuilder } from "discord.js";
import { icon } from "../../../functions/utils/emojis.js";

export function threadSelectMemberAddContainer(solicitante: GuildMember, solicitacao_motivo: string) {
    return createContainer({
        components: [
            createSection(
                brBuilder(
                    `## ${icon.user} Atendimento ao Usuário`,
                    `-# Usuário Solicitante: ${solicitante.user}`,
                    `-# ID do Usuário: ${solicitante.user.id}`,
                    `-# Motivo do Usuário: ${solicitacao_motivo}`
                ),
                {
                    media: {
                        url: solicitante.user.displayAvatarURL()
                    },
                    description: `Perfil de ${solicitante.user.username}`
                }
            ),
            createSeparator(true, true),
            new UserSelectMenuBuilder({
                customId: "/staff/service/memberaddfinish",
                max_values: 1,
                type: ComponentType.UserSelect,
                placeholder: "Selecione O Membro Que Desejas Adicionar Ao Atendimento"
            })
        ]
    })
}