import { AppState } from "../AppState.js"
import { CaseFile } from "../models/CaseFile.js"
import { loadState, saveState } from "../utils/Store.js"

class CaseFilesService {
  deleteActiveCaseFile() {

    const caseFiles = AppState.caseFiles
    const caseFileIndex = caseFiles.findIndex(caseFile => caseFile.id == AppState.activeCaseFile.id)
    caseFiles.splice(caseFileIndex, 1) // trigger 'caseFiles' observers
    AppState.activeCaseFile = null // trigger 'activeCaseFile' observer
    this.saveCaseFiles()
  }
  updateCaseFile(updatedContent) {
    const caseFile = AppState.activeCaseFile
    caseFile.content = updatedContent
    caseFile.isLocked = true
    AppState.emit('activeCaseFile') // NOTE manually trigger 'activeCaseFile' observer
    this.saveCaseFiles()
  }

  unlockActiveCaseFile() {
    const caseFile = AppState.activeCaseFile
    // NOTE changing one property on an object is not enough to trigger our observer
    caseFile.isLocked = false
    caseFile.lastUnlockedAt = new Date()
    AppState.emit('activeCaseFile') // NOTE manually trigger 'activeCaseFile' observer
    this.saveCaseFiles()
  }

  setActiveCaseFile(caseFileId) {
    const caseFiles = AppState.caseFiles
    const foundCaseFile = caseFiles.find(caseFile => caseFile.id == caseFileId)
    console.log('found a case file', foundCaseFile);
    AppState.activeCaseFile = foundCaseFile // triggers  observer
  }

  createCaseFile(rawCaseFileData) {
    const caseFiles = AppState.caseFiles
    const newCaseFile = new CaseFile(rawCaseFileData)
    caseFiles.push(newCaseFile) // triggers 'caseFiles' observers
    this.saveCaseFiles()
  }

  saveCaseFiles() {
    saveState('caseFiles', AppState.caseFiles)
  }

  loadCaseFiles() {
    const caseFiles = loadState('caseFiles', [CaseFile])
    AppState.caseFiles = caseFiles // triggers 'caseFiles' observers
  }

}

export const caseFilesService = new CaseFilesService()