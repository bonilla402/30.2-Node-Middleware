process.env.NODE_ENV = "test";
// npm packages
const request = require("supertest");
// app imports
const app = require("../app");

let items = require("../fakeDb")

let item = { name: "silly", price:200 }

beforeEach(async () => {
  items.push(item)
});

afterEach(async () => {
  items = []
});
// end afterEach

/** GET /items - returns `{items: [item, ...]}` */


describe('GET /items', () => {
  it('Gets a list of items', async () => {
    const response = await request(app).get(`/items`);
    expect(response.statusCode).toBe(200);
    expect(response.body.items).toHaveLength(1);
  });
});

// end



/** GET /items/[name] - return data about one item: `{item: item}` */

describe("GET /items/:name", function () {
  test("Gets a single item", async function () {
    const response = await request(app).get(`/items/${item.name}`);
    expect(response.statusCode).toBe(200);

    console.log(response.body)
    console.log(item)
    expect(response.body).toEqual(item);
  });

  test("Responds with 404 if can't find item", async function () {
    const response = await request(app).get(`/items/0`);
    expect(response.statusCode).toBe(404);
  });
});
// end

/** POST /items - create item from data; return `{item: item}` */

describe("POST /items",  function () {
  test("Creates a new item", async function () {
    const response = await request(app)
      .post(`/items`)
      .send({
        name: "Taco",
        price: 0
      });
    expect(response.statusCode).toBe(201);
    
    expect(response.body.added).toHaveProperty("name");
    expect(response.body.added).toHaveProperty("price");
    expect(response.body.added.name).toEqual("Taco");
    expect(response.body.added.price).toEqual(0);
  });
});
// end


/** PATCH /items/[name] - update item; return `{item: item}` */

describe("PATCH /items/:name", function () {
  test("Updates a single item", async function () {
    const response = await request(app)
      .patch(`/items/${item.name}`)
      .send({
        name: "Troll"
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.updated).toEqual({
      name: "Troll"
    });
  });

  test("Responds with 404 if can't find item", async function () {
    const response = await request(app).patch(`/items/0`);
    expect(response.statusCode).toBe(404);
  });
});
// end