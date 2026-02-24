import { ChatInputCommandInteraction } from 'discord.js';
import { fetchRandom } from '../api.js';
import { buildMessageEmbed, buildErrorEmbed } from '../embeds.js';
import { logReplyRoute } from '../logging.js';

export async function handleRandom(interaction: ChatInputCommandInteraction): Promise<void> {
  const name = interaction.options.getString('name', true);
  const from = interaction.options.getString('from') ?? undefined;

  const result = await fetchRandom(name, from);

  if ('error' in result) {
    logReplyRoute(interaction, 'error', result.error);
    await interaction.reply({ embeds: [buildErrorEmbed(result.error)] });
    return;
  }

  logReplyRoute(interaction, 'success');
  await interaction.reply({ embeds: [buildMessageEmbed(result.message, 'random')] });
}
