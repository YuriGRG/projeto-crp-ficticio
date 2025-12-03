import { brBuilder, createContainer, createSection } from "@magicyan/discord";
import { GuildMember, User } from "discord.js";
import { icon } from "../../../functions/utils/emojis.js";

export function threadDeleteContainer(solicitante: GuildMember, solicitacao_motivo: string, interaction: User) {
    return createContainer({
        components: [
            createSection(
                brBuilder(
                    `## ${icon.user} Atendimento ao Usuário`,
                    `-# Usuário Solicitante: ${solicitante.user}`,
                    `-# ID do Usuário: ${solicitante.user.id}`,
                    `-# Motivo do Usuário: ${solicitacao_motivo}`,
                    `-# Atendimento Sendo Deletado (10s): ${interaction}`
                ),
                {
                    media: {
                        url: solicitante.user.displayAvatarURL()
                    },
                    description: `Perfil de ${solicitante.user.username}`
                }
            )
        ]
    });
}