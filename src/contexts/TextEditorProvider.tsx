import * as React from 'react'
import TextField from '@mui/material/TextField'
import { Vector2d } from 'konva/lib/types'

type EditorOptions = {
  pos: Vector2d
  value: string
}

export const TextEditorContext = React.createContext<
  (args: EditorOptions) => Promise<string>
>(() => {
  return new Promise<string>((resolve) => {
    const msg = 'not implemented'
    console.log(msg)
    resolve(msg)
  })
})

const initOptions = () => ({
  pos: { x: 0, y: 0 },
  value: '',
})

export const TextEditorProvider: React.FC = ({ children }) => {
  const [value, setValue] = React.useState('default')
  const [options, setOptions] = React.useState<EditorOptions>(initOptions())
  const [resolveReject, setResolveReject] = React.useState<
    ((result: string) => void)[]
  >([])
  const [resolve, reject] = resolveReject

  const edit = React.useCallback((args: EditorOptions) => {
    setOptions((prev) => ({ ...prev, ...args }))
    return new Promise<string>((resolve, reject) => {
      setResolveReject([resolve, reject])
    })
  }, [])

  React.useEffect(() => {
    setValue(options.value)
  }, [options])

  const handleClose = React.useCallback(() => {
    setResolveReject([])
    setOptions(initOptions())
  }, [])

  const handleCancel = React.useCallback(() => {
    if (reject) {
      reject(value)
      handleClose()
    }
  }, [reject, handleClose, value])

  const handleComplete = React.useCallback(() => {
    if (resolve) {
      resolve(value)
      handleClose()
    }
  }, [resolve, value, handleClose])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleComplete()
    } else if (event.key === 'Escape') {
      handleCancel()
    }
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setValue(event.target.value)
  }

  const handleBlur = () => {
    // When focus is out
    handleComplete()
  }

  return (
    <>
      <TextEditorContext.Provider value={edit}>
        {children}
      </TextEditorContext.Provider>
      {resolveReject.length > 0 && (
        <TextField
          autoFocus
          value={value}
          placeholder="Input Text"
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          sx={{ position: 'absolute', left: options.pos.x, top: options.pos.y }}
        />
      )}
    </>
  )
}
