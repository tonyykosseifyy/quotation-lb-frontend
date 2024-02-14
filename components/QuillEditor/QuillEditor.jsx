import dynamic from "next/dynamic";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";

const QuillEditor = ({ defaultValue, theme, style, readOnly, onChange }) => {
  const QuillEditor = useMemo(() => {
    return dynamic(() => import("react-quill"), {
      ssr: false,
    });
  }, []);
  return (
    <QuillEditor
      defaultValue={defaultValue}
      theme={theme}
      style={style}
      readOnly={readOnly}
      onChange={onChange}
    />
  );
};

export default QuillEditor;
