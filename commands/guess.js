module.exports = {
    name: 'guess',
    description: "Guess a number between 0 to 10",
    execute(message,args){

        function getRandomIntInclusive(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1) + min); 
          }

        let randy = getRandomIntInclusive(0,10);
        
        if(message.content.includes(randy)){
              message.channel.send("You guessed right.");
        }
        
        else{message.channel.send("You guessed wrong. The number was " + randy);}
    }
}