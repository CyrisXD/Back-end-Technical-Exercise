# Back-end Technical

## Description

This API provides several functions that interact with a user database using Firestore. It has a live url and local installation available, provided you have the correct enviroment variables.

## Live URL

```bash
https://seahorse-app-mmnsa.ondigitalocean.app
```

## Local Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/CyrisXD/Back-end-Technical-Exercise.git
```

2. Install the dependencies

```bash
npm install
```

3. Create your .env file and set up with enviroment variables

```text
Place .env in root folder
Example:

PROJECT_ID=""
PRIVATE_KEY_ID=""
PRIVATE_KEY='""'
CLIENT_EMAIL=""
CLIENT_ID=""
CLIENT_X509_CERT_URL=""
```

4. Run the project

```bash
npm run dev
```

## Usage

This API contains two endpoints for retrieving and submitting users to the database.

#### Retrieve all users for testing

```bash
Method: GET
Path: /
```

#### Retrieve user/s based on surname

###### CURL

```bash
curl -X GET \
  -H "Content-Type: application/json" \
  -d '{"SURNAME": "example"}' \
  https://seahorse-app-mmnsa.ondigitalocean.app/users
```

###### HTTPS

```bash
Method: GET
Path: /users
```

```bash
body payload
{
    "SURNAME": "example"
}
```

#### Submit user to the database

###### CURL

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"FIRST_NAME": "example", "SURNAME": "example", "EMAIL_ADDRESS": "example@example.com"}' \
  https://seahorse-app-mmnsa.ondigitalocean.app/addusers
```

###### HTTPS

```bash
Method: POST
Path: /addusers
```

```bash
body payload
{
    "FIRST_NAME": "example",
    "SURNAME": "example",
    "EMAIL_ADDRESS": "example@example.com"
}
```

## Test

Perform the integration test by running the test command:

```bash
npm run test
```
