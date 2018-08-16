# Event Parser

## Using Node 8+

`npm install` in the root directory of this project

## Start the server

`node server.js` to start things

## Parse

Visit `http://localhost:3000` and click on the parse button. It will retrieve some feed data from the URL specified in `server.js`.

## Firebase

Duplicate the `.env.example` file and rename it to `.env`
Replace the values with the values found in the generated JSON file from Firebase
Notice the private key value has `\n` left in the string. This is necessary.


    FIREBASETYPE=service_account
    FIREBASEPROJECTID=nodeparse
    FIREBASEPRIVATEKEYID=2222222222
    FIREBASEPRIVATEKEY=-----BEGIN PRIVATE KEY-----\n\n-----END PRIVATE KEY-----\n",
    FIREBASECLIENTEMAIL=firebase-adminsdk-lihrn@nodeparse.iam.gserviceaccount.com
    FIREBASECLIENTID=2222232324335
    FIREBASEAUTHURI=https://accounts.google.com/o/oauth2/auth
    FIREBASETOKENURI=https://oauth2.googleapis.com/token
    FIREBASE509CERTPROVIDER=https://www.googleapis.com/oauth2/v1/certs
    FIREBASE509CERTURL=https://www.googleapis.com/robot/v1/metadata/x509/.........
    FIREBASEDATABASEURL=https://theapp.firebaseio.com
