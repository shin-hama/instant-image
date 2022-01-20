import * as React from 'react'

import ConfigEditor, {
  EditorType,
} from 'features/config/components/ConfigEditor'

const ConfigEditorContext = React.createContext<React.Dispatch<
  React.SetStateAction<EditorType | undefined>
> | null>(null)

export const ConfigEditorProvider: React.FC = ({ children }) => {
  const [configEditor, setConfigEditor] = React.useState<EditorType>()

  const handleClose = () => {
    setConfigEditor(undefined)
  }
  return (
    <>
      <ConfigEditorContext.Provider value={setConfigEditor}>
        {children}
      </ConfigEditorContext.Provider>
      <ConfigEditor editor={configEditor} onClose={handleClose} />
    </>
  )
}

export const useConfigEditor = () => {
  const setConfigEditor = React.useContext(ConfigEditorContext)
  if (setConfigEditor === null) {
    throw new Error('ConfigEditorProvider is not wrapped')
  }

  return setConfigEditor
}
