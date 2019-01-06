import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControlLabel, FormGroup } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';
import green from 'material-ui/colors/green';
import { Checkbox } from 'material-ui';


const options = [
    { id: 0, name: 'Gastroenterologists' },
    { id: 1, name: 'REIs' }
];

class ConfirmationDialog extends React.Component {
    state = {
    };

    // componentWillMount() {
    //     this.setState({ value: this.props.value });
    // }

    // componentWillUpdate(nextProps) {
    //     if (nextProps.value !== this.props.value) {
    //         this.setState({ value: nextProps.value });
    //     }
    // }


    // handleEntering = () => {
    //     this.radioGroup.focus();
    // };

    handleCancel = () => {
        this.setState({});
        this.props.onClose();
    };

    handleOk = () => {
        const selectedGroups =
            Object.entries(this.state)
                .reduce((groups, entry) => {
                    if (entry[1])
                        groups.push(entry[0]);
                    return groups;
                }, []);

        console.log(selectedGroups);
        // this.props.onOk(selectedGroups);
    };

    handleChange = id => event => {
        this.setState({ [id]: event.target.checked });
    };

    render() {
        const { value, classes, ...other } = this.props;

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
                    <FormGroup
                        aria-label="group"
                        name="group">
                        {options.map(option => (
                            <FormControlLabel
                                value={option.id.toString()}
                                key={option.id}
                                label={option.name}
                                color="accent"
                                control={<Checkbox
                                    className="checkbox-style"
                                    onChange={this.handleChange(option.id)} />} />
                        ))}
                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleCancel} color="contrast">
                        Cancel
                    </Button>
                    <Button onClick={this.handleOk} color="contrast">
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
    checkbox: {
        default: green[600],
        checked: green[500]
    }
}

export default withStyles(styles)(ConfirmationDialog);
