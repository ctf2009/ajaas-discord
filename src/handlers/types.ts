import { ChatInputCommandInteraction } from 'discord.js';
import { fetchTypes } from '../api.js';
import { buildTypesEmbed, buildErrorEmbed } from '../embeds.js';
import { logReplyRoute } from '../logging.js';

export async function handleTypes(interaction: ChatInputCommandInteraction): Promise<void> {
  const result = await fetchTypes();

  if ('error' in result) {
    logReplyRoute(interaction, 'error', result.error);
    await interaction.reply({ embeds: [buildErrorEmbed(result.error)] });
    return;
  }

  logReplyRoute(interaction, 'success');
  await interaction.reply({ embeds: [buildTypesEmbed(result.types)] });
}
