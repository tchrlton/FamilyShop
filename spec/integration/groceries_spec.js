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

  describe("GET /groceries/new", () => {

    it("should render a new grocery form", (done) => {
        request.get(`${base}new`, (err, res, body) => {
            expect(err).toBeNull();
            expect(body).toContain("New Grocery Item");
            done();
        });
    });
  });

  describe("POST /groceries/create", () => {
    const options = {
      url: `${base}create`,
      form: {
        item: "Bread",
        purchased: false
      }
    };

    it("should create a new grocery item and redirect", (done) => {

      request.post(options,

        (err, res, body) => {
          Grocery.findOne({where: {item: "Bread"}})
          .then((grocery) => {
            expect(res.statusCode).toBe(303);
            expect(grocery.item).toBe("Bread");
            expect(grocery.purchased).toBe(false);
            done();
          })
          .catch((err) => {
            console.log(err);
            done();
          });
        }
      );
    });
  });

  describe("GET /groceries/:id", () => {

    it("should render a view with the selected grocery item ", (done) => {
      request.get(`${base}${this.grocery.id}`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Milk");
        done();
      });
    });

  });

  describe("POST /groceries/:id/destroy", () => {

    it("should delete the grocery item with the associated ID", (done) => {

      Grocery.all()
      .then((groceries) => {
        const groceryCountBeforeDelete = groceries.length;
        expect(groceryCountBeforeDelete).toBe(1);
        request.post(`${base}${this.grocery.id}/destroy`, (err, res, body) => {
          Grocery.all()
          .then((groceries) => {
            expect(err).toBeNull();
            expect(groceries.length).toBe(groceryCountBeforeDelete - 1);
            done();
          })
        });
      });

    });

  });

  describe("GET /groceries/:id/edit", () => {

    it("should render a view with an edit grocery item form", (done) => {
      request.get(`${base}${this.grocery.id}/edit`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Edit Grocery Item");
        expect(body).toContain("Milk");
        done();
      });
    });

  });

  describe("POST /groceries/:id/update", () => {

    it("should update the grocery item with the given values", (done) => {
       const options = {
          url: `${base}${this.grocery.id}/update`,
          form: {
            item: "Milk",
          }
        };
        request.post(options,
          (err, res, body) => {

          expect(err).toBeNull();
          Grocery.findOne({
            where: { id: this.grocery.id }
          })
          .then((grocery) => {
            expect(grocery.item).toBe("Milk");
            done();
          });
        });
    });

  });
});