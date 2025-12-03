import { brBuilder, createContainer, createMediaGallery, createSeparator, createTextDisplay } from "@magicyan/discord";
import { ButtonBuilder, ButtonStyle } from "discord.js";

export function whiteListButtonContainer() {
    return createContainer({
        components: [
            createMediaGallery({
                media: {
                    url: `attachment://CRP-Whitelist_Banner.png`
                }
            }),
            createSeparator(true, true),
            createTextDisplay(
                brBuilder(
                    "Para realizar sua Whitelist, clique no botão abaixo. Desde já, esteja ciente de que algumas perguntas serão feitas com o objetivo de avaliarmos adequadamente sua capacidade para o Roleplay.",
                    "Lembre-se de que sua Whitelist será analisada em até 24 horas. É de sua responsabilidade não entrar em contato com membros da Equipe de Suporte para solicitar a revisão.",
                    "Caso sua Whitelist seja reprovada, você terá a oportunidade de refazê-la mais duas vezes. Após três tentativas malsucedidas, sua permanência no servidor será revogada."
                )
            ),
            createSeparator(true, false),
            new ButtonBuilder({
                custom_id: "whitelist/open",
                label: "Iniciar Whitelist",
                style: ButtonStyle.Success
            })
        ]
    });
}