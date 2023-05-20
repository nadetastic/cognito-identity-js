// import * as AWS from 'aws-sdk/global';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';

const button = document.getElementById("button1");
const signOutButton = document.getElementById("signOutButton");
const getUsersDataButton = document.getElementById("getUsersDataButton");
const inputUsername = document.getElementById("username");
const inputPassword = document.getElementById("password");


button.addEventListener("click", () => signIn());
signOutButton.addEventListener("click", () => signOut());
getUsersDataButton.addEventListener("click", () => getUsersData());

const poolData = {
    UserPoolId: 'us-east-1_BSSIRZLKK',
    ClientId: '5u4ehivl2736goa3flftsdhh6h'
}

let authenticationData = {
    Username: inputUsername.value,
    Password: inputPassword.value,
};

var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

let userData = {
    Username: authenticationData.Username,
    Pool: userPool,
};

var cognitoUser;

const signIn = () => {

    authenticationData = {
        Username: inputUsername.value,
        Password: inputPassword.value,
    };

    // var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    userData = {
        Username: authenticationData.Username,
        Pool: userPool,
    };

    cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);

    console.log("Signing in");

    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function(result) {
            var accessToken = result.getAccessToken().getJwtToken();
            console.log(accessToken);
        },
        onFailure: function(err) {
            console.log(err.message || JSON.stringify(err));
        },
    });
}

const getUsersData = () => {
    console.log("Getting user data");
    cognitoUser.getUserData((err, data) => {
        if (err) {
            console.log(err.message || JSON.stringify(err));
            return;
        }
        console.log(JSON.stringify(data))
    });
}

const signOut = () => {
    console.log("Signing out");
    cognitoUser.signOut();
}