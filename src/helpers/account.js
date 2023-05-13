
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import Pool from '../helpers/user-pool';


const authenticatePromise = async (Username, Password) =>

    await new Promise((resolve, reject) => {
66
      const user = new CognitoUser({ Username, Pool });
      const authDetails = new AuthenticationDetails({ Username, Password });

      user.authenticateUser(authDetails, {

        onSuccess: data => {
          console.log('onSuccess:', data);
          resolve(data);
        },

        onFailure: err => {                                                               
          console.error('onFailure:', err);
          reject(err);
        },

        newPasswordRequired: data => {
          console.log('newPasswordRequired:', data);
          resolve(data);
        }

      });

    });


export { authenticatePromise }