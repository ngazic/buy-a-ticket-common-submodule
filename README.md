# Common code shared between services

There might be differences in our TS settings between the common lib and other services. or services might not be written with TS at all. **WE DON'T WANT TO DEAL WITH THAT**.

That's why our common library will be written as TS and published as Java Script. 

## Creating organization public npm package **ngazicticketingapp/common** for common code reuse

1. Package initialization and creation
```
npm init -y # initialize new npm repo, package name must start with @yourorganization/packagename
git init 
git add .
git commit -m "initial commit" 
npm login # insert your npm credentials
npm publish --access public
```

2. Create TS config file:

```
npm install typescript del-cli --save-dev
tsc --init
```

3. In tsconfig.json file, enable generating .d.ts and .js files separately (source js code and TS types for it):

```
"compilerOptions": {
...
"declaration": true # set this to true, 
"outDir": "./build",    # specify the build directory 
```

4. Command for updating package version:
   
   ```
   npm version patch
   ```

5. Take a detail look into .gitignore and package.json config file
   
## Updating package

Run:

```
npm run pub # adds new code to git, increase package version, builds the new version and publishes it to NPM
```

## Routes

### /api/users/signup

method: POST
body: {email:string, password:string}
purpose: Sign up for account

### /api/users/signin

method: POST
body: {email:string, password:string}
purpose: Sign in to an existing account
validations: npm express-validator package


### /api/users/sigout

method: POST
body: {}
purpose: Sign out

### /api/users/current-user

method: GET
body: -
purpose: Return info about the user
## description

### Sign up 

- Does the user with the email already exists? If yes, respond with error.
- Hash the password the user entered. Can't store it in the DB in plain text.
- Create new User and save to Mongo DB 
- User is now considered to be logged in. Send them JWT token in Cookie

### Sign in

- Does the user with the email already exists? If not, respond with error.
- Compare the provided password with stored password
- If passwords are the same, User is now considered to be logged in 
- Send a JWT token in a cookie

### Current user

- Does this user have JWT token inside session cookie  set? If not or JWT is invalid, respond with error.
- Return user data stored inside JWT token payload

### Authentication strategy

- Other services have logic to inspect is the user authenticated (cookie, JWT token ...)
- if the user is invalidated, Auth service will send event to Event Bus 
- We are using Next js, (server side rendering), it means we store JWT token inside cookie

### Middlewares
- Middleware to extract JWT payload and set in on 'req.currentUser'
- Middleware to reject the request if the user is not logged in

## Tests

### Prerequisites
```
npm i
```
### Run tests

```
npm run test
```