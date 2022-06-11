// importing modules
import { Client } from "client-discord";
import { Collection } from "discord.js";
import { glob } from "glob";
import { promisify } from "util";
import { APPLICATION_ID, SLASH_GUILD } from "../config";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { Player } from "discord-player";

// making glob promise function
const globPromise = promisify(glob);

// creating discord bot client
const client: Client = new Client({colors: {
    main: "DARK_NAVY",
    error: "RED",
    success: "GREEN"
}, token: process.env.TOKEN, intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"]})

// making new collections for commands and events
client.slashCommands = new Collection();
client.events = new Collection();


// reginstering client events;
async function registerEvents (client: Client) {
    const paths: Array<string> = await globPromise(`${__dirname}/../events/*{.ts,.js}`);
    for (let path of paths) {
        const file = await importFile(path);
        if (!file.disabled) {
            client.on(file.name, (...response) => {file.run({client, ctx: response})} )
        }
    }
}

//registering slash commands
async function registerSlash(client: Client, client_id: string) {
    const commands = [];
    const paths: Array<string> = await globPromise(`${__dirname}/../slashCommands/*{.ts,.js}`);
    for (let path of paths) {
        const file = await importFile(path);
        if (!file.disabled) {
            client.slashCommands.set(file.data.name, file);
            commands.push(file.data.toJSON())
        }
    }
    const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
    try {
        console.log('Started refreshing application (/) commands.');
    if (!SLASH_GUILD) {
      await rest.put(
          Routes.applicationCommands(client_id),
          { body: commands },
      );
    } else if (Array.isArray(SLASH_GUILD) && SLASH_GUILD.length > 0) {
      SLASH_GUILD.forEach(async guildId => {
        await rest.put(
                Routes.applicationGuildCommands(client_id, guildId),
                { body: commands },
            );
      })
    }
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
}

async function load () {
    await Promise.all([
        registerSlash(client, APPLICATION_ID),
        registerEvents(client),
        registerMessageCommands(client)
    ])
}

// exports
load();

client.on("ready", () => {
    console.log(`${client.user.tag} is ready!`)
})

client.player = new Player(client);
export default client;

export async function importFile (path: string ) {
    return (await import(path))?.default;
}