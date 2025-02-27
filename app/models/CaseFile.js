import { generateId } from "../utils/GenerateId.js"

export class CaseFile {
  /**
   * @param {{ title: string; agency: string; content?: string; }} data
   */
  constructor(data) {
    this.id = generateId()
    // returns an object that we can use to display date/time/day of week in different formats
    this.reportedAt = new Date()
    // returns an object that we can use to display date/time/day of week in different formats
    this.lastUnlockedAt = new Date()
    this.isLocked = true
    this.title = data.title
    this.agency = data.agency
    this.content = data.content
  }

  get caseNumber() {
    return this.id.substring(this.id.length - 4)
  }

  get reportedDate() {
    return this.reportedAt.toLocaleDateString()
  }

  get listHTMLTemplate() {
    return `
    <li onclick="app.caseFilesController.selectActiveCaseFile('${this.id}')" role="button">
      <div class="d-flex justify-content-between fs-5 mb-2">
        <b>${this.agency} ${this.caseNumber}</b>
        <span>${this.reportedDate}</span>
      </div>
      <hr>
    </li>
    `
  }
}