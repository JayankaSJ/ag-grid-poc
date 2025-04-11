/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AllCommunityModule,
  ColDef,
  DefaultMenuItem,
  GetContextMenuItemsParams,
  IDetailCellRendererParams,
  MenuItemDef,
  ModuleRegistry,
} from "ag-grid-community";
import cx from "classnames";
import { AllEnterpriseModule, LicenseManager } from "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import { ButtonHTMLAttributes, useCallback, useMemo, useRef } from "react";
import { useParcelData, useTemplateData } from "./template-data-improved";
import { useTheme } from "./theme";

ModuleRegistry.registerModules([AllCommunityModule, AllEnterpriseModule]);

// @ts-expect-error temporary fix for license key
const licenseKey = import.meta.env.VITE_REACT_APP_AG_GRID_LICENSE_KEY;

if (!licenseKey) {
  throw new Error(
    "AG Grid license key is not set. Please set the REACT_APP_AG_GRID_LICENSE_KEY environment variable."
  );
}
LicenseManager.setLicenseKey(licenseKey);

export function AgGridCommercialPOC() {
  const gridRef = useRef<AgGridReact<unknown>>(null);
  const { rowData, columnDefs } = useTemplateData();
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      editable: true,
      suppressHeaderMenuButtons: true,
      suppressColumnsToolPanel: true,
      suppressMovable: true,
      // suppressAutoSize: true,
      suppressHeaderContextMenu: true,
      // suppressHeaderMenuButton: true,
    };
  }, []);

  const detailCellRendererParams = useMemo(() => {
    return {
      detailGridOptions: {
        columnDefs: [{ field: "callId" }, { field: "direction" }],
        defaultColDef: {
          flex: 1,
        },
      },
      getDetailRowData: (params) => {
        const assets = params.data.assets as unknown[];
        params.successCallback(assets);
      },
    } as IDetailCellRendererParams<any, any>;
  }, []);

  const onExport = useCallback(() => {
    gridRef.current!.api.exportDataAsExcel();
  }, [gridRef]);

  const theme = useTheme();

  const getContextMenuItems = useCallback(
    (
      params: GetContextMenuItemsParams
    ):
      | (DefaultMenuItem | MenuItemDef)[]
      | Promise<(DefaultMenuItem | MenuItemDef)[]> => {
      const result: (DefaultMenuItem | MenuItemDef)[] = [
        "copy",
        "cut",
        "paste",
        "separator",
        {
          name: "Export",
          subMenu: [
            "excelExport",
            {
              name: "CSV as Selected Range",
              action: () => {
                // build excel data with column headers

                // params.api.exportDataAsExcel({
                //   allColumns: false,
                //   onlySelected: true,
                // });
                // params.api.exportDataAsCsv({
                //   allColumns: false,
                //   onlySelected: true,
                // });

                const ranges = params?.api?.getCellRanges();

                if (!ranges || ranges.length === 0) {
                  alert("No range selected");
                  return;
                }

                let csvContent = "";

                // Loop through each range
                ranges?.forEach((range) => {
                  const columnHeaders = range?.columns?.map(
                    (col) => col.getColDef().headerName
                  );
                  csvContent += columnHeaders.join(",") + "\n";

                  const startRow = Math.min(
                    range?.startRow?.rowIndex as number,
                    range?.endRow?.rowIndex as number
                  );
                  const endRow = Math.max(
                    range?.startRow?.rowIndex as number,
                    range?.endRow?.rowIndex as number
                  );

                  const cols = range.columns;

                  for (
                    let rowIndex = startRow;
                    rowIndex <= endRow;
                    rowIndex++
                  ) {
                    const rowNode = params.api.getDisplayedRowAtIndex(rowIndex);
                    const rowData = cols.map(
                      (col) => rowNode?.data[col.getColId()]
                    );
                    csvContent += rowData.join(",") + "\n";
                  }
                });

                // Download as CSV
                const blob = new Blob([csvContent], {
                  type: "text/csv;charset=utf-8;",
                });
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = "selected-range.csv";
                link.click();
              },
            },
          ],
        },
      ];

      return result;
    },
    [gridRef]
  );

  return (
    <div
      style={{ height: "100vh" }}
      className="ag-theme-alpine flex flex-col gap-4 p-4"
    >
      <Header onExport={onExport} />
      <Filters gridRef={gridRef} />
      <div className="flex-grow gap-4">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          pagination={true}
          defaultColDef={defaultColDef}
          cellSelection={true}
          copyHeadersToClipboard={false}
          masterDetail={true}
          detailCellRendererParams={detailCellRendererParams}
          detailCellRenderer={ExtendedDetailCellRenderer}
          detailRowAutoHeight={true}
          theme={theme}
          getContextMenuItems={getContextMenuItems}
          rowSelection="multiple"
        />
      </div>
    </div>
  );
}

