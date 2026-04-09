import {registerRemotes} from '@module-federation/enhanced/runtime';

const manifestFile =
  process.env.NODE_ENV === 'production'
    ? '/assets/module-federation.manifest.prod.json'
    : '/assets/module-federation.manifest.json';

fetch(manifestFile)
  .then((res) => res.json())
  .then((remotes: Record<string, string>) =>
    Object.entries(remotes).map(([name, entry]) => ({name, entry})),
  )
  .then((remotes) => registerRemotes(remotes))
  .then(() => import('./bootstrap').catch((err) => console.error(err)));
