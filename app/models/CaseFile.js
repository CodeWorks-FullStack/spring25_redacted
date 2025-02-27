import { generateId } from "../utils/GenerateId.js"

export class CaseFile {
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
}