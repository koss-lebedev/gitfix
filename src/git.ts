import execa from 'execa'
import { pipe } from 'ramda'

const execute = (command: string) => execa.shellSync(command)

const filterTreeCommand = (command: string) => `
  git filter-branch --force --tree-filter "${command}" -- --all
`

const filterIndexCommand = (command: string) =>  `
  git filter-branch --force --index-filter '${command}' --prune-empty --tag-name-filter cat -- --all
`

const appendContent = (filePath: string, content: string) => `
  cat > ${filePath} << EOF
  ${content}
  EOF
`

const removeFile = (filePath: string) => `
  git rm --cached --ignore-unmatch ${filePath}
`

export const appendCommand = (filePath: string, content: string) =>
  pipe(
    appendContent,
    filterTreeCommand,
    execute
  )(filePath, content)

export const removeCommand = (filePath: string) =>
  pipe(
    removeFile,
    filterIndexCommand,
    execute,
  )(filePath)
