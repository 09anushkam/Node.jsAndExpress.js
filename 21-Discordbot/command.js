// 14:09
const {REST,Routes}=require("discord.js");

const commands=[
    {
        name:'ping',
        description:'Replies with Pong!',
    },
];

const rest = new REST({ version: '10' }).setToken("MTI1MjI4MzE1NTEwMDk5NTcxNw.G6qYVS.nP5VAongNXCz8d9M-3S42IBd94MgkZ14c5DEUE");

(async()=>{
    try {
  console.log('Started refreshing application (/) commands.');

  await rest.put(Routes.applicationCommands("1252283155100995717"), { body: commands });

  console.log('Successfully reloaded application (/) commands.');
} catch (error) {
  console.error(error);
}
})();