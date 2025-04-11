import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
        }}
      >
        <button
          onClick={() => navigate("/glide-grid")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Show Glide Grid
        </button>
        <button
          onClick={() => navigate("/ag-grid")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Show Ag Grid
        </button>
        <button
          onClick={() => navigate("/ag-grid-commercial")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Show Ag Grid Commercial
        </button>
      </div>

      <div style={{ textAlign: "left" }}>
        We care about below features:
        <ol className="list-decimal list-inside">
          <li>
            Basic cell types
            <ul className="ml-4 list-disc list-inside">
              <li>Text</li>
              <li>Integer</li>
              <li>Dropdown</li>
              <li>Date</li>
              <li>Checkbox</li>
              <li>Currency</li>
              <li>Image - to display assets uploaded by supplier</li>
              <li>Custom</li>
            </ul>
          </li>
          <li>Copy/ Paste support</li>
          <li>Cell edit locking</li>
          <li>
            Validations and error showing
            <ul className="ml-4 list-disc list-inside">
              <li>In cell</li>
              <li>Cells within the row</li>
            </ul>
          </li>
          <li>Dependencies Cells within the row</li>
          <li>Cell nesting</li>
          <li>
            Mange multiple values for each Cell
            <br /> Ex: Take the product name for instance. For BUTLERS users
            will need to manage a German and English BUTLERS name, besides
            another name for selling the product on the home24 webshop
          </li>
        </ol>
      </div>
    </div>
  );
}
