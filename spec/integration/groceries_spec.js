const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/groceries/";
const sequelize = require("../../src/db/models/index").sequelize;
const Grocery = require("../../src/db/models").Grocery;

describe("routes : groceries", () => {

  beforeEach((done) => {
      this.grocery;
      sequelize.sync({force: true}).then((res) => {

          Grocery.create({
              item: "Milk",
              purchased: false
          })
          .then((grocery) => {
              this.grocery = grocery;
              done();
          })
          .catch((err) => {
              console.log(err);
              done();
          });
      });
  });

  describe("GET /groceries", () => {

    it("should return a status code 200 and all groceries", (done) => {

        request.get(base, (err, res, body) => {
            expect(res.statusCode).toBe(200);
            expect(err).toBeNull();
            expect(body).toContain("Shopping List");
            expect(body).toContain("Milk");
            done();
        });
    });

  });
});