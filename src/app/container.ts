import { createContainer, asClass, asFunction } from 'awilix';

import firestoreDeps from './dependency-injection/firestore';
import contextDeps from './dependency-injection/contexts';

const container = createContainer();

const deps = {
  ...firestoreDeps,
  ...contextDeps,
};

Object.keys(deps).forEach((key) => {
  registerDependency(key, deps[key]);
});

function registerDependency(key: string, dependency: any) {
  if (dependency instanceof Function && !dependency.prototype) {
    return container.register(key, asFunction(dependency));
  }
  
  container.register(key, asClass(dependency));
}

export default container;
