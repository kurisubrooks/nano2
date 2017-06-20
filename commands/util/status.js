const Command = require("../../core/Command");
const moment = require("moment");
require("moment-duration-format");
const worker = require("core-worker");
const { RichEmbed } = require("discord.js");

class Status extends Command {
    constructor(client) {
        super(client, {
            name: "Status",
            description: "Midori Status",
            aliases: ["stats", "uptime"]
        });
    }

    async run(message, channel) {
        const npmv = await worker.process("npm -v").death();

        const embed = new RichEmbed()
            .setColor(this.config.colours.default)
            .setTitle("Midori Status")
            .setThumbnail(this.client.user.avatarURL)
            .addField("Uptime", moment.duration(this.client.uptime).format("d[ days], h[ hours], m[ minutes, and ]s[ seconds]"), true)
            .addField("Memory Usage", `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`, true)
            .addField("Node Version", process.version.replace("v", ""), true)
            .addField("NPM Version", npmv.data.replace("\n", ""), true);

        return channel.send({ embed });
    }
}

module.exports = Status;
