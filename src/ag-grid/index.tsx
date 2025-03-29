import React, { useMemo } from "react";
import type { ColDef, ValueFormatterParams } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { ColumnInfo, useTemplateData } from "../template-data";
import { dateFormatter, OptionsEditor } from "./editors";
import { AssetsRenderer, OptionsRenderer } from "./renderers";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function AgGridPOC() {
  const { columns, rows } = useTemplateData();

  const { rowData, colDefs } = useMemo(() => {
    return {
      rowData: rows,
      colDefs: translateColumnDefs(columns),
    };
  }, [columns, rows]);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      // filter: true,
      editable: true,
    };
  }, []);

  console.log(colDefs);
  return (
    <div style={{ height: "100vh" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        pagination={true}
        defaultColDef={defaultColDef}
      />
    </div>
  );
}

function translateColumnDefs(columns: ColumnInfo[]): ColDef[] {
  return columns.map((column) => {
    const { key, label, fixed, type } = column;
    let additionalParams: Record<string, unknown> = {};
    switch (fixed) {
      case "left":
        additionalParams = {
          pinned: "left",
        };
        break;
      case "right":
        additionalParams = {
          pinned: "right",
        };
        break;
    }
    const dependencyResolver = column.dependencyResolver;
    switch (type) {
      case "option":
        {
          additionalParams = {
            cellEditor: "agSelectCellEditor",
            // cellEditor: OptionsEditor,
            // cellRenderer: OptionsRenderer,
            // cellEditorPopup: true,
            cellEditorParams: (params: any) => {
              const data = params?.data as ColumnInfo;

              let options = column.options || [];
              if (typeof dependencyResolver === "function") {
                const resolved = dependencyResolver(column, data);

                options = resolved.options || [];
              }

              return {
                values: options,
              };
            },
          };
        }
        break;
      case "date":
        {
          additionalParams = {
            dateFormatter,
          };
        }
        break;
      case "currency":
        {
          additionalParams = {
            valueFormatter: (params: ValueFormatterParams) => {
              if (params.value == null) {
                return "";
              }
              return "£" + params?.value?.toLocaleString();
            },
          };
        }
        break;
      case "assets":
        {
          additionalParams = {
            editable: false,
            cellRenderer: AssetsRenderer,
            cellRendererParams: (params: any) => {
              return {
                value: params.value,
              };
            },
          };
        }
        break;
    }

    const children = column.children || [];
    if (children.length > 0) {
      additionalParams = {
        ...additionalParams,
        children: translateColumnDefs(children),
      };
    }

    const styles = transformStyles(column);
    const colDef: ColDef = {
      field: key,
      headerName: label,
      editable: true,
      ...additionalParams,
      ...styles,
    };
    return colDef;
  });
}

function transformStyles(column: ColumnInfo) {
  const { cellClassName, headerClassName } = column;
  const styles: Record<string, unknown> = {};
  styles["cellClass"] = cellClassName;
  styles["headerClass"] = headerClassName;
  return styles;
}
