module.exports = {
    name: 'leave',
    description: "Leave the channel",
    async execute(message,args){
        const voiceChannel = message.member.voice.channel;

        if(!voiceChannel) return message.channel.send("You need to be in a channel to stop the music bruh");
        await voiceChannel.leave();
        await message.channel.send('Bye bye russia. bye bye');
    }

}