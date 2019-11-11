const chalk = new require('chalk')
const figlet = require("figlet")
const Discord = new require('discord.js')
const authinfo = new require('./authinfo.json')
const fs = new require('fs')
const client = new Discord.Client();

var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();

newdate = year + "_" + month + "_" + day;

var logger = fs.createWriteStream("curagnalog_" + newdate + ".txt", {
  flags: 'a'
})

client.on('ready', () => {
 //MAKE THE BOT HAVE THE DEFINED STATUS
 client.user.setStatus(authinfo.status)

 //SHOW THE ASCII
 console.log(
    figlet.textSync("curagna", {
      font: "Slant",
      horizontalLayout: "default",
      verticalLayout: "default"
    }) + "\n"
  )

 //TELL THAT THE SCRIPT HAS STARTED
 console.log("Started logging messages!")
 console.log("Logging to file " + "curagnalog_" + newdate + ".txt!")
 console.log("------------------------------------------")
});

client.on('message', message => {
 var messageLog = message.guild.name + " ~ " + message.channel.name + " | " + message.author.tag + " ~ " + message.content + " ~ " + message.createdAt;
 console.log(messageLog)
 logger.write("\n" + messageLog)
});

client.login(authinfo.token);

