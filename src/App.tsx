import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { PasteDataProvider } from 'contexts/PasteDataProvider'
import { StageRefProvider } from 'contexts/StageRefProvider'
import { TextEditorProvider } from 'contexts/TextEditorProvider'
import Root from 'pages/Root'

const customTheme = createTheme()

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <PasteDataProvider>
        <StageRefProvider>
          <TextEditorProvider>
            <Root />
          </TextEditorProvider>
        </StageRefProvider>
      </PasteDataProvider>
    </ThemeProvider>
  )
}

export default App
