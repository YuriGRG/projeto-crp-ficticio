import { ThreadChannel } from "discord.js";
import { whiteListFinalContainer } from "../../discord/containers/events/whitelist/bot.event.whitelist.final.js";
import { removeUsers } from "../utils/removeusersthread.js";

const whitelistQuestions = [
    "Diga-nos seu nome (informe seu nome real).",
    "Diga-nos sua idade (informe sua idade real).",
    "Você leu e está de acordo com todas as regras do servidor?",
    "Explique-nos qual conceito de AntiRp.",
    "Explique-nos qual seria sua reação caso você estivesse armado na rua e fosse abordado por 8 policiais militares da Força Tática. Justifique sua resposta.",
    "Explique-nos qual sua experiência com roleplay. (Caso não possua apenas envie -/-)",
    "Em uma sessão convencional de roleplay, qual profissão você escolheria para simular?",
    "É uma boa prática de roleplay apenas pegar seu veículo e andar pela cidade sem rumo? Justifique.",
    "É uma boa prática de roleplay atrapalhar ou se manter em ocorrências policiais sem nenhum contexto com seu personagem? Justifique."
];

async function askQuestion(thread: ThreadChannel, userId: string, question: string): Promise<string | null> {
    await thread.send(question);

    try {
        const collected = await thread.awaitMessages({
            filter: (m) => m.author.id === userId && !m.author.bot,
            max: 1,
            time: 300_000,
            errors: ['time'],
        });

        return collected.first()?.content ?? null;
    } catch (error) {
        await thread.send("Tempo esgotado para resposta. Encerrando o processo de whitelist.");
        return null;
    }
}

export async function handleWhitelistQuestions(thread: ThreadChannel, userId: string) {
    const guild = thread.guild;
    const member = await guild.members.fetch(userId).catch(() => null);

    if (!member) {
        await thread.send("Erro ao localizar seu perfil no servidor.");
        removeUsers(thread, guild);
        return;
    }

    const answers: string[] = [];

    for (const question of whitelistQuestions) {
        const answer = await askQuestion(thread, userId, question);
        if (answer === null) return;
        answers.push(answer);
    }

    await thread.send("Obrigado por responder todas as perguntas. Aguarde avaliação da equipe, sua whitelist será respondida em até 24h.");

    await thread.members.fetch();

    removeUsers(thread, guild);

    await thread.send({
        flags: ["IsComponentsV2"],
        components: [whiteListFinalContainer(member)]
    });
}
