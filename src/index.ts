import 'dotenv/config';
import { Client, Events, GatewayIntentBits } from 'discord.js';
import { config } from './config.js';
import { handleAwesome } from './handlers/awesome.js';
import { handleWeekly } from './handlers/weekly.js';
import { handleRandom } from './handlers/random.js';
import { handleMessage } from './handlers/message.js';
import { handleTypes } from './handlers/types.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Bot is online as ${readyClient.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  try {
    switch (interaction.commandName) {
      case 'awesome':
        await handleAwesome(interaction);
        break;
      case 'weekly':
        await handleWeekly(interaction);
        break;
      case 'random':
        await handleRandom(interaction);
        break;
      case 'message':
        await handleMessage(interaction);
        break;
      case 'types':
        await handleTypes(interaction);
        break;
      default:
        await interaction.reply({ content: 'Unknown command.', ephemeral: true });
    }
  } catch (error) {
    console.error(`Error handling /${interaction.commandName}:`, error);
    const reply = { content: 'Something went wrong. Please try again.', ephemeral: true };
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(reply);
    } else {
      await interaction.reply(reply);
    }
  }
});

client.login(config.discordToken);
