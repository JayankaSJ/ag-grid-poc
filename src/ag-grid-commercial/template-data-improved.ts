import { useMemo, useState } from "react";
import {
  ColDef,
  ColGroupDef,
  DefaultMenuItem,
  GetMainMenuItems,
  ICellEditorParams,
  MenuItemDef,
} from "ag-grid-community";
import { MainImageCellRenderer } from "./renderers/MainImageCellRenderer";

type ColumnType = ColDef | ColGroupDef;
type ColumnDefinitionType = {
  key?: number;
  type?: string;
  filter?: unknown;
  description?: string;
  children?: ColumnDefinitionType[];
  mainMenuItems?: ColumnMenuItemType;
  mainImage?: string;
};
type ColumnMenuItemType<TData = unknown> =
  | (DefaultMenuItem | MenuItemDef<TData>)[]
  | GetMainMenuItems<TData>;

const defaultColumnMenuItems: ColumnMenuItemType = [
  "autoSizeAll",
  "autoSizeThis",
];

export const parcelColumnDefinitions = [
  // {
  //   key: 601,
  //   description: "Total number of packages",
  // },
  {
    key: 602,
    description: "Package Indication",
  },
  {
    key: 603,
    description: "Frequency of this type of package",
  },
  {
    key: 604,
    description: "Package EAN",
  },
  {
    key: 605,
    description: "Length of package (cm)",
  },
  {
    key: 606,
    description: "c",
  },
  {
    key: 607,
    description: "Height of package (cm)",
  },
  {
    key: 608,
    description: "Package gross weight (kg)",
  },
  {
    key: 609,
    description: "Package net weight (kg)",
  },
  {
    key: 610,
    description: "Package form",
  },
  {
    key: 611,
    description: "Type overpack",
  },
];

const mainImages = [
  "https://cdn1.home24.net/images/media/catalog/product/1150x1150/png/-/1/-1000009867-180704-11253801-IMAGE-P000000001000009867.avif",
  "https://cdn1.home24.net/images/media/catalog/product/original/jpg/2/0/209745b3a35842f2bde66b7f3fb269f2.webp",
  "https://cdn1.home24.net/images/media/catalog/product/1150x1150/png/-/1/-1000449555-241009-010-IMAGE-P000000001000449555.avif",
];

const assets = [
  "https://cdn1.home24.net/images/media/catalog/product/1700x1700/png/-/1/-1000337296-220304-031-DETAILS-P000000001000337296.avif",
  "https://cdn1.home24.net/images/media/catalog/product/1700x1700/png/-/1/-1000337296-220304-020-MOOD-DETAILS-P000000001000337296-mood.avif",
  "https://cdn1.home24.net/images/media/catalog/product/original/png/-/1/-1000383263-230418-011-MOOD-IMAGE-P000000001000383263-mood.webp",
  "https://cdn1.home24.net/images/media/catalog/product/original/png/-/1/-1000383263-230418-020-MOOD-DETAILS-P000000001000383263-mood.webp",
  "https://cdn1.home24.net/images/media/catalog/product/original/png/-/1/-1000368996-221108-010-IMAGE-P000000001000368996.webp",
  "https://cdn1.home24.net/images/media/catalog/product/original/png/-/1/-1000368996-240408-020-MOOD-DETAILS-P000000001000368996-mood.webp",
  "https://cdn1.home24.net/images/media/catalog/product/1700x1700/png/d/r/drehtuerenschrank-hildesheim-alpinweiss-ohne-spiegeltuer-en-4842908.avif",
  "https://cdn1.home24.net/images/media/catalog/product/1700x1700/png/-/1/-1000121611-220909-600-ICON-DETAILS-P000000001000121611-icon-seal.avif",
  "https://cdn1.home24.net/images/media/catalog/product/1700x1700/jpg/a/5/a5ce4669c0c841da8a1d81824398d3e7.avif",
  "https://cdn1.home24.net/images/media/catalog/product/1700x1700/jpg/a/4/a492b6c0edb849b6bdffd8b4892018cc.avif",
  "https://cdn1.home24.net/images/media/catalog/product/1700x1700/png/-/1/-1000123836-190916-13150900017-DETAILS-P000000001000123836.avif",
  "https://cdn1.home24.net/images/media/catalog/product/1700x1700/png/-/1/-1000123836-190916-13150900021-DETAILS-P000000001000123836.avif",
  ...mainImages,
];

function getRandomMainImage() {
  const randomIndex = Math.floor(Math.random() * mainImages.length);
  return mainImages[randomIndex];
}

