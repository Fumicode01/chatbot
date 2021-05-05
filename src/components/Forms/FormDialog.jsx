import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextInput from './TextInput'


export default class FormDialog extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          name: "",
          email: "",
          description: "",
        }
        this.inputName = this.inputName.bind(this)
        this.inputEmail = this.inputEmail.bind(this)
        this.inputDescription = this.inputDescription.bind(this)

    }

    inputName = (event) => {
      this.setState({
        name:event.target.value
      })
    }
    inputEmail = (event) => {
      this.setState({
        email:event.target.value
      })
    }
    inputDescription = (event) => {
      this.setState({
        description:event.target.value
      })
    }

    submitForm = ( ) => {
      const name = this.state.name
      const email = this.state.email
      const description = this.state.description

      const payload = {
        text: 'New Message Alert\n' +
                'Name:' + name + '\n' +
                'Email:' + email + '\n' +
                'Message Detail:\n' + description
      }

      const url = 'https://hooks.slack.com/services/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'

      fetch(url, {
        method: 'POST',
        body: JSON.stringify(payload)
      }).then(() => {
        alert('Complete Sending Message!')
        this.setState({
          name: "",
          email: "",
          description: "",
        })
        return this.props.handleClose()
      })
    }

    render() {
        return (
            <Dialog
            open={this.props.open}
            onClose={this.props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Contact Form</DialogTitle>
            <DialogContent>
              <TextInput 
                label={"Name"} multiline={false} rows={1}
                value={this.state.name} type={"text"} onChange={this.inputName}
              />
              <TextInput 
                label={"Email"} multiline={false} rows={1}
                value={this.state.email} type={"email"} onChange={this.inputEmail}
              /><TextInput 
              label={"Description"} multiline={true} rows={10}
              value={this.state.description} type={"text"} onChange={this.inputDescription}
            />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.submitForm} color="primary" autoFocus>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
        )
    }
}

