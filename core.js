// nano²
"use strict";

const Discord = require("discord.js")
const _ = require("lodash")
const keys = require("./keys")
const config = require("./config")
const bot = new Discord.Client({
    autoReconnect: true
})

// Define API
module.exports = {
    bot: bot,
    post: function(channel, message, options) {
        if (options.author) message += `[${options.author}]\n`
        bot.sendMessage(channel, message, {}, (error, response) => {
            if (error) this.error(response, "api")
        })
    },
    reply: function(message, reply) {
        bot.reply(message, reply, {}, (error, response) => {
            if (error) this.error(response, "api")
        })
    },
    edit: function(message, update) {
        bot.updateMessage(message, update, {}, (error, response) => {
            if (error) this.error(response, "api")
        })
    },
    delete: function(message) {
        bot.deleteMessage(message, {}, (error, response) => {
            if (error) this.error(response, "api")
        })
    },
    upload: function(channel, file, text) {
        bot.sendFile(channel, file, "", text, (error, response) => {
            if (error) this.error(response, "api")
        })
    },
    error: function(message, from) {
        _.each(config.debug, (v) => {
            this.post({
                channel: v,
                message: `**Error:** An error was thrown${(from) ? " from \`" + from + ".js\`" : ""}:\n\`\`\`${message}\`\`\``
            })
        })
    }
}

// Initialise Discord
bot.loginWithToken(keys.token)
