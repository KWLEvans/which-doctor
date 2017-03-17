# Which Doctor

Where you go when something just ain't right

**An app by Keith Evans**

I went to the Which Doctor and this is what he said: here's an app that allows you to search local doctors to find one who can help with what ails you. Using the BetterDoctor API, you have access to a large database of providers in your area. You can search by your condition or by doctor name if you've got a favorite in the area.

## Installation

Requires **[Node.js](https://nodejs.org/en/)** installed in order to run.

**Step 1**: Clone this repository to your local computer

```console
git clone [url]
```

**Step 2**: Install all development and production dependencies from the project root directory

```console
npm install
```
```
bower install
```

**Step 3**: Create a file called `.env` in your root directory and export your API key as `apiKey`

```js
exports.apiKey = "YOUR KEY HERE";
```

**Step 4**: Use **gulp** to build compile the app

```console
gulp build
```

**Note**: You can create a minified production build of the app by adding the `--production` tag

```console
gulp build --production
```

**Step 5**: Use **Browser Sync** to run a local server instance

```console
gulp serve
```

**Step 6**: Search by condition or doctor name to find doctors nearby who can help!

## Known Bugs

Currently there are no known bugs. Any bugs found can be directed to the repository administrator.

## License

MIT License. Copyright 2017 Keith Evans
