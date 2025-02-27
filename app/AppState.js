import { CaseFile } from './models/CaseFile.js'
import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'

class ObservableAppState extends EventEmitter {

  /**
   * @type {CaseFile[]}
   */
  caseFiles = [
    // new CaseFile({
    //   title: 'Moon Landing',
    //   agency: 'A51',
    //   content: 'We "landed" on the "moon" and everything was great.'
    // }),
    // new CaseFile({
    //   title: 'Bigfoot',
    //   agency: 'F&G',
    //   content: 'Saw a big hairy creature in the woods. It was eating a hot dog.'
    // }),
    // new CaseFile({
    //   title: 'Capybara Cryptid',
    //   agency: 'IRS',
    //   content: 'The Capybara Cryptid has been eating W2 forms for years and making our job much more difficult. We will audit him soon.'
    // }),
    // new CaseFile({
    //   title: 'JFK',
    //   agency: 'CIA'
    // }),
  ]

  /**
   * @type {CaseFile}
   */
  activeCaseFile = null
}

export const AppState = createObservableProxy(new ObservableAppState())