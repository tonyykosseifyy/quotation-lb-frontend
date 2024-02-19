import React, { useState, useEffect } from 'react';
import { Modal, Box, Button, Table, TableBody, TableCell, TableContainer, TableRow, TableHead, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import paymentMethodService from '@/services/paymentMethodServices';
import authServices from '@/services/authServices';
import TermModal from '@/components/PaymentTerms/PaymentTermModal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  height: '50%',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  borderRadius: '16px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const PaymentTermsModal = ({ setIsModalOpen }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [terms, setTerms] = useState([]);
  const [companyId, setCompanyId] = useState(null);
  const [termModalOpen, setTermModalOpen] = useState(false);
  const [currentTerm, setCurrentTerm] = useState(null);

  const handleClose = () => setIsModalOpen(false);

  const handleAddTerm = () => {
    setCurrentTerm(null);
    setTermModalOpen(true);
  };

  const handleEditTerm = (term) => {
    setCurrentTerm(term);
    setTermModalOpen(true);
  };

  const handleDeleteTerm = async (term) => {
    setLoading(true);
    try {
      await paymentMethodService.deletePaymentMethod(term.id);
      const updatedTerms = await paymentMethodService.getAllPaymentMethods();
      setTerms(updatedTerms.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleSaveTerm = async (name, id) => {
    setLoading(true);
    try {
      if (id) {
        await paymentMethodService.updatePaymentMethod(currentTerm.id, { title: name, company_id: companyId});
      } else {
        await paymentMethodService.createPaymentMethod({ title: name, company_id: companyId });
      }
      setTermModalOpen(false);
      const updatedTerms = await paymentMethodService.getAllPaymentMethods();
      setTerms(updatedTerms.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTerms = async () => {
      setLoading(true);
      try {
        const paymentMethods = await paymentMethodService.getAllPaymentMethods();
        const currentUser = await authServices.getMe();
        setTerms(paymentMethods.data); 
        setCompanyId(currentUser.data.company_id);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  console.log(terms)
  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="payment-terms-modal-title"
      aria-describedby="payment-terms-modal-description"
    >
        
      <Box sx={style}>
        <TermModal
            open={termModalOpen}
            handleClose={() => setTermModalOpen(false)}
            handleSave={handleSaveTerm}
            term={currentTerm}
        />

        <h2 id="payment-terms-modal-title">Payment Terms</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
            <>
                <Button onClick={handleClose}>Close</Button>
                <p>Error: {error}</p>
            </>
        ) : (
          <>
            <TableContainer component={Paper} sx={{ marginBottom: 'auto', maxHeight: '60%' }}>
              <Table stickyHeader aria-label="terms table">
                <TableHead>
                  <TableRow>
                    <TableCell>Term</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {terms.map((term, index) => (
                    <TableRow key={index}>
                      <TableCell>{term.title}</TableCell>
                      <TableCell align="right">
                        <IconButton aria-label="edit" color="primary" onClick={() => handleEditTerm(term)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" color="secondary" onClick={() => handleDeleteTerm(term)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Button startIcon={<AddIcon />} onClick={handleAddTerm} sx={{ alignSelf: 'flex-start' }}> {/* Placeholder for addTerm functionality */}
              Add Term
            </Button>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="outlined" onClick={handleClose} startIcon={<CancelIcon />} sx={{ mr: 1 }}>
                Discard
              </Button>
              <Button variant="contained" onClick={handleClose} startIcon={<SaveIcon />}>
                Save
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default PaymentTermsModal;
