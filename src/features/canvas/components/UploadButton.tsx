import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Fab from '@mui/material/Fab'
import { useImageLoader } from 'features/canvas/hooks/useImageLoader'

const labelId = 'upload-image-button'

type Props = {
  canvasHeight: number
  canvasWidth: number
}
const UploadButton: React.FC<Props> = ({ canvasHeight, canvasWidth }) => {
  const loadImage = useImageLoader()

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      files.forEach((file) => {
        loadImage(file, canvasHeight, canvasWidth)
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