function translateColumnDefinition(column: ColumnDefinitionType): ColumnType {
  const { key, description, type, filter, mainMenuItems, ...rest } = column;
  const children = column?.children?.map(translateColumnDefinition);

  let columnMenuItems = defaultColumnMenuItems as unknown[];
  if (Array.isArray(mainMenuItems)) {
    columnMenuItems = [...columnMenuItems, ...mainMenuItems];
  }

  const additionalParams: Record<string, unknown> = {};
  switch (type) {
    case "option":
      {
        additionalParams["cellEditor"] = "agSelectCellEditor";
        additionalParams["cellEditorParams"] = (params: ICellEditorParams) => {
          const colDef = params?.colDef as {
            options: { value: string; label: string }[];
          };
          const values = colDef?.options || [];
          return {
            values: values.map((option) => option.label),
          };
        };
      }
      break;
  }

  if (typeof filter === "string") {
    additionalParams["filter"] = filter;
  } else if (filter === undefined) {
    additionalParams["filter"] = true;
  }

  return {
    ...rest,
    ...additionalParams,
    headerName: description,
    field: key?.toString(),
    mainMenuItems: columnMenuItems as ColumnMenuItemType,
    children,
  };
}

export function translateColumnDefinitions(
  columns: ColumnDefinitionType[]
): ColumnType[] {
  return columns.map(translateColumnDefinition);
}

function createRandomParcels(count: number) {
  const parcels = [];
  for (let i = 0; i < count; i++) {
    parcels.push({
      ...parcelColumnDefinitions.reduce((acc, col) => {
        switch (col.key) {
          case 602:
            acc[col.key] = `Parcel ${i + 1}`;
            break;
          case 603:
            acc[col.key] = `${Math.floor(Math.random() * 100) + 1} pcs`;
            break;
          case 604:
            acc[col.key] = `EAN-${Math.floor(Math.random() * 1000000)}`;
            break;
          case 605:
            acc[col.key] = Math.floor(Math.random() * 100) + 1;
            break;
          case 606:
            acc[col.key] = Math.floor(Math.random() * 100) + 1;
            break;
          case 607:
            acc[col.key] = Math.floor(Math.random() * 100) + 1;
            break;
          case 608:
            acc[col.key] = Math.floor(Math.random() * 100) + 1;
            break;
          case 609:
            acc[col.key] = "Box";
            break;
          case 610:
            acc[col.key] = "Standard";
            break;
          case 611:
            acc[col.key] = "None";
            break;
          default:
            acc[col.key] = "";
            break;
        }
        return acc;
      }, {} as Record<string, unknown>),
    });
  }
  return parcels;
}

