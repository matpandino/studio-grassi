import { InputHTMLAttributes, ReactNode } from 'react'
import {
  Controller,
  FieldError,
  FieldValues,
  UseControllerProps,
} from 'react-hook-form'

interface Props<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<InputHTMLAttributes<HTMLInputElement>, 'name' | 'defaultValue'> {
  label: string | ReactNode
  error?: FieldError
}

const ControlTextInput = <T extends FieldValues>({
  name,
  label,
  control,
  error,
  ...rest
}: Props<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: 'This is required',
      }}
      render={({ field: { onChange } }) => (
        <>
          <label
            htmlFor={name}
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            {label}
          </label>
          <input
            className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={onChange}
            {...rest}
          />
          {error && <span style={{ color: 'red' }}>{error?.message}</span>}
        </>
      )}
    />
  )
}

export default ControlTextInput
