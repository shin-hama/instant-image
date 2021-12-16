import * as React from 'react'

type PasteDataProps = string | File | undefined
export const PasteData = React.createContext<PasteDataProps>(undefined)

const PasteDataProvider: React.FC = ({ children }) => {
  const [pasteData, setPasteData] = React.useState<string | File>()
  const handlePaste = (e: ClipboardEvent) => {
    if (e.clipboardData === null) {
      return
    }

    if (e.clipboardData.files.length > 0) {
      const file = e.clipboardData.files[0]
      setPasteData(file)
    } else {
      setPasteData(e.clipboardData.getData('Text'))
    }
  }

  React.useEffect(() => {
    document.addEventListener('paste', handlePaste)

    return () => {
      document.removeEventListener('paste', handlePaste)
    }
  }, [])

  return <PasteData.Provider value={pasteData}>{children}</PasteData.Provider>
}

export default PasteDataProvider
