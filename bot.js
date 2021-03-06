const {token,prefix, ownerId} = require('./main.json');
const discord = require('discord.js');
const { CommandoClient } = require('discord.js-commando');
const path = require('path');
const fs = require('fs');

const client = new CommandoClient({
	commandPrefix: prefix,
	owner: ownerId,
	invite: 'https://discord.gg/AzCxAAcJqq',
});
module.exports ={client};

client.registry
	.registerGroups([
		['main', 'General commands'],
		['fun', 'Commands made just for entertainment'],
		['beta', 'Commands that are in devolopment']
	])
	.registerCommandsIn(path.join(__dirname, 'commands'));

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

client.login(token);