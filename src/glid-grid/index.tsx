import { DataEditor } from "@glideapps/glide-data-grid";
import { useData } from "./useData";
import { DropDownRenderer } from "./renderers";

export default function GlideGridPOC() {
  const {
    columns,
    data,

    getCellContent,
    setCellValue,
  } = useData();
  return (
    <div>
      <DataEditor
        getCellContent={getCellContent}
        onCellEdited={setCellValue}
        columns={columns}
        getCellsForSelection={true}
        onPaste={true}
        rowMarkers="both"
        rows={data.length}
        customRenderers={[DropDownRenderer]}
      />
      <div id="portal" />
    </div>
  );
}
