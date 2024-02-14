export const getButtonTabs = (buttonState) => {
  return [
    {
      title: "General",
      fillBackground: buttonState === "general",
      value: "general",
    },
    {
      title: "Alt Codes",
      fillBackground: buttonState === "altCodes",
      value: "altCodes",
    },
    {
      title: "Grouping",
      fillBackground: buttonState === "grouping",
      value: "grouping",
    },
    {
      title: "Procurement",
      fillBackground: buttonState === "procurement",
      value: "procurement",
    },
    {
      title: "Pricing",
      fillBackground: buttonState === "pricing",
      value: "pricing",
    },
    {
      title: "Quantities",
      fillBackground: buttonState === "quantities",
      value: "quantities",
    },
    {
      title: "Shelving",
      fillBackground: buttonState === "shelving",
      value: "shelving",
    },
    {
      title: "Shipping",
      fillBackground: buttonState === "shipping",
      value: "shipping",
    },
  ];
};
