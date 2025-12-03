import { brBuilder, createContainer, createSection, createSeparator } from "@magicyan/discord";
import { ComponentType, StringSelectMenuBuilder, User } from "discord.js";
import { icon } from "../../../functions/utils/emojis.js";

export function serviceContainerOpen_changeReason(interactionUser: User) {
    return createContainer({
        components: [
            createSection(
                brBuilder(
                    `## ${icon.user} Atendimento ao Usuário`,
                    `-# Usuário Solicitante: ${interactionUser}`,
                    `-# ID do Usuário: ${interactionUser.id}`
                ),
                {
                    media: {
                        url: interactionUser.displayAvatarURL()
                    },
                    description: `Perfil de ${interactionUser.username}`
                }
            ),
            createSeparator(true, true),
            new StringSelectMenuBuilder({
                customId: "/staff/service/changereason",
                max_values: 1,
                type: ComponentType.StringSelect,
                options: [
                    { label: "Denunciar um Membro", value: "report.member", emoji: icon.shield },
                    { label: "Denunciar um Membro da Equipe", value: "report.teammember", emoji: icon.shield },
                    { label: "Solicitar Ajuda Sobre Personagens", value: "requesthelp.characters", emoji: icon.user },
                    { label: "Solicitar Ajuda Sobre Empresas", value: "requesthelp.companies", emoji: icon.other_bank },
                    { label: "Solicitar Ajuda Sobre Whitelist", value: "requesthelp.whitelist", emoji: icon.file },
                    { label: "Solicitar Ajuda Sobre Allowlist", value: "requesthelp.allowlist", emoji: icon.clipboard },
                    { label: "Solicitar Ajuda Sobre Contas", value: "requesthelp.account", emoji: icon.user_remove },
                    { label: "Solicitar Permissões Especiais", value: "request.perm", emoji: icon.other_ticket },
                    { label: "Revisar Uma Punição", value: "review.punishment", emoji: icon.shield_x },
                    { label: "Patrocinar Um Sorteio", value: "sponsor.raffle", emoji: icon.other_wallet },
                    { label: "Resgatar Prêmio", value: "redeem.prize", emoji: icon.other_card },
                ],
                placeholder: "Selecione Qual Atendimento Desejas Receber"
            })
        ]
    })
}