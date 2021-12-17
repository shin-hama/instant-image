import * as React from 'react'

import { PasteDataProvider } from 'contexts/PasteDataProvider'
import { TextEditorProvider } from 'contexts/TextEditorProvider'
import Root from 'pages/Root'

function App() {
  return (
    <PasteDataProvider>
      <TextEditorProvider>
        <Root />
      </TextEditorProvider>
    </PasteDataProvider>
  )
}

export default App
