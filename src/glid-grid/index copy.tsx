import React from "react";
import DataEditor, {
  GridColumn,
  GridCell,
  Item,
  GridCellKind,
  EditableGridCell,
  CustomRenderer,
  CustomCell,
} from "@glideapps/glide-data-grid";
import { useCallback, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "@glideapps/glide-data-grid/dist/index.css";

// Define the type for the mock data (2D array of strings)
type MockData = string[][];

type ExtendedGridColumn = GridColumn & {
  type?: "dropdown" | "text";
  onCellRender?: (cell: Item) => GridCell;
};

// Define the hook return type
interface UseMockDataGeneratorReturn {
  columns: ExtendedGridColumn[];
  data: MockData;
  getCellContent: (cell: Item) => GridCell;
  setCellValue: (cell: Item, newValue: EditableGridCell) => void;
}

const columns: ExtendedGridColumn[] = [
  {
    title: "Lieferanten GLN/ILN",
    id: "gln",
  },
  {
    title: "Artikelnummer",
    id: "Artikelnummer",
  },
  {
    title: "Bestellwährung Lager",
    id: "Bestellwährung_Lager",
    type: "dropdown",
  },
];

// Utility function to generate mock data for columns
const generateMockData = (numRows: number, numCols: number): MockData => {
  return Array.from(
    { length: numRows },
    () =>
      Array.from({ length: numCols }, () =>
        Math.random().toString(36).substring(2, 7)
      ) // Random string for mock data
  );
};

const useMockDataGenerator = (
  numRows: number = 50,
  addRowMarker: boolean = false
): UseMockDataGeneratorReturn => {
  const [data, setData] = useState<MockData>(generateMockData(numRows, 10)); // Default to 10 columns

  const getCellContent = useCallback(
    (cell: Item): CustomCell => {
      const [colIndex, rowIndex] = cell;
      const value = data[rowIndex][colIndex];
      return {
        kind: GridCellKind.Custom,
        allowOverlay: true,
        readonly: false,
        copyData: value,
        // displayData: value as any,

        data: {
          kind: "dropdown-cell",
          options: ["USD", "EUR", "GBP"],
          value: value || "",
        },
      };
    },
    [data]
  );

  const setCellValue = useCallback(
    (cell: Item, newValue: EditableGridCell): void => {
      const [colIndex, rowIndex] = cell;
      setData((prevData) => {
        const newData = [...prevData];
        newData[rowIndex][colIndex] = newValue.data as string; // Update the data in the cell
        return newData;
      });
    },
    []
  );

  return { columns, data, getCellContent, setCellValue };
};

export default function GlideGridPOC() {
  const { columns, data, getCellContent, setCellValue } = useMockDataGenerator(
    50,
    false
  );
  return (
    <div>
      <DataEditor
        getCellContent={getCellContent}
        onCellEdited={setCellValue}
        columns={columns}
        getCellsForSelection={true}
        onPaste={true}
        rowMarkers="both"
        rows={data.length}
        customRenderers={[renderer]}
      />
      <div id="portal" />
    </div>
  );
}

// *********************

interface DropdownCellProps {
  readonly kind: "dropdown-cell";
  readonly value: string;
  readonly options: string[];
  readonly label?: string;
  readonly readonly?: boolean;
}

export type DropdownCell = CustomCell<DropdownCellProps>;

const renderer: CustomRenderer<DropdownCell> = {
  kind: GridCellKind.Custom,
  isMatch: (c): c is DropdownCell => (c.data as any).kind === "dropdown-cell",
  draw: (args, cell) => {
    const { ctx, theme, rect } = args;
    const { value, label } = cell.data;

    const x = rect.x + theme.cellHorizontalPadding;
    const yMid = rect.y + rect.height / 2;

    const valueFormatted = (value as any).value || "";

    // Draw the dropdown background
    ctx.save();

    const dropdownWidth = rect.width - theme.cellHorizontalPadding * 2;
    ctx.beginPath();
    ctx.fillStyle = theme.bgBubble;
    ctx.rect(x, yMid - 10, dropdownWidth, 20);
    ctx.fill();
    ctx.strokeStyle = theme.accentLight;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Draw the selected value in the center
    ctx.textAlign = "center";
    ctx.fillStyle = theme.textDark;
    ctx.fillText(valueFormatted, rect.x + rect.width / 2, yMid + 5);

    // If a label exists, draw it to the left of the dropdown
    if (label !== undefined) {
      ctx.textAlign = "left";
      ctx.fillStyle = theme.textDark;
      ctx.fillText(label, rect.x + theme.cellHorizontalPadding, yMid + 5);
    }

    ctx.restore();

    return true;
  },

  provideEditor: (p) => {
    return (props) => {
      const { data } = props.value;
      const { value, options } = data;

      const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        props.onChange({
          ...props.value,
          data: {
            ...data,
            value: e.target.value,
          },
        });
      };

      return (
        <label style={{ display: "flex", flexDirection: "column" }}>
          <select
            value={value}
            onChange={onChange}
            style={{ width: "100%", padding: "4px", borderRadius: "4px" }}
          >
            {options.map((option: any) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      );
    };
  },

  onPaste: (v, d) => {
    // If the pasted value exists in the options list, set it as the value.
    const newValue = d.options.includes(v) ? v : d.value;
    return {
      ...d,
      value: newValue,
    };
  },
};
