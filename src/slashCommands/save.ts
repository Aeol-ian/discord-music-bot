import { SlashCommandBuilder } from "@discordjs/builders";
import { Queue, Track } from "discord-player"
import { MessageEmbed, User } from "discord.js";
import SlashCommand from "../structures/SlashCommand";

export default new SlashCommand ({
    data: new SlashCommandBuilder()
    .setName("save")
    .setDescription("Save song's details in dm") as SlashCommandBuilder,
    voiceChannel: false,
    run: async ({interaction, client}) => {
        const queue: Queue = client.player.getQueue(interaction.guild);

        if (!queue) return interaction.reply("There is no song playing.");
        const track: Track = queue.current;

        const embed: MessageEmbed = client.embed("RANDOM").setAuthor({name: "Saved song"}).addField("Title:", track.title).addField("Author:", track.author || "Not found").addField("From server:", interaction.guild.name);
        
        (interaction.member.user as User).send({embeds: [embed]}).then(() => {
            interaction.reply("✅ | Song successfully saved, check dm.");
        }).catch(error => {
            interaction.reply("❌ | I was unable to send you dm message.");
        })
    }
})