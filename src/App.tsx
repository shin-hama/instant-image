import * as React from 'react'

import { PasteDataProvider } from 'contexts/PasteDataProvider'
import { StageRefProvider } from 'contexts/StageRefProvider'
import { TextEditorProvider } from 'contexts/TextEditorProvider'
import Root from 'pages/Root'

function App() {
  return (
    <PasteDataProvider>
      <StageRefProvider>
        <TextEditorProvider>
          <Root />
        </TextEditorProvider>
      </StageRefProvider>
    </PasteDataProvider>
  )
}

export default App
