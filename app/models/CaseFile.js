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

  get activeHTMLTemplate() {
    return `
    <div class="bg-light p-3">
      <h1>Bigfoot</h1>
      <time class="fs-3" datetime="1984-03-12">
        Thursday, March 12 1984 at 14:00:01
      </time>
      <form>
        <label for="reportContent">Report Content</label>
        <textarea id="reportContent" name="content">
        </textarea>
        <div class="d-flex justify-content-between align-items-center my-1">
          <p class="mb-0">Last unlocked on 12/12/2024 at 14:00:01</p>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
    `
  }
}