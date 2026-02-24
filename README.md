# AJaaS Discord Bot

Discord bot wrapper for [AJaaS](https://github.com/ctf2009/ajaas), exposing slash commands that call the AJaaS API and return formatted embeds.

## Features

- Slash commands for `awesome`, `weekly`, `random`, `message`, and `types`
- Configurable AJaaS API base URL
- Structured logging for incoming commands and outbound AJaaS requests
- Docker-ready image build

## Requirements

- Node.js 22+
- A Discord application and bot token

## Setup

1. Install dependencies:

```bash
npm ci
```

2. Create env file:

```bash
cp .env.example .env
```

3. Set required variables in `.env`:

- `DISCORD_TOKEN` (required)
- `DISCORD_CLIENT_ID` (required)
- `DISCORD_GUILD_ID` (optional, recommended for faster command updates in one guild)
- `AJAAS_BASE_URL` (optional, defaults to `https://ajaas.io`)

4. Register slash commands:

```bash
npm run deploy-commands
```

5. Run the bot:

```bash
npm run dev
```

Production:

```bash
npm run build
npm start
```

## Docker

Build:

```bash
docker build -t ghcr.io/ctf2009/ajaas-discord:latest .
```

Run:

```bash
docker run --rm \
  -e DISCORD_TOKEN=your_token \
  -e DISCORD_CLIENT_ID=your_client_id \
  -e DISCORD_GUILD_ID=your_guild_id \
  -e AJAAS_BASE_URL=https://ajaas.io \
  ghcr.io/ctf2009/ajaas-discord:latest
```

## Logging

The bot logs:

- Incoming Discord command context (guild/channel/user/options)
- Outbound AJaaS API request URL and response status
- Reply route outcomes (success/error)

