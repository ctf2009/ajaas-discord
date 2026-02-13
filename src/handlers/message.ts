import { ChatInputCommandInteraction } from 'discord.js';
import { fetchMessage } from '../api.js';
import { buildMessageEmbed, buildErrorEmbed } from '../embeds.js';

export async function handleMessage(interaction: ChatInputCommandInteraction): Promise<void> {
  const type = interaction.options.getString('type', true);
  const name = interaction.options.getString('name', true);
  const from = interaction.options.getString('from') ?? undefined;

  const result = await fetchMessage(type, name, from);

  if ('error' in result) {
    await interaction.reply({ embeds: [buildErrorEmbed(result.error)] });
    return;
  }

  await interaction.reply({ embeds: [buildMessageEmbed(result.message, type)] });
}
