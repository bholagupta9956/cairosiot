import React, { useReducer } from "react"
import { useHistory, Link } from "react-router-dom"
import { CognitoUserAttribute } from 'amazon-cognito-identity-js'
import { isEmpty } from 'lodash'

import LoginLayout from '../components/layout/LoginLayout.jsx'

import Card from '../components/standard/Card.jsx'

import Input from '../components/standard/Input.jsx'
import Button from '../components/standard/Button.jsx'

import UserPool from '../../helpers/user-pool'

import validateSignupForm from '../../validators/SignupForm'

import Logo from '../../images/icons/logo.jpeg'

const initialState = {
    username: null,
    password: null,
    confirmPassword: null,
    name: null,
    errors: null,
    authError: null
}

function reducer(state, action) {
  switch (action.type) {
    case 'update-username':
        return { ...state, username: action.value };
    case 'update-password':
        return { ...state, password: action.value };
    case 'update-name':
        return { ...state, name: action.value };
    case 'update-password-confirm':
        return { ...state, confirmPassword: action.value };
    case 'update-error':
        return { ...state, errors: action.value };
    case 'auth-error':
        return { ...state, authError: action.value };
    default:
      throw new Error();
  }
}

const Signup = props => {
    
    const [state, dispatch] = useReducer(reducer, initialState);
    const history = useHistory();

    const handleSignup = e => {
        e.preventDefault();

        // if ( state.password != state.confirmPassword) {
        //     alert("Passwords does not match")
        //     return
        // }

        const errors = validateSignupForm(state)

        if (!isEmpty(errors)) {
            dispatch({ type: 'update-error', value: errors })
            return;
        }

        const attributeList = [
            new CognitoUserAttribute({
                Name: 'name',
                Value: state.name
            })
        ]

        UserPool.signUp(state.username, state.password, attributeList, null, (err, data) => {
            if (err) {
                console.error(err)
                dispatch({ type: 'auth-error', value: err.message })
                return
            }
            history.push('/login/?showLoginNotif=1');
          })
    };

    return (
        <LoginLayout>
            <div style={{ maxWidth: 500, minWidth: 300, width: '75%' }}>
                <Card>
                    <div className="flex justify-center items-center">
                        <img src={Logo} />
                    </div>
                    <form onSubmit={handleSignup}>
                        <div className="mb-2">
                            <Input
                                error={state?.errors?.name}
                                type="text"
                                label="Name"
                                value={state.name}
                                onChange={e => dispatch({ type: 'update-name', value: e.target.value })}
                            />
                        </div>
                        <div className="mb-2">
                            <Input
                                error={state?.errors?.username}
                                type="email"
                                label="Email"
                                value={state.username}
                                onChange={e => dispatch({ type: 'update-username', value: e.target.value })}
                            />
                        </div>
                        <div className="mb-2">
                            <Input
                                error={state?.errors?.password}
                                type="password"
                                label="New Password"
                                value={state.password}
                                onChange={e => dispatch({ type: 'update-password', value: e.target.value })}
                            />
                        </div>
                        <div className="mb-2">
                            <Input
                                error={state?.errors?.confirmPassword}
                                type="password"
                                label="Confirm Password"
                                value={state.confirmPassword}
                                onChange={e => dispatch({ type: 'update-password-confirm', value: e.target.value })}
                            />
                        </div>
                        {
                            state.authError &&
                            <div className="my-2 text-red">{state.authError}</div>
                        }
                        <div className="mt-6">
                            <Button type="submit" label="Sign Up" />
                        </div>
                    </form>
                    <hr className="my-4" />
                    <div className="">
                        <div className="text-center">Already have an account?</div>
                        <Link to="/login" className="mt-1 text-center block p-2 font-medium w-full border border-primary text-primary" label="Create a new account" >
                            Login to existing account
                        </Link>
                    </div>
                </Card>
            </div>
        </LoginLayout>
    );
}

export default Signup;