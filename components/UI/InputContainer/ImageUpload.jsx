import React, { useEffect, useState } from "react";
import styles from "./ImageUpload.module.css";
import { useDropzone } from "react-dropzone";

export const ImageUpload = ({ register, registerArrayName, registerArrayIndex, registerArrayKey, inputName, isRequired, extraValidations, setValue }) => {
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
    },
  });

  useEffect(() => {
    const targetedInputName = registerArrayName ? `${registerArrayName}.${registerArrayIndex}.${registerArrayKey}` : inputName;
    setValue(targetedInputName, files[0]);
  }, [files]);

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <div className=''>
      <div {...getRootProps()} className={styles.dragAndDropContainer}>
        <input
          {...getInputProps()}
          {...register(registerArrayName ? `${registerArrayName}.${registerArrayIndex}.${registerArrayKey}` : inputName, {
            required: isRequired,
            ...extraValidations,
          })}
        />
        <img src='/assets/svg/upload.svg' alt='upload icon' />
        <div className={`${styles.dragAndDropText}`}>
          Drag and Drop your image here or{" "}
          <span
            style={{
              color: "var(--primary-clr-light)",
              paddingLeft: "4px",
            }}>
            {" "}
            Browse
          </span>
        </div>
      </div>
      <aside className={styles.thumbsContainer}>
        {files.map((file) => (
          <div className={styles.thumb} key={file.name}>
            <div className={styles.thumbInner}>
              <img
                src={file.preview}
                className={styles.fileImg}
                // Revoke data uri after image is loaded
                onLoad={() => {
                  URL.revokeObjectURL(file.preview);
                }}
                alt=''
              />
            </div>
          </div>
        ))}
      </aside>
    </div>
  );
};
