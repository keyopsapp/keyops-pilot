import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {DialogActions, DialogContent, DialogTitle} from 'material-ui/Dialog';
import Radio, {RadioGroup} from 'material-ui/Radio';
import {FormControlLabel} from 'material-ui/Form';
import {withStyles} from 'material-ui/styles';
import green from 'material-ui/colors/green';


const options = [
    {id: 0, name: 'Gastroenterologists'},
    {id: 1, name: 'REIs'},
    {id: 2, name: 'Admin'}
];

class ConfirmationDialog extends React.Component {
    state = {
        value: undefined,
    };

    componentWillMount() {
        this.setState({value: this.props.value});
    }

    componentWillUpdate(nextProps) {
        if (nextProps.value !== this.props.value) {
            // eslint-disable-next-line react/no-will-update-set-state
            this.setState({value: nextProps.value});
        }
    }

    radioGroup = null;

    handleEntering = () => {
        this.radioGroup.focus();
    };

    handleCancel = () => {
        this.props.onClose(this.props.value);
    };

    handleOk = () => {
        this.props.onOk(this.state.value);
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    render() {
        const {value, classes, ...other} = this.props;

        return (
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="xs"
                onEntering={this.handleEntering}
                aria-labelledby="confirmation-dialog-title"
                {...other}
            >
                <DialogTitle id="confirmation-dialog-title">Please choose a group</DialogTitle>
                <DialogContent>
                    <RadioGroup

                        ref={node => {
                            this.radioGroup = node;
                        }}
                        aria-label="group"
                        name="group"
                        value={this.state.value}
                        onChange={this.handleChange}
                    >
                        {options.map(option => (
                            <FormControlLabel
                                value={option.id.toString()} key={option.id} control={<Radio

                                classes={{
                                    checked: classes.checked,
                                }}


                            />} label={option.name}/>
                        ))}
                    </RadioGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCancel} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleOk} color="secondary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

ConfirmationDialog.propTypes = {
    onClose: PropTypes.func,
    onOk: PropTypes.func,
    value: PropTypes.string,
};

const styles = {
    checked: {
        color: green[500],
    }
}

export default withStyles(styles)(ConfirmationDialog);
