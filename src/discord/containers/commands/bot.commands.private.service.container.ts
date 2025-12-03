import { brBuilder, createContainer, createMediaGallery, createSeparator, createTextDisplay } from "@magicyan/discord";
import { ComponentType, StringSelectMenuBuilder } from "discord.js";
import { icon } from "../../../functions/utils/emojis.js";

const filenames = ["CRP-Atendimento_Banner"];

export function serviceContainer() {

    return createContainer({
        components: [
            createMediaGallery(
                filenames.map(name => ({
                    media: {
                        url: `attachment://${name}.png`
                    }
                }))
            ),
            createSeparator(true, true),
            createTextDisplay(
                brBuilder(
                    `Ao iniciar seu atendimento, explique detalhadamente o que precisa e diga como podemos ajudar.`,
                    "",
                    `Não inicie um atendimento sem um motivo.`,
                    `Não use **@menções** no atendimento, aguarde, iremos atender.`,
                    `Não inicie um atendimento apenas para testes.`,
                    "",
                    `Inicie atendimentos na **categoria certa**. Atendimentos na categoria errada serão **DELETADOS**.`
                )
            ),
            createSeparator(true, false),
            new StringSelectMenuBuilder({
                customId: "/staff/service",
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
    });
}