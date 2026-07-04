const chainable = () => {};
chainable.isRequired = chainable;

const PropTypes = {
  array: chainable,
  bool: chainable,
  func: chainable,
  number: chainable,
  object: chainable,
  string: chainable,
  symbol: chainable,
  any: chainable,
  node: chainable,
  element: chainable,
  elementType: chainable,
  instanceOf: () => chainable,
  oneOf: () => chainable,
  oneOfType: () => chainable,
  arrayOf: () => chainable,
  objectOf: () => chainable,
  shape: () => chainable,
  exact: () => chainable,
};

export default PropTypes;
export { PropTypes };
