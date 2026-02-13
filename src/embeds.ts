import { EmbedBuilder } from 'discord.js';

const COLORS: Record<string, number> = {
  awesome: 0xffd700,
  weekly: 0x4caf50,
  random: 0x9c27b0,
  animal: 0x8bc34a,
  absurd: 0xff5722,
  meta: 0x2196f3,
  unexpected: 0xe91e63,
  toughLove: 0x607d8b,
  error: 0xf44336,
  types: 0x00bcd4,
};

export function buildMessageEmbed(message: string, commandType: string): EmbedBuilder {
  return new EmbedBuilder()
    .setTitle('Awesome Job!')
    .setDescription(message)
    .setColor(COLORS[commandType] ?? COLORS.awesome)
    .setFooter({ text: 'Powered by AJaaS \u2022 ajaas.io' })
    .setTimestamp();
}

export function buildTypesEmbed(types: string[]): EmbedBuilder {
  const list = types.map(t => `\u2022 ${t}`).join('\n');
  return new EmbedBuilder()
    .setTitle('Available Message Types')
    .setDescription(list)
    .setColor(COLORS.types)
    .setFooter({ text: 'Powered by AJaaS \u2022 ajaas.io' })
    .setTimestamp();
}

export function buildErrorEmbed(error: string): EmbedBuilder {
  return new EmbedBuilder()
    .setTitle('Oops!')
    .setDescription(error)
    .setColor(COLORS.error)
    .setTimestamp();
}
