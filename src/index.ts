require("dotenv").config();
import client from "./structures/Client";

client.on("ready", () => {
    console.log(`${client.user.username} is ready!`);
});

client.on('error',function(err){});

client.player.on("trackStart", (queue, track) => queue.metadata.channel.send(`🎶 | Now Playing **${track.title}**!`));
client.player.on("error", (queue, error) => console.log(error));
client.player.on("connectionError", (queue, error) => console.log(error));

process.on('unhandledRejection', error => {
  console.log('Test error:', error);
});

client.login();