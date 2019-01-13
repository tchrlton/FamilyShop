const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;

describe("User", () => {

  beforeEach((done) => {
    sequelize.sync({force: true})
    .then(() => {
      done();
    })
    .catch((err) => {
      console.log(err);
      done();
    });

  });

  describe("#create()", () => {

    it("should create a User object with a valid email and password", (done) => {
      User.create({
        username: "hellobob1",
        email: "user@tesla.com",
        password: "hellojs"
      })
      .then((user) => {
        expect(user.username).toBe("hellobob1");
        expect(user.email).toBe("user@tesla.com");
        expect(user.id).toBe(1);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

    it("should not create a user with invalid email or password", (done) => {
      User.create({
        username: "hellobob1",
        email: "I am not an email",
        password: "hellojs"
      })
      .then((user) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Validation error: must be a valid email");
        done();
      });
    });

    it("should not create a user with a username or email already taken", (done) => {

      User.create({
        username: "hellobob1",
        email: "user@tesla.com",
        password: "hellojs"
      })
      .then((user) => {

        User.create({
          username: "hellobob1",
          email: "user@tesla.com",
          password: "daredemon123"
        })
        .then((user) => {
          done();
        })
        .catch((err) => {
          expect(err.message).toContain("Validation error");
          done();
        });

        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });

});