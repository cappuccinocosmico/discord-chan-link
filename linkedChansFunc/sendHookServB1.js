/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////// SERVER B1 ///////////////////////////////////

function sendHookServB1(message, bot) {

  var lastHook = hooksList.slice(-1)[0]

  if (isReady) {
    isReady = false;
    var authorID = bot.users.get(`${message.author.id}`);
    args_B1 = message.content;

    if (authorID.avatarURL !== null) {
      avatarURL64_B1 = authorID.avatarURL.split('size=2048').join('size=64');
    } else {
      avatarURL64_B1 = 'http://teenanon.free.fr/teenrock/discordbot/pictures_res/default_avatar.png';
    }

    if (message.attachments) {
      message.attachments.forEach(att => {
        if (!message.content) {
          args_B1 = ` ${att.url}`;
        } else if (message.content) {
          args_B1 = `${message.content}\n ${att.url}`;
        }
      })
    }

    userMSGlog = ` ${new Date()}\n >>> ${message.guild.name} <<< sur #${message.channel.name}\n <${message.author.username}> ${args_B1}\n UserID: <${message.author.id}>\n MsgID: <${message.id}>\n`;
  
    hooksList.forEach(webhook => {
      if (webhook == undefined) {
        console.log(` Le bot n'a pas pu trouver le webhook du serveur B1`)
      } else {
        webhook.edit(`${message.author.username}`, `${avatarURL64_B1}`)
        .then(send => {
          if ((webhook != HookB1) && (webhook != lastHook)) {
            webhook.send(`${args_B1}`)
          }
          if (webhook == lastHook) {
            
            if (webhook == HookB1) {
              isReady = true
              console.log(" Bot is Ready\n")
            }
            if (webhook != HookB1) {
              webhook.send(`${args_B1}`)
               .then(ready => {
                isReady = true
                console.log(' Bot is Ready !\n')
              })
            }
          }
        })
      }
    })
    console.log(" Bot is not ready yet ..." + '\n\n' + userMSGlog)

  } else if (!isReady) {
    var authorID = bot.users.get(`${message.author.id}`);
    argsB_B1 = message.content;
    
    if (authorID.avatarURL !== null) {
      avatarURL64B_B1 = authorID.avatarURL.split('size=2048').join('size=64');
    } else {
      avatarURL64B_B1 = 'http://teenanon.free.fr/teenrock/discordbot/pictures_res/default_avatar.png';
    }

    if (message.attachments) {
      message.attachments.forEach(att => {
        if (!message.content) {
          argsB_B1 = `${att.url}`;
        } else if (message.content) {
          argsB_B1 = `${message.content}\n${att.url}`;
        }
      })
    }

    userMSGlog = ` ${new Date()}\n >>> ${message.guild.name} <<< sur #${message.channel.name}\n <${message.author.username}> ${argsB_B1}\n UserID: <${message.author.id}>\n MsgID: <${message.id}>\n`;

    linkedChannels.forEach(channel=> {
      if (channel != undefined) {
        if (channel != serverB1) channel.createWebhook(`${message.author.username}`, `${avatarURL64B_B1}`).then(webhook => {
          webhook.send(`${argsB_B1}`), webhook.delete()
        })
      }
    })
    console.log(' Delayed Message (Bot Was Busy)\n' + userMSGlog)

  }
}

module.exports = sendHookServB1

