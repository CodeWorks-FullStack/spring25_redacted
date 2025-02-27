import { AppState } from "../AppState.js";

export class CaseFilesController {
  constructor() {
    console.log('case files controller is loaded');
    this.drawCaseFiles()
    this.drawReportCount()
  }

  drawCaseFiles() {
    const caseFiles = AppState.caseFiles
    let caseFilesContent = ''
    caseFiles.forEach(caseFile => caseFilesContent += caseFile.listHTMLTemplate)
    const caseFilesListElem = document.getElementById('caseFilesList')
    caseFilesListElem.innerHTML = caseFilesContent
  }

  drawReportCount() {
    const caseFiles = AppState.caseFiles
    const reportCountElem = document.getElementById('reportCount')
    reportCountElem.setAttribute('title', `${caseFiles.length} reports`)
    const boldElem = reportCountElem.querySelector('b')
    boldElem.innerText = caseFiles.length.toString()
  }

  createCaseFile() {
    event.preventDefault()
    console.log('creating case file');
  }
}