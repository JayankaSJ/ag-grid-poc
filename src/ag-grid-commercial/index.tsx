/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ColDef,
  DateFilterModule,
  IDetailCellRendererParams,
  ModuleRegistry,
  NumberFilterModule,
  TextFilterModule,
} from "ag-grid-community";
import {
  AllEnterpriseModule,
  LicenseManager,
  MasterDetailModule,
  MultiFilterModule,
  SetFilterModule,
} from "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import { useCallback, useMemo, useRef } from "react";
import { useTemplateData } from "./template-data-improved";

ModuleRegistry.registerModules([
  AllEnterpriseModule,
  MasterDetailModule,
  MultiFilterModule,
  SetFilterModule,
  TextFilterModule,
  NumberFilterModule,
  DateFilterModule,
]);

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
      suppressAutoSize: true,
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
    // const artikelEan = gridRef.current!.api.getColumn("artikelEan");
    // console.log(artikelEan?.isFilterActive());

    // const model = gridRef.current!.api.getColumnFilterModel("artikelEan");
    // if (model) {
    //   console.log("Country model is: " + JSON.stringify(model));
    // } else {
    //   console.log("Country model filter is not active");
    // }

    gridRef
      .current!.api.setColumnFilterModel("artikelEan", {
        values: ["Keine EAN vorhanden"],
      })
      .then(() => {
        console.log("Filter applied");
        gridRef.current!.api.onFilterChanged();
      });

    // gridRef
    //   .current!.api.getColumnFilterInstance("artikelEan")
    //   .then((countryFilterComponent: any) => {
    //     const countriesEndingWithStan = countryFilterComponent!
    //       .getFilterKeys()
    //       .filter(function (value: any) {
    //         console.log(value);
    //         return value === "Keine EAN vorhanden";
    //       });
    //     gridRef
    //       .current!.api.setColumnFilterModel("artikelEan", {
    //         values: countriesEndingWithStan,
    //       })
    //       .then(() => {
    //         gridRef.current!.api.onFilterChanged();
    //       });
    //   });
  }, [gridRef]);

  const clear = useCallback(() => {
    gridRef.current!.api.setColumnFilterModel("artikelEan", null).then(() => {
      gridRef.current!.api.onFilterChanged();
    });
  }, [gridRef]);

  return (
    <div className="flex flex-col gap-2 border-b-2 border-gray-200 pb-4">
      <span className="text-gray-500 text-xs">Custom Filters</span>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-4">
          <button
            className="bg-gray-300 text-white px-2 py-1 rounded cursor-pointer"
            onClick={filter1}
          >
            Artikel EAN = Keine EAN vorhanden
          </button>
        </div>
        <div>
          <button
            className="bg-gray-300 text-white px-2 py-1 rounded cursor-pointer"
            onClick={clear}
          >
            Clear Filters
          </button>
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
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer"
          onClick={onExport}
        >
          Export to Excel
        </button>
      </div>
    </div>
  );
}

function ExtendedDetailCellRenderer({ data }: IDetailCellRendererParams) {
  const { assets, parcel } = useMemo(() => {
    const assets = data.assets || [];
    const parcel = data.parcel || {};
    return { assets, parcel };
  }, [data]);
  return (
    <div className="ag-theme-alpine flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-4">
        {parcel && <ParcelRenderer />}
        {assets.length > 0 && <AssetsRenderer assets={assets} />}
      </div>
    </div>
  );
}

function ParcelRenderer() {
  return (
    <div className="w-full flex flex-col bg-gray-50 border-1 border-gray-200 rounded-lg px-4 py-2">
      <div>No parcel data available</div>
    </div>
  );
}

function AssetsRenderer({ assets }: { assets: string[] }) {
  return (
    <div className="w-full flex flex-col bg-gray-50 border-1 border-gray-200 rounded-lg px-4 py-2">
      <h3>Assets</h3>
      <div className="flex flex-row flex-wrap gap-4 p-4">
        {assets.map((asset, index) => (
          <div>
            <img src={asset} alt={`Asset ${index}`} className="h-[100px]" />
          </div>
        ))}
      </div>
    </div>
  );
}
