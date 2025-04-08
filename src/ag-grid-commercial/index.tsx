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
      suppressHeaderMenuButton: true,
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
        console.log("assets", assets);
        params.successCallback(assets);
      },
    } as IDetailCellRendererParams<any, any>;
  }, []);

  return (
    <div style={{ height: "100vh" }}>
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
  );
}

function ExtendedDetailCellRenderer({ data }: IDetailCellRendererParams) {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <p>Assets:</p>
        <ul>
          {data.assets.map((asset: any, index: number) => (
            <img
              key={index}
              src={asset}
              alt={`Asset ${index}`}
              style={{ width: "100px", height: "100px" }}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
