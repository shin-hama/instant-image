import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Fab from '@mui/material/Fab'
import Toolbar from '@mui/material/Toolbar'

import LineConfigEditor from '../components/LineConfig'
import ShapeConfigEditor from '../components/ShapeConfig'

const Editors = {
  Line: <LineConfigEditor />,
  Shape: <ShapeConfigEditor />,
}
export type EditorType = keyof typeof Editors

const TransparentFab = styled(Fab)(({ theme }) => ({
  position: 'absolute',
  top: Number.parseInt(theme.mixins.toolbar.minHeight?.toString() || '0') + 8,
  right: 8,
  boxShadow: 'none',
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: 'transparent',
  },
  '&:active': {
    boxShadow: 'none',
  },
}))

type Props = {
  editor?: EditorType
  onClose: () => void
}
const ConfigEditor: React.FC<Props> = ({ editor, onClose }) => {
  return (
    <Drawer
      open={Boolean(editor)}
      anchor="right"
      variant="persistent"
      onClose={onClose}>
      <Toolbar />
      <Box sx={{ margin: 2 }}>{editor ? Editors[editor] : <></>}</Box>
      <TransparentFab
        disableRipple
        disableFocusRipple
        disableTouchRipple
        variant="extended"
        onClick={onClose}>
        <FontAwesomeIcon icon={faTimes} />
      </TransparentFab>
    </Drawer>
  )
}

export default ConfigEditor
