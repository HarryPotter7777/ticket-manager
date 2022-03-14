import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid grey',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal(props) {
    const { children } = props;
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
        props.close();
    };
    const toggle = (value) => setOpen(value);
    React.useEffect(() => {
        toggle(props.toggle);
    }, [props.toggle]);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {children}
                </Box>
            </Modal>
        </div>
    );
}