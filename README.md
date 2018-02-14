# pop-deploy-status

## Usage

```
http://pop.riascarlet.com/#:token
```

## Deploy
```
npm run build && git add -A && git commit -am "Deploy" && git subtree split --prefix dist -b gh-pages && git push -f origin gh-pages:gh-pages && git branch -D gh-pages

```

## Development
```
npm run dev
```

## Other

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# lint the Typescript
npm run lint

# run the tests
npm test

# run the tests on changes
npm run test:watch

# run the test suite and generate a coverage report
npm run coverage

# run the tests on Teamcity
npm run ci:teamcity

# run the tests on Jenkins
npm run ci:jenkins

# build for production with minification
npm run build

# clean the production build
npm run clean
```
