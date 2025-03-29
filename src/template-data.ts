import { useMemo } from "react";

export const TEXT_CELL = "text";
export const INTEGER_CELL = "integer";
export const CURRENCY_CELL = "currency";
export const BOOLEAN_CELL = "boolean";
export const DATE_CELL = "date";
export const OPTION_CELL = "option";
export const ASSETS_CELL = "assets";

export type ColumnInfo = {
  key: string;
  label: string;
  type:
    | "text"
    | "option"
    | "currency"
    | "boolean"
    | "integer"
    | "date"
    | "assets";
  options?: unknown[];
  nullable: boolean;
  fixed?: "left" | "right";
  children?: ColumnInfo[];
  cellClassName?: string;
  headerClassName?: string;
  dependencyResolver?: (
    value: ColumnInfo,
    data: Record<string, unknown>
  ) => ColumnInfo;
};

export type ColumnInfoDefinition = Record<string, Partial<ColumnInfo>>;

export type ColumnDefinitions = Record<string, ColumnInfo>;

export const columnsDefinitions: ColumnInfoDefinition = {
  "fixed-left": {
    type: "text",
    nullable: false,
    fixed: "left",
  },
  [TEXT_CELL]: {
    type: "text",
    nullable: false,
  },
  [INTEGER_CELL]: {
    type: "integer",
    nullable: false,
  },
  [CURRENCY_CELL]: {
    type: "currency",
    nullable: false,
  },
  [BOOLEAN_CELL]: {
    type: "boolean",
    nullable: false,
  },
  [DATE_CELL]: {
    type: "date",
    nullable: false,
  },
  [OPTION_CELL]: {
    type: "option",
    nullable: false,
    options: ["option 1", "option 2", "option 3"],
  },
  "assets-column": {
    type: "assets",
  },
  "dependency-parent-column": {
    type: "option",
    nullable: false,
    options: ["option 1", "option 2", "option 3"],
  },
  "dependency-child-column": {
    type: "option",
    nullable: false,
    options: [
      { value: "option 1 depend on parent option 1", dependency: "option 1" },
      { value: "option 2 depend on parent option 1", dependency: "option 1" },
      { value: "option 3 depend on parent option 3", dependency: "option 3" },
    ],
    dependencyResolver: (
      columnInfo: ColumnInfo,
      data: Record<string, unknown>
    ) => {
      const parentValue = data["dependency-parent-column"] as string;

      let options = columnInfo.options || [];
      if (parentValue) {
        options = options.filter((option) => {
          const optionValue = (option as Record<string, unknown>).dependency;
          return optionValue === parentValue;
        });
      }

      options = options.map((option) => (option as any).value);
      return {
        ...columnInfo,
        options: options,
      } as ColumnInfo;
    },
  },
  "parent-column": {
    type: "text",
    nullable: false,
    headerClassName: "bg-blue-300 text-center",
    children: [
      {
        key: "child-column-1",
        label: "Child Column 1",
        type: "text",
        nullable: false,
        headerClassName: "bg-blue-200",
        cellClassName: "bg-blue-100",
      },
      {
        key: "child-column-2",
        label: "Child Column 2",
        type: "text",
        nullable: false,
        headerClassName: "bg-blue-200",
        cellClassName: "bg-blue-100",
      },
    ],
  },
  "error-column": {
    type: "text",
    nullable: false,
    cellClassName: "bg-red-100",
  },
  "random-column-1": {
    type: "text",
    nullable: false,
  },
  "random-column-2": {
    type: "text",
    nullable: false,
  },
  "random-column-3": {
    type: "text",
    nullable: false,
  },
  "random-column-4": {
    type: "text",
    nullable: false,
  },
  "random-column-5": {
    type: "text",
    nullable: false,
  },
  "random-column-6": {
    type: "text",
    nullable: false,
  },
  "random-column-7": {
    type: "text",
    nullable: false,
  },
  "random-column-8": {
    type: "text",
    nullable: false,
  },
  "random-column-9": {
    type: "text",
    nullable: false,
  },
  "random-column-10": {
    type: "text",
    nullable: false,
  },
  "random-column-11": {
    type: "text",
    nullable: false,
  },
  "random-column-12": {
    type: "text",
    nullable: false,
  },

  "fixed-right": {
    type: "text",
    nullable: false,
    fixed: "right",
  },
};

export const rows = [
  {
    [TEXT_CELL]: "This is a text cell",
    [BOOLEAN_CELL]: true,
    [INTEGER_CELL]: 123,
    [CURRENCY_CELL]: 123.45,
    [DATE_CELL]: new Date(),
    [OPTION_CELL]: "option 1",
    "assets-column": [
      "https://fastly.picsum.photos/id/57/2448/3264.jpg?hmac=ewraXYesC6HuSEAJsg3Q80bXd1GyJTxekI05Xt9YjfQ",
      "https://fastly.picsum.photos/id/60/1920/1200.jpg?hmac=fAMNjl4E_sG_WNUjdU39Kald5QAHQMh-_-TsIbbeDNI",
      "https://fastly.picsum.photos/id/84/1280/848.jpg?hmac=YFRYDI4UsfbeTzI8ZakNOR98wVU7a-9a2tGF542539s",
      "https://fastly.picsum.photos/id/89/4608/2592.jpg?hmac=G9E4z5RMJgMUjgTzeR4CFlORjvogsGtqFQozIRqugBk",
    ],
  },
];

export function useTemplateData(): {
  columns: ColumnInfo[];
  rows: unknown[];
} {
  const columns = useMemo(() => {
    return Object.entries(columnsDefinitions).map(([key, value]) => {
      const label = value.label || key;
      return {
        ...value,
        key,
        label,
      } as ColumnInfo;
    });
  }, []);
  return { columns, rows };
}
