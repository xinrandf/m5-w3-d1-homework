import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [login, setLogin] = useState(false);
  const [data, setData] = useState({});
  const [picture, setPicture] = useState("");

  const responseFacebook = (response) => {
    console.log(response);
    setData(response);
    setPicture(response.picture?.data?.url || "");

    if (response.accessToken) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  return (
    <div className="container">
      <Card>
        <Card.Header>
          <h1>My React App</h1>
        </Card.Header>

        <Card.Body>
          <Card.Text>
            {!login && (
              <React.Fragment>
                <h3>Please login using one of the following:</h3>

                {/* Login Form */}
                <LoginForm />

                {/* FB Login Button */}
                <FacebookLogin
                  appId="PUT_YOUR_OWN_APP_ID_HERE"
                  autoLoad={false}
                  fields="name,email,picture"
                  scope="public_profile,user_friends"
                  callback={responseFacebook}
                  icon="fa-facebook"
                />
              </React.Fragment>
            )}

            {login && <Home fbpic={picture} fbdata={data} />}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

function LoginForm() {
  return (
    <form className="border mt-3 mb-5 p-3 bg-white">
      <label className="m-2">Name:</label>
      <input type="text" name="name" placeholder="Your name" />

      <label className="m-2">Email:</label>
      <input type="email" name="email" placeholder="Your Email" />

      <input
        type="submit"
        value="Login"
        className="btn bg-success text-white my-3"
      />
    </form>
  );
}

function Home(props) {
  return (
    <div className="text-center">
      <img
        src={props.fbpic}
        alt="profile"
        className="img-fluid rounded-circle mb-3"
      />
      <h3>Welcome {props.fbdata.name}</h3>
      <p>{props.fbdata.email}</p>
    </div>
  );
}

export default App;