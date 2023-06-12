import { ReactNode, FC } from "react";

interface PriceProps {
  name: string;
  id: string;
  currencySymbol?: string;
  type?: string;
  labelContent?: ReactNode | string;
  placeHolder?: string;
  defaultValue?: string;
  showError?: boolean;
  isInvalid?: boolean;
  invalidReason?: string;
}

const Price: FC<PriceProps> = ({
  id,
  name,
  defaultValue,
  currencySymbol = "R$",
  invalidReason,
  isInvalid,
  labelContent,
  placeHolder = "0.00",
  showError,
  type = "text",
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
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm">{currencySymbol}</span>
        </div>
        <input
          type={type}
          name={name}
          id={id}
          className="block w-full rounded-md border-0 py-1.5 pl-9 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder={placeHolder}
          defaultValue={defaultValue}
          aria-describedby="price-currency"
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

export default Price;
