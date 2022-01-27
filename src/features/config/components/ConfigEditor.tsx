import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Fab from '@mui/material/Fab'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Toolbar from '@mui/material/Toolbar'

import LineConfigEditor from '../components/LineConfig'
import ShapeConfigEditor from '../components/ShapeConfig'

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

type TabPanelProps = {
  index: number
  value: number
}
const TabPanel: React.FC<TabPanelProps> = ({ children, index, value }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

type Props = {
  open?: boolean
  onClose: () => void
}
const ConfigEditor: React.FC<Props> = ({ open, onClose }) => {
  const [value, setValue] = React.useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Drawer open={open} anchor="right" variant="persistent" onClose={onClose}>
      <Toolbar />
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Line" />
        <Tab label="Shape" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <LineConfigEditor />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ShapeConfigEditor />
      </TabPanel>
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
