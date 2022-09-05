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
        
        
        const connection = await voiceChannel.join();

        const videoFinder = async (query) => {
            const videoResult = await ytSearch(query);

            return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }

        const video = await videoFinder(args.join(' '));

        if(video){

            const stream = ytdl(video.url, {filter: 'audioonly'});
            connection.play(stream, {seek:0, volume:0.6})
            .on('finish', () =>{
                voiceChannel.leave();
            });

            await message.reply(':nerd: Now Playing **' + video.title + '**');
        }
        else{message.channel.send("Video doesn't exist");}
    }
}