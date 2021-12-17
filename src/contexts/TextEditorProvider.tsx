import * as React from 'react'
import TextField from '@mui/material/TextField'

export const TextEditorContext = React.createContext<() => Promise<void>>(
  () => {
    return new Promise<void>((resolve) => {
      console.log('not implemented')
      resolve()
    })
  }
)

export const TextEditorProvider: React.FC = ({ children }) => {
  const [value, setValue] = React.useState('default')
  const [resolveReject, setResolveReject] = React.useState<(() => void)[]>([])

  const [resolve, reject] = resolveReject

  const edit = React.useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      console.log('res rej')
      setResolveReject([resolve, reject])
    })
  }, [])

  const handleClose = React.useCallback(() => {
    setResolveReject([])
  }, [])

  const handleCancel = React.useCallback(() => {
    if (reject) {
      reject()
      handleClose()
    }
  }, [reject, handleClose])

  const handleComplete = React.useCallback(() => {
    console.log('comp')
    if (resolve) {
      resolve()
      handleClose()
    }
  }, [resolve, handleClose])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    console.log(event.key)
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
  return (
    <>
      <TextEditorContext.Provider value={() => edit()}>
        {children}
      </TextEditorContext.Provider>
      {resolveReject.length > 0 && (
        <TextField
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          sx={{ position: 'absolute', left: '300px', top: '300px' }}
        />
      )}
    </>
  )
}
