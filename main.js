const Discord = require('discord.js');

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

const prefix = '.'; //CHANGE THIS TO YOUR PREFERRED PREFIX. FOR EXAMPLE ! . - 

const token = 'TOKEN'; //INSERT YOUR DISCORD BOT TOKEN HERE

const fs = require('fs');

//COMMAND HANDLER
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    
    client.commands.set(command.name, command);
}

//STATUS CHECKER
client.once('ready', () => {
    console.log('Bmineral is online!');
});

//MAIN MESSAGING FUNCTIONS
client.on('message', message =>{
    
    const commandCheck = message.content.startsWith(prefix);

    if(message.author.bot)
        return;

    const args = message.content.slice(prefix.length).split(/ +/);

    const command = args.shift().toLowerCase();

    //MESSAGE REACTIONS
    if(message.content.includes('saul')){
        message.channel.send('Did you know that you have rights?');
    }

    //COMMAND EXECUTES
    if(command === 'help' && commandCheck == true){
        client.commands.get('help').execute(message,args);
    }
    else if(command === 'guess' && commandCheck == true){
        client.commands.get('guess').execute(message,args);
    }
    else if(command === 'clear' && commandCheck == true){
        client.commands.get('clear').execute(message,args);
    }

});

client.login(token);