function createDataRows() {
  const sampleDataRow: Record<string, unknown> = {
    "2": "72102080L0326-090200",
    "29": "Massage chair A20",
    "3": "2010003611705",
    "4": 234.0,
    "5": "USD",
    "6": 32.0,
    "7": "USD",
    "8": 43.0,
    "9": 64.0,
    "10": "No",
    "11": "Min order qty for items",
    "12": 10.0,
    "13": "USD",
    "14": "2 parts",
    "15": 5,
    "16": "Yes",
    "17": "DDP",
    "18": "Beds",
    "19": "Beds",
    "20": "Beds",
    "21": "Beds",
    "22": "Butlers",
    "23": "Custom",
    "24": "Lui",
    "25": "",
    "30": "",
    "32": "Partially assembled",
    "33": "No",
    "34": "Care based on linseed oil or beeswax protects wood and environment",
    "101": "Mounting installation",
    "102": "None",
    "103": "Golden M",
    "104": "exclusive",
    "105": "AAA",
    "106": "None",
    "107": "",
    "108": "",
    "112": "",
    "113": "",
    "114": "",
    "439": "",
    "438": "",
    "470": "",
    "471": "",
    "472": "",
    "473": "",
    "474": "",
    "475": "",
    "476": "",
    "601": "",
    "602": "",
    "603": "",
    "604": "",
    "605": "",
    "606": "",
    "607": "",
    "608": "",
  };

  const sampleArticleNames = [
    "AMSTERDAM Grachtenhaus Schweifgiebel Höhe 19cm",
    "AMSTERDAM Serviettenringe 4 Stück",
    "ARCADE Tischdecke L 160 x B 160cm",
    "ARCADE Tischdecke L 250 x B 160cm",
    "ARCADE Tischdecke L 300 x B 160cm",
    "ARCADE Tischläufer L 160 x B 50cm",
    "AVA Decke L 200 x B 150cm",
    "AVA Kissen L 50 x B 50cm",
    "BANQUET Etagere 6-stufig Höhe 200cm",
    "BOHEMIAN Kissen Blumen L 30 x B 50cm",
    "BOHEMIAN Kissen Blumen L 40 x B 60cm",
    "BOHEMIAN Kissen Blumen L 50 x B 50cm",
    "CHELSEA Seifenschale L 11 x B 8cm",
    "CHELSEA Seifenspender 450ml",
    "CHELSEA Zahnputzbecher Höhe 10cm",
    "COCOON Teelichthalter Höhe 13cm",
    "COCOON Teelichthalter Höhe 13cm",
    "CURVES Vase Höhe 14cm",
    "CURVES Vase Höhe 24cm",
    "GOLDEN GROVE Windlicht Tannen Höhe 16cm",
    "GRID Etagere für Obst Höhe 30cm",
    "MARBLE Kerzenhalter aus Marmor B 11 x H 14cm",
    "MINE & YOURS Zahnbürstenhalter Höhe 5cm",
    "MISTY Windlicht Höhe 10cm",
    "MISTY Windlicht Höhe 10cm",
    "PART Teelichthalter Lochstanzung Höhe 8cm",
    "PART Teelichthalter Lochstanzung Höhe 8cm",
    "PART Teelichthalter Lochstanzung Höhe 8cm",
    "PEACE Kerze Peace Höhe 10cm",
    "PEANUTS Dose First Aid Doctor L 18 x B 18cm",
    "PEANUTS Tasse 380ml",
    "PEARL Seifenschale L 14 x B 9cm",
    "PEARL Seifenspender 370ml",
    "PEARL Zahnputzbecher Höhe 10cm",
    "RING FOR GIN Glocke Höhe 16cm",
    "RING FOR WINE Glocke Höhe 16cm",
    "ROAD TRIP Tasse Home 380ml",
    "SOFT NEEDLE Kissen L 50 x B 50cm",
    "STELLA Hängedekoration Stern Ø22cm",
    "Stumpenkerzenhalter Höhe 21cm",
    "VILLAGE Teelichthalter Höhe 13cm",
    "WINE LOVER Flaschentasche 'Drinking Wine, Feeling Fine' L 30 x B 12cm",
    "WINE LOVER Flaschentasche 'Wine Lover' L 30 x B 12cm",
  ];

  const dataRows = [];
  for (let i = 0; i < 100; i++) {
    const row = { ...sampleDataRow };
    row["2"] = `${Math.floor(Math.random() * 1000000000)}-${Math.floor(
      Math.random() * 1000000000
    )}`;
    row["29"] =
      sampleArticleNames[Math.floor(Math.random() * sampleArticleNames.length)];
    row.mainImage = getRandomMainImage();
    row["3"] = `2010003${Math.floor(Math.random() * 1000) + 1}1705`;
    row["4"] = Math.floor(Math.random() * 100) + 1;
    row["5"] = Math.random() > 0.5 ? "USD" : "EUR";
    row.assets = assets;
    dataRows.push(row);
  }
  return dataRows;
}

