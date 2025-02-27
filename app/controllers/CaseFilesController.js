import { AppState } from "../AppState.js";

export class CaseFilesController {
  constructor() {
    console.log('case files controller is loaded');
    this.drawCaseFiles()
  }

  drawCaseFiles() {
    const caseFiles = AppState.caseFiles
    let caseFilesContent = ''
    caseFiles.forEach(caseFile => caseFilesContent += caseFile.listHTMLTemplate)
    const caseFilesListElem = document.getElementById('caseFilesList')
    caseFilesListElem.innerHTML = caseFilesContent
  }
}