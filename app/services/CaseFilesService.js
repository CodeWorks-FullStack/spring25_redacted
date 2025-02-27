import { AppState } from "../AppState.js"
import { CaseFile } from "../models/CaseFile.js"
import { loadState, saveState } from "../utils/Store.js"

class CaseFilesService {
  deleteActiveCaseFile() {

    const caseFiles = AppState.caseFiles
    const caseFileIndex = caseFiles.findIndex(caseFile => caseFile.id == AppState.activeCaseFile.id)
    caseFiles.splice(caseFileIndex, 1) // trigger observer

    AppState.activeCaseFile = null // trigger observer

    this.saveCaseFiles()
  }
  updateCaseFile(updatedContent) {
    const caseFile = AppState.activeCaseFile
    caseFile.content = updatedContent
    caseFile.isLocked = true
    AppState.emit('activeCaseFile')
    this.saveCaseFiles()
  }

  unlockActiveCaseFile() {
    const caseFile = AppState.activeCaseFile
    // NOTE changing one property on an object is not enough to trigger our observer
    caseFile.isLocked = false
    caseFile.lastUnlockedAt = new Date()
    // NOTE manually trigger an observer
    AppState.emit('unlockActiveCaseFile')
    this.saveCaseFiles()
  }

  setActiveCaseFile(caseFileId) {
    console.log(AppState.activeCaseFile = AppState.caseFiles.find(function (cf) { cf.id.includes(caseFileId) }))
  }

  createCaseFile(rawCaseFile) {
    const caseFiles = AppState.caseFiles
    const newCaseFile = new CaseFile(rawCaseFile)
    caseFiles.push(newCaseFile)
    this.saveCaseFiles()
  }

  saveCaseFiles() {
    saveState('caseFiles', AppState.caseFiles)
  }

  loadCaseFiles() {
    const caseFiles = loadState('caseFiles', [CaseFile])
    AppState.caseFiles = caseFiles // triggers observer
  }

}

export const caseFilesService = new CaseFilesService()