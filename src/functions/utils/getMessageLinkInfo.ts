export function getMessageLinkInfo(link: string) {
  const regex = /https:\/\/discord\.com\/channels\/(\d+)\/(\d+)\/(\d+)/;
  const match = link.match(regex);
  if (!match) throw new Error("Link de mensagem inválido.");
  
  const [, guildId, channelId, messageId] = match;
  return { guildId, channelId, messageId };
}
