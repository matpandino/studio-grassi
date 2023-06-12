import { FC, ReactNode } from "react";

interface TextAreaProps {
  name: string;
  id: string;
  rows?: number;
  labelContent?: ReactNode | string;
  placeHolder?: string;
  defaultValue?: string;
  showError?: boolean;
  isInvalid?: boolean;
  invalidReason?: string;
}

const TextArea: FC<TextAreaProps> = ({
  id,
  name,
  rows = 3,
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
        <textarea
          id={id}
          name={name}
          rows={rows}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue={defaultValue}
          placeholder={placeHolder}
        />
      </div>

      {showErrorMessage ? (
        <p className="mt-2 text-sm text-red-600" id={`${id}-error`}>
          {invalidReason}
        </p>
      ) : null}
    </>
  );
};

export default TextArea;
