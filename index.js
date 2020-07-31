const Discord = require('discord.js');
const bot = new Discord.Client();


const cheerio = require('cheerio');

const request = require('request');

const PREFIX = '-';

bot.on('ready', () =>{
    console.log('bot is online');
})

bot.on('message', message=>{

    let args = message.content.substring(PREFIX.length).split(" ");

    switch(args[0]){
        case 'painting':
        painting(message);


        break;
    }
});

function painting(message){

    var options = {
        url: "https://results.dogpile.com/serp?qc=images&q=" + "bob ross paintings",
        method: "GET",
        headers: {
            "Accept": "tect/html",
            "User-Agent": "Chrome"
        }
    };

    request(options, function(error, response, responseBody) {
        if (error) {
            return;
        }


        $ = cheerio.load(responseBody);


        var links = $(".image a.link");

        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));

        console.log(urls);

        if (!urls.length) {

            return;
        }

        // Send result
        message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
    });



}


bot.login(process.env.token);