import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'

import LineConfigEditor from '../components/LineConfig'
import ShapeConfigEditor from '../components/ShapeConfig'

const Editors = {
  Line: <LineConfigEditor />,
  Shape: <ShapeConfigEditor />,
}
export type EditorType = keyof typeof Editors

type Props = {
  editor?: EditorType
  onClose: () => void
}
const ConfigEditor: React.FC<Props> = ({ editor, onClose }) => {
  return (
    <Drawer
      open={Boolean(editor)}
      anchor="right"
      variant="permanent"
      onClose={onClose}>
      <Toolbar />
      <Box sx={{ margin: 2 }}>{editor ? Editors[editor] : <></>}</Box>
    </Drawer>
  )
}

export default ConfigEditor
