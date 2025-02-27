import { AppState } from "../AppState.js"
import { CaseFile } from "../models/CaseFile.js"

class CaseFilesService {
  updateCaseFile(updatedContent) {
    const caseFile = AppState.activeCaseFile
    caseFile.content = updatedContent
    caseFile.isLocked = true
    AppState.emit('activeCaseFile')
  }

  unlockActiveCaseFile() {
    const caseFile = AppState.activeCaseFile
    // NOTE changing one property on an object is not enough to trigger our observer
    caseFile.isLocked = false
    caseFile.lastUnlockedAt = new Date()
    // NOTE manually trigger an observer
    AppState.emit('activeCaseFile')
  }

  setActiveCaseFile(caseFileId) {
    const caseFiles = AppState.caseFiles
    const foundCaseFile = caseFiles.find(caseFile => caseFile.id == caseFileId)
    console.log('found a case file', foundCaseFile);
    AppState.activeCaseFile = foundCaseFile
  }

  createCaseFile(rawCaseFile) {
    const caseFiles = AppState.caseFiles
    const newCaseFile = new CaseFile(rawCaseFile)
    caseFiles.push(newCaseFile)
  }

}

export const caseFilesService = new CaseFilesService()