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
    caseFilesService.loadCaseFiles()
    // this.drawCaseFiles()
    // this.drawReportCount()
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

    if (caseFile == null) {
      activeCaseFileElem.innerHTML = '<h1 class="sticky-top">Select A File</h1>'
      return
    }

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

  unlockCaseFile() {
    // NOTE this will always unlock the active case file
    console.log('unlocking a case file!', AppState.activeCaseFile);
    caseFilesService.unlockActiveCaseFile()
  }

  saveReport() {
    event.preventDefault()
    console.log('saving report!');
    const formElem = event.target
    // NOTE you can ignore the error that VSCODE is pointing at on this line
    // NOTE content matches the name attribute on my textarea
    // NOTE value pulls out the actual text from the input
    // @ts-ignore
    const contentFromTextArea = formElem.content.value
    caseFilesService.updateCaseFile(contentFromTextArea)
  }

  deleteCaseFile() {
    const confirmed = window.confirm(`Are you sure want to delete ${AppState.activeCaseFile.title}?`)

    if (!confirmed) {
      return
    }

    caseFilesService.deleteActiveCaseFile()
  }
}