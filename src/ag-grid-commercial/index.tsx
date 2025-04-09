/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ColDef,
  IDetailCellRendererParams,
  ModuleRegistry,
} from "ag-grid-community";
import {
  AllEnterpriseModule,
  LicenseManager,
  MasterDetailModule,
} from "ag-grid-enterprise";
import { AgGridReact } from "ag-grid-react";
import { useMemo } from "react";
import { useTemplateData } from "./template-data-improved";

ModuleRegistry.registerModules([AllEnterpriseModule, MasterDetailModule]);

// @ts-expect-error temporary fix for license key
const licenseKey = import.meta.env.VITE_REACT_APP_AG_GRID_LICENSE_KEY;

if (!licenseKey) {
  throw new Error(
    "AG Grid license key is not set. Please set the REACT_APP_AG_GRID_LICENSE_KEY environment variable."
  );
}
LicenseManager.setLicenseKey(licenseKey);

export function AgGridCommercialPOC() {
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

  return (
    <div
      style={{ height: "100vh" }}
      className="ag-theme-alpine flex flex-col gap-4 p-4"
    >
      <Header />
      <div className="flex-grow gap-4">
        <AgGridReact
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

function Header() {
  return (
    <div className="flex flex-row justify-between">
      <div>
        <h1 className="text-2xl font-bold">AG Grid Commercial POC</h1>
        <p className="text-sm text-gray-500">
          This is a proof of concept for AG Grid Commercial features.
        </p>
      </div>
      <div>
        <button className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer">
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
        {parcel && <ParcelRenderer data={data} />}
        {assets.length > 0 && <AssetsRenderer assets={assets} />}
      </div>
    </div>
  );
}

function ParcelRenderer({ data }: { data: any }) {
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
