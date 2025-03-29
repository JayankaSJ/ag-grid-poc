import { ValueFormatterParams } from "ag-grid-community";
import { CustomCellEditorProps } from "ag-grid-react";
import React, { memo, useMemo, useRef } from "react";

export const dateFormatter = (params: ValueFormatterParams): string => {
  return new Date(params.value).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const OptionsEditor = memo(
  ({
    value,
    options: optionsFromProps,
    onValueChange,
    stopEditing,
  }: CustomCellEditorProps & { options?: string[] }) => {
    const options = useMemo(() => optionsFromProps ?? [], [optionsFromProps]);

    const refContainer = useRef<HTMLDivElement>(null);

    function onValueChangeHandler(e: React.ChangeEvent<HTMLSelectElement>) {
      onValueChange(e.target.value);
      stopEditing();
    }

    return (
      <div ref={refContainer} tabIndex={1}>
        <select
          onChange={onValueChangeHandler}
          value={value}
          style={{ width: "100%" }}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }
);
