import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Fab from '@mui/material/Fab'
import { Image as KonvaImage } from 'react-konva'
import { useShapes } from '../contexts/ShapesProvider'
import { useWindowSize } from 'features/canvas/hooks/useWindowSize'

const labelId = 'upload-image-button'

const UploadButton = () => {
  const [, actions] = useShapes()
  const windowSize = useWindowSize()
  const [maxWidth, setMaxWidth] = React.useState(0)
  const [maxHeight, setMaxHeight] = React.useState(0)

  React.useEffect(() => {
    setMaxWidth(windowSize.width * 0.6)
    setMaxHeight(windowSize.height * 0.6)
  }, [windowSize])

  const loadImage = (file: File) => {
    console.log(file)
    const url = URL.createObjectURL(file)
    const image = new window.Image()
    image.src = url

    image.onload = () => {
      console.log(windowSize)
      const size = {
        width: image.width,
        height: image.height,
      }
      // Canvas のサイズを超えている場合は、Canvas をはみ出ないサイズに調整
      if (size.width > maxWidth || size.height > maxHeight) {
        if (size.width > size.height) {
          size.height = (maxWidth * size.height) / size.width
          size.width = maxWidth
        } else {
          size.width = (maxHeight * size.width) / size.height
          size.height = maxHeight
        }
      }

      actions.push(
        <KonvaImage
          draggable
          image={image}
          x={200}
          y={200}
          width={size.width}
          height={size.height}
        />
      )
      URL.revokeObjectURL(url)
    }
  }

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      files.forEach((file) => {
        loadImage(file)
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
