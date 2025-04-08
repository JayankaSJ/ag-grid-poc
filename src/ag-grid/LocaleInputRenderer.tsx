import { useMemo } from "react";

export function LocaleRenderer(props: any) {
  const values = useMemo(() => {
    return props.value || [];
  }, [props.value]);

  return (
    <div className="p-[2px] rounded-lg">
      <div className="flex flex-col flex-wrap gap-2">
        {values?.map((item: any, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-2 rounded-md bg-gray-100 h-[20px]"
          >
            <span
              className="font-semibold text-gray-700"
              style={{ lineHeight: "10px" }}
            >
              {item?.locale}:
            </span>
            <span className="text-gray-500">{item?.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
