const Discord = require("Discord.js");
const D4C = new Discord.Client();
const config = require("./config.json");

D4C.on("ready", async () =>{
    console.log(config.READY_MESSAGE);
    D4C.user.setActivity(config.ACTIVITY_STATUS, {
        type: "LEYENDO"
    });
});

D4C.on("message", (message) => {

    if(message.channel.type === "dm") {
        var args = message.content.split(" ").slice(0)
        var args = args.slice(0).join(" ")
        var BOT_ID = D4C.user.BOT_ID
        var USER_ID = message.author.id
        
        if(message.content.StartsWith(config.PREFIX)) return message.channel.send(":x: ¡Los comandos se escriben en el servidor no aquí! :x:")
        if(message.author.bot) return;
        message.channel.send("Este mensaje se ha enviado al STAFF, en breve será respondido").then(msg => msg.delete(3000))
        if(message.content.StartsWith(config.PREFIX)) return
        if(args.lenght > 1024) return message.reply("MUCHO TEXTO")

        var embed = new Discord.RichEmbed()
        .setColor(config.ORANGE)
        .setAuthor("Respuesta del STAFF", "https://media.discordapp.net/attachments/769255843853500427/960003805418754078/7E4A18E5-CFEF-4D3A-B067-A37EFCFDB389.png?width=994&height=994")
        .addBlankField(true)
        .addField(`Enviado por ${message.author.username}`)
        .addBlankField(true)
        .addTitle("*Message**:")
        .setFooter("Este mensaje fue enviado por "  + message.author.username + " ", message.author.AvatarURL)
        .setTimestamp()
        D4C.guilds.get(config.SERVER_ID).channels.get(config.CHANNEL_ID).send(embed).catch(console.log(`¡Mensaje recibido de ${userID}(${message.autor.username})!`))
        D4C.guilds.get(config.SERVER_ID).channels.get(config.CHANNEL_ID).send({
        embed: {
            "descriptción":`${config.PREFIX}reply ${message.author.id} <message>`,
        }
        })
    }else 


    if(message.content.StartsWith(config.PREFIX + "reply")) {
        if(message.author.id !== config.MY_ID) return message.reply("¡No puedes usaer este comando!")
        var args = message.content.split(" ").slice(0)
        var Rargs = message.content.split(" ").slice(2).join(" ")
        var userID = args[1]
        if(NaN(ARGS[1])) return message.reply("¡Vaya! Esto no parece una ID de usuario")
        var embed = new Discord.RichEmbed()
        .setColor(config.ORANGE)
        .setAuthor("Nuevo Mensaje", "https://media.discordapp.net/attachments/769255843853500427/960003805418754078/7E4A18E5-CFEF-4D3A-B067-A37EFCFDB389.png?width=994&height=994")
        .addBlankField(true)
        .setDescription(Rargs)
        .addBlankField(true)
        .setTitle("*Message**:")
        .setFooter("Este mensaje fue enviado por " + message.author.username + " ", message.author.AvatarURL)
        .setTimestamp()
        D4C.users.get(userID).send(embed).catch(console.log(`¡El mensaje ha sido enviado correctamente a ${userID}!`))
        if(message.author.bot) return;
        message.channel.send("¡Tu mensaje ha sido enviado!").then(msg => message.delete(3000)).catch(console.error)
    }
});

D4C.login(config.TOKEN);