import { Guild, GuildMember } from "discord.js";

export async function getMemberFromChannelName(channelName: string, guild: Guild): Promise<GuildMember | null> {
  const idMatch = channelName.match(/\|\s*(\d{17,20})$/);

  if (!idMatch || !idMatch[1]) {
    console.warn(`Não foi possível extrair o ID do nome do canal: ${channelName}`);
    return null;
  }

  const userId = idMatch[1];

  try {
    const member = await guild.members.fetch(userId);
    return member;
  } catch (error) {
    console.error(`Erro ao buscar o membro com ID ${userId}:`, error);
    return null;
  }
}
