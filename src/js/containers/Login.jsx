import React, { useReducer, useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isEmpty } from "lodash";
import LoginLayout from "../components/layout/LoginLayout.jsx";
import Card from "../components/standard/Card.jsx";
import Input from "../components/standard/Input.jsx";
import Button from "../components/standard/Button.jsx";
import { getAndSaveUser } from "../../slices/currentUserSlice";
import { authenticatePromise } from "../../helpers/account";
import validateLoginForm from "../../validators/LoginForm";
import Logo from "../../images/icons/logo.jpeg";

const initialState = {
  isLoading: false,
  username: "",
  password: "",
  errors: null,
  authError: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "update-loading":
      return { ...state, isLoading: action.value };
    case "update-username":
      return { ...state, username: action.value };
    case "update-password":
      return { ...state, password: action.value };
    case "update-error":
      return { ...state, errors: action.value };
    case "auth-error":
      return { ...state, authError: action.value };
    default:
      throw new Error();
  }
}

const Login = (props) => {
  const { search } = useLocation();
  const reduxDispatch = useDispatch();
  const searchParams = new URLSearchParams(search);

  const [state, dispatch] = useReducer(reducer, initialState);
  const history = useHistory();

  // const { authenticate } = useContext(AccountContext)

  const handleLogin = (e) => {
    e.preventDefault();

    const errors = validateLoginForm(state);

    if (!isEmpty(errors)) {
      dispatch({ type: "update-error", value: errors });
      return;
    }

    dispatch({ type: "update-loading", value: true });
    authenticatePromise(state.username, state.password)
      .then((data) => {
        console.log("Logged in!", data);
        reduxDispatch(
          getAndSaveUser(data.idToken.payload, () => {
            history.push("/");
          })
        );
      })
      .catch((err) => {
        dispatch({ type: "auth-error", value: err.message });
        console.log(err);
        console.error("Failed to login!", err);
      })
      .finally(() => {
        dispatch({ type: "update-error", value: null });
        dispatch({ type: "update-loading", value: false });
      });
  };

  return (
    <LoginLayout>
      <div style={{ maxWidth: 500, minWidth: 300, width: "75%" }}>
        <Card>
          <div className="flex justify-center items-center">
            <img src={Logo} />
          </div>
          {searchParams.has("showLoginNotif") && (
            <div className="my-2">
              Your details are given for confirmation. Admin will confirm your
              id.
            </div>
          )}
          <form onSubmit={handleLogin}>
            <div className="mb-2">
              <Input
                error={state?.errors?.username}
                type="text"
                label="Email/Username"
                value={state.username}
                onChange={(e) =>
                  dispatch({ type: "update-username", value: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <Input
                error={state?.errors?.password}
                type="password"
                label="Password"
                value={state.password}
                onChange={(e) =>
                  dispatch({ type: "update-password", value: e.target.value })
                }
              />
            </div>
            {state.authError && (
              <div className="my-2 text-red">{state.authError}</div>
            )}
            <div className="mt-6">
              <Button
                disabled={state.isLoading}
                type="submit"
                label={state.isLoading ? "Loading ... " : "Login"}
              />
            </div>
          </form>
          <hr className="my-4" />
          <div className="">
            <div className="text-center">Don't have an account?</div>
            <Link
              to="/signup"
              className="mt-1 text-center block p-2 font-medium w-full border border-primary text-primary"
              label="Create a new account"
            >
              Create new account
            </Link>
          </div>
        </Card>
      </div>
    </LoginLayout>
  );
};

export default Login;
