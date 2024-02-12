"use client";

import React, { useEffect, useState } from "react";
import styles from "./QuotationComponent.module.css";
import InputContainer from "@/components/UI/InputContainer/InputContainer";
import Button from "@/components/UI/Button/Button";
import OrderLinesRows from "@/components/Table/OrderLines";
import Input from "@/components/UI/InputContainer/Input";
import { addVat, calculateCommission, calculateDiscountAmount, calculateTotalAfterDiscounts } from "@/helpers/calculate";
import ProgressStepsBar from "@/components/ProgressStepsBar/ProgressStepsBar";
import { formatNumber } from "@/helpers/formatNumber";
import { useFieldArray, useForm } from "react-hook-form";
import Sortable, { get } from "sortablejs";
import { VAT, VAT_LEB_RATE } from "@/data/constants";
import { toast } from "react-toastify";
import { generatePreviewForUnsubmittedQuotation, handlePreview } from "@/controllers/quotations.controller";
import { QuotationAction } from "@/constants/QuotationsActions";
import CheckBox from "../UI/CheckBox/Checkbox";
// import dynamic from "next/dynamic";
// import "react-quill/dist/quill.snow.css";

// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const QuotationComponent = ({ action, onSubmit = () => {}, title, quotationData, permissions = [], resetForm, setResetForm = () => {}, ...props }) => {
  const [buttonState, setButtonState] = useState("order");
  const [indices, setIndices] = useState({ oldIndex: null, newIndex: null });
  const [quotationTotalBeforeVat, setQuotationTotalBeforeVat] = useState(quotationData.totalBeforeVat ?? 0);
  const [activeStep, setActiveStep] = useState(1);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [currencyUsed, setCurrencyUsed] = useState(quotationData?.currency?.name ?? "USD");
  const [shouldExemptVat, setShouldExemptVat] = useState(quotationData.exemptVat ?? false);

  const shouldDisableComponents = action === "view";

  const actionButtons = [
    {
      title: "Preview",
      value: "preview",
      onClick: () => handleQuotationPreview(currencyUsed, quotationData?.id),
      shouldDisableComponent: false,
      isLoading: isLoadingPreview,
    },
    {
      title: "Send By Email",
      value: "send by email",
      onClick: () => setActiveStep(2),
      shouldDisableComponent: shouldDisableComponents,
      isLoading: false,
    },
    {
      title: "Confirm",
      value: "confirm",
      onClick: () => setActiveStep(3),
      shouldDisableComponent: shouldDisableComponents,
      isLoading: false,
    },
    {
      title: "Cancel",
      value: "cancel",
      onClick: () => setActiveStep(1),
      shouldDisableComponent: shouldDisableComponents,
      isLoading: false,
    },
  ];

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    getValues,
    reset,
    setFocus,
  } = useForm({
    defaultValues: {
      manualReference: quotationData.reference,
      clientId: quotationData.client,
      validity: quotationData.validity,
      paymentTerm: quotationData.paymentTerm,
      pricelist: quotationData.pricelist,
      currency: quotationData.currency ?? quotationData.currencies.find((curr) => curr.name === "USD"),
      termsAndConditions: quotationData.termsAndConditions,
      globalDiscountPercentage: quotationData.globalDiscount,
      specialDiscountPercentage: quotationData.specialDiscount,
      specialDiscount: quotationData.specialDiscountAmount,
      salespersonId: quotationData.salesperson,
      commissionMethodId: quotationData.commissionMethod,
      cashingMethodId: quotationData.cashingMethod,
      commissionRate: quotationData.commissionRate,
      commissionTotal: quotationData.commissionTotal,
      vatLebanese: quotationData.vatLebanese,
      exemptVat: quotationData.exemptVat,
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    name: "orderLines",
    control: control,
  });

  const fieldsWatch = watch("orderLines");

  const clientIdWatch = watch("clientId");

  const salespersonWatch = watch("salespersonId");
  const globalDiscountPercentageWatch = watch("globalDiscountPercentage");
  const specialDiscountPercentageWatch = watch("specialDiscountPercentage");
  const commissionRateWatch = watch("commissionRate");

  const handleQuotationTotalChange = (operation, value) => {
    if (operation === "add") {
      setQuotationTotalBeforeVat((prev) => {
        const updatedTotal = prev + value;
        return updatedTotal;
      });
    }
    if (operation === "subtract") {
      setQuotationTotalBeforeVat((prev) => {
        const updatedTotal = prev - value;
        return updatedTotal;
      });
    }
  };

  const handleQuotationPreview = async (currencyUsed, id) => {
    setIsLoadingPreview(true);
    try {
      if (id && action === QuotationAction.VIEW) {
        await handlePreview(id);
      } else {
        const values = getValues();
        await generatePreviewForUnsubmittedQuotation(values, shouldExemptVat);
      }
    } catch (err) {
      if (err.response.status === 400) {
        const res = await new Response(err.response.data).text();
        toast.error(JSON.parse(res).message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoadingPreview(false);
    }
  };
  const handleTabChange = (value) => {
    setButtonState(value);
  };

  const handleSubmitSuccess = () => {
    remove();
    reset();
  };

  const handleExemptVat = () => {
    setShouldExemptVat((prev) => !prev);
    setValue("exemptVat", !shouldExemptVat);
  };

  const checkKeyDown = (e) => {
    if (e.key === "Enter") e.preventDefault();
  };

  useEffect(() => {
    if (props.createdClient && props.createdClient.isNew) {
      setValue("clientId", props.createdClient);
    }
  }, [props.createdClient]);

  useEffect(() => {
    if (quotationData && action !== "create") {
      reset({
        orderLines: [...quotationData.orderLines],
      });
    }
    setValue("termsAndConditions", quotationData.termsAndConditions);
  }, []);

  useEffect(() => {
    var el = document.getElementById("itemRows");
    if (el) {
      Sortable.create(el, {
        ghostClass: `${styles.sortableGhostBlue}`,
        onUpdate: function (evt) {
          setIndices({ oldIndex: evt.oldIndex, newIndex: evt.newIndex });
        },
        handle: ".sortHandle",
      });
    }
  }, [fields]);

  useEffect(() => {
    if (resetForm) {
      handleSubmitSuccess();
      setResetForm(false);
    }
  }, [resetForm]);

  useEffect(() => {
    setFocus("clientId");
  }, [setFocus]);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={checkKeyDown}>
        <div>
          <div
            className={styles.title}
            style={{ color: "var(--primary-clr)" }}>
            {title}
          </div>
        </div>
        <div className='d-flex flex-column flex-lg-row mt-2 justify-content-md-between gap-3'>
          <div className='d-flex gap-2'>
            {actionButtons.map(({ title, value, onClick, shouldDisableComponent, isLoading }) => (
              <Button
                key={title}
                title={title}
                value={value}
                onClick={onClick}
                backgroundColor='var(--tab-button-background-clr)'
                border='none'
                rounded={true}
                padding='10px'
                type='button'
                fontSize='13px'
                fontWeight={600}
                loading={isLoading}
                titleColor='var(--primary-text-clr)'
                isDisabled={shouldDisableComponent}
              />
            ))}
          </div>
          <ProgressStepsBar activeStep={activeStep} />
        </div>
        <div className={`${styles.quotationInfo} border border-2 rounded p-4`}>
          <div className={`${styles.inputRow}`}>
            <div
              className='d-flex flex-column flex-md-row align-items-md-center'
              style={{ gap: "27px" }}>
              <div className={`${styles.quotationNumber}`}>{quotationData.quotationNumber}</div>
              <div className={`d-flex align-items-center ${styles.refPaddingLeft}`}>
                <div className={`${styles.labelText} pe-2`}> Ref: </div>
                <InputContainer
                  inputPlaceholder='MANUAL REFERENCE'
                  inputType='text'
                  inputName='manualReference'
                  inputId='manualReference'
                  control={control}
                  register={register}
                  isDisabled={shouldDisableComponents}
                />
              </div>
            </div>
            <InputContainer
              label='Customer Name'
              spaceBetween={false}
              isRequired={true}
              inputPlaceholder='Search...'
              inputType={"asyncCreatableSelect"}
              inputName={"clientId"}
              width='100'
              height='100'
              heightUnit='%'
              widthUnit='%'
              fontWeight='700'
              fontSize='12px'
              control={control}
              register={register}
              loadOptions={props.loadClientOptions}
              isDisabled={shouldDisableComponents}
              setValue={setValue}
              onCreateOption={props.handleCreateClient}
              defaultOptions={props.defaultClientOptions}
            />
            <div className={`d-flex flex-column flex-md-row align-items-md-start ${styles.contactDetailsGap}`}>
              <div className={`${styles.labelText}`}> Contact Details</div>
              <div
                className='d-flex flex-column'
                style={{ gap: "5px" }}>
                <div> {clientIdWatch && `${clientIdWatch.street ?? ""} ${clientIdWatch.street && clientIdWatch.floor_and_building ? "," : ""} ${clientIdWatch.floor_and_building ?? ""} `}</div>
                <div> {clientIdWatch && ` ${clientIdWatch.phone_code ?? ""} ${clientIdWatch.phone_number ?? ""}`}</div>
                <div>
                  {" "}
                  <b>{clientIdWatch && clientIdWatch.tax_id && ` VAT# : ${clientIdWatch.tax_id}`}</b>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styles.inputRow2}`}>
            <InputContainer
              label='Validity'
              inputType='text'
              inputName='validity'
              inputId='validity'
              control={control}
              register={register}
              isDisabled={shouldDisableComponents}
            />
            <InputContainer
              label='Payment Terms'
              inputPlaceholder=''
              inputType='select'
              inputName='paymentTerm'
              selectOptions={quotationData.paymentTerms}
              optionName='title'
              control={control}
              register={register}
              onChange={(e) => setValue("paymentTerm", e)}
              isDisabled={shouldDisableComponents}
            />
            <InputContainer
              label='Pricelist'
              inputPlaceholder=''
              inputType='select'
              inputName='pricelist'
              selectOptions={quotationData.pricelists}
              optionName='title'
              control={control}
              register={register}
              onChange={(e) => setValue("pricelist", e)}
              isDisabled={shouldDisableComponents}
            />
            <InputContainer
              label='Currency'
              inputPlaceholder=''
              inputType='select'
              inputName='currency'
              selectOptions={quotationData.currencies}
              control={control}
              register={register}
              onChange={(e) => {
                setValue("currency", e), setCurrencyUsed(e.name);
              }}
              isDisabled={shouldDisableComponents}
            />

            <CheckBox
              labelFontWeight={500}
              inputName='exemptVat'
              labelText='Exempt VAT'
              register={register}
              onChange={() => handleExemptVat()}
            />
          </div>
        </div>
        <div className={`d-flex mt-3`}>
          <Button
            title='Order lines'
            fillBackground={buttonState === "order"}
            onClick={() => handleTabChange("order")}
            value='order'
            type='button'
            width='180px'
            tab
          />
          <Button
            title='Other Information'
            fillBackground={buttonState === "information"}
            onClick={() => handleTabChange("information")}
            value='information'
            width='180px'
            type='button'
            tab
          />
        </div>

        <div>
          <div className={`${buttonState !== "order" && styles.hidden}`}>
            <OrderLinesRows
              control={control}
              register={register}
              fields={fields}
              append={append}
              remove={remove}
              move={move}
              indices={indices}
              items={quotationData.items}
              combos={quotationData.combos}
              isFooterShown
              footerList={quotationData.lineTypes}
              footerPaddingTop={"43px"}
              footerPaddingLeft={"48px"}
              tableWidth={"100%"}
              fieldsWatch={fieldsWatch}
              setValue={setValue}
              handleQuotationTotalChange={handleQuotationTotalChange}
              getValues={getValues}
              isDisabled={shouldDisableComponents}
              action={action}
            />
            <div className={`${styles.termsAndConditionsContainer} overflow-auto`}>
              <div className={`overflow-auto`}>
                <div style={{ fontSize: "14px", fontWeight: "700" }}>Terms & Conditions</div>
                <div className={`${styles.termsAndConditionsInputContainer}`}>
                  <InputContainer
                    inputPlaceholder='Terms & Conditions'
                    inputType='textarea'
                    inputName='termsAndConditions'
                    width='100'
                    widthUnit='%'
                    height='none'
                    control={control}
                    register={register}
                    isDisabled={shouldDisableComponents}
                  />
                  {/* <ReactQuill
                    defaultValue={quotationData.termsAndConditions}
                    theme='snow'
                    style={{ width: "100%", minHeight: "150px" }}
                    readOnly={shouldDisableComponents}
                    onChange={(value) => setValue("termsAndConditions", value)}
                  /> */}
                </div>
                <div className={`${styles.newTermsAndConditionsLink}`}>{!shouldDisableComponents && <i>Or Create new Terms & Conditions</i>}</div>
              </div>
            </div>

            <div className={`${styles.totalAmountContainer}`}>
              <div className={`${styles.totalBeforeVatColumn}`}>
                <div className={styles.totalInputs}>
                  <div> Total Before VAT</div>
                  <Input
                    inputPlaceholder=''
                    inputType='text'
                    inputName='totalBeforeVat'
                    textAlign='end'
                    width={130}
                    control={control}
                    register={register}
                    setValue={setValue}
                    initialValue={quotationTotalBeforeVat}
                    isDisabled={true}
                  />
                </div>
                <div className={styles.totalInputs}>
                  <div style={{ paddingTop: "2px" }}> Global Disc (%)</div>
                  <div className='d-flex flex-row gap-2'>
                    <Input
                      inputPlaceholder='0.00%'
                      defaultValue={action === "create" ? 0 : null}
                      inputType='text'
                      inputName='globalDiscountPercentage'
                      width={130}
                      control={control}
                      register={register}
                      setValue={setValue}
                      textAlign='end'
                      isDisabled={shouldDisableComponents}
                    />
                    <Input
                      inputPlaceholder={`${currencyUsed} 0.00`}
                      inputType='text'
                      inputName='globalDiscount'
                      defaultValue={action === "create" ? null : quotationData.globalDiscountAmount}
                      textAlign='end'
                      width={130}
                      control={control}
                      register={register}
                      isDisabled={true}
                      setValue={setValue}
                      initialValue={calculateDiscountAmount(quotationTotalBeforeVat, [globalDiscountPercentageWatch])}
                    />
                  </div>
                </div>
                <div className={styles.totalInputs}>
                  <div style={{ paddingTop: "2px" }}> Special Disc (%)</div>
                  <div className='d-flex flex-row gap-2'>
                    <Input
                      inputPlaceholder='0.00%'
                      defaultValue={action === "create" ? 0 : null}
                      inputType='text'
                      inputName='specialDiscountPercentage'
                      width={130}
                      control={control}
                      register={register}
                      setValue={setValue}
                      textAlign='end'
                      isDisabled={shouldDisableComponents}
                    />
                    <Input
                      inputPlaceholder={`${currencyUsed} 0.00`}
                      inputType='text'
                      inputName='specialDiscount'
                      textAlign='end'
                      defaultValue={action === "create" ? null : quotationData.specialDiscountAmount}
                      width={130}
                      control={control}
                      register={register}
                      isDisabled={true}
                      setValue={setValue}
                      initialValue={calculateDiscountAmount(calculateTotalAfterDiscounts(quotationTotalBeforeVat, [globalDiscountPercentageWatch]), [specialDiscountPercentageWatch])}
                    />
                  </div>
                </div>
                {!shouldExemptVat && (
                  <div className={styles.totalInputs}>
                    <div style={{ paddingTop: "2px" }}> VAT {VAT * 100}%</div>
                    <div className='d-flex flex-row gap-2'>
                      <Input
                        inputPlaceholder='LBP 123,567'
                        inputType='text'
                        inputName='vatLebanese'
                        defaultValue={action !== QuotationAction.VIEW ? null : quotationData.vatLebanese}
                        textAlign='end'
                        width={130}
                        control={control}
                        register={register}
                        isDisabled={true}
                        setValue={setValue}
                        initialValue={formatNumber(Number(addVat(calculateTotalAfterDiscounts(quotationTotalBeforeVat, [globalDiscountPercentageWatch, specialDiscountPercentageWatch]), [VAT * 100]) * VAT_LEB_RATE).toFixed(0))}
                      />
                      <Input
                        inputPlaceholder=''
                        inputType='text'
                        inputName='vat'
                        textAlign='end'
                        defaultValue={action !== QuotationAction.VIEW ? null : quotationData.vat}
                        width={130}
                        control={control}
                        register={register}
                        isDisabled={true}
                        setValue={setValue}
                        initialValue={Number(addVat(calculateTotalAfterDiscounts(quotationTotalBeforeVat, [globalDiscountPercentageWatch, specialDiscountPercentageWatch]), [VAT * 100])).toFixed(2)}
                      />
                    </div>
                  </div>
                )}
                <div className={styles.totalInputs}>
                  <div
                    style={{
                      fontSize: "16px",
                      color: "var(--primary-clr)",
                      fontWeight: "800",
                      paddingTop: "3px",
                    }}>
                    Total Amount
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      color: "var(--primary-clr)",
                      fontWeight: "800",
                      paddingTop: "3px",
                    }}>
                    {currencyUsed}{" "}
                    {shouldDisableComponents ? quotationData.total : Number(calculateTotalAfterDiscounts(quotationTotalBeforeVat, [globalDiscountPercentageWatch, specialDiscountPercentageWatch]) * (1 + (shouldExemptVat ? 0 : VAT))).toFixed(2)}{" "}
                  </div>
                </div>
              </div>
            </div>
            {!shouldDisableComponents && (
              <div className={`${styles.createInvoiceButtonDiv}`}>
                <Button
                  title={action == QuotationAction.CREATE ? "Create Quotation" : "Edit Quotation"}
                  rounded={false}
                  fillBackground={true}
                  fontSize={14}
                  fontWeight={700}
                  value='invoice'
                />
              </div>
            )}
          </div>
          <div className={`${styles.extraInfoDetails} ${buttonState !== "information" && styles.hidden}`}>
            <div className={`${styles.table}`}>
              <div className={`${styles.tableColumns}`}>
                <div className={`${styles.salesTableTitleContainer}`}>
                  <div className={`${styles.tableTitles}`}>Sales</div>
                </div>
                <div className={`${styles.tableInputRow}`}>
                  <InputContainer
                    label='Sales Person'
                    inputPlaceholder='Search'
                    inputType='select'
                    inputName='salespersonId'
                    selectOptions={quotationData.salespeople}
                    control={control}
                    register={register}
                    isDisabled={shouldDisableComponents}
                  />
                </div>
                <div className={`${styles.tableInputRow}`}>
                  <InputContainer
                    label='Commission Method'
                    inputPlaceholder=''
                    inputType='select'
                    inputName='commissionMethodId'
                    selectOptions={quotationData.commissionMethods}
                    optionName={"title"}
                    control={control}
                    register={register}
                    initialValue={salespersonWatch?.commissionMethod}
                    setValue={setValue}
                    isDisabled={shouldDisableComponents || !permissions["edit salesperson commission method in quotation"]}
                  />
                </div>
                <div className={`${styles.tableInputRow}`}>
                  <InputContainer
                    label='Cashing Method'
                    inputPlaceholder=''
                    inputType='select'
                    inputName='cashingMethodId'
                    selectOptions={quotationData.cashingMethods}
                    optionName={"title"}
                    control={control}
                    register={register}
                    initialValue={salespersonWatch?.cashingMethod}
                    setValue={setValue}
                    isDisabled={shouldDisableComponents || !permissions["edit salesperson cashing method in quotation"]}
                  />
                </div>
              </div>
              <div className={`${styles.tableColumns}`}>
                <div className={`${styles.invoiceTableTitleContainer}`}>
                  <div className={`${styles.tableTitles}`}>Invoicing and Payments</div>
                </div>
                <div className={`${styles.tableInputRow}`}>
                  <InputContainer
                    label='Commission'
                    inputPlaceholder=''
                    inputType='text'
                    inputName='commissionRate'
                    control={control}
                    register={register}
                    initialValue={salespersonWatch?.commission}
                    setValue={setValue}
                    isDisabled={shouldDisableComponents || !permissions["edit salesperson commission in quotation"]}
                  />
                </div>
                <div className={`${styles.tableInputRow}`}>
                  <InputContainer
                    label='Total Commission'
                    inputPlaceholder=''
                    inputType='text'
                    inputName='commissionTotal'
                    control={control}
                    register={register}
                    setValue={setValue}
                    initialValue={calculateCommission(quotationTotalBeforeVat, commissionRateWatch)}
                    isDisabled={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default QuotationComponent;
