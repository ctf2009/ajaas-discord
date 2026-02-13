const discordToken = process.env.DISCORD_TOKEN;
const discordClientId = process.env.DISCORD_CLIENT_ID;
const discordGuildId = process.env.DISCORD_GUILD_ID;
const ajaasBaseUrl = process.env.AJAAS_BASE_URL || 'https://ajaas.io';

if (!discordToken) {
  throw new Error('DISCORD_TOKEN environment variable is required');
}

if (!discordClientId) {
  throw new Error('DISCORD_CLIENT_ID environment variable is required');
}

export const config = {
  discordToken,
  discordClientId,
  discordGuildId,
  ajaasBaseUrl,
};
