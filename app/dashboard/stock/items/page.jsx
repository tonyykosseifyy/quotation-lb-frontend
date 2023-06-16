"use client";

import React, {useState} from "react";
import styles from "./page.module.css";
import Button from "@/components/UI/Button/Button";
import Search from "@/components/UI/Search/Search";
import { useForm } from "react-hook-form";
import InputContainer from "@/components/UI/InputContainer/InputContainer";

const filterByOptions = [
  { id: "duplicate", name: "Duplicate" },
  { id: "delete", name: "Delete" },
  { id: "edit", name: "Edit" },
]

const items = [
  {
    id: 1,
    src: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    title: "Product One",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting.",
    price: "$540.00",
  },
  {
    id: 2,
    src: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    title: "Product Two",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting.",
    price: "$540.00",
  },
  {
    id: 3,
    src: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    title: "Product Three",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting.",
    price: "$540.00",
  },
  {
    id: 4,
    src: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    title: "Product One",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting.",
    price: "$540.00",
  },
  {
    id: 5,
    src: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    title: "Product Two",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting.",
    price: "$540.00",
  },
  { 
    id: 6,
    src: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    title: "Product Three",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting.",
    price: "$540.00",
  },
  { 
    id: 7,
    src: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    title: "Product One",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting.",
    price: "$540.00",
  },
  {
    id: 8,
    src: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    title: "Product Two",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting.",
    price: "$540.00",
  },
  {
    id: 9,
    src: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    title: "Product Three",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting.",
    price: "$540.00",
  },
]

const StockItems = () => {
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
};

  const handleCreateProduct = () => {
    //
};

const {
  register,
  handleSubmit,
  watch,
  control,
  formState: { errors },
  reset,
} = useForm();

  return (
      <div className={`container m-0`}>
          <div className={`${styles.header} pt-4`}>
              <div className={`${styles.title}`}>STOCK ITEMS</div>
                  <div>
                      <Button
                        title="Create New Product"
                        fillBackground={true}
                        rounded={true}
                        onClick={handleCreateProduct}
                      />
                   </div>
              </div>
              <div className="d-flex flex-column flex-md-row justify-content-between mt-4" style={{gap: "15px"}}>
                  <div className={styles.searchDiv}>
                      <Search
                          value={search}
                          placeholder="Search..."
                          borderWidth={1}
                          borderColor={"var(--primary-clr)"}
                          borderStyle={"solid"}
                          paddingLeft={25}
                          paddingTop={5}
                          paddingBottom={5}
                          paddingRight={25}
                          fillBackground={true}
                          backgroundColor={"white"}
                          rounded={true}
                          height={"38.5px"}
                          handleSearch={handleSearch}   
                        />
                   </div>
                   <div className="d-flex" style={{ gap: "22px"}}>
                      <InputContainer
                          inputPlaceholder="Filter by"
                          inputType="select"
                          inputName=""
                          borderColor={"var(--primary-clr)"}
                          placeholderColor={"var(--primary-clr)"}
                          placeholderFontStyle={"normal"}
                          placeholderFontWeight={"700"}
                          placeholderFontSize={"14px"}
                          dropdownArrowColor={"var(--primary-clr)"}
                          selectOptions={filterByOptions}
                          control={control}
                          register={register}
                          width={"112"}
                       />
                      <div className="d-flex" style={{gap: "12px"}} >
                          <img src="/assets/svg/settings.svg" />
                          <img src="/assets/svg/4-squares.svg" /> 
                          <img src="/assets/svg/menu.svg" />    
                      </div> 
                   </div>   
            </div>
            <div class="row pt-3">
                {items.map( item => {
                    return (
                        <div key={item.id} className="col-12 col-md-6 col-lg-4 mt-4">
                            <div className={`card ${styles.singleCard}`}>
                               <div className="card-body p-0">
                                  <div className="d-flex">
                                      <img src={item.src} className="rounded-circle mt-1" width="56px" height="56px"/> 
                                      <div className="ps-3">
                                          <div className="d-flex justify-content-between">
                                              <div className={`card-title ${styles.cardTitle}`}>{item.title}</div>
                                              <img src="/assets/svg/heart.svg" />
                                          </div>
                                          <p className={`card-text pe-4 pe-sm-4 pe-md-5 ${styles.cardBodyText}`}>
                                            {item.description}
                                          </p>
                                       </div>
                                  </div>
                                  <hr className="mb-1"/>
                                  <div className={`d-flex justify-content-end pt-0 ${styles.cardTitle}`}>{item.price}</div>
                               </div>
                             </div>
                         </div>
                     )
                 })}
             </div>
       </div>     
  )
}

export default StockItems;