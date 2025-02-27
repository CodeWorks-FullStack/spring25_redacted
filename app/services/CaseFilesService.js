import { AppState } from "../AppState.js"
import { CaseFile } from "../models/CaseFile.js"

class CaseFilesService {
  createCaseFile(rawCaseFile) {
    const caseFiles = AppState.caseFiles
    const newCaseFile = new CaseFile(rawCaseFile)
    caseFiles.push(newCaseFile)
  }

}

export const caseFilesService = new CaseFilesService()