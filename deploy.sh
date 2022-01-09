#!/bin/sh

find src/pages -type d -not -path "*/__snapshots__" -exec npx ts-node --project ./scripts/tsconfig.json scripts/md-to-react.ts {} \;
npx ts-node --project ./scripts/tsconfig.json scripts/build-routes.ts

npm run deploy
