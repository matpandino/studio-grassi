import { ExclamationCircleIcon } from "@heroicons/react/20/solid";
import { FC, ReactNode } from "react";

interface InputProps {
  name: string;
  id: string;
  type?: string;
  labelContent?: ReactNode | string;
  placeHolder?: string;
  defaultValue?: string;
  showError?: boolean;
  isInvalid?: boolean;
  invalidReason?: string;
}

const Input: FC<InputProps> = ({
  id,
  name,
  type,
  invalidReason,
  defaultValue,
  isInvalid,
  labelContent,
  placeHolder,
  showError,
}) => {
  const showErrorMessage = showError && isInvalid && invalidReason;
  return (
    <>
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {labelContent}
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          type={type}
          name={name}
          id={id}
          className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-red-900 ring-1 ring-inset ring-red-300 placeholder:text-red-300 focus:ring-2 focus:ring-inset focus:ring-red-500 sm:text-sm sm:leading-6"
          placeholder={placeHolder}
          defaultValue={defaultValue}
          aria-invalid={isInvalid}
        />
        {showError && isInvalid ? (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        ) : null}
      </div>

      {showErrorMessage ? (
        <p className="mt-2 text-sm text-red-600" id={`${id}-error`}>
          {invalidReason}
        </p>
      ) : null}
    </>
  );
};

export default Input;
