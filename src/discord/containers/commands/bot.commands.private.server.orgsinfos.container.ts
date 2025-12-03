import { brBuilder, createContainer, createSection, createSeparator, createTextDisplay } from "@magicyan/discord";
import { icon } from "../../../functions/utils/emojis.js";

export function serverOrgsInfoContainer() {
    return createContainer({
        components: [
            createSection(
                brBuilder(
                    `## ${icon.book}  Orgãos Públicos - CRP`,
                    `Esta lista apresenta uma breve descrição de cada organização pública do Roleplay, bem como o nome de seu atual comandante. Lembre-se de que, para ingressar em um órgão público, é necessário ser aprovado em concurso, cujos editais são publicados em <#${constants.channels.doespChannelId}>.`
                ),
                {
                    media: {
                        url: "attachment://CRP-PicturePrincipal.png"
                    }
                }
            ),
            createSeparator(true, true),
            createSection(
                brBuilder(
                    `### ${icon.pf}  Polícia Federal`,
                    "Atualmente, a instituição é dirigida pela Administração do servidor.",
                    "A Polícia Federal é uma instituição de segurança pública do Brasil. Sua principal função é investigar crimes federais, como tráfico de drogas, corrupção e contrabando. Também atua no controle de fronteiras, emissão de passaportes e combate ao crime organizado."
                ),
                {
                    media: {
                        url: "attachment://pf.png"
                    },
                }
            ),
            createTextDisplay(
                brBuilder(
                    // `-# Para ingressar nesta instituição você deve ser aprovado em um concurso de admissão. Estes são enviados no <#${constants.channels.doespChannelId}>`
                    `-# Para atuar nesta instituição é necessário entrar em contato por meio do canal <#${constants.channels.serviceChannelId}>`
                )
            ),
            createSeparator(true, false),
            createSection(
                brBuilder(
                    `### ${icon.prf}  Polícia Rodoviária Federal`,
                    "Atualmente, a instituição tem a atribuição de Superintendente Regional livre.",
                    "A Polícia Rodoviária Federal é responsável pela segurança e fiscalização nas rodovias e estradas federais. Atua no combate ao crime e na prevenção de acidentes."
                ),
                {
                    media: {
                        url: "attachment://prf.png"
                    },
                }
            ),
            createTextDisplay(
                brBuilder(
                    // `-# Para ingressar nesta instituição você deve ser aprovado em um concurso de admissão. Estes são enviados no <#${constants.channels.doespChannelId}>`
                    "-# Para ingressar na atruibuição de Superintendente Regional desta instituição você deve entrar em contato direto com a Administração."
                )
            ),
            createSeparator(true, false),
            createSection(
                brBuilder(
                    `### ${icon.pmesp}  Polícia Militar do Estado de São Paulo`,
                    "Atualmente, a instituição é dirigida pelo Comandante-Geral <@1121911920027517040>.",
                    "A Polícia Militar de São Paulo atua na linha de frente contra a criminalidade. Com presença constante nas ruas, realiza ações preventivas e ostensivas para proteger a população."
                ),
                {
                    media: {
                        url: "attachment://pmesp.png"
                    },
                }
            ),
            createTextDisplay(
                brBuilder(
                    `-# Para ingressar nesta instituição você deve ser aprovado em um concurso de admissão. Estes são enviados no <#${constants.channels.doespChannelId}>`
                )
            ),
            createSeparator(true, false),
            createSection(
                brBuilder(
                    `### ${icon.cbpmesp}  Corpo de Bombeiros da Polícia Militar do Estado de São Paulo`,
                    "Atualmente, a instituição é dirigida pelo comando da Polícia Militar.",
                    "O Corpo de Bombeiros da Polícia Militar atua em várias situações, como resgates, combate a incêndios, salvamentos e atendimento a vítimas em emergências."
                ),
                {
                    media: {
                        url: "attachment://cbpmesp.png"
                    },
                }
            ),
            createTextDisplay(
                brBuilder(
                    `-# Para ingressar nesta instituição você deve ser aprovado em um concurso de admissão. Estes são enviados no <#${constants.channels.doespChannelId}>`
                )
            ),
            createSeparator(true, false),
            createSection(
                brBuilder(
                    `### ${icon.pcesp}  Polícia Civil do Estado de São Paulo`,
                    "Atualmente, a instituição tem a atribuição de Delegado-Geral livre.",
                    "A Polícia Civil de São Paulo é responsável pela investigação de crimes concluídos. Também realiza operações de vigilância e executa mandados judiciais."
                ),
                {
                    media: {
                        url: "attachment://pcesp.png"
                    },
                }
            ),
            createTextDisplay(
                brBuilder(
                    // `-# Para ingressar nesta instituição você deve ser aprovado em um concurso de admissão. Estes são enviados no <#${constants.channels.doespChannelId}>`
                    "-# Para ingressar na atruibuição de Delegado Geral desta instituição você deve entrar em contato direto com a Administração."
                )
            ),
            createSeparator(true, false),
            createSection(
                brBuilder(
                    `### ${icon.gcm}  Guarda Civil Metropolitana`,
                    "Atualmente, a instituição tem a atribuição de Comandante-Geral livre.",
                    "A Guarda Municipal atua como uma força de segurança da cidade de São Paulo, com a missão de proteger bens, serviços e instalações do município. Seu trabalho inclui a vigilância de áreas públicas, como escolas, centros de saúde e espaços de lazer, promovendo segurança e apoio à população."
                ),
                {
                    media: {
                        url: "attachment://gcm.png"
                    },
                }
            ),
            createTextDisplay(
                brBuilder(
                    // `-# Para ingressar nesta instituição você deve ser aprovado em um concurso de admissão. Estes são enviados no <#${constants.channels.doespChannelId}>`
                    "-# Para ingressar na atruibuição de Comandante-Geral desta instituição você deve entrar em contato direto com a Administração."
                )
            ),
            createSeparator(true, false),
            createSection(
                brBuilder(
                    `### ${icon.cet}  Companhia de Engenharia e Tráfego`,
                    "Atualmente, a instituição é dirigida pela Administração do servidor.",
                    "A Companhia de Engenharia de Tráfego (CET) é responsável pela gestão do trânsito na cidade de São Paulo. Sua função é organizar o fluxo de veículos, promover a segurança viária e fiscalizar o cumprimento das leis de trânsito, atuando em ruas, avenidas e cruzamentos."
                ),
                {
                    media: {
                        url: "attachment://cet.png"
                    },
                }
            ),
            createTextDisplay(
                brBuilder(
                    `-# Para atuar nesta instituição é necessário ser um **Nível II+** ou entrar em contato por meio do canal <#${constants.channels.serviceChannelId}>`
                )
            )
        ]
    });
}