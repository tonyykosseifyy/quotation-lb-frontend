import React from "react";
import styles from "./OrderLines.module.css";
import InputContainer from "../UI/InputContainer/InputContainer";
import Ellipsis from "../UI/Icons/Ellipsis";
import Trashcan from "../UI/Icons/Trashcan";
import FourArrows from "../UI/Icons/FourArrows";
import { useForm } from "react-hook-form";

const names = [
  { id: "title", name: "Title" },
  { id: "item", name: "Item" }, 
  { id: "combo", name: "Combo" },
  { id: "image", name: "Image" },
  { id: "note", name: "Note" }
];

const combo = [
  { id: 1, name: "CCTVACCS" },
  { id: 2, name: "CCTVACCS" },
  { id: 3, name: "CCTVACCS" },
];

const items = [
  { id: "item_1", name: "item 1" },
  { id: "item_2", name: "item 2" },
  { id: "item_3", name: "item 3" },
];


const OrderLinesRows = ({type, width, inputBorderColor}) => {
  
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
    reset,
} = useForm();

  return (
    <>

    { type === "item" &&
       <InputContainer
       inputBorder
       inputPlaceholder="Item 1"
       inputType="select"
       inputName="item"
       inputId="item"
       width="107"
       height="38"
      //  widthUnit="px"
       fontWeight="700"
       fontSize="12px"
       selectOptions={items}
       control={control}
       register={register}
       inputBorderColor={inputBorderColor && inputBorderColor}
/>
    }

    {
      type === "combo" && 
      <InputContainer
                        fontSize="12px"
                        fontWeight="600"
                        inputPlaceholder={
                          <div className={`${styles.row}`}>
                          <svg 
                          width="12" 
                          height="13" 
                          viewBox="0 0 12 13" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                             d="M5.41123 0.573522C4.93799 0.653731 4.35246 0.9104 3.93136 1.23124C3.00896 1.92104 2.46755 3.15225 2.59187 4.27518C2.63198 4.61206 2.70416 4.9369 2.80041 5.18154L2.83651 5.2818H3.47016C3.99954 5.28581 4.15194 5.29784 4.42064 5.37404C4.84575 5.49436 5.39919 5.76707 5.73607 6.02374L6.00878 6.22827L6.27748 6.02775C6.61035 5.77509 7.17182 5.49436 7.56885 5.37805C7.81349 5.30587 7.99396 5.28982 8.53136 5.27779L9.19309 5.26977L9.26929 5.05321C10.0313 2.85547 8.32683 0.505344 5.99274 0.533417C5.78821 0.537428 5.52753 0.553469 5.41123 0.573522Z" 
                             fill="var(--primary-clr)"
                           />
                          <path 
                             d="M3.18948 5.6909C3.05312 5.71095 3.05312 5.71897 3.16541 5.87538C3.57448 6.47294 4.15199 6.92211 4.8458 7.1868C5.13054 7.29107 5.1907 7.28706 5.25888 7.15472C5.29096 7.09456 5.39924 6.93815 5.4995 6.80982C5.59976 6.67747 5.68398 6.55716 5.68398 6.53711C5.68398 6.40877 4.73752 5.89944 4.28032 5.78715C3.97152 5.71095 3.38198 5.65882 3.18948 5.6909Z" 
                             fill="var(--primary-clr)"
                           />
                           <path 
                             d="M8.18929 5.70295C7.54762 5.77915 6.95407 6.03181 6.41266 6.45692L6.31641 6.53311L6.52495 6.80984C6.64125 6.96223 6.75355 7.12666 6.77761 7.17479C6.83376 7.2951 6.90594 7.29109 7.28293 7.14672C7.83637 6.93416 8.45799 6.44087 8.81091 5.93957L8.96732 5.71498L8.78284 5.68691C8.57831 5.65883 8.53419 5.66284 8.18929 5.70295Z" 
                             fill="var(--primary-clr)"
                           />
                           <path 
                             d="M2.33479 5.85934C1.3041 6.2283 0.510029 7.03039 0.17315 8.04504C-0.360241 9.65324 0.373674 11.4218 1.89364 12.1798C2.43104 12.4485 2.78797 12.5287 3.41761 12.5327C3.97106 12.5368 4.25981 12.4846 4.72101 12.2961C4.99774 12.1838 5.37472 11.9673 5.5592 11.8109L5.69556 11.6946L5.51107 11.4459C4.94961 10.6799 4.73706 10.0302 4.74508 9.07172C4.74909 8.58244 4.76513 8.43807 4.84935 8.14931C4.9055 7.96082 4.96164 7.78035 4.97768 7.74426C4.99774 7.69613 4.96565 7.67207 4.83331 7.63196C4.35606 7.49561 3.75048 7.13467 3.32136 6.72961C3.12485 6.54513 2.69573 5.98366 2.65563 5.86335C2.62354 5.7671 2.59547 5.7671 2.33479 5.85934Z" 
                             fill="var(--primary-clr)"
                           />
                           <path 
                             d="M9.2679 6.03186C8.8468 6.71765 7.85621 7.47563 7.15839 7.64808C7.09423 7.66412 7.0461 7.68417 7.0461 7.69219C7.0461 7.70021 7.09423 7.86464 7.15438 8.05714C7.25465 8.38199 7.26267 8.46621 7.26267 9.1119C7.26267 9.76159 7.25465 9.8418 7.15438 10.1666C7.01803 10.6118 6.78542 11.073 6.52474 11.4139C6.41646 11.5623 6.32422 11.6906 6.32422 11.6986C6.32422 11.7428 6.86964 12.0957 7.13032 12.22C7.62361 12.4526 7.98856 12.5288 8.59013 12.5288C8.99519 12.5288 9.18368 12.5128 9.43233 12.4446C10.6475 12.1197 11.5619 11.2214 11.9068 10.0142C11.979 9.74956 11.995 9.59315 11.999 9.13195C11.999 8.51835 11.9629 8.3098 11.7664 7.82855C11.4135 6.95026 10.6675 6.22436 9.79327 5.90754C9.60478 5.83936 9.44436 5.78321 9.43634 5.78321C9.42832 5.78321 9.35212 5.89551 9.2679 6.03186Z" 
                             fill="var(--primary-clr)"
                           />
                           <path 
                             d="M5.82512 7.08667C5.73689 7.21099 5.66069 7.32729 5.65267 7.34735C5.64465 7.37141 5.78502 7.38745 6.00158 7.38745C6.2021 7.38745 6.36653 7.37141 6.36653 7.35537C6.36653 7.30724 6.0457 6.86609 6.01361 6.86609C5.99757 6.86609 5.91335 6.96635 5.82512 7.08667Z" 
                             fill="var(--primary-clr)"
                           />
                           <path 
                             d="M5.32731 8.04912C5.15085 8.59856 5.11075 9.25627 5.22304 9.78565C5.33132 10.311 5.61205 10.9126 5.90482 11.2575L6.00909 11.3778L6.14545 11.2174C6.32592 11.0088 6.61467 10.4474 6.72295 10.0985C6.91545 9.47685 6.91144 8.72689 6.71493 8.10527L6.6267 7.81251H6.0131L5.40351 7.8085L5.32731 8.04912Z" 
                             fill="var(--primary-clr)"
                           />
                        </svg> 
                        <span className={`${styles.comboPlaceheolderText}`}>Combo</span>
                        </div>
                        }
                        inputType="select"
                        inputName="combo"
                        inputId="combo"
                        width="107"
                        height="38"
                        // widthUnit="px"
                        selectOptions={combo}
                        control={control}
                        register={register}
          />
    }

{ type === "description" &&
       <InputContainer
       inputBorder
       inputPlaceholder="lorem ipsumlorem ipsum"
       inputType="text"
       inputName="description"
       inputId="description"
       height="38"
       width={ width ? width : "562"}
       fontWeight="700"
       control={control}
       register={register}
       inputBorderColor={inputBorderColor && inputBorderColor}
/>
    }

{ type === "quantity" &&
       <InputContainer
       inputBorder
       inputPlaceholder="1.00"
       inputType="text"
       inputName="quantity"
       inputId="quantity"
       width="75"
       height="38"
      //  widthUnit="px"
       fontWeight="700"
       textAlign="center"
       control={control}
       register={register}
       inputBorderColor={inputBorderColor && inputBorderColor}
/>
    }

{ type === "discount" &&
       <InputContainer
       inputBorder
       inputPlaceholder="15%"
       inputType="text"
       inputName="discount"
       inputId="discount"
       width="75"
       height="38"
      //  widthUnit="px"
       fontWeight="700"
       textAlign="center"
       control={control}
       register={register}
       inputBorderColor={inputBorderColor && inputBorderColor}
/>
    }

{ type === "unitPrice" &&
       <InputContainer
       inputBorder
       inputPlaceholder="150.0"
       inputType="text"
       inputName="unitPrice"
       inputId="unitPrice"
       width="75"
       height="38"
      //  widthUnit="px"
       fontWeight="700"
       textAlign="center"
       control={control}
       register={register}
       inputBorderColor={inputBorderColor && inputBorderColor}
/>
    }

{ type === "total" &&
       <InputContainer
       inputBorder
       inputPlaceholder="1.500.000"
       inputType="text"
       inputName="total"
       inputId="total"
       width="137"
       height="38"
       widthUnit="px"
       fontWeight="700"
       control={control}
       register={register}
       inputBorderColor={inputBorderColor && inputBorderColor}
/>
    }

{ type === "title" && 
        <InputContainer
                        style={{ paddingTop: "10px"}}
                        inputPlaceholder="Title"
                        inputType="text"
                        inputName="title"
                        inputId="title"
                        // width="68"
                        height="38"
                        // widthUnit="vw"
                        //  width="1043"
                        width= "1075"
                        // widthUnit="px"
                        // widthUnit="%"
                        control={control}
                        register={register}
          />
  }

  { type === "note" &&
    <InputContainer
    inputPlaceholder="Note"
    inputType="text"
    inputName="note"
    inputId="note"
    // width="68"
    height="38"
    // widthUnit="vw"
    // width="1043"
    width= "1075"
    // widthUnit="px"
    control={control}
    register={register}
/>
  }

  {
    type === "image" && 
    <div className={`${styles.row}`} >
      <div style={{display: "flex", alignItems: "center", }}>
             <div className={`${styles.dragAndDropContainer}`} style={{width: "1075px"}}>
                          <img src="/assets/svg/upload.svg"/>
                          <div className={`${styles.dragAndDropText}`} >
                           Drag and Drop your image here or <span style={{color: "var(--primary-clr-light)", paddingLeft: "4px"}}> Browse</span> 
                          </div>
                </div>
                </div>
      </div>  
  }

{ type === 6 &&
     <hr style={{color: "black"}} className="pb-2 pt-3" />
}     
    </>
  );
};

export default  OrderLinesRows;