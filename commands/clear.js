module.exports = {
    name: 'clear',
    description: "Clear a specified number of messages from a channel",
    execute(message,args){
        
        if(!args[0]){
            return message.reply("How many messages do you want to purge lol");
        }
        if(isNaN(args[0])){
            return message.reply("Real number pls");
        };

        if(args[0] > 100){
            return message.reply("You can't purge that many Ls");
        }
        if(args[0] < 1){
            return message.reply("How are you supposed to delete 0 or a negative number of messages");
        }

        await message.channel.messages.fetch({limit:args[0]}).then(messages => {
            message.channel.bulkDelete(messages);
            message.reply("You deleted " + args[0] + " messages.");
        });  
        
    }
}
