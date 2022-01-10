import * as React from 'react'
import Drawer from '@mui/material/Drawer'
import LineConfigEditor from '../components/LineConfig'

const Editors = {
  Line: <LineConfigEditor />,
}

type EditorType = keyof typeof Editors
const ConfigEditorContext = React.createContext<React.Dispatch<
  React.SetStateAction<EditorType | null>
> | null>(null)

export const ConfigEditorProvider: React.FC = ({ children }) => {
  const [configEditor, setConfigEditor] = React.useState<EditorType | null>(
    null
  )
  return (
    <>
      <ConfigEditorContext.Provider value={setConfigEditor}>
        {children}
      </ConfigEditorContext.Provider>
      <Drawer
        open={Boolean(configEditor)}
        anchor="right"
        onClose={() => setConfigEditor(null)}>
        {configEditor ? Editors[configEditor] : <></>}
      </Drawer>
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
