import * as React from 'react'
import {
  Group,
  Stage,
  Layer,
  Rect,
  Line,
  Ellipse,
  Image as KonvaImage,
  Transformer,
} from 'react-konva'
import Konva from 'konva'

import { ShapeTypeContext } from 'pages/Root'
import { PasteData } from 'contexts/PasteDataProvider'
import { Vector2d } from 'konva/lib/types'
import TextBlock from './TextBlock'
import { TextEditorContext } from 'contexts/TextEditorProvider'
import { StageRef } from 'contexts/StageRefProvider'
import { useLineConfig } from 'features/config/contexts/LineConfigProvider'
import { useShapeConfig } from 'features/config/contexts/ShapeConfigProvider'
import UploadButton from './UploadButton'
import { useShapes } from '../contexts/ShapesProvider'
import { useCanvasSize } from 'features/config/hooks/useCanvasSize'

const CreateShape = (
  shape: string,
  p1: Vector2d,
  p2: Vector2d,
  lineConfig: Konva.ShapeConfig = {},
  optionalConfig: Konva.ShapeConfig = {}
) => {
  const handleTransformEnd = (e: Konva.KonvaEventObject<Event>) => {
    const node = e.target

    const scaleX = node.scaleX()
    const scaleY = node.scaleY()
    node.scaleX(1)
    node.scaleY(1)

    node.width(node.width() * scaleX)
    node.height(node.height() * scaleY)
  }

  const config = {
    draggable: true,
    ...optionalConfig,
  }

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
          onTransformEnd={handleTransformEnd}
          {...lineConfig}
          {...config}
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
          onTransformEnd={handleTransformEnd}
          {...lineConfig}
          {...config}
        />
      )
    }
    case 'Line':
      return (
        <Line
          points={[p1.x, p1.y, p2.x, p2.y]}
          stroke="blue"
          strokeWidth={4}
          onTransformEnd={handleTransformEnd}
          {...lineConfig}
          {...config}
        />
      )
    default:
      break
  }
}

