import db from "../db";
import tfs from "../__mocks__/fs";
jest.mock("fs");
import * as fs from "fs";
// const fs = require("fs");
describe("db", () => {
  it("can read", () => {
    // expect(db.read instanceof Function).toBe(true);
    fs.setMock("/xxx", null, "[]");
    db.read("/xxx");
    // expect(fs.x()).toBe("xxx");
  });
  it("can write", () => {
    expect(db.write instanceof Function).toBe(true);
  });
});
