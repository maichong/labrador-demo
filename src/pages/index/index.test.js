import assert from 'assert';

export async function onLoad(c, next) {
  console.log('onload');
  next();
}

export function testState(c) {
  assert(c.state.asMutable, 'Index组件state不为immutable');
}
