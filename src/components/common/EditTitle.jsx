import React from 'react';
import ReactDOM from 'react-dom';
import {Icon, IconButton, TextField, withStyles} from "material-ui";


const styles = {
    root: {display: 'inline-block'}
};

class EditTitle extends React.Component {

    state = {isEdit: false, value: null, originValue: null};

    getVal = () => {

        if (this.state.value || this.state.value === '') {
            return this.state.value;
        }
        else if (this.state.value === null) {
            return this.props.value;
        }

        return null;
    }

    componentWillMount() {

        this.setState({originValue: this.props.value});
        document.addEventListener('mousedown', this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false);

    }

    handleClick = (e) => {
        if (this.node.contains(e.target)) {
            return;
        }

        this.handleClickOutside();
    }

    handleClickOutside() {
        // console.log('click outside');

        if (this.state.oldValue !== this.state.value) {
            this.setState({isEdit: false, oldValue: this.getVal(), value: this.getVal()});
            this.props.onChange(this.state.value);
        }

    }

    handleClickButton = () => {
        // console.log('click btn');
        if (this.state.isEdit) {
            this.setState({isEdit: false});
            this.setState({originValue: this.state.value});

            this.props.onChange(this.state.value);
        }
        else {
            this.input.focus();
        }
    }


    render() {

        const {classes} = this.props;

        let icon;

        if (this.state.isEdit) {
            icon = 'check';
        }
        else {
            icon = 'edit';
        }

        return (
            <div className={classes.root} ref={node => this.node = node}>

                <TextField
                    inputRef={(input) => {
                        this.input = input;
                    }}
                    name="text"
                    value={this.getVal()}
                    onChange={(e) => this.setState({oldValue: this.state.value, value: e.target.value})}
                    onFocus={(e) => this.setState({oldValue: this.state.value, isEdit: true})}
                />

                <IconButton onClick={this.handleClickButton}>
                    <Icon name="button">{icon}</Icon>
                </IconButton>
            </div>
        )

    }


}

export default withStyles(styles)(EditTitle);
