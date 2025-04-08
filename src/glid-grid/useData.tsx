import {
  Item,
  GridCell,
  GridCellKind,
  EditableGridCell,
} from "@glideapps/glide-data-grid";
import { useTemplateData } from "../template-data";
import { useCallback, useMemo, useState } from "react";

export function useData() {
  const { columns, rows } = useTranslatedData();
  const [data, setData] = useState(rows);

  function getCellContent(cell: Item): GridCell {
    const [colIndex, rowIndex] = cell;
    const column = columns[colIndex];
    const value = column?.getValue(rows[rowIndex][colIndex]);

    return {
      kind: column.kind,
      readonly: false,
      allowOverlay: true,
      copyData: value,
      displayData: value?.toString(),
      data: value,
    } as GridCell;
  }

  const setCellValue = useCallback(
    (cell: Item, newValue: EditableGridCell): void => {
      const [colIndex, rowIndex] = cell;
      setData((prevData) => {
        const newData = [...prevData];
        newData[rowIndex][colIndex] = newValue.data;
        return newData;
      });
    },
    []
  );

  return {
    columns,
    data,

    getCellContent,
    setCellValue,
  };
}

function useTranslatedData() {
  const { columns, rows } = useTemplateData();

  const { translatedColumns } = useMemo(() => {
    const items = columns.map((column) => {
      const { type, options } = column;

      let kind = GridCellKind.Custom;
      let getValue;
      switch (type) {
        case "text":
          kind = GridCellKind.Text;
          getValue = (value: unknown) => value || "";
          break;
        case "boolean":
          kind = GridCellKind.Boolean;
          getValue = (value: unknown) => value || false;
          break;
        case "integer":
          kind = GridCellKind.Number;
          getValue = (value: unknown) => value || 0;
          break;
        case "currency":
          kind = GridCellKind.Number;
          getValue = (value: unknown) => value || 0;
          break;
        case "option":
          kind = GridCellKind.Custom;
          getValue = (value: unknown) => {
            return {
              kind: "dropdown",
              options,
              value,
            };
          };
          break;
        default:
          kind = GridCellKind.Custom;
          getValue = (value: unknown) => value || "";
          break;
      }

      return {
        ...column,
        kind,
        getValue,
        id: column.key,
        title: column.label || column.key,
      };
    });
    const columnIndexes = columns.reduce((acc, column, index) => {
      acc[column.key] = index;
      return acc;
    }, {} as Record<string, number>);
    return {
      translatedColumns: items,
      columnIndexes,
    };
  }, [columns]);

  const translatedRows = useMemo(() => {
    return rows.map((row) => {
      const newRow: Record<number, unknown> = {};
      Object.entries(row).forEach(([key, value]) => {
        const columnIndex = translatedColumns.findIndex(
          (column) => column.key === key
        );
        if (columnIndex !== -1) {
          newRow[columnIndex] = value;
        }
      });
      return newRow;
    });
  }, [rows, translatedColumns]);

  return {
    columns: translatedColumns,
    rows: translatedRows,
  };
}
