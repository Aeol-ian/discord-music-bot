import { SlashCommandBuilder } from "@discordjs/builders";
import { Queue, Track } from "discord-player";
import SlashCommand from "../structures/SlashCommand";

export default new SlashCommand({
    data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clear queue") as SlashCommandBuilder,
    voiceChannel: true,
    run: async ({interaction, client}) => {
        const queue: Queue = client.player.getQueue(interaction.guild);
        const tracks: Array<Track> = queue.tracks;
        if (tracks.length === 0) return interaction.reply("No more songs.");
        queue.clear();
        interaction.reply("Queue was cleared.");
    }
})