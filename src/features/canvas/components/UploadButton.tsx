import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Fab from '@mui/material/Fab'
import { useWindowSize } from 'react-use'
import { useImageLoader } from 'features/canvas/hooks/useImageLoader'

const labelId = 'upload-image-button'

const UploadButton = () => {
  const windowSize = useWindowSize()
  const loadImage = useImageLoader(
    windowSize.width * 0.6,
    windowSize.height * 0.6
  )

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      files.forEach((file) => {
        loadImage(file)
      })
    }
  }

  return (
    <Fab
      color="primary"
      component="label"
      sx={{ position: 'absolute', bottom: 40, right: 40 }}>
      <FontAwesomeIcon icon={faPlus} />
      <input
        accept="image/*"
        multiple
        id={labelId}
        type="file"
        style={{ display: 'none' }}
        onChange={handleUpload}
      />
    </Fab>
  )
}

export default UploadButton
