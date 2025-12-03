import { brBuilder, createContainer, createSection, createSeparator, createTextDisplay } from "@magicyan/discord";
import { time, TimestampStyles, User } from "discord.js";
import { icon } from "../../../../functions/utils/emojis.js";

export function initWLThreadContainer(interactionUser: User) {
    return createContainer({
        components: [
            createSection(
                brBuilder(
                    `## ${icon.file} Questões Para Aprovação de Whitelist`,
                    `${icon.clock} ${time(new Date(), TimestampStyles.ShortDateTime)}`,
                    `-# Jogador: ${interactionUser}`,
                    `-# ID do Jogador: ${interactionUser.id}`
                ),
                {
                    media: {
                        url: interactionUser.displayAvatarURL()
                    },
                    description: `Perfil de ${interactionUser.username}`
                }
            ),
            createSeparator(true, true),
            createTextDisplay(
                brBuilder(
                    "Lembre-se de que sua Whitelist será analisada em até 24 horas. É de sua responsabilidade não entrar em contato com membros da Equipe de Suporte para solicitar a revisão.",
                    "",
                    "Caso sua Whitelist seja reprovada, você terá a oportunidade de refazê-la mais duas vezes. Após três tentativas malsucedidas, sua permanência no servidor será revogada.",
                    "Você terá 5 minutos para responder as perguntas, lembre-se que humanos irão revisar sua whitelist, saberemos caso pegue informações com outras pessoas.",
                    "Nenhuma informação das revisões são vazadas da equipe, seu nome e idade são mantidos em segurança."
                )
            )
        ]
    })
}