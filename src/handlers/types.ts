import { ChatInputCommandInteraction } from 'discord.js';
import { fetchTypes } from '../api.js';
import { buildTypesEmbed, buildErrorEmbed } from '../embeds.js';

export async function handleTypes(interaction: ChatInputCommandInteraction): Promise<void> {
  const result = await fetchTypes();

  if ('error' in result) {
    await interaction.reply({ embeds: [buildErrorEmbed(result.error)] });
    return;
  }

  await interaction.reply({ embeds: [buildTypesEmbed(result.types)] });
}
