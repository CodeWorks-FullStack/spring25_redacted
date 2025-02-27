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
    caseFilesService.loadCaseFiles()
    // NOTE no longer need to manually call our draw methods after local storage is working correctly
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

    // REVIEW null check
    // NOTE when we delete a case file, it sets the activeCaseFile in the AppState to null, so we want to draw our placeholder in that case
    if (caseFile == null) {
      activeCaseFileElem.innerHTML = '<h1 class="sticky-top">Select A File</h1>'
      return
    }

    // else
    activeCaseFileElem.innerHTML = caseFile.activeHTMLTemplate
  }

  createCaseFile() {
    event.preventDefault() // stop refresh
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
    caseFilesService.unlockActiveCaseFile()
  }

  saveReport() {
    event.preventDefault() // stop refresh
    console.log('saving report!');
    const formElem = event.target
    // NOTE you can ignore the error that VSCODE is pointing at on this line
    // NOTE content matches the name attribute on my textarea
    // NOTE value pulls out the actual text from the input
    // @ts-ignore
    const contentFromTextArea = formElem.content.value
    caseFilesService.updateCaseFile(contentFromTextArea)
    // @ts-ignore
    formElem.reset()
  }

  deleteCaseFile() {
    const confirmed = window.confirm(`Are you sure want to delete ${AppState.activeCaseFile.title}?`)

    if (!confirmed) {
      return
    }

    // NOTE this will always delete the active case file
    caseFilesService.deleteActiveCaseFile()
  }
}