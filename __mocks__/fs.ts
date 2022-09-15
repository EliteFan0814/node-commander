const fs = jest.createMockFromModule<any>("fs");
const _fs = jest.requireActual("fs");
const mocks: { [key: string]: any } = {};
Object.assign(fs, _fs);
fs.setMock = (path: string, error: string, data: string) => {
  mocks[path] = [error, data];
};
fs.readFile = (
  path: string,
  options: object,
  callback: (error: string, data: string) => void
) => {
  if (path in mocks) {
    callback(mocks[path][0], mocks[path][1]);
  } else {
    _fs.readFile(path, options, callback);
  }
};
export default { fs };
