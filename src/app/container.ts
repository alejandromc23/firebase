import awilix from 'awilix';

import firestoreDeps from './dependency-injection/firestore';

const container = awilix.createContainer();

const deps = {
  ...firestoreDeps,
};

Object.keys(deps).forEach((key) => {
  registerDependency(key, deps[key]);
});

function registerDependency (key: string, dependency: any) {
  if (typeof dependency === 'function') {
    return container.register(dependency.name, awilix.asFunction(dependency));
  }

  return container.register(key, awilix.asClass(dependency[key]));
}

export default container;
