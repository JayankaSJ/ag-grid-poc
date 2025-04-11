import { ICellRendererComp, ICellRendererParams } from "ag-grid-community";

export class MainImageCellRenderer implements ICellRendererComp {
  private eGui!: HTMLDivElement;

  public init(params: ICellRendererParams): void {
    const url = params?.data?.mainImage;
    if (!url) {
      return;
    }

    const onSelect = () => {
      const rowIndex = params?.node?.rowIndex;
      if (rowIndex === undefined) {
        console.error("Row index is undefined");
        return;
      }
      const rowNode = params?.api?.getRowNode(`${rowIndex}`);
      if (!rowNode) {
        console.error("Row node not found");
        return;
      }
      const selected = rowNode.isSelected();
      if (selected) {
        console.log("Row is already selected");
        return;
      }
    };

    // const imagePreview = ImagePreview({ url, onSelect });
    // const imagePreviewString = renderToString(imagePreview);

    const container = document.createElement("div");
    container.classList.add(
      "flex",
      "flex-row",
      "h-full",
      "gap-[2px]",
      "w-[50px]"
    );
    const block = document.createElement("div");
    block.classList.add(
      "block",
      "grow",
      "bg-blue-300",
      "w-[10px]",
      "rounded-xs",
      "cursor-pointer"
    );
    block.addEventListener("click", onSelect);
    container.appendChild(block);
    const imageContainer = document.createElement("div");
    imageContainer.classList.add(
      "w-full",
      "p-[2px]",
      "flex",
      "flex-col",
      "items-center",
      "justify-center",
      "rounded",
      "hover:border-2",
      "hover:border-blue-300",
      "transition-all",
      "duration-200",
      "ease-in-out"
    );
    const image = document.createElement("img");
    image.src = url;
    image.alt = "Preview";
    image.classList.add("w-full", "object-cover", "rounded-lg");
    imageContainer.appendChild(image);
    container.appendChild(imageContainer);
    this.eGui = container;
  }

  public getGui(): HTMLElement {
    return this.eGui;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public refresh(_params: ICellRendererParams): boolean {
    return true;
  }
}

// function ImagePreview({
//   url,
//   onSelect,
// }: {
//   url: string;
//   onSelect?: () => void;
// }) {
//   return (
//     <div className="flex flex-row h-full gap-[2px]">
//       <div
//         className="block grow bg-blue-300 w-[10px] rounded-xs cursor-pointer"
//         onClick={onSelect}
//       ></div>
//       <div className="w-full p-[2px] flex flex-col items-center justify-center rounded hover:border-2 hover:border-blue-300 transition-all duration-200 ease-in-out">
//         <img
//           src={url}
//           alt="Preview"
//           className="w-full object-cover rounded-lg"
//         />
//       </div>
//     </div>
//   );
// }
