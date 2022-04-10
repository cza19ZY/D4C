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
        var userID = message.author.id
        
        if(message.content.startsWith(config.PREFIX)) return message.channel.send({
            embed: {
                "color": config.RED,
                "description": ":x: ¡Los comandos se escriben en el servidor no aquí! :x:"}})
        if(message.author.bot) return;
        message.channel.send({
        embed: {
            "color": config.GREEN,    
            "description": "Este mensaje se ha enviado al STAFF, en breve será respondido"}}).then(msg => {
            setTimeout(() => msg.delete(),3000)
        })
        if(message.content.startsWith(config.PREFIX)) return
        if(args.lenght > 1024) return message.reply("MUCHO TEXTO")

        var embed = new Discord.MessageEmbed()
        .setColor(config.ORANGE)
        .setAuthor("Nuevo Mensaje", "https://media.discordapp.net/attachments/769255843853500427/960003805418754078/7E4A18E5-CFEF-4D3A-B067-A37EFCFDB389.png?width=994&height=994")
        .setTitle("**Mensaje:**")
        .setDescription(args)
        .setFooter("Este mensaje fue enviado por " + message.author.username + " ", message.author.displayAvatarURL())
        .setTimestamp()
        D4C.guilds.cache.get(config.SERVER_ID).channels.cache.get(config.CHANNEL_ID).send(embed).catch(console.log(`¡Mensaje recibido de ${userID}(${message.author.username})!`))
        D4C.guilds.cache.get(config.SERVER_ID).channels.cache.get(config.CHANNEL_ID).send({
        embed: {
            "color":config.BLUE,
            "description":`${config.PREFIX}reply ${message.author.id} <message>`,
        }
        })
    }else 


    if(message.content.startsWith(config.PREFIX + "reply")) {
        if(message.author.id !== config.MY_ID) return message.reply("¡No puedes usar este comando!")
        var args = message.content.split(" ").slice(0)
        var Rargs = message.content.split(" ").slice(2).join(" ")
        var userID = args[1]
        if(isNaN(args[1])) return message.reply("¡Vaya! Esto no parece una ID de usuario")
        var embed = new Discord.MessageEmbed()
        .setColor(config.ORANGE)
        .setAuthor("Respuesta del STAFF", "https://media.discordapp.net/attachments/769255843853500427/960003805418754078/7E4A18E5-CFEF-4D3A-B067-A37EFCFDB389.png?width=994&height=994")
        .setTitle("**Mensaje:**") 
        .setDescription(Rargs)
        .setFooter("Este mensaje fue enviado por " + message.author.username + " ", message.author.displayAvatarURL())
        .setTimestamp()
        D4C.users.cache.get(userID).send(embed).catch(console.log(`¡El mensaje ha sido enviado correctamente a ${userID}!`))
        if(message.author.bot) return;
        message.channel.send("¡Tu mensaje ha sido enviado!").then(msg => {
            setTimeout(() => msg.delete(),3000)}).catch(console.error)
    }
});

D4C.login(config.TOKEN);