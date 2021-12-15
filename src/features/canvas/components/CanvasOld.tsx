import * as React from 'react'

import Line from 'features/drawing/components/Line'
import Rect from 'features/drawing/components/Rect'
import Circle from 'features/drawing/components/Circle'

import { ShapeTypeContext } from 'pages/Root'

type Point = {
  x: number
  y: number
}

const CANVAS_SIZE = 500

const CreateShape = (
  shape: string,
  p1: Point,
  p2: Point,
  origin: Point,
  ctx: CanvasRenderingContext2D
) => {
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
        <Circle
          cx={((center.x - origin.x) / CANVAS_SIZE) * 100}
          cy={((center.y - origin.y) / CANVAS_SIZE) * 100}
          rx={(radius.x / CANVAS_SIZE) * 100}
          ry={(radius.y / CANVAS_SIZE) * 100}
        />
      )
    }
    case 'Rect': {
      const leftTop: Point = {
        x: Math.min(p1.x, p2.x) - origin.x,
        y: Math.min(p1.y, p2.y) - origin.y,
      }
      const widthHeight: Point = {
        x: Math.abs(p1.x - p2.x),
        y: Math.abs(p1.y - p2.y),
      }
      ctx.fillRect(leftTop.x, leftTop.y, widthHeight.x, widthHeight.y)
      return (
        <Rect
          x={(leftTop.x / CANVAS_SIZE) * 100}
          y={(leftTop.y / CANVAS_SIZE) * 100}
          width={(widthHeight.x / CANVAS_SIZE) * 100}
          height={(widthHeight.y / CANVAS_SIZE) * 100}
        />
      )
    }
    case 'Line':
      return (
        <Line
          x1={((p1.x - origin.x) / CANVAS_SIZE) * 100}
          y1={((p1.y - origin.y) / CANVAS_SIZE) * 100}
          x2={((p2.x - origin.x) / CANVAS_SIZE) * 100}
          y2={((p2.y - origin.y) / CANVAS_SIZE) * 100}
        />
      )
    default:
      break
  }
}

// const PasteObject = async (data: string | File, origin: Point) => {
//   if (data instanceof File && data.type.startsWith('image')) {
//     console.log(data)
//     const image = await new Promise<HTMLImageElement>((resolve, reject) => {
//       const reader = new FileReader()

//       reader.onload = () => {
//         const img = new Image()
//         img.onload = () => {
//           resolve(img)
//         }
//         img.src = reader.result?.toString() || ''
//       }
//       reader.onerror = (error) => reject(error)
//       reader.readAsDataURL(data)
//     })

//     const size = {
//       width: image.width,
//       height: image.height,
//     }
//     // Canvas のサイズを超えている場合は、Canvas をはみ出ないサイズに調整
//     if (Math.max(size.width, size.height) > CANVAS_SIZE) {
//       const ratio = size.width / size.height
//       size.width = ratio > 1 ? 1 : ratio
//       size.height = ratio > 1 ? 1 / ratio : 1
//     } else {
//       size.width /= CANVAS_SIZE
//       size.height /= CANVAS_SIZE
//     }

//     return (
//       <SvgImage
//         x={0}
//         y={0}
//         width={size.width * 100}
//         height={size.height * 100}
//         xlinkHref={image.src}
//       />
//     )
//   }
// }

export const Canvas = () => {
  // contextを状態として持つ
  const [context, setContext] =
    React.useState<CanvasRenderingContext2D | null>()
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const [, setItems] = React.useState<React.ReactNode[]>([])
  const { shapeType } = React.useContext(ShapeTypeContext)
  const [start, setStart] = React.useState<Point>({
    x: 0,
    y: 0,
  })

  // コンポーネントの初期化完了後コンポーネント状態にコンテキストを登録
  React.useEffect(() => {
    const canvasContext = canvasRef.current?.getContext('2d')
    setContext(canvasContext)
  }, [])

  const handleMouseDown = (event: React.MouseEvent) => {
    const { clientX, clientY } = event
    setStart({ x: clientX, y: clientY })
  }
  const handleMouseUp = (event: React.MouseEvent) => {
    const { clientX, clientY } = event
    const { left, top } = event.currentTarget.getBoundingClientRect()
    const end = { x: clientX, y: clientY }
    const canvasOrigin = { x: left, y: top }
    setStart({ x: 0, y: 0 })
    if (context) {
      const shape = CreateShape(shapeType, start, end, canvasOrigin, context)
      if (shape) {
        setItems((prev) => [...prev, shape])
      }
    }
  }

  return (
    <canvas
      width="1280"
      height="720"
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}></canvas>
  )
}

// type Props = {
//   pasteData?: string | File
// }
// const Canvas: React.FC<Props> = ({ pasteData }) => {
//   const [start, setStart] = React.useState<Point>({
//     x: 0,
//     y: 0,
//   })
//   const [items, setItems] = React.useState<React.ReactNode[]>([])
//   const { shapeType } = React.useContext(ShapeTypeContext)
//   const canvasRef = React.useRef<HTMLDivElement>(null)

//   const handleMouseDown = (event: React.MouseEvent) => {
//     const { clientX, clientY } = event
//     setStart({ x: clientX, y: clientY })
//   }
//   const handleMouseUp = (event: React.MouseEvent) => {
//     const { clientX, clientY } = event
//     const { left, top } = event.currentTarget.getBoundingClientRect()
//     const end = { x: clientX, y: clientY }
//     const canvasOrigin = { x: left, y: top }
//     setStart({ x: 0, y: 0 })
//     const shape = CreateShape(shapeType, start, end, canvasOrigin)
//     if (shape) {
//       setItems((prev) => [...prev, shape])
//     }
//   }

//   React.useEffect(() => {
//     if (pasteData !== undefined && canvasRef.current !== null) {
//       const { left, top } = canvasRef.current?.getBoundingClientRect()
//       const canvasOrigin = { x: left, y: top }
//       const func = async () => {
//         const obj = await PasteObject(pasteData, canvasOrigin)
//         console.log(obj)
//         setItems((prev) => [...prev, obj])
//       }
//       func()
//     }
//   }, [pasteData])

//   return (
//     <Box p={20}>
//       <Paper
//         ref={canvasRef}
//         id="test"
//         onMouseDown={handleMouseDown}
//         onMouseUp={handleMouseUp}
//         sx={{ width: `${CANVAS_SIZE}px`, height: `${CANVAS_SIZE}px` }}>
//         <Svg height={CANVAS_SIZE} width={CANVAS_SIZE}>
//           {React.Children.toArray(items)}
//         </Svg>
//       </Paper>
//     </Box>
//   )
// }

// export default Canvas
