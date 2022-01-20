import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { PasteDataProvider } from 'contexts/PasteDataProvider'
import { StageRefProvider } from 'contexts/StageRefProvider'
import { TextEditorProvider } from 'contexts/TextEditorProvider'
import Root from 'pages/Root'
import { ConfigProvider } from 'features/config/contexts/ConfigProvider'

const customTheme = createTheme()

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <PasteDataProvider>
        <StageRefProvider>
          <TextEditorProvider>
            <ConfigProvider>
              <Root />
            </ConfigProvider>
          </TextEditorProvider>
        </StageRefProvider>
      </PasteDataProvider>
    </ThemeProvider>
  )
}

export default App
