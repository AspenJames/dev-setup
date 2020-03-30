import arg from 'arg';
import inquirer from 'inquirer';

import { logWarn } from './log';
import { DEFAULT_OPTS } from './constants';

function parseArgs(rawArgs) {
  const args = arg(
    {
      '--default':      Boolean,  // proceed with defaults
      '--dry-run':      Boolean,  // don't actually install anything
      '--editors':      [String], // editors to install
      '--node-version': String,   // Node (major) version, default 13.x
      '--overwrite':    Boolean,  // overwrite dotfiles if exist
      '--ruby-version': String,   // Ruby version, default latest

      // Aliases
      '--test': '--dry-run',
      '-d':     '--default',
      '-e':     '--editors',
      '-n':     '--node-version',
      '-o':     '--overwrite',
      '-r':     '--ruby-version',
      '-t':     '--dry-run',
    },
    {
      argv: rawArgs.slice(2),
    }
  );
  return {
    backupDotfiles:  args['--backups'] || true,
    defaultInstall: args['--default'] || false,
    dryRun:         args['--dry-run'] || false,
    editors:        args['--editors'],
    nodeVersion:    args['--node-version'],
    rubyVersion:    args['--ruby-version']
  };
}

async function promptForMissing(options) {
  const defaultEditors = ['code', 'vim'];
  const defaultNode    = '13';
  const defaultRuby    = 'latest';

  if (options.defaultInstall) {
    return {
      ...options,
      // Use option if defined, fallback to default
      editors: options.editors || defaultEditors,
      nodeVersion: options.nodeVersion || defaultNode,
      rubyVersion: options.rubyVersion || defaultRuby,
    };
  }

  /* For each required option not supplied, push
   * a Question object into questions. See documentation:
   * https://www.npmjs.com/package/inquirer#question
   * */
  const questions = [];

  if (!options.editors) {
    questions.push({
      type: 'checkbox',
      name: 'editors',
      message: 'Select which text editors you would like to install',
      choices: [
        {
          name: 'code',
          checked: defaultEditors.includes('code')
        },
        {
          name: 'sublime',
          checked: defaultEditors.includes('sublime')
        },
        {
          name: 'vim',
          checked: defaultEditors.includes('vim')
        },
      ],
    });
  }

  const answers = await inquirer.prompt(questions);

  return {
    ...options,
    // Use option if defined, fallback to answer
    editors: options.editors || answers.editors,
    // Use option if defined, fallback to default
    nodeVersion: options.nodeVersion || defaultNode,
    rubyVersion: options.rubyVersion || defaultRuby,
  };
}

export async function cli(args) {
  let parsedArgs = parseArgs(args);
  parsedArgs = await promptForMissing(parsedArgs);

  // Temporary to print args nicely
  let prettyLogArgs = "{\n";
  for (let key in parsedArgs) {
    prettyLogArgs += `  ${key}: "${parsedArgs[key]}"\n`;
  }
  prettyLogArgs += "}";

  logWarn(prettyLogArgs, DEFAULT_OPTS);
}
