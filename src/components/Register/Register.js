import React from "react";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    };
  }
  onEmailChange = event => {
    this.setState({ email: event.target.value });
  };
  onNameChange = event => {
    this.setState({ name: event.target.value });
  };
  onPasswordChange = event => {
    this.setState({ password: event.target.value });
  };
  onSignUp = () => {
    let email = this.state.email,
      name = this.state.name,
      password = this.state.password,
      selfI = this.props;
    async function logFetch(url) {
      try {
        const response = await fetch(url, {
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            password: password,
            name: name
          })
        });
        let res = await response.json();
        if (res.id) {
          selfI.loadUser(res);
          selfI.onRouteChange("home");
        } else {
          console.log(res);
        }
      } catch (err) {
        console.log("fetch failed", err);
      }
    }

    logFetch("https://warm-coast-03445.herokuapp.com/register");
  };

  render() {
    return (
      <div style={{ marginTop: 200 }}>
        <article className="br2  ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center ">
          <main className="pa4 black-80">
            <form className="measure center">
              <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f4 fw6 ph0 mh0">Register</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">
                    Name
                  </label>
                  <input
                    className="pa2 input-reset ba bg-transparent  hover-white w-100"
                    type="text"
                    onChange={this.onNameChange}
                  />
                </div>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="email-address">
                    Email
                  </label>
                  <input
                    className="pa2 input-reset ba bg-transparent  hover-white w-100"
                    type="email"
                    name="email-address"
                    id="email-address"
                    onChange={this.onEmailChange}
                  />
                </div>
                <div className="mv3">
                  <label className="db fw6 lh-copy f6" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="b pa2 input-reset ba bg-transparent  hover-white w-100"
                    type="password"
                    name="password"
                    id="password"
                    onChange={this.onPasswordChange}
                  />
                </div>
                <label className="pa0 ma0 lh-copy f6 pointer">
                  <input type="checkbox" /> Remember me
                </label>
              </fieldset>
              <div className="">
                <input
                  onClick={() => this.onSignUp()}
                  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                  type="button"
                  value="Sign up"
                />
              </div>
              <div className="lh-copy mt3">
                <a
                  href="#0"
                  onClick={() => this.props.onRouteChange("signin")}
                  className="f6 link dim black db"
                >
                  Sign in
                </a>
                <a href="#0" className="f6 link dim black db">
                  Forgot your password?
                </a>
              </div>
            </form>
          </main>
        </article>
      </div>
    );
  }
}

export default Register;
