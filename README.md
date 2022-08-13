<h1 align="center">Node.JS ADS System</h1>

## Description:

The goal of the association is to add paid ADS with specific duration and location in the application (`popup` or `above-footer` or `under-services`) and the type of target device (`mobile` or `desktop` or `both`) for this ADS through the website's owner, where users can see ADS after they login and activate their account via email.


## To run this project

`Step 1` : To use this project must install [Node.js](https://nodejs.org/en/) and [pgadmin](https://www.pgadmin.org/download/) Then Download the source code

```
git clone https://github.com/MohamedAlabasy/Node.JS-ADS-System.git
```

`Step 2` : Enter the project file then install package

```
npm i
```
`Step 3` : Open pgadmin then create a database called `ads_system` , then to run migrations :
```
db-migrate up
```


<h3 align="center">To help you understand the project</h3>

## Folder Structure

```bash
├── src
│   ├── controllers
│   │   ├── adsController.ts => `for handel ADS function`
│   │   └── authController.ts => `for handel authentication function`
│   │
│   │
│   ├── middleware
│   │   ├── morganMiddleware.ts => `for log url, method and statue of requests`
│   │   │── notFoundMiddleware.ts => `for not Found Middleware`
│   │   └── errorMiddleware.ts => `for error Middleware`
│   │
│   │
│   ├── models
│   │   ├── emailVerificationModels.ts => `for handel email verification Models`
│   │   │── resetPasswordModels.ts => `for handel reset password Models`
│   │   │── adsModels.ts => `for handel ADS Models`
│   │   └── userModels.ts => `for handel user Models`
│   │
│   │
│   ├── Public
│   │   └── assets => `contains ADS (photos and videos)`
│   │
│   │
│   ├── routes
│   │   ├── api
│   │   │   │── authRouter.ts => `for handel authentication route`
│   │   │   └── adsRouter.ts => `for handel ADS route`
│   │   └── routes.ts => `import all routes and exports it to index`
│   │
│   │
│   ├── tests => `for testing purposes`
│   │   ├── helpers
│   │   │   └── reporter.ts
│   │   └── indexSpec.ts => `for testing endpoint api`
│   │
│   │
│   ├── utilities
│   │   ├── helpers
│   │   │   │── emailVerification.ts => `for send email message`
│   │   │   └── emailMessagesDesign.ts => `for email messages design ( HTML & CSS )`
│   │   │── checkTokens.ts => `for Request check Tokens`
│   │   └── validateRequest.ts => `for validate Request`
│   │
│   │
│   └── index.ts => `to run the server`
└──
```

## DataBase ERD

<p align="center">
   <img src="https://user-images.githubusercontent.com/93389016/184259712-ee831772-eef4-4779-86e4-0306a012b717.jpg" alt="Build Status">
</p>

`Step 4` : To run project

```
node run start
```


`Step 5` : Open [postman](https://www.postman.com/downloads/) and import : [API Collation](https://github.com/MohamedAlabasy/Node.JS-ADS-System/blob/main/api_collection.json) You will find it in the project file.

### After completing the registration as a new user, you must go to your email to confirm the email through the code sent to you

<p align="center">
   <img src="https://user-images.githubusercontent.com/93389016/184300010-1d0845d3-eeaa-4bc8-bbce-21d03d5f1f63.png" alt="Build Status">
   <img src="https://user-images.githubusercontent.com/93389016/184300267-377f6790-0d91-4c09-b8e6-f1a6a4c0d818.png" alt="Build Status">
</p>

<hr>
To run eslint to check error

```
npm run lint
```

To run eslint and auto fixed error

```
npm run lint:f
```

To compile the TS code

```
npm run build
```

To run the JS code

```
node dist/index.js
```

<hr>

Here are the [Command](https://github.com/MohamedAlabasy/Node.JS-ADS-System/blob/main/command.txt) that were used in the project, You will find it in the project file.
