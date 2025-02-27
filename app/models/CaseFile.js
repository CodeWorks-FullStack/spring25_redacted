import { generateId } from "../utils/GenerateId.js"

export class CaseFile {
  /**
   * @param {{ title: string; agency: string; content?: string; lastUnlockedAt?: string; reportedAt?: string; id?: string }} data
   */
  constructor(data) {
    this.id = data.id ?? generateId()
    // returns an object that we can use to display date/time/day of week in different formats
    this.reportedAt = data.reportedAt ? new Date(data.reportedAt) : new Date()
    // returns an object that we can use to display date/time/day of week in different formats
    this.lastUnlockedAt = data.lastUnlockedAt ? new Date(data.lastUnlockedAt) : new Date()
    this.isLocked = true
    this.title = data.title
    this.agency = data.agency
    // NOTE ?? will check if the value on the right is undefined or null, and will return the value on the left if that is true (nullish coalescing operator)
    this.content = data.content ?? ''
  }

  get caseNumber() {
    return this.id.substring(this.id.length - 4)
  }

  get reportedDate() {
    return this.reportedAt.toLocaleDateString()
  }

  get reportedDateTime() {
    return this.reportedAt.toLocaleDateString('ja-JP')
  }

  get longWindedReportedDate() {
    return this.reportedAt.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    })
  }
  get longWindedReportedTime() {
    return this.reportedAt.toLocaleTimeString('en-US', {
      hour12: false,
      timeStyle: 'medium'
    })
  }

  get lastUnlockedDate() {
    return this.lastUnlockedAt.toLocaleString('en-US', { hour12: false })
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

  get button() {
    if (this.isLocked) {
      return '<button onclick="app.caseFilesController.unlockCaseFile()" type="button">Unlock</button>'
    }


    return '<button type="submit">Save</button>'
  }

  get activeHTMLTemplate() {
    return `
    <div class="bg-light p-3 sticky-top">
      <h1>${this.title}</h1>
      <time class="fs-3" datetime="${this.reportedDateTime}">
        ${this.longWindedReportedDate} at ${this.longWindedReportedTime}
      </time>
      <form onsubmit="app.caseFilesController.saveReport()">
        <label for="reportContent">Report Content</label>
        <textarea id="reportContent" name="content" placeholder="No Content..." ${this.isLocked ? 'disabled' : ''}>${this.content}</textarea>
        <div class="d-flex justify-content-between align-items-center my-1">
          <p class="mb-0">Last unlocked on ${this.lastUnlockedDate}</p>
          <div>
            <button onclick="app.caseFilesController.deleteCaseFile()" class="me-1" type="button">
              Delete
            </button>
            ${this.button}
          </div>
        </div>
      </form>
    </div>
    `
  }
}