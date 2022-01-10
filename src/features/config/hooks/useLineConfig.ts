import * as React from 'react'
import {
  LineConfigContext,
  SetLineConfigContext,
} from '../contexts/LineConfigProvider'

export const useLineConfig = () => {
  const config = React.useContext(LineConfigContext)
  const setConfig = React.useContext(SetLineConfigContext)

  if (config === null || setConfig === null) {
    throw new Error('LineConfigProvider is not wrapped')
  }

  return [config, setConfig] as const
}