function Filters({
  gridRef,
}: {
  gridRef: React.RefObject<AgGridReact<unknown> | null>;
}) {
  const filter1 = useCallback(async () => {
    gridRef.current?.api
      .setColumnFilterModel("3", {
        values: ["Keine EAN vorhanden"],
      })
      .then(() => {
        console.log("Filter applied");
        gridRef.current?.api.onFilterChanged();
      });
  }, [gridRef]);

  const clear = useCallback(() => {
    gridRef.current!.api.setColumnFilterModel("3", null).then(() => {
      gridRef.current!.api.onFilterChanged();
    });
  }, [gridRef]);

  return (
    <div className="flex flex-col gap-2 border-b-2 border-gray-200 pb-4">
      <span className="text-gray-500 text-xs">Custom Filters</span>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-4">
          <Button
            className="bg-gray-300 text-white h-6 px-2 py-[2px] rounded cursor-pointer text-xs"
            onClick={filter1}
          >
            <span className="h-[10px]">Artikel EAN = Keine EAN vorhanden</span>
          </Button>
        </div>
        <div>
          <Button
            className="bg-gray-300 text-white px-2 py-1 rounded cursor-pointer"
            onClick={clear}
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );
}

function Header({ onExport }: { onExport: () => void }) {
  return (
    <div className="flex flex-row justify-between">
      <div>
        <h1 className="text-2xl font-bold">AG Grid Commercial POC</h1>
        <p className="text-sm text-gray-500">
          This is a proof of concept for AG Grid Commercial features.
        </p>
      </div>
      <div>
        <Button
          className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer"
          onClick={onExport}
        >
          Export to Excel
        </Button>
      </div>
    </div>
  );
}

function ExtendedDetailCellRenderer({ data }: IDetailCellRendererParams) {
  const { assets } = useMemo(() => {
    const assets = data.assets || [];
    const parcels = data.parcels || {};
    return { assets, parcels };
  }, [data]);
  return (
    <div className="flex flex-col gap-4 p-4">
      <ParcelRenderer />
      {assets.length > 0 && <AssetsRenderer assets={assets} />}
    </div>
  );
}

function ParcelRenderer() {
  const { columnDefs, parcelData } = useParcelData();

  return (
    <NestedDetailCellRendererTable
      title={`Parcels (${parcelData.length})`}
      containItems={parcelData.length > 0}
    >
      <div style={{ height: "50vh" }}>
        <AgGridReact rowData={parcelData} columnDefs={columnDefs} />
      </div>
    </NestedDetailCellRendererTable>
  );
}

function AssetsRenderer({ assets }: { assets: string[] }) {
  return (
    <NestedDetailCellRendererTable
      title={`Assets (${assets.length})`}
      containItems={assets.length > 0}
    >
      <div className="flex flex-row flex-wrap gap-4 p-4">
        {assets.map((asset, index) => (
          <div key={index}>
            <img src={asset} alt={`Asset ${index}`} className="h-[100px]" />
          </div>
        ))}
      </div>
    </NestedDetailCellRendererTable>
  );
}

function NestedDetailCellRendererTable({
  containItems,
  title,
  children,
}: {
  title: string;
  containItems: boolean;
  children: React.ReactNode;
}) {
  if (!containItems) {
    <div className="w-full flex flex-col bg-gray-50 border-1 border-gray-200 rounded-lg px-4 py-2">
      <div>No data available</div>
    </div>;
  }
  return (
    <div className="w-full flex flex-col bg-gray-50 border-1 border-gray-200 rounded-lg px-4 py-2">
      <h3
        className="
        text-lg font-semibold
        text-gray-700
        border-b-2 border-gray-200
        pb-2 mb-4
      "
      >
        {title}
      </h3>
      <div>{children}</div>
    </div>
  );
}

function Button(
  props: ButtonHTMLAttributes<unknown> & {
    children: React.ReactNode;
  }
) {
  return (
    <button
      {...props}
      className={cx(
        "h-6 px-2 py-[2px] rounded cursor-pointer text-xs",
        props.className
      )}
    >
      <span className="h-[10px]">{props.children}</span>
    </button>
  );
}
