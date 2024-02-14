import React, { useState } from "react";
import ReactCustomFlagSelect from "react-custom-flag-select";
import "./react-custom-flag-select'.css";
import styles from "./PhoneCodeSelect.module.css";
import { countries } from "@/data/countries";

const DEFAULT_AREA_CODE = countries.find((item) => item.name === "Lebanon").id;
const PhoneCodeSelect = ({ codeName, changeCodeValue }) => {
    const [dialCode, setDialCode] = useState(DEFAULT_AREA_CODE);
    const currentItem = countries.find((item) => item.id === dialCode);
    return (
        <div className={styles.container}>
            <ReactCustomFlagSelect
                attributesWrapper={{
                    id: "areaCodeWrapper",
                    tabIndex: "1",
                }} //Optional.[Object].Modify wrapper general attributes.
                attributesButton={{ id: "areaCodeButton" }} //Optional.[Object].Modify button general attributes.
                attributesInput={{
                    id: 1,
                    name: "areaCode",
                }} //Optional.[Object].Modify hidden input general attributes.
                fields={["name"]} // Optional.[array].Default: ['name']. Fields for search filtering.
                value={currentItem.id} //Optional.[String].Default: "".
                disabled={false} //Optional.[Bool].Default: false.
                showSearch={true} ////Optional.[Bool].Default: false.
                showArrow={true} //Optional.[Bool].Default: true.
                animate={true} //Optional.[Bool].Default: false.
                optionList={countries} //Required.[Array of Object(s)].Default: [].
                // selectOptionListItemHtml={<div>us</div>} //Optional.[Html].Default: none. The custom select options item html that will display in dropdown list. Use it if you think the default html is ugly.
                // selectHtml={<div>us</div>} //Optional.[Html].Default: none. The custom html that will display when user choose. Use it if you think the default html is ugly.
                classNameWrapper="" //Optional.[String].Default: "".
                classNameContainer="" //Optional.[String].Default: "".
                classNameOptionListContainer="" //Optional.[String].Default: "".
                classNameOptionListItem="" //Optional.[String].Default: "".
                classNameDropdownIconOptionListItem={""} //Optional.[String].Default: "".
                customStyleWrapper={{}} //Optional.[Object].Default: {}.
                customStyleContainer={{
                    fontSize: "12px",
                }} //Optional.[Object].Default: {}.
                customStyleSelect={{ width: "100px" }} //Optional.[Object].Default: {}.
                customStyleOptionListItem={{}} //Optional.[Object].Default: {}.
                customStyleOptionListContainer={{
                    maxHeight: "150px",
                    overflow: "auto",
                    width: "150px",
                }} //Optional.[Object].Default: {}.
                onChange={(dialCode) => {
                    setDialCode(dialCode);
                    changeCodeValue(codeName, dialCode);
                }}
                // onBlur={() => {}} //Optional.[Func].Default: none.
                // onFocus={(e) => {console.log(e)}} //Optional.[Func].Default: none.
                // onClick={(e) => {console.log(e)}} //Optional.[Func].Default: none.
            />
        </div>
    );
};

export default PhoneCodeSelect;
