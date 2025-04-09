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
    | "assets"
    | "multi-value";
  options?: unknown[];
  nullable: boolean;
  fixed?: "left" | "right";
  children?: ColumnInfo[];
  cellClassName?: string;
  headerClassName?: string;
  expanded?: boolean;
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
  "parent-column-group-collapsable": {
    type: "text",
    nullable: false,
    headerClassName: "bg-green-300 text-center",
    expanded: false,
    children: [
      {
        key: "child-column-1",
        label: "Child Column 1",
        type: "text",
        nullable: false,
        headerClassName: "bg-green-200",
        cellClassName: "bg-green-100",
      },
      {
        key: "child-column-2",
        label: "Child Column 2",
        type: "text",
        nullable: false,
        headerClassName: "bg-green-200",
        cellClassName: "bg-green-100",
        expanded: false,
      },
      {
        key: "child-column-2",
        label: "Child Column 2",
        type: "text",
        nullable: false,
        headerClassName: "bg-green-200",
        cellClassName: "bg-green-100",
        expanded: false,
      },
    ],
  },
  "multi-value-display": {
    type: "multi-value",
    nullable: false,
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

const imageURLs = [
  "https://fastly.picsum.photos/id/57/2448/3264.jpg?hmac=ewraXYesC6HuSEAJsg3Q80bXd1GyJTxekI05Xt9YjfQ",
  "https://fastly.picsum.photos/id/60/1920/1200.jpg?hmac=fAMNjl4E_sG_WNUjdU39Kald5QAHQMh-_-TsIbbeDNI",
  "https://fastly.picsum.photos/id/84/1280/848.jpg?hmac=YFRYDI4UsfbeTzI8ZakNOR98wVU7a-9a2tGF542539s",
  "https://fastly.picsum.photos/id/89/4608/2592.jpg?hmac=G9E4z5RMJgMUjgTzeR4CFlORjvogsGtqFQozIRqugBk",
];

const getRandomAssets = () => {
  const shuffled = [...imageURLs].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 4); // Get the first 4 shuffled URLs
};

export const rows = [
  {
    "fixed-left": "sample EAN",
    [TEXT_CELL]: "This is a text cell",
    [BOOLEAN_CELL]: true,
    [INTEGER_CELL]: 123,
    [CURRENCY_CELL]: 123.45,
    [DATE_CELL]: new Date(),
    [OPTION_CELL]: "option 1",
    "assets-column": imageURLs,
  },
];

for (let i = 0; i < 50; i++) {
  rows.push({
    "fixed-left": "sample EAN " + (i + 1),
    [TEXT_CELL]: `This is text cell number ${i + 1}`,
    [BOOLEAN_CELL]: Math.random() > 0.5, // Random true/false value
    [INTEGER_CELL]: Math.floor(Math.random() * 1000), // Random integer between 0 and 999
    [CURRENCY_CELL]: (Math.random() * 1000).toFixed(2), // Random currency value between 0 and 999.99
    [DATE_CELL]: new Date(), // Current date
    [OPTION_CELL]: `option ${Math.floor(Math.random() * 5) + 1}`, // Random option from 1 to 5
    "assets-column": getRandomAssets(),
  } as any);
}

// @ts-expect-error temporary fix
rows[3]["multi-value-display"] = [
  {
    locale: "en-US",
    value: "Hello in English",
  },
  {
    locale: "fr-FR",
    value: "Bonjour en Français",
  },
  {
    locale: "es-ES",
    value: "Hola en Español",
  },
];

export function useTemplateData(): {
  columns: ColumnInfo[];
  rows: Record<string, unknown>[];
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
