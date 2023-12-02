export const transactionalQuantityConditionalRowStyles = [
  {
    when: (row) => (row.id % 2 !== 0) & (row.transaction !== "Ordered not invoiced"),
    style: {
      backgroundColor: "var(--table-row-background-clr)",
    },
  },
  {
    when: (row) => row.transaction === "Ordered not invoiced",
    style: {
      backgroundColor: "var(--table-row-babyblue-background-clr)",
    },
  },
];

export const warehousesConditionalRowStyles = [
  {
    when: (row) => row.code === "Code 1",
    style: {
      backgroundColor: "var(--table-row-background-clr)",
    },
  },
  {
    when: (row) => row.code === "Code 3",
    style: {
      backgroundColor: "#A4D8FB",
    },
  },
];

export const customStyles = {
  headRow: {
    style: {
      backgroundColor: "var(--primary-clr)",
      color: "white",
      fontSize: "13px",
      fontWeight: 600,
      borderRadius: 5,
    },
  },
  rows: {
    style: {
      height: "min-content",
      borderBottom: "none !important",
    },
  },
  cells: {
    style: {
      fontSize: 12,
      fontWeight: 700,
      color: "var(--secondary-text-clr)",
      paddingTop: "0px !important",
      height: "30px !important",
    },
  },
};

export const modalStyle = {
  overlay: {
    backgroundColor: "var(--modal-overlay-background-clr)",
    zIndex: 200,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    width: "88%",
    padding: "30px 40px 24px 40px",
    borderRadius: "8px",
    overflow: "auto",
    height: "650px",
  },
};
