import React, { Component } from 'react'

export default class Login extends Component {

  constructor(props){
    super(props)
    this.state={
      email: "",
      password: ""
    };
    this.handelSubmit = this.handelSubmit.bind(this);
  }
  
  handelSubmit(e){
    e.preventDefault();
    const {email,password} = this.state;
    console.log(email,password);
    fetch("http://localhost:5000/register",
    {
      method:"POST",
      crossDomain: true,
      headers:{
        "content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*"
      },
      body: JSON.stringify({
        email,
        password,
      })
    })
    .then((res) => res.json())
    .then((data) =>{
      console.log(data, "userRegister");
      if(data.status == "ok"){
        alart("login successful");
        window.localStorage.setItem("token", data.data);
        window.location.href = "./userDetails";
      }
    });
  }

  render() {
    return (
      <form onSubmit={this.handelSubmit}>
        <h3>Sign In</h3>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={e=>this.setState({email:e.target.value})}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
          />
        </div>

        <div className="mb-3">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
      </form>
    )
  }
}
