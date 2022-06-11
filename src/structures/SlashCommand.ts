import { SlashCommandOptionsCustom } from "../typings/interfaces";

export default class SlashCommand {
    constructor(options: SlashCommandOptionsCustom) {
        Object.assign(this, options);
    }
}