const newLinkFunc = function(servLetter, message, channel, cyberChanTemp, newHook_ID, newHook_TOKEN, bot, fs) {

  if (!bot) {
	  var Discord = require("../node_modules/discord.js");
	  bot = new Discord.Client;
  }

  if (!fs) {
  	fs = require("../node_modules/fs-extra")
  }

const newLinkFunc = `/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////// SERVER ${servLetter} ///////////////////////////////////

function sendHookServ${servLetter}(message, bot) {

  if (isReady) {
    isReady = false;
    var authorID = bot.users.get(` + '\`${message.author.id}\`' + `);
    var bot_ID = bot.users.get(` + '\`${bot.user.id}\`' + `);
    var pseudo = message.author.username;
    var full_avatarURL = authorID.avatarURL;
    let args = message.content;

    if (full_avatarURL !== null) {
      avatarURL64 = full_avatarURL.split('size=2048').join('size=64');
    } else {
      avatarURL64 = 'http://teenanon.free.fr/teenrock/discordbot/pictures_res/default_avatar.png';
    }

    if (message.attachments) {
      message.attachments.forEach(att => {
        if (!message.content) {
          args = ` + '\` ${att.url}\`' + `;
        } else if (message.content) {
          args = ` + '\`${message.content}\\n ${att.url}\`' + `;
        }
      })
    }

    userMSGlog = ` + '\` ${new Date()}\\n >>> ${message.guild.name} <<< sur #${message.channel.name}\\n <${message.author.username}> ${args}\\n UserID: <${message.author.id}>\\n MsgID: <${message.id}>\\n\`' + `;
  
    hooksList.forEach(webhook => {
      if (webhook == undefined) {
        console.log(` + '\` Le bot n\'a pas pu trouver le webhook du serveur ' + servLetter + '\`' +`)
      } else {
        webhook.edit(` + '\`${pseudo}\`, \`${avatarURL64}\`' + `)
        .then(edit => {
          if (webhook != Hook${servLetter}) webhook.send(` + '\`${args}\`' + `).then(ready => isReady = true)
        })
      }
    })
    console.log(userMSGlog)

  } else if (!isReady) {
    var authorID = bot.users.get(` + '\`${message.author.id}\`' + `);
    var bot_ID = bot.users.get(` + '\`${bot.user.id}\`' + `);
    var pseudo = message.author.username;
    var full_avatarURL = authorID.avatarURL;
    let argsB = message.content;
    
    if (full_avatarURL !== null) {
      avatarURL64 = full_avatarURL.split('size=2048').join('size=64');
    } else {
      avatarURL64 = 'http://teenanon.free.fr/teenrock/discordbot/pictures_res/default_avatar.png';
    }

    if (message.attachments) {
      message.attachments.forEach(att => {
        if (!message.content) {
          argsB = ` + '\`${att.url}\`' + `;
        } else if (message.content) {
          argsB = ` + '\`${message.content}\\n${att.url}\`' + `;
        }
      })
    }

    userMSGlog = ` + '\` ${new Date()}\\n >>> ${message.guild.name} <<< sur #${message.channel.name}\\n <${message.author.username}> ${argsB}\\n UserID: <${message.author.id}>\\n MsgID: <${message.id}>\\n\`' + `;

    linkedChannels.forEach(channel=> {
      if (channel != undefined) {
        if (channel != server${servLetter}) channel.createWebhook(` + '\`${pseudo}\`, \`${avatarURL64}\`' + `).then(webhook => {
          webhook.send(` + '\`${argsB}\`' + `)
          webhook.delete()
        })
      }
    })
    console.log(' Delayed Message (Bot Was Busy)\\n' + userMSGlog)

  }
}

module.exports = sendHookServ${servLetter}

`;

  // GLOBAL CASE 1
  if (!servLetter) { 

  	return console.log(' GLOBAL CASE 1 : servLetter is [UNDEFINED]\n')

  // GLOBAL CASE 2
  } else if (servLetter) {
  	
  	console.log(' GLOBAL CASE 2 : Server Letter is [DEFINED]\n')

    if (servLetter == 'null') return console.log(' CASE 2-A : server Letter is "null" : [SERVER COUNT = 0]\n')

   lettersChoice.some(word=> {
      if (!message) {
        if (servLetter === word) console.log(' DETECTED Server Letter : ' + servLetter + '\n AutoLink [createLinkfunction] has been exectued successfully !\n')
      } else if (message) {
        if (servLetter === word) console.log(' DETECTED Server Letter : ' + servLetter + '\n Manual command [createLinkfunction] exectued by ' + message.author.username + '\n')
      }
    })

  if (!message) {
    console.log(' GLOBAL CASE 2-A : AutoLink function activated by GuildCreate Event\n')

  } else if (message) {

  	lettersChoice.some(word=> {

      if (servLetter === word) {
        message.channel.send(`Manual command **[createLinkfunction]** exectued by **${message.author.username}**`)
        console.log(' GLOBAL CASE 2-B : Manual command [createLinkfunction] exectued by ' + message.author.username + '\n')
      	console.log(' Server Letter : ' + servLetter + '\n' + ' Letter Choice : ' + lettersChoice + '\n')

        if (!message) {
          cyberChan = bot.channels.get(`${cyberChanTemp.id}`)
        } else if (message) {
          cyberChan = message.channel.id;
        }
	    }
	  })
  	message.channel.send(`La fonction de link pour le serveur : **` + servLetter + '** a bien été créée.\n')

    linkedChannels.forEach(channel=> {
      if (channel != undefined) {
        if (channel != cyberChan) channel.send('**Un nouveau serveur va prochainement rejoindre le link !**')
      }
    })
  }

var newServFunc = `function server_${servLetter}(bot) {

server${servLetter} = bot.channels.get('${cyberChan.id||message.channel.id}');

}

module.exports = server_${servLetter}`;

var newHookServ = `Hook${servLetter} = new Discord.WebhookClient("${newHook_ID}", "${newHook_TOKEN}");

module.exports = Hook${servLetter}

`;

var newFileServ = `./linkedChans/server${servLetter}.js`;

fs.createFile(newFileServ).then(writeFileSync => {
  fs.writeFileSync(newFileServ, newServFunc)
  console.log(` "${newFileServ}" file function has been successfully created !\n`)
})

if (!message) {
var newHookFile = `./hooks/hook${servLetter}.js`;

fs.createFile(newHookFile).then(writeFileSync => {
  fs.writeFileSync(newHookFile, newHookServ)
  console.log(` "${newHookFile}" file function has been successfully created !\n`)
})
}

var newHookFuncFile = `./linkedChansFunc/sendHookServ${servLetter}.js`; 

fs.createFile(newHookFuncFile).then(writeFileSync=> {
  fs.writeFileSync(newHookFuncFile, newLinkFunc)
  console.log(` "${newHookFuncFile}" file function has been successfully created !\n`)
})

} // end of servLetter presence

} 

module.exports = newLinkFunc