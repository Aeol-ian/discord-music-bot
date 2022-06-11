import { ClientEvents, ClientOptions as BasicClientOptions, CommandInteraction, CommandInteractionOptionResolver, Message } from "discord.js";
import { Client } from "client-discord";
import { SlashCommandBuilder } from "@discordjs/builders";

export interface ClientOptions extends BasicClientOptions {
    token: string, // bot token
    colors?: ColorObject, // color object like {red: "ff0000", black: "000000", "main": 00ffed}
}

export interface ColorObject {
    [key: string]: string
}

export interface EventRunOptions {
    client: Client, // client
    ctx: any[] // event response
}

export interface MessageCommandRunOptions {
    client: Client, // client
    msg: Message, // message class
    args: string[], // arguments
    prefix?: string,
    methods?: any // any functions or variables
}

export interface EventOptions {
    name: keyof ClientEvents, // event name
    disabled?: boolean, // disable the event
    run: (options: EventRunOptions) => any // event run command
}

export interface MessageCommandOptions {
    name: string, // command name
    aliases?: string[], // command aliases
    description: string,
    showHelp?: boolean, // show in help command
    disabled?: boolean, // disable the command
    onlyGuild?: boolean | string[], // command will work only in guilds (true), or in specific guilds ["GUILD_ID", "GUILD_ID"]
    run: (options: MessageCommandRunOptions) => any // run function
}

export interface SlashCommandRunOptions {
    client: Client,
    interaction: CommandInteraction,
    options: CommandInteractionOptionResolver,
    methods?: Object
}

export interface SlashCommandOptionsCustom {
    data: SlashCommandBuilder,
    voiceChannel: boolean,
    disabled?: boolean,
    run(options: SlashCommandRunOptions): any
}