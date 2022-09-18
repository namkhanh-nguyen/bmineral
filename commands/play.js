const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = {
    name: 'play',
    description: "Play music",
    async execute(message,args){

        const voiceChannel = message.member.voice.channel;

        if(!voiceChannel) return message.channel.send("You gotta be in a voice channel first bruv");
        
        const permissions = voiceChannel.permissionsFor(message.client.user);
        
        if(!permissions.has('CONNECT')) return message.channel.send("You're not supposed to do that");
        if(!permissions.has('SPEAK')) return message.channel.send("You're not supposed to do that");
        if(!args.length) return message.channel.send("Tell me what to play lmao");

        const validURL = (str) =>{
            var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
            if(!regex.test(str)){
                return false;
            } else {
                return true;
            }
        }

        if(validURL(args[0])){
            message.channel.send('ok buddy');
            const connection = await voiceChannel.join();
            const stream = ytdl(args[0], {filter: 'audioonly', type: 'opus'});

            connection.play (stream, {seek:0, volume:0.3})
            .on('finish', () =>{
                voiceChannel.leave();
                message.channel.send('Bye bye russia. bye bye');
            });

            await message.reply('I am now playing your link');

            return;
        }
        
        const connection = await voiceChannel.join();

        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);

            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }

        const video = await videoFinder(args.join(' '));

        if(video){

            const stream = ytdl(video.url, {filter: 'audioonly', type: 'opus'});
            connection.play (stream, {seek:0, volume:0.3})
            .on('finish', () =>{
                voiceChannel.leave();
                message.channel.send('Bye bye russia. bye bye');
            });

            await message.reply('I am now playing :nerd: ***' + video.title + '*** :nerd:');
        }
        else{message.channel.send("Video doesn't exist");}
    }
}
