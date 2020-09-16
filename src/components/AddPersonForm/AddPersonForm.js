import React, { Component } from "react";

class AddPersonForm extends Component {
  constructor() {
    super();
    this.formSubmit = this.formSubmit.bind(this);
  }

  state = {
      isHide: true,
  }

  formSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const id = form.elements["id"].value;
    const firstName = form.elements["firstName"].value;
    const lastName = form.elements["lastName"].value;
    const email = form.elements["email"].value;
    const phone = form.elements["phone"].value;
    this.props.addPerson(id, firstName, lastName, email, phone);
    form.reset();
  }

  toggleHide = () => {
      this.setState({
          isHide: !this.state.isHide
      })
  }


  render() {

    if (this.state.isHide) {
        return (
            <button type="button" className="btn btn-info mt-5 mb-1" onClick={this.toggleHide}>добавить</button>
        )
    }

    return (
        <form className="mt-5 p-3 border bg-light" onSubmit={this.formSubmit}>
            <div className="form-row">
                <div className="col text-center">
                    <label>id</label>
                    <input id='id' type="text" defaultValue="" className="form-control" required/>
                </div>
                <div className="col text-center">
                    <label>firstName</label>
                    <input id='firstName' type="text" defaultValue="" className="form-control" required/>
                </div>
                <div className="col text-center">
                    <label>lastName</label>
                    <input id='lastName' type="text" defaultValue="" className="form-control" required/>
                </div>
                <div className="col text-center">
                    <label>email</label>
                    <input id='email' type="text" defaultValue="" className="form-control" required/>
                </div>
                <div className="col text-center">
                    <label>phone</label>
                    <input id='phone' type="text" defaultValue="" className="form-control" required/>
                </div>
            </div>
            <button type="submit" value="submit" className="btn btn-primary my-3">Добавить в таблицу</button>
        </form>
    )
  }
}

export default AddPersonForm;