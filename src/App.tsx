import * as React from 'react'

import PasteDataProvider from 'contexts/PasteDataProvider'
import Root from 'pages/Root'

function App() {
  return (
    <PasteDataProvider>
      <Root />
    </PasteDataProvider>
  )
}

export default App
