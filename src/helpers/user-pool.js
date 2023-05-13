import { CognitoUserPool } from 'amazon-cognito-identity-js'
import config from '../../config';


const poolData = {
  UserPoolId: config.AWS_COGNITO_USER_POOL_ID,
  ClientId: config.AWS_COGNITO_CLIENT_ID
};

export default new CognitoUserPool(poolData)
