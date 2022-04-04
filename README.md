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

In other services that use this package, run:

```
npm update @ngazicticketingapp/common
```

## Library description

### Errors

All errors have uniform template:

```
class CustomError {
   statusCode: number;
   serializeErrors(): { message: string; field?: string }[];
}
```

#### List of Errors:

1. CustomError => parent class of all other errors
2. BadRequestError => Status Code 400
3. NotAuthorizedError => Status Code 401
4. NotFoundError => Status Code 404
5. RequestValidationError => Status Code 400


### Middlewares
#### List
1. current-user => returns current user from cookie if it exists, or do nothing if the user is null/undefined
2. error-handler => main middleware for handling errors among services
3. require-auth => if current user is does not exists in request, throws NotAuthorizedError(401)
4. validate-request => Throws RequestValidationError (400) if there are validation errors in request (ie invalid form values)