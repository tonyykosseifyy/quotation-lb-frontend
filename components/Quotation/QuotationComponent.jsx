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
import Sortable from "sortablejs";
import { VAT, VAT_LEB_RATE } from "@/data/constants";

const QuotationComponent = ({ action, onSubmit = () => {}, title, quotationData, permissions = [], resetForm, setResetForm = () => {} }) => {
  const [buttonState, setButtonState] = useState("order");
  const [indices, setIndices] = useState({ oldIndex: null, newIndex: null });
  const [quotationTotalBeforeVat, setQuotationTotalBeforeVat] = useState(0);
  const [activeStep, setActiveStep] = useState(1);

  const shouldDisableComponents = action === "view";

  const actionButtons = [
    {
      title: "Preview",
      value: "preview",
    },
    {
      title: "Send By Email",
      value: "send by email",
      onClick: () => setActiveStep(2),
    },
    {
      title: "Confirm",
      value: "confirm",
      onClick: () => setActiveStep(3),
    },
    {
      title: "Cancel",
      value: "cancel",
      onClick: () => setActiveStep(1),
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
  } = useForm({
    defaultValues: {
      manualReference: quotationData.reference,
      clientId: quotationData.client,
      validity: quotationData.validity,
      paymentTerm: quotationData.paymentTerm,
      priceList: quotationData.pricelist,
      currency: quotationData.currency,
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
    },
  });

  console.log(quotationData);

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

  const handleTabChange = (e) => {
    setButtonState(() => e.target.value);
  };

  const handleSubmitSuccess = () => {
    remove();
    reset();
  };

  useEffect(() => {
    if (quotationData && !shouldDisableComponents) {
      setValue("paymentTerm", quotationData.paymentTerms[0]);
      setValue("priceList", quotationData.pricelists[0]);
      setValue("currency", quotationData.currencies[0]);
    }
  }, [quotationData, setValue]);

  useEffect(() => {
    if (quotationData && action !== "create") {
      reset({
        orderLines: [...quotationData.orderLines],
      });
    }
  }, []);

  useEffect(() => {
    var el = document.getElementById("itemRows");
    if (el) {
      Sortable.create(el, {
        ghostClass: `${styles.sortableGhostBlue}`,
        onUpdate: function (evt) {
          setIndices({ oldIndex: evt.oldIndex, newIndex: evt.newIndex });
        },
      });
    }
  }, [fields]);

  useEffect(() => {
    if (resetForm) {
      handleSubmitSuccess();
      setResetForm(false);
    }
  }, [resetForm]);

  return (
    <div className={`container m-0`}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div
            className={styles.title}
            style={{ color: "var(--primary-clr)" }}>
            {title}
          </div>
        </div>
        <div className='d-flex flex-column flex-lg-row mt-2 justify-content-md-between gap-3'>
          <div className='d-flex gap-2'>
            {actionButtons.map(({ title, value, onClick }) => (
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
                titleColor='var(--primary-text-clr)'
                isDisabled={shouldDisableComponents}
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
              <div className={`${styles.quotationNumber}`}> # {quotationData.quotationNumber} </div>
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
              inputType='select'
              inputName='clientId'
              selectOptions={quotationData.clients}
              control={control}
              register={register}
              width='65'
              widthUnit='%'
              isDisabled={shouldDisableComponents}
            />
            <div className={`d-flex flex-column flex-md-row align-items-md-start ${styles.contactDetailsGap}`}>
              <div className={`${styles.labelText}`}> Contact Details</div>
              <div
                className='d-flex flex-column'
                style={{ gap: "5px" }}>
                <div> {clientIdWatch ? `${clientIdWatch.street ?? ""} ${clientIdWatch.street && clientIdWatch.floor_and_building ? "," : ""} ${clientIdWatch.floor_and_building ?? ""} ` : "Street, Building, Floor"}</div>
                <div> {clientIdWatch ? ` ${clientIdWatch.phone_code ?? ""} ${clientIdWatch.phone_number ?? ""}` : "Phone Number"}</div>
                <div>
                  {" "}
                  VAT# <b>{clientIdWatch && clientIdWatch.tax_id && ` : ${clientIdWatch.tax_id}`}</b>
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
              isDisabled={shouldDisableComponents}
            />
            <InputContainer
              label='Pricelist'
              inputPlaceholder=''
              inputType='select'
              inputName='priceList'
              selectOptions={quotationData.pricelists}
              optionName='title'
              control={control}
              register={register}
              isDisabled={shouldDisableComponents}
            />
            <InputContainer
              label='Currency'
              inputPlaceholder='USD'
              inputType='select'
              inputName='currency'
              selectOptions={quotationData.currencies}
              control={control}
              register={register}
              isDisabled={shouldDisableComponents}
            />
          </div>
        </div>
        <div className={`d-flex mt-3`}>
          <Button
            title='Order lines'
            fillBackground={buttonState === "order"}
            onClick={handleTabChange}
            value='order'
            type='button'
            width='180px'
            tab
          />
          <Button
            title='Other Information'
            fillBackground={buttonState === "information"}
            onClick={handleTabChange}
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
              tableWidth={"1296px"}
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
                    width='1230'
                    height='73'
                    control={control}
                    register={register}
                    isDisabled={shouldDisableComponents}
                  />
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
                    defaultValue={action === "create" ? null : quotationData.totalBeforeVat}
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
                      inputPlaceholder='USD 0.00'
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
                      inputPlaceholder='USD 0.00'
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
                <div className={styles.totalInputs}>
                  <div style={{ paddingTop: "2px" }}> VAT {VAT * 100}%</div>
                  <div className='d-flex flex-row gap-2'>
                    <Input
                      inputPlaceholder='LBP 123,567'
                      inputType='text'
                      inputName='vatLebanese'
                      defaultValue={action === "create" ? null : quotationData.vatLebanese}
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
                      defaultValue={action === "create" ? null : quotationData.vat}
                      width={130}
                      control={control}
                      register={register}
                      isDisabled={true}
                      setValue={setValue}
                      initialValue={Number(addVat(calculateTotalAfterDiscounts(quotationTotalBeforeVat, [globalDiscountPercentageWatch, specialDiscountPercentageWatch]), [VAT * 100])).toFixed(2)}
                    />
                  </div>
                </div>
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
                    {"USD "}
                    {shouldDisableComponents ? quotationData.total : Number(calculateTotalAfterDiscounts(quotationTotalBeforeVat, [globalDiscountPercentageWatch, specialDiscountPercentageWatch]) * (1 + VAT)).toFixed(2)}{" "}
                  </div>
                </div>
              </div>
            </div>
            {!shouldDisableComponents && (
              <div className={`${styles.createInvoiceButtonDiv}`}>
                <Button
                  title='Create Invoice'
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
