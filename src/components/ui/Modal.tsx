import React from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions';
import imageError from '../../images/error.png'

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export const Modal = ({openModal, setOpenModal}) => {

    const handleClickOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

      
    return (
        <Dialog
            open={openModal}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle 
                sx={{textAlign: 'center', fontWeight: 700, fontSize: '1.8rem'}}
            >
                {"¡Documento no registrado!"}
            </DialogTitle>
            <DialogContent>
                <div className='container-image-error'>
                    <img 
                        src={imageError} 
                        alt="Image error" 
                        className='image-error' 
                    />
                </div>
                <DialogContentText 
                    id="alert-dialog-slide-description"
                    sx={{mt: 3}}
                >
                    Esta persona no se encuentra registrada en nuestra aplicación, por favor ingrese los datos.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            <button 
                onClick={handleClose}
                className='btn-close'
            >
                Aceptar
            </button>
            </DialogActions>
        </Dialog>
    )
}
