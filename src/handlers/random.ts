import { ChatInputCommandInteraction } from 'discord.js';
import { fetchRandom } from '../api.js';
import { buildMessageEmbed, buildErrorEmbed } from '../embeds.js';

export async function handleRandom(interaction: ChatInputCommandInteraction): Promise<void> {
  const name = interaction.options.getString('name', true);
  const from = interaction.options.getString('from') ?? undefined;

  const result = await fetchRandom(name, from);

  if ('error' in result) {
    await interaction.reply({ embeds: [buildErrorEmbed(result.error)] });
    return;
  }

  await interaction.reply({ embeds: [buildMessageEmbed(result.message, 'random')] });
}
