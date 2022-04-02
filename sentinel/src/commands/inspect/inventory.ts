import {Command} from '@oclif/core'
import api from '../../lib/api'

export default class Inventory extends Command {
  static description = 'List all deployed applications'

  static examples = [
    'sentinel inspect inventory',
  ]

  public async run(): Promise<void> {
    try {
      this.log('Getting inventory...')
      const response: any = await api.getApps()
      this.log(response.data)
    } catch (error: any) {
      this.log(error.message)
    }
    // TODO: find a way to neatly display info
    //this.log("List of deployed applications")
  }
}
