import type { CustomCellRendererProps } from "ag-grid-react";

export function OptionsRenderer({ value }: CustomCellRendererProps) {
  if (!value) {
    return <></>;
  }
  return <span>{value}</span>;
}

export const AssetsRenderer = (params: CustomCellRendererProps) => {
  if (!Array.isArray(params?.value)) {
    return <span />;
  }

  return (
    <div className="flex flex-row gap-2">
      {params.value.map((asset: string, index: number) => (
        <div
          key={index}
          className="flex flex-row items-center justify-center bg-gray-200 rounded-lg border border-gray-300 p-[1px]"
        >
          <img
            src={asset}
            alt={`Asset ${index}`}
            className="w-8 h-8 rounded-full"
          />
        </div>
      ))}
    </div>
  );
};
