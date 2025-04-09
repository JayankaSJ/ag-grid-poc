import { CustomCellEditorProps } from "ag-grid-react";
import { useState } from "react";

// Define the types for the props
type LocalePopupEditorProps = CustomCellEditorProps & {
  value: { locale: string; value: string }[]; // Array of locale and value pairs
};

const availableLocales = ["en-US", "fr-FR", "de-DE", "es-ES", "it-IT"]; // Predefined locales

export function LocalePopupEditor(props: LocalePopupEditorProps) {
  const { api, value, stopEditing, onValueChange } = props;

  const [locales, setLocales] = useState(value || []); // Initialize state with the current value

  // Add a new empty locale entry
  const addLocale = () => {
    setLocales([...locales, { locale: "", value: "" }]);
    api.onRowHeightChanged(); // Adjust row height after adding a new locale input
  };

  // Remove a locale entry by its index
  const removeLocale = (index: number) => {
    const newLocales = locales.filter((_: any, i: number) => i !== index);
    setLocales(newLocales);
    api.onRowHeightChanged(); // Adjust row height after removing a locale
  };

  // Handle saving the data and passing it back to ag-Grid
  const handleSave = () => {
    // Call onValueChange to update the grid cell
    onValueChange(locales);
    stopEditing(); // Stop editing when done
    api.autoSizeColumns(["multi-value-display"]);
  };

  const onClose = () => {
    // Close the popup without saving
    stopEditing();
    api.autoSizeColumns(["multi-value-display"]);
  };

  return (
    <div className="relative">
      <div className="absolute z-10 p-4 bg-white rounded shadow-lg">
        <div className="w-full h-full flex flex-col gap-4">
          <h3 className="text-center font-semibold">Edit Locale Values</h3>

          {/* Render each locale entry */}
          <div className="flex flex-col gap-2">
            {locales.map(
              (
                localeObj: { locale: string; value?: string },
                index: number
              ) => (
                <div key={index} className="flex gap-2 items-center">
                  <select
                    value={localeObj.locale}
                    onChange={(e) => {
                      const newLocales = [...locales];
                      newLocales[index].locale = e.target.value;
                      setLocales(newLocales);
                    }}
                    className="border border-gray-300 rounded px-2 py-1"
                  >
                    <option value="">-- Select Locale --</option>
                    {availableLocales.map((locale) => (
                      <option key={locale} value={locale}>
                        {locale}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    value={localeObj.value}
                    onChange={(e) => {
                      const newLocales = [...locales];
                      newLocales[index].value = e.target.value;
                      setLocales(newLocales);
                    }}
                    className="border border-gray-300 rounded px-2 py-1"
                    placeholder="Enter value"
                  />

                  {/* Remove button for deleting a locale entry */}
                  <button
                    type="button"
                    onClick={() => removeLocale(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </div>
              )
            )}
          </div>

          {/* Button to add a new empty locale entry */}
          <button
            onClick={addLocale}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Add Locale
          </button>

          {/* Action buttons to save or cancel */}
          <div className="flex flex-row gap-2 justify-between mt-4">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
