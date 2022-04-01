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