export function useTemplateData(): {
  columnDefs: ColumnType[];
  rowData: Record<string, unknown>[];
} {
  const [rowData, setRowData] = useState(createDataRows());

  const columnDefinitions = useMemo(
    () => [
      {
        key: 2,
        pinned: "left",
        width: 50,
        editable: false,
        cellRenderer: MainImageCellRenderer,
        cellClass:
          "!p-0 flex flex-col items-center justify-center !border-0 !w-[50px]",
        description: "",
        mainMenuItems: [],
        filter: false,
      },
      {
        description: "Article",
        children: [
          {
            key: 2,
            description: "Number",
            cellRenderer: "agGroupCellRenderer",
            pinned: "left",
            filter: "agSetColumnFilter",
            width: 170,
          },
          {
            key: 29,
            description: "Name",
            pinned: "left",
            filter: "agSetColumnFilter",
            width: 170,
          },
          {
            key: 3,
            description: "EAN",
            pinned: "left",
            width: 170,
            filter: "agSetColumnFilter",
            mainMenuItems: [
              {
                name: "Apply 'Keine EAN vorhanden' for empty",
                action: () => {
                  setRowData((prevRowData) => {
                    const newRowData = [...prevRowData];
                    return newRowData.map((row) => {
                      if (!row["3"]) {
                        return {
                          ...row,
                          "3": "Keine EAN vorhanden",
                        };
                      }
                      return row;
                    });
                  });
                  return true;
                },
              },
            ],
          },
        ],
      },

      {
        description: "General Infos and Prices",
        children: [
          {
            key: 4,
            description: "RRP",
          },
          {
            key: 5,
            description: "Warehouse order currency",
            type: "option",
            options: [
              { value: "USD", label: "USD" },
              { value: "EUR", label: "EUR" },
            ],
          },
          {
            key: 6,
            description: "Warehouse purchase",
          },
          {
            key: 7,
            description: "Customer individual order currency",
            type: "option",
            options: [
              { value: "USD", label: "USD" },
              { value: "EUR", label: "EUR" },
            ],
          },
          {
            key: 8,
            description: "Customer individual order purchase price",
          },
          {
            key: 9,
            description: "Dropshipping order currency",
            type: "option",
            options: [
              { value: "USD", label: "USD" },
              { value: "EUR", label: "EUR" },
            ],
          },
          {
            key: 10,
            description: "Dropshipping purchase price",
          },
          {
            key: 11,
            description: "Self Sender Capable",
          },
          {
            description: "Self Sender Costs",
            children: [
              {
                key: 12,
                description: "DE",
                width: 100,
              },
              {
                key: 13,
                description: "FR",
                width: 100,
              },
              {
                key: 14,
                description: "NL",
                width: 100,
              },
              {
                key: 15,
                description: "AT",
                width: 100,
              },
              {
                key: 16,
                description: "CH",
                width: 100,
              },
              {
                key: 17,
                description: "BE",
                width: 100,
              },
              {
                key: 18,
                description: "IT",
                width: 100,
              },
            ],
          },
          {
            key: 19,
            description: "Type Min Order Qty",
          },
          {
            key: 20,
            description: "Value Min Order Qty",
          },
          {
            key: 21,
            description: "Min Order Value Currency",
            type: "option",
            options: [
              { value: "USD", label: "USD" },
              { value: "EUR", label: "EUR" },
            ],
          },
          {
            key: 22,
            description: "Number of Parts in Set",
            type: "option",
            options: [
              {
                value: "2",
                label: "2 parts",
              },
              {
                value: "3",
                label: "3 parts",
              },
              {
                value: "4",
                label: "4 parts",
              },
              {
                value: "5",
                label: "5 parts",
              },
            ],
          },
          {
            key: 32,
            description: "Delivery time to H24 (days)",
          },
          {
            key: 33,
            description: "Serial number obligatory",
            type: "option",
            options: [
              {
                value: "Yes",
                label: "Yes",
              },
              {
                value: "No",
                label: "No",
              },
            ],
          },
          {
            key: 34,
            description: "Incoterms",
            type: "option",
            options: [
              {
                value: "DDP",
                label: "DDP",
              },
              {
                value: "EXW",
                label: "EXW",
              },
              {
                value: "FCA",
                label: "FCA",
              },
            ],
          },
          {
            key: 23,
            description: "Product Group 1",
            type: "option",
            options: [
              { value: "Beds", label: "Beds" },
              { value: "Bathroom furniture", label: "Bathroom furniture" },
              { value: "Bedroom Furniture", label: "Bedroom Furniture" },
              { value: "Boutique", label: "Boutique" },
              { value: "Carpets & Flooring", label: "Carpets & Flooring" },
              { value: "Children", label: "Children" },
              { value: "Dining Tables", label: "Dining Tables" },
              {
                value: "Dining chair&benches",
                label: "Dining chair&benches",
              },
              { value: "Fabric sample", label: "Fabric sample" },
              { value: "Garden", label: "Garden" },
              { value: "Hallway Furniture", label: "Hallway Furniture" },
              { value: "Home Textiles", label: "Home Textiles" },
              { value: "Household", label: "Household" },
              { value: "Kitchen", label: "Kitchen" },
              { value: "Lighting", label: "Lighting" },
              {
                value: "Living room furniture",
                label: "Living room furniture",
              },
              {
                value: "Mattresses & slatted frames",
                label: "Mattresses & slatted frames",
              },
              { value: "Office", label: "Office" },
              { value: "Service", label: "Service" },
              { value: "Spare Parts", label: "Spare Parts" },
              { value: "Upholstery", label: "Upholstery" },
            ],
          },
          {
            key: 24,
            description: "Product Group 2",
            type: "option",
            options: [
              { value: "Accessories", label: "Accessories" },
              { value: "Armchairs", label: "Armchairs" },
              { value: "Baby accessories", label: "Baby accessories" },
              { value: "Baby furniture", label: "Baby furniture" },
              {
                value: "Baby furniture accessories",
                label: "Baby furniture accessories",
              },
              { value: "Baby toys", label: "Baby toys" },
              { value: "Baking dishes", label: "Baking dishes" },
              { value: "Baking tools", label: "Baking tools" },
              { value: "Bar", label: "Bar" },
              { value: "Bar Set", label: "Bar Set" },
              { value: "Bar Stools", label: "Bar Stools" },
              { value: "Bar Tables", label: "Bar Tables" },
              { value: "Bar gadgets", label: "Bar gadgets" },
              {
                value: "Bath Mats & Carpets",
                label: "Bath Mats & Carpets",
              },
              {
                value: "Bathroom Accessories",
                label: "Bathroom Accessories",
              },
              { value: "Bathroom Set", label: "Bathroom Set" },
              {
                value: "Bathroom cabinets",
                label: "Bathroom cabinets",
              },
              {
                value: "Bathroom furniture accessories",
                label: "Bathroom furniture accessories",
              },
              { value: "Bathroom shelves", label: "Bathroom shelves" },
              {
                value: "Bed Benches & Bed Storage",
                label: "Bed Benches & Bed Storage",
              },
              { value: "Bed Linen", label: "Bed Linen" },
              { value: "Bed Sheets", label: "Bed Sheets" },
              { value: "Bed covers & Plaids", label: "Bed covers & Plaids" },
              { value: "Bed frames", label: "Bed frames" },
              { value: "Bed-Couches", label: "Bed-Couches" },
              {
                value: "Bedroom Furniture Accessories",
                label: "Bedroom Furniture Accessories",
              },
            ],
          },
          {
            key: 25,
            description: "Product Group 3",
          },
          {
            key: 30,
            description: "Product Group 4",
          },
        ],
      },

      {
        description: "General Product Infos",
        children: [
          {
            key: 101,
            description: "Brand",
          },
          {
            key: 102,
            description: "Series",
          },
          {
            key: 103,
            description: "Designer",
          },
          {
            key: 104,
            description: "Supplier Warranty (Years)",
          },
          {
            key: 105,
            description: "Delivery Scope",
          },
          {
            key: 106,
            description: "Delivery Condition",
          },
          {
            key: 107,
            description: "Spare parts deliverable",
          },
          {
            key: 108,
            description: "Care Instructions",
          },
          {
            key: 112,
            description: "Installation",
          },
          {
            key: 476,
            description: "Warnings and Safety Information",
          },
          {
            key: 113,
            description: "Certificates",
          },
          {
            key: 380,
            description: "Testing Institute",
          },
          {
            key: 381,
            description: "Test Number",
          },
          {
            key: 114,
            description: "Quality Attributes",
          },
          {
            key: 706,
            description: "Exclusivity",
            type: "option",
            options: [
              { value: "Exclusive", label: "Exclusive" },
              { value: "Non-exclusive", label: "Non-exclusive" },
            ],
          },
          {
            key: 439,
            description: "Content Cluster",
            type: "option",
            options: [
              { value: "AAA", label: "AAA" },
              { value: "AA", label: "AA" },
              { value: "A", label: "A" },
            ],
          },
          {
            key: 438,
            description: "USP",
          },
          {
            description: "Manufacturer",
            children: [
              {
                key: 470,
                description: "Name",
              },
              {
                key: 471,
                description: "Postal Address",
              },
              {
                key: 472,
                description: "Email",
              },
              {
                description: "Person Responsible in EU",
                children: [
                  {
                    key: 473,
                    description: "Name",
                  },
                  {
                    key: 474,
                    description: "Postal Address",
                  },
                  {
                    key: 475,
                    description: "Email",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    []
  );

  const columnDefs = useMemo(() => {
    return translateColumnDefinitions(columnDefinitions);
  }, [columnDefinitions]);

  console.log("columnDefs", columnDefs);
  console.log("rowData", rowData);
  return { columnDefs, rowData };
}

export function useParcelData() {
  const parcelData = useMemo(() => {
    const randomCount = Math.floor(Math.random() * 15) + 5;

    if (randomCount === 10) {
      return [];
    }

    return createRandomParcels(randomCount);
  }, []);

  const columnDefs = useMemo(() => {
    return translateColumnDefinitions(parcelColumnDefinitions);
  }, []);

  return { columnDefs, parcelData };
}
