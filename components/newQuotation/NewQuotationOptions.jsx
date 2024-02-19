import React, { useState, useEffect } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Box, Stack } from '@mui/material';

const NewQuotationOptions = ({
  onValidityChange,
  onPaymentTermChange,
  onPricelistChange,
  onCurrencyChange,
  onExemptVatChange,
  quotationData,
  shouldDisableComponents
}) => {

  const [validityNumber, setValidityNumber] = useState('');
  const [validityPeriod, setValidityPeriod] = useState('days');
  const [paymentTerm, setPaymentTerm] = useState(quotationData.paymentTerms[0]?.title || '');
  const [pricelist, setPricelist] = useState(quotationData.pricelists[0]?.title || '');
  const [currency, setCurrency] = useState(quotationData.currencies[0]?.title || '');
  const [exemptVat, setExemptVat] = useState(false);

  useEffect(() => {
    const validity = `${validityNumber} ${validityPeriod}`;
    onValidityChange(validity);
  }, [validityNumber, validityPeriod, onValidityChange]);

  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
        <TextField
          label="Validity Number"
          type="number"
          value={validityNumber}
          onChange={(e) => setValidityNumber(e.target.value)}
          disabled={shouldDisableComponents}
          size="small"
          sx={{ width: '150px' }}
        />
        <FormControl size="small" sx={{ width: '150px' }}>
          <InputLabel>Period</InputLabel>
          <Select
            value={validityPeriod}
            label="Period"
            onChange={(e) => {
              setValidityPeriod(e.target.value)
              }
            }
            disabled={shouldDisableComponents}
          >
            <MenuItem value="days">Days</MenuItem>
            <MenuItem value="months">Months</MenuItem>
            <MenuItem value="years">Years</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <FormControl fullWidth margin="normal">
        <InputLabel>Payment Terms</InputLabel>
        <Select
          value={paymentTerm}
          label="Payment Terms"
          onChange={(e) => {
            setPaymentTerm(e.target.value);
            onPaymentTermChange(e.target.value);
          }}
          disabled={shouldDisableComponents}
        >
          {quotationData.paymentTerms.map((term) => (
            <MenuItem key={term.value} value={term.value}>
              {term.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Pricelist</InputLabel>
        <Select
          value={pricelist}
          label="Pricelist"
          onChange={(e) => {
            setPricelist(e.target.value);
            onPricelistChange(e.target.value);
          }}
          disabled={shouldDisableComponents}
        >
          {quotationData.pricelists.map((list) => (
            <MenuItem key={list.value} value={list.value}>
              {list.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Currency</InputLabel>
        <Select
          value={currency}
          label="Currency"
          onChange={(e) => {
            ("currency changed", e)
            setCurrency(e.target.value);
            onCurrencyChange(e.target.value);
          }}
          disabled={shouldDisableComponents}
        >
          {quotationData.currencies.map((currency) => (
            <MenuItem key={currency.value} value={currency.value}>
              {currency.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControlLabel
        control={
          <Checkbox
            checked={exemptVat}
            onChange={(e) => {
              setExemptVat(e.target.checked);
              onExemptVatChange(e.target.checked);
            }}
            disabled={shouldDisableComponents}
          />
        }
        label="Exempt VAT"
      />
    </Box>
  );
};

export default NewQuotationOptions;
