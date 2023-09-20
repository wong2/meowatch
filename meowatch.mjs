#!/usr/bin/env node

import chalk from 'chalk'
import chokidar from 'chokidar'
import process from 'node:process';
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const EVENT_DESC = {
  add: chalk.green('file created'),
  // addDir: chalk.green('directory created'),
  unlink: chalk.red('file removed'),
  // unlinkDir: chalk.red('directory removed'),
  change: chalk.yellow('file changed'),
};

const argv = yargs(hideBin(process.argv)).argv
const path = argv._[0] || '.'

console.log(chalk.bold(`Watching ${path}`))

const options = {
  ignoreInitial: true,
  ignored: argv.ignore
};

chokidar
  .watch(path, options)
  .on('all', (event, path) => {
    let event_desc = EVENT_DESC[event];
    if (event_desc) {
      console.log(`${event_desc}: ${path}`);
    }
  });
