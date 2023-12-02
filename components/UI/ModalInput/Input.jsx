import React from "react";
import styles from "./Input.module.css";

const InputField = ({ watchedValues, register, label, inputName, inputNameQuantity, referenceField }) => {
  return (
    <div
      className='d-flex flex-column flex-md-row align-items-md-center pe-md-5'
      style={{ gap: "10px" }}>
      <div
        className={`${styles.labelText}`}
        style={{ width: "126px" }}>
        {label}
      </div>
      <div
        className='d-flex flex-row align-items-center'
        style={{ gap: "10px" }}>
        <input
          name={inputName}
          {...register(inputName, {
            required: true,
          })}
          className='border border-1 rounded p-2 text-center'
          style={{ fontWeight: "700", fontSize: "13px", width: "45px" }}
        />
        {inputNameQuantity && (
          <>
            <InputContainer
              inputPlaceholder=''
              isRequired={true}
              inputType='text'
              inputName={inputNameQuantity}
              register={register}
              width='154'
            />
            {referenceField && (
              <div
                className='ps-3'
                style={{ fontWeight: "700", fontSize: "13px" }}>
                {`${watchedValues[referenceField] ?? ""} PER ${watchedValues[inputName] ?? ""}`}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default InputField;
