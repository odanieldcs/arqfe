import { cancel, intro, isCancel, outro, select } from '@clack/prompts'
import pc from 'picocolors'
import { createProject } from './cli/createProject'

async function main() {
  const args = process.argv.slice(2)

  if (args.includes('--version') || args.includes('-v')) {
    console.log('arqfe version 1.0.0')
    return
  }

  if (args[0] === 'create') {
    await createProject(args[1])
    return
  }

  intro(pc.bold('Welcome to Arqfe CLI!'))

  const action = await select({
    message: 'What would you like to do?',
    options: [
      {
        value: 'create',
        label: 'Create a new project',
        hint: 'Create a new React application scaffold',
      },
      {
        value: 'version',
        label: 'Show version',
        hint: 'Display the current version of Arqfe CLI',
      },
      { value: 'exit', label: 'Exit' },
    ],
  })

  if (isCancel(action)) {
    cancel('Operation cancelled.')
    return
  }

  switch (action) {
    case 'create':
      await createProject()
      break
    case 'version':
      console.log('arqfe version 1.0.0')
      break
    case 'exit':
      outro('Thanks for using Arqfe CLI! 👋🏼')
      break
    default:
      console.error('Unknown action:', action)
      outro('Exiting...')
      break
  }
}

process.on('SIGINT', () => {
  cancel('Operation cancelled.')
  process.exit(0)
})

main().catch((error) => {
  console.error('An error occurred:', error)
  outro('Exiting due to an error.')
  process.exit(1)
})
