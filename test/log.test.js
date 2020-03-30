require = require('esm')(module);

const mockLog = jest.fn();
global.console = { 'log': mockLog };

const {
  logError,
  logSuccess,
  logWarn
} = require('../src/log');

const { DEFAULT_OPTS } = require('../src/constants');

describe('logError', () => {
  afterEach(() => {
    mockLog.mockReset();
  });

  test('with default opts, logs message', () => {
    logError('message', DEFAULT_OPTS);
    expect(mockLog).toBeCalledTimes(1);
  });

  test('with {silent: true}, does not log message', () => {
    const opts = Object.assign({}, DEFAULT_OPTS, { silent: true });

    logError('message', opts);
    expect(mockLog).not.toBeCalled();
  });

  test('with {successOnly: true}, does not log message', () => {
    const opts = Object.assign({}, DEFAULT_OPTS, { successOnly: true });

    logError('message', opts);
    expect(mockLog).not.toBeCalled();
  });
});

describe('logSuccess', () => {
  afterEach(() => {
    mockLog.mockReset();
  });

  test('with default opts, logs message', () => {
    logSuccess('message', DEFAULT_OPTS);
    expect(mockLog).toBeCalledTimes(1);
  });

  test('with {silent: true}, does not log message', () => {
    const opts = Object.assign({}, DEFAULT_OPTS, { silent: true });

    logSuccess('message', opts);
    expect(mockLog).not.toBeCalled();
  });

  test('with {successOnly: true}, logs message', () => {
    const opts = Object.assign({}, DEFAULT_OPTS, { successOnly: true });

    logSuccess('message', opts);
    expect(mockLog).toBeCalledTimes(1);
  });
});

describe('logWarn', () => {
  afterEach(() => {
    mockLog.mockReset();
  });

  test('with default opts, logs message', () => {
    logWarn('message', DEFAULT_OPTS);
    expect(mockLog).toBeCalledTimes(1);
  });

  test('with {silent: true}, does not log message', () => {
    const opts = Object.assign({}, DEFAULT_OPTS, { silent: true });

    logWarn('message', opts);
    expect(mockLog).not.toBeCalled();
  });

  test('with {successOnly: true}, does not log message', () => {
    const opts = Object.assign({}, DEFAULT_OPTS, { successOnly: true });

    logWarn('message', opts);
    expect(mockLog).not.toBeCalled();
  });
});
