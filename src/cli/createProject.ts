import {
  confirm,
  intro,
  isCancel,
  outro,
  select,
  spinner,
  text,
} from '@clack/prompts'
import { join } from 'node:path'
import pc from 'picocolors'

export async function createProject(projectName?: string) {
  intro(
    pc.bold(pc.blue('🚀 Welcome to ArqFE')) +
      '\nA toolkit for building modern web applications with React',
  )

  const name =
    projectName ||
    (await text({
      message: 'What is your project name?',
      placeholder: 'my-project',
      validate: (value) => {
        if (!value) return 'Project name is required'
        if (value.length < 3)
          return 'Project name must be at least 3 characters long'
        if (!/^[a-zA-Z0-9-]+$/.test(value))
          return 'Project name can only contain letters, numbers, and dashes'
      },
    }))

  if (isCancel(name)) {
    console.log('Operation cancelled')
    return
  }

  const template = await select({
    message: 'What template would you like to use?',
    options: [
      {
        value: 'react-ts',
        label: 'React + TypeScript',
        hint: 'Recommended for most projects',
      },
      {
        value: 'react-js',
        label: 'React + JavaScript',
        hint: 'For those who prefer JavaScript',
      },
    ],
    initialValue: 'react-ts',
  })

  const initGit = await confirm({
    message: 'Would you like to initialize a Git repository?',
    initialValue: true,
  })

  const installDeps = await confirm({
    message: 'Would you like to install dependencies now?',
    initialValue: true,
  })

  const s = spinner()

  try {
    s.start('🥁 Creating your project...')

    // Simulate project creation logic
    await new Promise((resolve) => setTimeout(resolve, 2000)) // TODO: Only for demo purposes, we need to do this properly

    if (installDeps) {
      s.message('📦 Installing dependencies...')
      await new Promise((resolve) => setTimeout(resolve, 3000)) // TODO: Only for demo purposes, we need to do this properly
    }

    if (initGit) {
      s.message('🌱 Initializing Git repository...')
      await new Promise((resolve) => setTimeout(resolve, 500)) // TODO: Only for demo purposes, we need to do this properly
    }

    const projectPath = join(process.cwd(), name as string)

    s.stop('Project created successfully!')

    outro(`
      ${pc.dim(`Your project is ready at ${pc.dim(projectPath)}`)}
      ${pc.bold('Next steps:')}
        ${pc.cyan('cd')} ${name}
        ${pc.cyan('npm run dev')}
      ${pc.dim('Happy coding! 🚀')}
    `)
  } catch (error) {
    s.stop('Failed to create project')
    console.error(error)
  }
}
