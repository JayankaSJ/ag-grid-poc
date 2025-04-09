"use client";

import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ClientSideRowModelModule,
  ColDef,
  CsvCell,
  CsvExportParams,
  ExcelCell,
  ExcelExportParams,
  ExcelRow,
  ExcelStyle,
  IDetailCellRendererParams,
  ModuleRegistry,
  ProcessRowGroupForExportParams,
  ValidationModule,
} from "ag-grid-community";
import {
  ClipboardModule,
  ColumnMenuModule,
  ColumnsToolPanelModule,
  ContextMenuModule,
  ExcelExportModule,
  LicenseManager,
  MasterDetailModule,
} from "ag-grid-enterprise";
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ClipboardModule,
  ColumnsToolPanelModule,
  ExcelExportModule,
  MasterDetailModule,
  ColumnMenuModule,
  ContextMenuModule,
  ValidationModule /* Development Only */,
]);

// @ts-expect-error temporary fix for license key
const licenseKey = import.meta.env.VITE_REACT_APP_AG_GRID_LICENSE_KEY;

if (!licenseKey) {
  throw new Error(
    "AG Grid license key is not set. Please set the REACT_APP_AG_GRID_LICENSE_KEY environment variable."
  );
}
LicenseManager.setLicenseKey(licenseKey);

export interface ICallRecord {
  name: string;
  callId: number;
  duration: number;
  switchCode: string;
  direction: string;
  number: string;
}

export interface IAccount {
  name: string;
  account: number;
  calls: number;
  minutes: number;
  callRecords: ICallRecord[];
}

export const useFetchJson = <T,>(url: string, limit?: number) => {
  const [data, setData] = useState<T[]>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Note error handling is omitted here for brevity
      const response = await fetch(url);
      const json = await response.json();
      const data = limit ? json.slice(0, limit) : json;
      setData(data);
      setLoading(false);
    };
    fetchData();
  }, [url, limit]);
  return { data, loading };
};

const getRows = (params: ProcessRowGroupForExportParams) => {
  const rows = [
    {
      outlineLevel: 1,
      cells: [
        cell(""),
        cell("Call Id", "header"),
        cell("Direction", "header"),
        cell("Number", "header"),
        cell("Duration", "header"),
        cell("Switch Code", "header"),
      ],
    },
  ].concat(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...params.node.data.callRecords.map((record: any) => [
      {
        outlineLevel: 1,
        cells: [
          cell(""),
          cell(record.callId, "body"),
          cell(record.direction, "body"),
          cell(record.number, "body"),
          cell(record.duration, "body"),
          cell(record.switchCode, "body"),
        ],
      },
    ])
  );
  return rows;
};

const cell: (text: string, styleId?: string) => ExcelCell = (
  text: string,
  styleId?: string
) => {
  return {
    styleId: styleId,
    data: {
      type: /^\d+$/.test(text) ? "Number" : "String",
      value: String(text),
    },
  };
};

export const GridExampleMasterData = () => {
  const gridRef = useRef<AgGridReact<IAccount>>(null);
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const defaultCsvExportParams = useMemo<CsvExportParams>(() => {
    return {
      getCustomContentBelowRow: (params) => {
        const rows = getRows(params);
        return rows.map((row) => row.cells) as CsvCell[][];
      },
    };
  }, []);
  const defaultExcelExportParams = useMemo<ExcelExportParams>(() => {
    return {
      getCustomContentBelowRow: (params) => getRows(params) as ExcelRow[],
      columnWidth: 120,
      fileName: "ag-grid.xlsx",
    };
  }, []);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [columnDefs, _] = useState<ColDef[]>([
    // group cell renderer needed for expand / collapse icons
    { field: "name", cellRenderer: "agGroupCellRenderer" },
    { field: "account" },
    { field: "calls" },
    { field: "minutes", valueFormatter: "x.toLocaleString() + 'm'" },
  ]);
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
    };
  }, []);
  const detailCellRendererParams = useMemo(() => {
    return {
      detailGridOptions: {
        columnDefs: [
          { field: "callId" },
          { field: "direction" },
          { field: "number", minWidth: 150 },
          { field: "duration", valueFormatter: "x.toLocaleString() + 's'" },
          { field: "switchCode", minWidth: 150 },
        ],
        defaultColDef: {
          flex: 1,
        },
      },
      getDetailRowData: (params) => {
        params.successCallback(params.data.callRecords);
      },
    } as IDetailCellRendererParams<IAccount, ICallRecord>;
  }, []);
  const excelStyles = useMemo<ExcelStyle[]>(() => {
    return [
      {
        id: "header",
        interior: {
          color: "#aaaaaa",
          pattern: "Solid",
        },
      },
      {
        id: "body",
        interior: {
          color: "#dddddd",
          pattern: "Solid",
        },
      },
    ];
  }, []);

  const { data, loading } = useFetchJson<IAccount>(
    "https://www.ag-grid.com/example-assets/master-detail-data.json"
  );

  const onBtExport = useCallback(() => {
    gridRef.current!.api.exportDataAsExcel();
  }, []);

  return (
    <div style={containerStyle}>
      <div className="container">
        <div>
          <button
            onClick={onBtExport}
            style={{ marginBottom: "5px", fontWeight: "bold" }}
          >
            Export to Excel
          </button>
        </div>
        <div className="grid-wrapper">
          <div style={gridStyle}>
            <AgGridReact<IAccount>
              ref={gridRef}
              rowData={data}
              loading={loading}
              defaultCsvExportParams={defaultCsvExportParams}
              defaultExcelExportParams={defaultExcelExportParams}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              masterDetail={true}
              detailCellRendererParams={detailCellRendererParams}
              excelStyles={excelStyles}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
