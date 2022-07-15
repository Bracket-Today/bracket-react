# bracket.today

This is the frontend for bracket.today. It uses yarn workspaces for web and
native support. The app package contains the main app code.

## react-router

There are recurring issues with react-router causing invalid hook calls. I
(Jared) don't have a good solution yet, but what has been working so far:

Change the react-router-native and react-router-dom packages to a different
patch version (for example, 6.2.1 to 6.2.2 or vice-versa) then deleting all
modules and reinstalling

```
rm -rf node_modules packages/web/node_modules packages/app/node_modules
yarn
```

You may also need to copy react-router-native from one node_modules directory to
another, although this should be handled by scripts/copy-to-node-modules.sh in
yarn postinstall.

```
cp -R packages/mobile/node_modules/react-router-native node_modules
```

I'm also experimenting with which package.json file(s) to include the packages
in, and not yet sure how that affects the above instructions.

## Support for the experimental syntax 'jsx' isn't currently enabled

This seems to occur when installing a package via yarn that is not compiled (for
example, to a dist directory), and mostly seems to happen with packages designed
for react-native. To handle the JSX at runtime, edit
packages/web/config-overrides.js and add a line to the appIncludes array

```
  resolveApp('../../node_modules/PACKAGE_NAME'),
```

This includes the package's code in the set of rules that normally applies to
src directories of the main app, and therefore includes the @babel/preset-react
plugin when processing it.

https://dev.to/brunolemos/tutorial-100-code-sharing-between-ios-android--web-using-react-native-web-andmonorepo-4pej
has several comment about config-override.js that revealed this solution.

https://stackoverflow.com/questions/71730569/ provided some insight, but not the
actual solution.

## ViewPropTypes not exported

This should no longer be an issue, due to scripts/view-prop-types.sh

See:
https://github.com/necolas/react-native-web/issues/1537#issuecomment-619969653

---

## Cache of node_modules in web

Since changing files directly in node_modules can sometime be useful in
troubleshooting, just a note that cache may need to be cleared:

```
rm -r packages/web/node_modules/.cache
```
