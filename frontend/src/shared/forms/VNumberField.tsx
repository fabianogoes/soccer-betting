import { useEffect, useState } from 'react'
import { TextField, TextFieldProps } from '@mui/material'
import { useField } from '@unform/core'


type TVNumberFieldProps = TextFieldProps & {
  name: string
}
export const VNumberField: React.FC<TVNumberFieldProps> = ({ name, ...rest }) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField(name)

  const [value, setValue] = useState(defaultValue || 0)


  useEffect(() => {
    registerField({
      name: fieldName,  
      getValue: () => Number(value),
      setValue: (_, newValue) => setValue(Number(newValue)),
    })
  }, [registerField, fieldName, value])


  return (
    <TextField
      {...rest}

      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
      error={!!error}
      helperText={error}
      defaultValue={defaultValue}

      value={value}

      onChange={e => { setValue(e.target.value); rest.onChange?.(e) }}
      onKeyDown={(e) => { error && clearError(); rest.onKeyDown?.(e) }}
    />
  )
}
