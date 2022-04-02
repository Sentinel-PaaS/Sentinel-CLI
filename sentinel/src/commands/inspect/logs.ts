import {Command} from '@oclif/core'
const inquirer = require('inquirer')
import api from '../../lib/api.js'

export default class Logs extends Command {
  static description = 'Provides application logs'

  static examples = [
    'sentinel inspect logs',
  ]

  public async run(): Promise<void> {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'appName',
        message: 'What is the full name of your application? You can get the full name from the `sentinel inspect inventory` command (e.g helloworld_production)',
        validate(input: string) {
          if (input.length > 0 && !input.includes(' ')) return true

          throw new Error('Please provide an application name with no spaces.')
        },
      },
    ])

    try {
      this.log(`Getting logs for ${answers.appName}...`)
      const response: any = await api.getLogs(answers)
      this.log(response.data)
    } catch (error: any) {
      this.log(error.message)
    }
  }
}
