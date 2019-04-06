import commander from 'commander'

import remove from './commands/remove'
import update from './commands/update'

export const startCli = () =>
  commander
    .version('0.0.1')
    .command('remove')
    .description('Remove file from all commits')
    .action(remove)

    .command('update')
    .description('')
    .action(update)

    .parse(process.argv)

