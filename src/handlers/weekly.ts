import { ChatInputCommandInteraction } from 'discord.js';
import { fetchWeekly } from '../api.js';
import { buildMessageEmbed, buildErrorEmbed } from '../embeds.js';

export async function handleWeekly(interaction: ChatInputCommandInteraction): Promise<void> {
  const name = interaction.options.getString('name', true);
  const from = interaction.options.getString('from') ?? undefined;
  const timezone = interaction.options.getString('timezone') ?? undefined;

  const result = await fetchWeekly(name, from, timezone);

  if ('error' in result) {
    await interaction.reply({ embeds: [buildErrorEmbed(result.error)] });
    return;
  }

  await interaction.reply({ embeds: [buildMessageEmbed(result.message, 'weekly')] });
}
