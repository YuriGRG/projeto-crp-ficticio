import { Message } from 'discord.js';

export function extrairTextoDaMensagem(mensagem: Message): string | null {
  const containerBuscado = mensagem.components[0];

  if ('components' in containerBuscado && Array.isArray(containerBuscado.components)) {
    const innerComponents = containerBuscado.components;

    const contents = innerComponents
      .filter((component: any) => component?.data?.type === 10 && typeof component.data.content === 'string')
      .map((component: any) => component.data.content);

    return contents[0] ?? null;
  }

  return null;
}
