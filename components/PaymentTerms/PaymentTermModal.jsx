import React, { useState } from 'react';
import { Modal, Box, Button, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TermModal = ({ open, handleClose, handleSave, term }) => {
  const [termName, setTermName] = useState(term?.title || '');

  const onSave = () => {
    handleSave(termName, term?.id);
    setTermName(''); 
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
        setTermName(''); 
      }}
      aria-labelledby="term-modal-title"
      aria-describedby="term-modal-description"
    >
      <Box sx={modalStyle}>
        <h2 id="term-modal-title">{term ? 'Edit Term' : 'Add Term'}</h2>
        <TextField
          fullWidth
          label="Term Name"
          value={termName}
          onChange={(e) => setTermName(e.target.value)}
          margin="normal"
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button variant="outlined" onClick={handleClose} startIcon={<CancelIcon />} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={onSave} startIcon={<SaveIcon />}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default TermModal;
