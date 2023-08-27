"use client";

import React from "react";
import styles from "./page.module.css";
import InputContainer from "../UI/InputContainer/InputContainer";

const SalesmenPropertiesTab = ({ register, control, commissionGrantedOptions, commissionGrantedOption, handleCommissionSelectChange, commissionsPaymentOptions, commissionsPaymentOption, handleCommissionsPaymentChange }) => {

    return (
      <>
          <div className="mt-5 d-flex flex-column" style={{ gap: "10px" }}>
              <div className="d-flex flex-column flex-md-row align-items-md-center" style={{ gap: "10px" }}>
                  <div className={`pe-md-4 ${styles.labelText}`}> 
                      Commission granted 
                  </div>
                  <div className="d-flex flex-row" style={{ gap: "10px" }}>
                      <InputContainer 
                          inputPlaceholder='7.50 %' 
                          inputType='number' 
                          inputName='commissionGrantedPercentage' 
                          register={register} 
                          control={control} 
                          textAlign="end" 
                          width="80" 
                      />
                      <InputContainer 
                          inputPlaceholder='on invoice net sales amount total' 
                          inputType='select' 
                          inputName='commissionGrantedSelect' 
                          selectOptions={commissionGrantedOptions} 
                          register={register} 
                          control={control} 
                          width="100" 
                          widthUnit="%" 
                          placeholderColor="#868686" 
                          placeholderStyle
                          value={commissionGrantedOption}
                          onChange={handleCommissionSelectChange}
                      />
                  </div>
              </div>
              <div className="mt-2 d-flex flex-column flex-md-row align-items-md-center" style={{ gap: "10px" }}>
                  <div className={`pe-md-3 ${styles.labelText}`}> 
                      Commissions Payment 
                  </div>
                  <InputContainer 
                      inputPlaceholder='upon total cashing of invoice' 
                      inputType='select' 
                      inputName='commissionsPayment' 
                      selectOptions={commissionsPaymentOptions} 
                      register={register} control={control} 
                      width="100" widthUnit="%" 
                      placeholderColor="#868686"
                      placeholderStyle
                      value={commissionsPaymentOption}
                      onChange={handleCommissionsPaymentChange}
                  />
              </div>
          </div>
      </>  
    );
};

export default SalesmenPropertiesTab;