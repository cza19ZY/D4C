const Discord = require("Discord.js");
const {Client,Intents} = require("Discord.js");
const D4C = new Client({ partials:["CHANNEL"], intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_TYPING] });
const config = require("./config.json");
const {MessageEmbed} = require("discord.js")
require('dotenv').config()

D4C.once("ready", () =>{
    console.log(config.READY_MESSAGE);
    D4C.user.setPresence({activities: [{name: config.ACTIVITY_STATUS, type: "WATCHING", status: "online",}] });
});

D4C.on("messageCreate", (message) => {

    if(message.channel.type == "DM") {
        
        var args = message.content.split(" ").slice(0)
        var args = args.slice(0).join(" ")
        var BOT_ID = D4C.user.BOT_ID
        var userID = message.author.id
        const prefEmbed = new MessageEmbed()
            .setColor(config.RED)
            .setDescription(":x: ¡Los comandos se escriben en el servidor no aquí! :x:")
        const soliEmbed = new MessageEmbed()
            .setColor(config.GREEN)
            .setDescription(":white_check_mark: Este mensaje se ha enviado al STAFF, en breve será respondido :white_check_mark:")
        if(message.content.startsWith(config.PREFIX)) return message.channel.send({embeds: [prefEmbed]})
        if(message.author.bot) return;
        message.channel.send({embeds:[soliEmbed]})/*.then(msg => {
            setTimeout(() => msg.delete(),3000)
        })*/
        if(message.content.startsWith(config.PREFIX)) return
        if(args.length > 1024) return message.reply("MUCHO TEXTO")

        var repEmbed = new MessageEmbed()
        .setColor(config.BLUE)
        .setDescription(`${config.PREFIX}reply ${message.author.id} <message>`)

        var embed = new MessageEmbed()
        .setColor(config.ORANGE)
        .setAuthor({name: "Nuevo Mensaje", iconURL: "https://media.discordapp.net/attachments/769255843853500427/960003805418754078/7E4A18E5-CFEF-4D3A-B067-A37EFCFDB389.png?width=994&height=994"})
        .setTitle("**Mensaje:**")
        .setDescription(args)
        .setFooter({text: "Este mensaje fue enviado por " + message.author.username + " ", iconURL: message.author.displayAvatarURL()})
        .setTimestamp()
        
        D4C.guilds.cache.get(config.SERVER_ID).channels.cache.get(config.CHANNEL_ID).send({embeds: [embed]}).catch(console.log(`¡Mensaje recibido de ${userID}(${message.author.username})!`))
        D4C.guilds.cache.get(config.SERVER_ID).channels.cache.get(config.CHANNEL_ID).send({embeds: [repEmbed]})
    }else 


    if(message.content.startsWith(config.PREFIX + "reply")) {
        if(!message.member.permissions.any('MANAGE_MESSAGES','ADMINISTRATOR')) return message.reply("¡No puedes usar este comando!")
        var args = message.content.split(" ").slice(0)
        var Rargs = message.content.split(" ").slice(2).join(" ")
        var userID = args[1]
        if(isNaN(args[1])) return message.reply("¡Vaya! Esto no parece una ID de usuario")
        const embedRes = new MessageEmbed()
        .setColor(config.ORANGE)
        .setAuthor({name: "Respuesta del STAFF", iconURL: "https://media.discordapp.net/attachments/769255843853500427/960003805418754078/7E4A18E5-CFEF-4D3A-B067-A37EFCFDB389.png?width=994&height=994"})
        .setTitle("**Mensaje:**") 
        .setDescription(Rargs)
        .setFooter({text:"Este mensaje fue enviado por " + message.author.username + " ", iconURL: message.author.displayAvatarURL()})
        .setTimestamp();
        D4C.users.cache.get(userID).send({embeds: [embedRes]}).catch(console.log(`¡El mensaje ha sido enviado correctamente a ${userID}!`))
        if(message.author.bot) return;
        message.channel.send("¡Tu mensaje ha sido enviado!")/*.then(msg => {
            setTimeout(() => msg.delete(),3000)})*/.catch(console.error)
    }else
        if(message.content.startsWith(config.PREFIX + "ping")) {
        message.channel.send("Pong! 🏓")
    }
});

D4C.login(process.env.DISCORD_TOKEN);