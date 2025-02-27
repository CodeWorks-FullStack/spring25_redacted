import { AppState } from "../AppState.js";
import { caseFilesService } from "../services/CaseFilesService.js";
import { getFormData } from "../utils/FormHandler.js";

export class CaseFilesController {
  constructor() {
    // observers
    AppState.on('caseFiles', this.drawCaseFiles)
    AppState.on('caseFiles', this.drawReportCount)
    AppState.on('activeCaseFile', this.drawActiveCaseFile)


    // page load
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

  drawActiveCaseFile() {
    const caseFile = AppState.activeCaseFile
    const activeCaseFileElem = document.getElementById('activeCaseFile')
    activeCaseFileElem.innerHTML = caseFile.activeHTMLTemplate
  }

  createCaseFile() {
    event.preventDefault()
    const formElem = event.target
    const rawCaseFileData = getFormData(formElem)
    console.log('data from form', rawCaseFileData);
    caseFilesService.createCaseFile(rawCaseFileData)
  }

  selectActiveCaseFile(caseFileId) {
    console.log('selecting case file with the id of ' + caseFileId);
    caseFilesService.setActiveCaseFile(caseFileId)
  }
}