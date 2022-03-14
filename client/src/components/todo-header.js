import React, { Component } from "react";
import Stack from "@mui/material/Stack";
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { add } from "../actions/todo";
import ClearIcon from '@mui/icons-material/Clear';
import ButtonGroup from '@mui/material/ButtonGroup';
import Divider from '@mui/material/Divider';
import { connect } from "react-redux";
import CheckIcon from '@mui/icons-material/Check';
import AddTaskIcon from '@mui/icons-material/AddTask';
import Box from "@mui/material/Box";
import Modal from './modal';
import { Typography } from "@mui/material";

class TodoHeader extends Component {
    state = {
        title: '',
        description: '',
        toggleModal: false
    }

    handleText(e) {
        this.setState({
            title: e.target.value
        })
    }

    handleDescription(e) {
        this.setState({
            description: e.target.value
        })
    }

    handleModal() {
        this.setState(prevState => {
            return {
                toggleModal: !prevState.toggleModal
            };
        });
    }

    add() {
        this.props.add({
            title: this.state.title,
            description: this.state.description
        });
        this.handleModal();
    }

    render() {
        return (
            <>
                <Grid container alignItems="center">
                    <Button data-test="add-task" variant="contained" onClick={this.handleModal.bind(this)} startIcon={<AddTaskIcon/>}>
                        Add task
                    </Button>
                </Grid>
                <Modal data-test="modal-add" toggle={this.state.toggleModal} close={this.handleModal.bind(this)}>
                    <Grid container direction="column" justifyContent="center" alignItems="center" sx={{ mb: 0 }}>
                        <Stack spacing={2}>
                            <Typography variant="h6"> Add </Typography>
                            <Box pb={2}>
                                <Divider></Divider>
                            </Box>
                            <TextField
                                data-test="modal-add-title"
                                id="outlined-basic" label="Title" variant="outlined" color="primary"
                                focused onChange={this.handleText.bind(this)} required />
                            <TextareaAutosize
                                data-test="modal-add-description"
                                aria-label="empty textarea"
                                placeholder="Description"
                                style={{ width: 400, height: 100, resize: 'none' }}
                                onChange={this.handleDescription.bind(this)}
                            />
                            <Box py={2}>
                                <Divider></Divider>
                            </Box>
                            <ButtonGroup variant="contained" disableElevation sx={{ marginTop: '30px' }}>
                                <Grid container justifyContent="space-between">
                                    <Button variant="contained" startIcon={<CheckIcon />}
                                        onClick={this.add.bind(this)} sx={{ borderRadius: 0 }}
                                        data-test="modal-add-submit">
                                        Validate
                                    </Button>
                                    <Button variant="contained" startIcon={<ClearIcon />} color="error"
                                        onClick={this.handleModal.bind(this)} sx={{ borderRadius: 0 }}>
                                        Cancel
                                    </Button>
                                </Grid>
                            </ButtonGroup>
                        </Stack>
                    </Grid>
                </Modal>
            </>

        );
    }
}

export default connect(() => ({}), { add })(TodoHeader);