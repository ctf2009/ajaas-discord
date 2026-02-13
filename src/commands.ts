import { ApplicationIntegrationType, InteractionContextType, SlashCommandBuilder } from 'discord.js';

const contexts = [InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel];
const integrationTypes = [ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall];

export const commands = [
  new SlashCommandBuilder()
    .setName('awesome')
    .setDescription('Send someone a compliment')
    .setIntegrationTypes(integrationTypes)
    .setContexts(contexts)
    .addStringOption(opt =>
      opt.setName('name').setDescription('Recipient name').setRequired(true),
    )
    .addStringOption(opt =>
      opt.setName('from').setDescription('Your name (optional)'),
    ),

  new SlashCommandBuilder()
    .setName('weekly')
    .setDescription('Send a weekly awesome message')
    .setIntegrationTypes(integrationTypes)
    .setContexts(contexts)
    .addStringOption(opt =>
      opt.setName('name').setDescription('Recipient name').setRequired(true),
    )
    .addStringOption(opt =>
      opt.setName('from').setDescription('Your name (optional)'),
    )
    .addStringOption(opt =>
      opt.setName('timezone').setDescription('IANA timezone (e.g. America/New_York)'),
    ),

  new SlashCommandBuilder()
    .setName('random')
    .setDescription('Send a random awesome message')
    .setIntegrationTypes(integrationTypes)
    .setContexts(contexts)
    .addStringOption(opt =>
      opt.setName('name').setDescription('Recipient name').setRequired(true),
    )
    .addStringOption(opt =>
      opt.setName('from').setDescription('Your name (optional)'),
    ),

  new SlashCommandBuilder()
    .setName('message')
    .setDescription('Send a specific type of awesome message')
    .setIntegrationTypes(integrationTypes)
    .setContexts(contexts)
    .addStringOption(opt =>
      opt
        .setName('type')
        .setDescription('Message type')
        .setRequired(true)
        .addChoices(
          { name: 'Animal', value: 'animal' },
          { name: 'Absurd', value: 'absurd' },
          { name: 'Meta', value: 'meta' },
          { name: 'Unexpected', value: 'unexpected' },
          { name: 'Tough Love', value: 'toughLove' },
        ),
    )
    .addStringOption(opt =>
      opt.setName('name').setDescription('Recipient name').setRequired(true),
    )
    .addStringOption(opt =>
      opt.setName('from').setDescription('Your name (optional)'),
    ),

  new SlashCommandBuilder()
    .setName('types')
    .setDescription('List available message types')
    .setIntegrationTypes(integrationTypes)
    .setContexts(contexts),
];
