import { createResponder, ResponderType } from "#base";
import { serviceContainerOpen } from "../../containers/responders/bot.responders.service.select.containerOpen.js";
import { getSolicitacaoMotivo, setSolicitacaoMotivo } from "./bot.responder.service.select.js";


createResponder({
    customId: "/staff/service/changereason",
    types: [ResponderType.StringSelect], cache: "cached",
    async run(interaction) {
        const selected = interaction.values?.[0];

        if (selected == "report.member") {
            setSolicitacaoMotivo("Denúncia Contra Membro");
        } else if (selected == "report.teammember") {
            setSolicitacaoMotivo("Denúncia Contra Membro da Equipe");
        } else if (selected == "requesthelp.characters") {
            setSolicitacaoMotivo("Solicitação de Ajuda Sobre Personagens");
        } else if (selected == "requesthelp.companies") {
            setSolicitacaoMotivo("Solicitação de Ajuda Sobre Empresas");
        } else if (selected == "requesthelp.whitelist") {
            setSolicitacaoMotivo("Solicitação de Ajuda Sobre Whitelist");
        } else if (selected == "requesthelp.allowlist") {
            setSolicitacaoMotivo("Solicitação de Ajuda Sobre Allowlist");
        } else if (selected == "requesthelp.account") {
            setSolicitacaoMotivo("Solicitação de Ajuda Sobre Contas");
        } else if (selected == "request.perm") {
            setSolicitacaoMotivo("Solicitação Permissões Especiais");
        } else if (selected == "review.punishment") {
            setSolicitacaoMotivo("Revisão de Punição");
        } else if (selected == "sponsor.raffle") {
            setSolicitacaoMotivo("Patrocinar um Sorteio");
        } else if (selected == "redeem.prize") {
            setSolicitacaoMotivo("Resgate de Prêmio");
        }

        await interaction.update({
            flags: ["IsComponentsV2"],
            components: [serviceContainerOpen(interaction.user, getSolicitacaoMotivo())]
        })
    },
});