import * as Comlink from "comlink";

async function getValue(value) {
  const start = Date.now();
  while (Date.now() < start + 3000){

  }
  return value + 1;
}

const api = {
  getValue,
};

Comlink.expose(api);