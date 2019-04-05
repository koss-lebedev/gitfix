import execa from 'execa'
import { pipe } from 'ramda'

const execute = (command: string) => execa.shellSync(command)

const filterCommand = (command: string) => `
  git filter-branch --tree-filter "${command}" -f -- --all
`

const appendContent = (filePath: string, content: string) => `
  cat > ${filePath} << EOF
  ${content}
  EOF
`

export const appendCommand = (filePath: string, content: string) =>
  pipe(
    appendContent,
    filterCommand,
    execute
  )(filePath, content)


