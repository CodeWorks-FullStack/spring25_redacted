import { AppState } from "../AppState.js"
import { CaseFile } from "../models/CaseFile.js"

class CaseFilesService {
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