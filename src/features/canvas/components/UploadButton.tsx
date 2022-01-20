import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Fab from '@mui/material/Fab'

const UploadButton = () => {
  const labelId = 'upload-image-button'
  return (
    <Fab component="label" sx={{ position: 'absolute', bottom: 40, right: 40 }}>
      <FontAwesomeIcon icon={faPlus} />
      <input
        accept="image/*"
        id={labelId}
        type="file"
        style={{ display: 'none' }}
      />
    </Fab>
  )
}

export default UploadButton
