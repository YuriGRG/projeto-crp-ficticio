import { createResponder, ResponderType } from "#base";
import { serviceContainerOpen } from "../../containers/responders/bot.responders.service.select.containerOpen.js";

let solicitacao_motivo = 'valor_inicial';

export function setSolicitacaoMotivo(novoValor: string) {
    solicitacao_motivo = novoValor;
}

export function getSolicitacaoMotivo() {
    return solicitacao_motivo;
}

createResponder({
    customId: "/staff/service",
    types: [ResponderType.StringSelect],
    cache: "cached",
    async run(interaction) {
        const selected = interaction.values?.[0];

        if (selected == "report.member") {
            solicitacao_motivo = "Denúncia Contra Membro"
        } else if (selected == "report.teammember") {
            solicitacao_motivo = "Denúncia Contra Membro da Equipe"
        } else if (selected == "requesthelp.characters") {
            solicitacao_motivo = "Solicitação de Ajuda Sobre Personagens"
        } else if (selected == "requesthelp.companies") {
            solicitacao_motivo = "Solicitação de Ajuda Sobre Empresas"
        } else if (selected == "requesthelp.whitelist") {
            solicitacao_motivo = "Solicitação de Ajuda Sobre Whitelist"
        } else if (selected == "requesthelp.allowlist") {
            solicitacao_motivo = "Solicitação de Ajuda Sobre Allowlist"
        } else if (selected == "requesthelp.account") {
            solicitacao_motivo = "Solicitação de Ajuda Sobre Contas"
        } else if (selected == "request.perm") {
            solicitacao_motivo = "Solicitação de Permissões Especiais"
        } else if (selected == "review.punishment") {
            solicitacao_motivo = "Revisão de Punição"
        } else if (selected == "sponsor.raffle") {
            solicitacao_motivo = "Patrocinar um Sorteio"
        } else if (selected == "redeem.prize") {
            solicitacao_motivo = "Resgate de Prêmio"
        }

        await interaction.reply({
            flags: ["Ephemeral", "IsComponentsV2"],
            components: [serviceContainerOpen(interaction.user, solicitacao_motivo)]
        })
    },
});