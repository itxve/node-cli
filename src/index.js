#!/usr/bin/env node
'use strict';
const meow = require('meow');
const fkill = require('fkill');
const chalk = require('chalk');
 

const cli = meow(chalk.blue(`
	Usage
  $ ntx [<pid|name|:port> …]
	Options
	  --force -f    Force kill
	Examples
  $ ntx 1337
  $ ntx safari
	  $ ntx :8080
	  $ ntx 1337 safari :8080
`), {
	inferType: true,
	flags: {
		force: {
			type: 'boolean',
			alias: 'f'
		},
	}
});

if (cli.input.length === 0) {
   console.log(chalk.greenBright(`
	 Usage
	 $ ntx [<pid|name|:port> …]
	 Options
		 --force -f    Force kill
	 Examples
	 $ ntx 1337
	 $ ntx safari
	 $ ntx :8080
	 $ ntx 1337 safari :8080
 `));
} else {
	const promise = fkill(cli.input, {...cli.flags, ignoreCase: true});
	if (!cli.flags.force) {
		promise.catch(error => {
			if (error.message.includes('Couldn\'t find a process with port')) {
				console.error(error.message);
				process.exit(1);
			}
		});
	}
}