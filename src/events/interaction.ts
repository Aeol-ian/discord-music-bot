import { CommandInteraction, CommandInteractionOptionResolver, GuildMember, Interaction } from "discord.js";
import { Event } from "../structures/Event";
import { SlashCommandOptionsCustom } from "../typings/interfaces";

export default new Event ({
    name: "interactionCreate",
    disabled: false,
    run: async ({ctx, client}) => {
        const interactionFirst: Interaction = ctx[0];
        if (interactionFirst.isCommand()) {
            const interaction: CommandInteraction = interactionFirst;
            const cmd: string = interaction.commandName;
            const file: SlashCommandOptionsCustom = client.slashCommands.get(cmd);
            if (file && !file.disabled) {
                if (file.voiceChannel) {
                    if (!(interaction.member as GuildMember).voice.channelId) return interaction.reply(`Ты не в голосовом`);
                    if (interaction.guild.me.voice.channelId && (interaction.member as GuildMember).voice.channelId !== interaction.guild.me.voice.channelId) return interaction.reply(`Ты в другом голосовом канале`);
                }
                file.run({interaction, options: interaction.options as CommandInteractionOptionResolver, client});
            }
        }
    }
})

// npm install -g windows-build-tools
// npm install -g node-gyp