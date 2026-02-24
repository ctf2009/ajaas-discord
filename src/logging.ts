import { ChatInputCommandInteraction } from 'discord.js';

export function formatInteractionContext(interaction: ChatInputCommandInteraction): string {
  const guild = interaction.guildId ?? 'dm';
  const channel = interaction.channelId ?? 'unknown';
  const user = `${interaction.user.tag} (${interaction.user.id})`;
  return `guild=${guild} channel=${channel} user=${user}`;
}

export function formatCommandOptions(interaction: ChatInputCommandInteraction): string {
  const parts = interaction.options.data.map((option) => `${option.name}=${String(option.value ?? '')}`);
  return parts.length > 0 ? parts.join(', ') : 'none';
}

export function logReplyRoute(
  interaction: ChatInputCommandInteraction,
  result: 'success' | 'error',
  detail?: string
): void {
  const suffix = detail ? ` detail="${detail}"` : '';
  console.info(
    `[discord] reply ${result} command=/${interaction.commandName} -> ${formatInteractionContext(interaction)}${suffix}`
  );
}
