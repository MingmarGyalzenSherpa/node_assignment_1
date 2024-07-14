import { getAllUsers } from "../../../services/userServices";
import expect from "expect";
import * as UserModel from "../../../models/user";
import sinon from "sinon";
describe("User Service Test Suite", () => {

    //get all user test
  describe("getAllUsers", () => {
    let userModelGetAllUserStub: sinon.SinonStub;

    beforeEach(() => {
      userModelGetAllUserStub = sinon.stub(UserModel, "getAllUsers");
    });

    afterEach(() => {
      userModelGetAllUserStub.restore();
    });

    it("should return array of users", () => {
      userModelGetAllUserStub.returns([]);
      const output = getAllUsers({});
      console.log(output);
      expect(output).toStrictEqual([]);
    });
  });

  //create a new user test
});
