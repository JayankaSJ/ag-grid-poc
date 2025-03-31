import {
  CustomCell,
  CustomRenderer,
  GridCellKind,
} from "@glideapps/glide-data-grid";

interface DropdownCellProps {
  readonly kind: "dropdown";
  readonly value: string;
  readonly options: string[];
  readonly label?: string;
  readonly readonly?: boolean;
}

export type DropdownCell = CustomCell<DropdownCellProps>;

export const DropDownRenderer: CustomRenderer<DropdownCell> = {
  kind: GridCellKind.Custom,
  isMatch: (c): c is DropdownCell => (c.data as any).kind === "dropdown",
  draw: (args, cell) => {
    const { ctx, theme, rect } = args;
    const { value, label } = cell.data;

    const x = rect.x + theme.cellHorizontalPadding;
    const yMid = rect.y + rect.height / 2;

    const valueFormatted = (value as any)?.value || "";

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
