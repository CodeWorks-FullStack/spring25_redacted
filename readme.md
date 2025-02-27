redacted
============

## Legal Overview

The content under the CodeWorks®, LLC Organization and all of the individual repos are solely intended for use by CodeWorks Instruction to deliver Educational content to CodeWorks Students.

---

## Copyright

© CodeWorks® LLC, 2021. Unauthorized use and/or duplication of this material without express and written permission from CodeWorks, LLC is strictly prohibited.

<img src="https://bcw.blob.core.windows.net/public/img/7815839041305055" width="125">


## Broken Things

- App is in darkmode with no styles for it

- Form `name` for the input title is incorrect and does not match model

- Form submit button is not inside the form

- Draw area for case files list has the incorrect ID

- getter for `button` has type button

- getter for `listHTMLTemplate` is missing `"` at the end of onclick

- single equals `drawActiveCaseFile` for if check setting the caseFile to null

- the confirm in the delete does not check for input, just alerts

- set activeCaseFile in service is WACK. It is overly simplified and very hard to debug, it should be split up into more *vertical* code for better testing/ debugging

- emit in unlock is the name of the function not the name of the AppState Property it is observing 






