import { ChatInputCommandInteraction } from 'discord.js';
import { fetchMessage } from '../api.js';
import { buildMessageEmbed, buildErrorEmbed } from '../embeds.js';
import { logReplyRoute } from '../logging.js';

export async function handleMessage(interaction: ChatInputCommandInteraction): Promise<void> {
  const type = interaction.options.getString('type', true);
  const name = interaction.options.getString('name', true);
  const from = interaction.options.getString('from') ?? undefined;

  const result = await fetchMessage(type, name, from);

  if ('error' in result) {
    logReplyRoute(interaction, 'error', result.error);
    await interaction.reply({ embeds: [buildErrorEmbed(result.error)] });
    return;
  }

  logReplyRoute(interaction, 'success');
  await interaction.reply({ embeds: [buildMessageEmbed(result.message, type)] });
}
