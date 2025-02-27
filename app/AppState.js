import { CaseFile } from './models/CaseFile.js'
import { EventEmitter } from './utils/EventEmitter.js'
import { createObservableProxy } from './utils/ObservableProxy.js'

class ObservableAppState extends EventEmitter {

  /**
   * @type {CaseFile[]}
   */
  caseFiles = []

  /**
   * @type {CaseFile}
   */
  activeCaseFile = null
}

export const AppState = createObservableProxy(new ObservableAppState())