import * as React from 'react'
// import TextField from '@mui/material/TextField'
import InputUnstyled from '@mui/base/InputUnstyled'
import { styled } from '@mui/system'
import { Vector2d } from 'konva/lib/types'

const StyledInputElement = styled('input')(
  ({ theme }) => `
  width: 320px;
  font-size: 0.875rem;
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  line-height: 1.5;
  color: grey.900;
  background: transparent;
  border-radius: 0px;
  padding: 12px 12px;
  transition: all 150ms ease;
  font-size: 20;
  padding: 0;
  border: 'none';
  border: 1px solid ${theme.palette.grey[900]};

  &:focus {
    outline: none;
    border: 1px solid ${theme.palette.grey[900]};
    border-radius: 0px;
  }
`
)

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

  console.log(options)
  const inputRef = React.useRef<HTMLInputElement>()
  const handleComplete = React.useCallback(() => {
    console.log(inputRef.current?.getBoundingClientRect())
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
    // handleComplete()
  }

  return (
    <>
      <TextEditorContext.Provider value={edit}>
        {children}
      </TextEditorContext.Provider>
      {resolveReject.length > 0 && (
        <div
          style={{
            position: 'absolute',
            left: options.pos.x,
            top: options.pos.y,
          }}>
          <InputUnstyled
            autoFocus
            value={value}
            placeholder="Input Text"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            components={{
              Input: StyledInputElement,
            }}
          />
        </div>
      )}
    </>
  )
}
