import { ChatInputCommandInteraction } from 'discord.js';
import { fetchWeekly } from '../api.js';
import { buildMessageEmbed, buildErrorEmbed } from '../embeds.js';
import { logReplyRoute } from '../logging.js';

export async function handleWeekly(interaction: ChatInputCommandInteraction): Promise<void> {
  const name = interaction.options.getString('name', true);
  const from = interaction.options.getString('from') ?? undefined;
  const timezone = interaction.options.getString('timezone') ?? undefined;

  const result = await fetchWeekly(name, from, timezone);

  if ('error' in result) {
    logReplyRoute(interaction, 'error', result.error);
    await interaction.reply({ embeds: [buildErrorEmbed(result.error)] });
    return;
  }

  logReplyRoute(interaction, 'success');
  await interaction.reply({ embeds: [buildMessageEmbed(result.message, 'weekly')] });
}
