import Bottle from "bottlejs";

const providers = [];

const bottle = new Bottle();

providers.forEach(provider => provider(bottle));

export default bottle.container;
