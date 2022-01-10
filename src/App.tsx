import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { PasteDataProvider } from 'contexts/PasteDataProvider'
import { StageRefProvider } from 'contexts/StageRefProvider'
import { TextEditorProvider } from 'contexts/TextEditorProvider'
import Root from 'pages/Root'
import { ColorProvider } from 'features/canvas/contexts/ColorProvider'
import { LineConfigProvider } from 'features/config/contexts/LineConfigProvider'
import { ConfigEditorProvider } from 'features/config/contexts/ConfigEditor'

const customTheme = createTheme()

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <ColorProvider>
        <LineConfigProvider>
          <PasteDataProvider>
            <StageRefProvider>
              <TextEditorProvider>
                <ConfigEditorProvider>
                  <Root />
                </ConfigEditorProvider>
              </TextEditorProvider>
            </StageRefProvider>
          </PasteDataProvider>
        </LineConfigProvider>
      </ColorProvider>
    </ThemeProvider>
  )
}

export default App
