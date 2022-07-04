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
another:

```
cp -R packages/mobile/node_modules/react-router-native node_modules
```

I'm also experimenting with which package.json file(s) to include the packages
in, and not yet sure how that affects the above instructions.
