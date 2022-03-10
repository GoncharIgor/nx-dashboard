## Tutorial:
https://egghead.io/lessons/react-generate-a-new-react-app-with-nx

## Tech Details
All `node_modules` packages from all apps and libs are registered only in 1 high-level  `node_modules`
Thus - we have only 1 global `package.json`
It means - in all our apps we have 1 same shared version of any package

nx.json - configuration of the workspace
- taskRunners - run all CLI commands


## Styles
Each project may have different css preprocessors (less, scss).
You indicate them in the `nx.json` per project

## Create react app:
yarn add @nrwl/react
yarn nx g @nrwl/react:application appName

Serve app:
nx run appName:serve

`nx serve` will serve the default project


## Create react library:
nx g @nrwl/react:lib libName --directory=appName
will generate library with shared components for specific project

// appProject - generates routing component in appName project and links it to libName library
nx g @nrwl/react:lib libName --directory=appName --appProject=appName

--directory - creates a new folder inside `libs` one

## Create react component
nx g @nrwl/react:component header --project=projectNameFromWorkspaceJson


## Create plain TS (not react) lib:
nx g @nrwl/workspace:lib libName --directory=projectName

## Add storybook:
nx g @nrwl/react:storybook-configuration appOrLibName --configureCypress --generateStories

--generateStories - will create stories for already existing components in the app/library

Run storybook:
nx run projectName:storybook
(storybook - new `target` from project.json)

e.g:
`nx run store-shared-ui:storybook`

## Projects parallel commands run
Option 1:
nx run-many --target=serve --projects=appName1,appName2 --parallel=true

e.g:
`nx run-many --target=serve --projects=store,api --parallel=true`

Option 2:
Add custom run command to project.json -> targets
`nx run store:serveAppAndApi`


## Dependencies visualization
nx dep-graph

## Testing
Storybook + Cypress - e2e testing of components in isolation
CLI run:
- serves components in storybook port 4400
- cypress tests run, looking at storybook port

Run Cypress tests:
nx run store-shared-ui-e2e:e2e --watch

For CI run:
nx run store-shared-ui-e2e:e2e --headless


Run jest:
nx run appName:test

## Build
nx run appName:build --configuration=production
or
nx build appName --configuration=production


## Optimization 
- Affected commands
If 1 lib/app was changed - only related elements of the tree will be updated and rebuilt, not whole monorepo
- Computation caching
Lives in node_modules/.cache
can be stored in nx cloud 

## Best practices
- The more code in libs - better. good stats: 20% - apps, 80% - libs
Reasons:
- reusability
- bounded contexts (what is public and what is private; speeds up compilation)
