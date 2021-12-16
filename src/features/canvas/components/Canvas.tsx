import * as React from 'react'
import {
  Stage,
  Layer,
  Rect,
  Line,
  Ellipse,
  Image as KonvaImage,
} from 'react-konva'
import Konva from 'konva'

import { ShapeTypeContext } from 'pages/Root'
import { PasteData } from 'contexts/PasteDataProvider'
import { Vector2d } from 'konva/lib/types'
import TextBlock from './TextBlock'

const CreateShape = (shape: string, p1: Vector2d, p2: Vector2d) => {
  switch (shape) {
    case 'Circle': {
      const center = {
        x: (p1.x + p2.x) / 2,
        y: (p1.y + p2.y) / 2,
      }
      const radius = {
        x: Math.abs(p1.x - p2.x) / 2,
        y: Math.abs(p1.y - p2.y) / 2,
      }
      return (
        <Ellipse
          x={center.x}
          y={center.y}
          radiusX={radius.x}
          radiusY={radius.y}
          fill="gray"
          stroke="blue"
        />
      )
    }
    case 'Rect': {
      const leftTop: Vector2d = {
        x: Math.min(p1.x, p2.x),
        y: Math.min(p1.y, p2.y),
      }
      const widthHeight: Vector2d = {
        x: Math.abs(p1.x - p2.x),
        y: Math.abs(p1.y - p2.y),
      }
      return (
        <Rect
          x={leftTop.x}
          y={leftTop.y}
          width={widthHeight.x}
          height={widthHeight.y}
          fill="gray"
          stroke="blue"
        />
      )
    }
    case 'Line':
      return (
        <Line points={[p1.x, p1.y, p2.x, p2.y]} stroke="blue" strokeWidth={4} />
      )
    case 'Text':
      return <TextBlock point={p1} />
    default:
      break
  }
}

const PasteObject = async (data: string | File) => {
  if (data instanceof File && data.type.startsWith('image')) {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = () => {
        const img = new Image()
        img.onload = () => {
          resolve(img)
        }
        img.src = reader.result?.toString() || ''
      }
      reader.onerror = (error) => reject(error)
      reader.readAsDataURL(data)
    })

    const size = {
      width: image.width,
      height: image.height,
    }
    // Canvas のサイズを超えている場合は、Canvas をはみ出ないサイズに調整
    // if (Math.max(size.width, size.height) > CANVAS_SIZE) {
    //   const ratio = size.width / size.height
    //   size.width = ratio > 1 ? 1 : ratio
    //   size.height = ratio > 1 ? 1 / ratio : 1
    // } else {
    //   size.width /= CANVAS_SIZE
    //   size.height /= CANVAS_SIZE
    // }

    return (
      <KonvaImage
        image={image}
        x={0}
        y={0}
        width={size.width}
        height={size.height}
      />
    )
  }
}

export const Canvas = () => {
  const { shapeType } = React.useContext(ShapeTypeContext)
  const [start, setStart] = React.useState<Vector2d>({
    x: 0,
    y: 0,
  })
  const [items, setItems] = React.useState<React.ReactNodeArray>([])
  const pasteData = React.useContext(PasteData)

  React.useEffect(() => {
    if (pasteData !== undefined) {
      const func = async () => {
        const obj = await PasteObject(pasteData)
        setItems((prev) => [...prev, obj])
      }
      func()
    }
  }, [pasteData])

  const handleMouseDown = (event: Konva.KonvaEventObject<MouseEvent>) => {
    const pos = event.target.getStage()?.getPointerPosition()
    if (pos) {
      setStart(pos)
    }
  }
  const handleMouseUp = (event: Konva.KonvaEventObject<MouseEvent>) => {
    const pos = event.target.getStage()?.getPointerPosition()

    setStart({ x: 0, y: 0 })
    if (pos) {
      const shape = CreateShape(shapeType, start, pos)
      if (shape) {
        setItems((prev) => [...prev, shape])
      }
    }
  }
  return (
    <Stage
      width={1000}
      height={1000}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}>
      <Layer>
        <Rect
          x={200}
          y={200}
          width={200}
          height={200}
          fill="gray"
          stroke={'blue'}
        />
        {React.Children.toArray(items).map((item) => item)}
      </Layer>
    </Stage>
  )
}
