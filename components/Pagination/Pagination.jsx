import React from "react";
import { Pagination } from "@nextui-org/react";

const PaginationComponent = ({ total, initialPage = 1, handleChange }) => {
  return <Pagination showControls total={total} initialPage={initialPage} onChange={handleChange} />;
};

export default PaginationComponent;
