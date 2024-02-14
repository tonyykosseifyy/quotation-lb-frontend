import AlternativeCode from "@/components/UI/Icons/AlternativeCode";
import Barcode from "@/components/UI/Icons/Barcode";
import SupplierCode from "@/components/UI/Icons/SupplierCode";

export const altCodesDropdownItems = [
  {
    key: "supplier",
    name: "Supplier Code",
    icon: <SupplierCode fillColor={"var(--primary-clr)"} />,
  },
  {
    key: "alternative",
    name: "Alternative Code",
    icon: <AlternativeCode fillColor={"var(--primary-clr)"} />,
  },
  {
    key: "barcode",
    name: "Barcode",
    icon: <Barcode fillColor={"var(--primary-clr)"} />,
  },
];
