"use client";

import { ReactNode } from "react";
import clsx from "clsx";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../select";
import { useTranslation } from "react-i18next";
import ColorBadge from "../badges/ColorBadge";

interface Props {
  name?: string;
  title?: string;
  withLabel?: boolean;
  options: {
    name: string | ReactNode;
    value: string | number | undefined;
    disabled?: boolean;
    component?: ReactNode;
    color?: number;
  }[];
  value?: string | number | undefined;
  setValue?: React.Dispatch<React.SetStateAction<string | number | undefined>>;
  defaultValue?: string | number | undefined;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  hint?: ReactNode;
  autoFocus?: boolean;
  placeholder?: string;
  withColors?: boolean;
}
export default function InputSelect({
  name,
  title,
  withLabel = true,
  value,
  defaultValue,
  options,
  setValue,
  className,
  required,
  disabled,
  hint,
  placeholder,
  withColors,
}: Props) {
  const { t } = useTranslation();
  return (
    <div className={clsx(className, "")}>
      {withLabel && title && (
        <label htmlFor={name} className="flex justify-between space-x-2 truncate text-xs font-medium">
          <div className="flex items-center space-x-1 truncate">
            <div className="flex space-x-1 truncate">
              <div className="truncate">{title}</div>
              {required && title && <div className="ml-1 text-red-500">*</div>}
            </div>
          </div>
          {hint}
        </label>
      )}
      <div className={clsx(withLabel && title && "mt-1")}>
        <Select
          name={name}
          value={value?.toString()}
          defaultValue={defaultValue?.toString()}
          onValueChange={(e) => (setValue ? setValue(e) : null)}
          disabled={disabled}
          required={required}
        >
          <SelectTrigger type="button" className="w-full">
            <SelectValue placeholder={withLabel ? placeholder || `${t("shared.select")}...` : title} />
          </SelectTrigger>
          <SelectContent className="max-h-64 overflow-auto">
            <SelectGroup>
              {options.map((item, idx) => {
                return (
                  <SelectItem key={idx} disabled={item.disabled} value={item.value?.toString() ?? ""}>
                    {item.component || (
                      <div className="flex items-center space-x-2">
                        {withColors && <ColorBadge color={item.color} />}
                        <div>{item.name}</div>
                      </div>
                    )}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
