var config = require('./config');
const Discord = require('discord.js');
const client = new Discord.Client();
const cmdChar = '!';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    var splitMsg = msg.content.toLowerCase().split(' ');
    console.log(splitMsg);
    if (splitMsg[0].charAt(0) === cmdChar) {
      switch(splitMsg[0].substring(1)) {
          case 'ping':
                msg.reply('pong');
                break;
          case 'poll':
                let numItems = splitMsg.length-1;
                var reply = "Staring poll between: ";
                for (var i = 1; i < numItems+1; i++) {
                    reply += "\n" + ":regional_indicator_" + String.fromCharCode(96+i) + ": - `" + splitMsg[i] + "`";
                }
                msg.channel.send(reply).then(poll => {
                    for (var i = 1; i < numItems+1; i++) {
                        var name = ":regional_indicator_" + String.fromCharCode(96+i) + ":";
                        var emoji = client.emojis.cache.find(
                            e => {
                                e.name = name
                        });
                        console.log(emoji.name)
                        poll.react(emoji)
                    }
                }).catch(console.error);
                break;
      }    
    }
});




client.login(config.botToken);