const DrawFreeLine = (
  points: number[],
  lineConfig: Konva.ShapeConfig,
  config: Konva.ShapeConfig = {
    draggable: true,
  }
) => {
  return (
    <Line
      points={points}
      mode="source-over"
      stroke="blue"
      strokeWidth={4}
      {...lineConfig}
      {...config}
    />
  )
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

type Props = {
  width: number
  height: number
}
export const Canvas: React.FC<Props> = ({ width, height }) => {
  const { shapeType } = React.useContext(ShapeTypeContext)
  const [newShape, setNewShape] = React.useState<React.ReactNode>()
  const [start, setStart] = React.useState<Vector2d>({
    x: 0,
    y: 0,
  })
  const [shapes, shapesActions] = useShapes()
  const [freePoints, setFreePoints] = React.useState<number[]>([])
  const pasteData = React.useContext(PasteData)
  const edit = React.useContext(TextEditorContext)
  const [absPos, setAbsPos] = React.useState<Vector2d>()
  const stageRef = React.useContext(StageRef)
  const transformerRef = React.useRef<Konva.Transformer>(null)
  const [drawing, setDrawing] = React.useState(false)

  const [lineConfig] = useLineConfig()
  const [shapeConfig] = useShapeConfig()

  const canvasSize = useCanvasSize(width, height)

  React.useEffect(() => {
    if (pasteData !== undefined) {
      const func = async () => {
        const obj = await PasteObject(pasteData)
        shapesActions.push(obj)
      }
      func()
    }
  }, [pasteData, shapesActions])

  const startDrawing = (pos: Vector2d, client: Vector2d) => {
    if (shapeType === 'Text') {
      setAbsPos({
        x: client.x,
        y: client.y,
      })
    } else if (shapeType === 'Free') {
      setFreePoints((prev) => [pos.x, pos.y, pos.x, pos.y])
    }

    setDrawing(true)
    setStart(pos)
  }

  const handleMouseDown = (event: Konva.KonvaEventObject<MouseEvent>) => {
    const pos = event.target.getStage()?.getPointerPosition()
    const { clientX, clientY } = event.evt
    if (pos) {
      startDrawing(pos, { x: clientX, y: clientY })
    }
  }
  const handleTouchStart = (event: Konva.KonvaEventObject<TouchEvent>) => {
    const pos = event.target.getStage()?.getPointerPosition()
    const { clientX, clientY } = event.evt.touches[0]
    if (pos) {
      startDrawing(pos, { x: clientX, y: clientY })
    }

    event.evt.preventDefault()
  }

  const handleMouseMove = (
    event: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) => {
    const pos = event.target.getStage()?.getPointerPosition()
    if (pos && drawing) {
      if (shapeType === 'Free') {
        setFreePoints((prev) => [...prev, pos.x, pos.y])
        return
      }

      const shape = CreateShape(shapeType, start, pos, lineConfig, shapeConfig)
      setNewShape(shape)
    }

    event.evt.preventDefault()
  }

  const handleMouseUp = (
    event: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) => {
    if (shapeType === 'Text') {
      if (absPos && stageRef?.current) {
        edit({
          pos: absPos,
          value: '',
        }).then((result) => {
          if (result) {
            const shape = <TextBlock point={start} value={result} />
            shapesActions.push(shape)
          }
        })
      }
    }
    if (newShape) {
      shapesActions.push(newShape)
    }
    setDrawing(false)
    setNewShape(undefined)
    setFreePoints([])
    setStart({ x: 0, y: 0 })

    event.evt.preventDefault()
  }

  React.useEffect(() => {
    if (freePoints.length > 0) {
      const line = DrawFreeLine(freePoints, lineConfig)
      setNewShape(line)
    }
  }, [freePoints, lineConfig])

  const [background, setBackground] = React.useState<React.ReactNode>()

  React.useEffect(() => {
    const start = {
      x: 0,
      y: 0,
    }
    const end = {
      x: width,
      y: height,
    }
    const rect = CreateShape(
      'Rect',
      start,
      end,
      {},
      {
        draggable: false,
        fill: 'white',
        stroke: 'transparent',
        listening: false,
      }
    )

    const lineStart = {
      x: width / 2,
      y: 0,
    }
    const lineEnd = {
      x: width / 2,
      y: height,
    }
    const centerLine = CreateShape('Line', lineStart, lineEnd, {
      draggable: false,
      stroke: 'black',
      strokeWidth: 2,
      lineJoin: 'round',
      /*
       * line segments with a length of 33px
       * with a gap of 10px
       */
      dash: [10, 10],
      opacity: 0.2,
    })
    setBackground(
      <Group>
        {rect}
        {centerLine}
      </Group>
    )
  }, [width, height])

  const handleClick = (e: Konva.KonvaEventObject<MouseEvent>) => {
    if (transformerRef.current === null) {
      return
    }

    if (shapeType !== 'Select') {
      return
    }

    if (e.target === e.target.getStage()) {
      transformerRef.current.nodes([])
      return
    }
    transformerRef.current.nodes([e.target])
  }

  const testRef = React.useRef<Konva.Rect>(null)
  React.useEffect(() => {
    if (transformerRef.current && testRef.current) {
      transformerRef.current.nodes([testRef.current])
    }
  }, [])

  return (
    <div style={{ flexGrow: 1 }}>
      <TextEditorContext.Consumer>
        {(value) => (
          <Stage
            ref={stageRef}
            preventDefault
            width={width}
            height={height}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            // Prevent to create a small shape on dragging is started when set Shape type is not "select"
            onDragStart={() => newShape && setNewShape(undefined)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchEnd={handleMouseUp}
            onClick={handleClick}
            onTap={handleClick}>
            <TextEditorContext.Provider value={value}>
              <Layer>
                <Group
                  clipX={canvasSize.x}
                  clipY={canvasSize.y}
                  clipWidth={canvasSize.width}
                  clipHeight={canvasSize.height}>
                  {background}
                  {React.Children.toArray(shapes).map((item) => item)}
                  {newShape}
                  <Transformer ref={transformerRef} />
                </Group>
              </Layer>
            </TextEditorContext.Provider>
          </Stage>
        )}
      </TextEditorContext.Consumer>
      <UploadButton />
    </div>
  )
}
