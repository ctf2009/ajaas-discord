import 'dotenv/config';
import { REST, Routes } from 'discord.js';
import { config } from './config.js';
import { commands } from './commands.js';

const rest = new REST().setToken(config.discordToken);
const commandData = commands.map(cmd => cmd.toJSON());

// Clear old guild commands if guild ID is set
if (config.discordGuildId) {
  await rest.put(
    Routes.applicationGuildCommands(config.discordClientId, config.discordGuildId),
    { body: [] },
  );
  console.log('Cleared guild commands.');
}

// Register global commands (works everywhere including user installs)
await rest.put(
  Routes.applicationCommands(config.discordClientId),
  { body: commandData },
);
console.log(`Registered ${commandData.length} global commands (may take up to 1 hour to propagate).`);
