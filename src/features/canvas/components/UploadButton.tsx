import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Fab from '@mui/material/Fab'
import { Image as KonvaImage } from 'react-konva'
import { useShapes } from '../contexts/ShapesProvider'

const labelId = 'upload-image-button'

const UploadButton = () => {
  const [, actions] = useShapes()

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      files.forEach((file) => {
        const url = URL.createObjectURL(file)
        const image = new window.Image()
        image.src = url

        image.onload = () => {
          const size = {
            width: image.width,
            height: image.height,
          }
          actions.push(
            <KonvaImage
              draggable
              image={image}
              x={0}
              y={0}
              width={size.width}
              height={size.height}
            />
          )
        }
      })
    }
  }

  return (
    <Fab component="label" sx={{ position: 'absolute', bottom: 40, right: 40 }}>
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
