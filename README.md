# FakeStoreAPI

[FakeStoreAPI](https://fakestoreapi.com) is a free online REST API that you can use whenever you need Pseudo-real data for
your e-commerce or shopping website without running any server-side code.
It's awesome for teaching purposes, sample codes, tests and etc.

You can visit in detail docs in [FakeStoreAPI](https://fakestoreapi.com) for more information.

## Why?

When I wanted to design a shopping website prototype and needed fake data, I had to
use lorem ipsum data or create a JSON file from the base. I didn't find any online free web service
to return semi-real shop data instead of lorem ipsum data.
so I decided to create this simple web service with NodeJs(express) and MongoDB as a database.

## Resources

There are 2 main resources need in shopping prototypes:

- Products https://fakestoreapi.com/products
- Atores https://fakestoreapi.com/stores


### New! "Rating" (includes rate and count) has been added to each product object!

## How to

you can fetch data with any kind of methods you know(fetch API, Axios, jquery ajax,...)

### Get all products

```js
fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((json) => console.log(json));
```

### Get a single product

```js
fetch("https://fakestoreapi.com/products/6191cb5ec654f145d4326b85")
  .then((res) => res.json())
  .then((json) => console.log(json));
```

### Add new product

```js
fetch("https://fakestoreapi.com/products", {
  method: "POST",
  body: JSON.stringify({
    "title": "Xiaomi Mi Smart Band 6",
    "price": 5929,
    "description": "La Mi Band tiene todo lo necesario para acompañarte en tu rutina.",
    "image": "https://http2.mlstatic.com/D_NQ_NP_917772-MLA46164931649_052021-O.webp",
    "gallery": ["https://http2.mlstatic.com/D_NQ_NP_917772-MLA46164931649_052021-O.webp","https://http2.mlstatic.com/D_NQ_NP_701375-MLA46165064140_052021-O.webp","https://http2.mlstatic.com/D_NQ_NP_2X_696269-MLA46165064141_052021-F.webp" ],
    "category": "Electrónica",
    "mostwanted": false
  }),
})
  .then((res) => res.json())
  .then((json) => console.log(json));

/* will return
{
  "gallery": [
    "https://http2.mlstatic.com/D_NQ_NP_917772-MLA46164931649_052021-O.webp",
    "https://http2.mlstatic.com/D_NQ_NP_701375-MLA46165064140_052021-O.webp",
    "https://http2.mlstatic.com/D_NQ_NP_2X_696269-MLA46165064141_052021-F.webp"
  ],
  "mostwanted": false,
  "_id": "61a429e8dc4c574aa8c6bde7",
  "title": "Xiaomi Mi Smart Band 6",
  "price": 5929,
  "description": "La Mi Band tiene todo lo necesario para acompañarte en tu rutina.",
  "image": "https://http2.mlstatic.com/D_NQ_NP_917772-MLA46164931649_052021-O.webp",
  "category": "Electrónica",
  "store": null,
  "__v": 0
}
*/
```

### Updating a product

```js
fetch("https://fakestoreapi.com/products/61a429e8dc4c574aa8c6bde7", {
  method: "PUT",
  body: JSON.stringify({
    "gallery": [
      "https://http2.mlstatic.com/D_NQ_NP_917772-MLA46164931649_052021-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_701375-MLA46165064140_052021-O.webp",
      "https://http2.mlstatic.com/D_NQ_NP_2X_696269-MLA46165064141_052021-F.webp"
    ],
    "mostwanted": false,
    "_id": "61a429e8dc4c574aa8c6bde7",
    "title": "Xiaomi Mi Smart Band 6",
    "price": 5929,
    "description": "La Mi Band tiene todo lo necesario para acompañarte en tu rutina.",
    "image": "https://http2.mlstatic.com/D_NQ_NP_917772-MLA46164931649_052021-O.webp",
    "category": "Electrónica",
    "store": "61a42ba51648966e9473df6f"
  }),
})
  .then((res) => res.json())
  .then((json) => console.log(json));

/* will return
{
  "gallery": [
    "https://http2.mlstatic.com/D_NQ_NP_917772-MLA46164931649_052021-O.webp",
    "https://http2.mlstatic.com/D_NQ_NP_701375-MLA46165064140_052021-O.webp",
    "https://http2.mlstatic.com/D_NQ_NP_2X_696269-MLA46165064141_052021-F.webp"
  ],
  "mostwanted": false,
  "_id": "61a429e8dc4c574aa8c6bde7",
  "title": "Xiaomi Mi Smart Band 6",
  "price": 5929,
  "description": "La Mi Band tiene todo lo necesario para acompañarte en tu rutina.",
  "image": "https://http2.mlstatic.com/D_NQ_NP_917772-MLA46164931649_052021-O.webp",
  "category": "Electrónica",
  "store": null,
  "__v": 0
}
*/
```

### Deleting a product

```js
fetch("https://fakestoreapi.com/products/61a429e8dc4c574aa8c6bde7", {
  method: "DELETE",
});
```

## All available routes

### Products

```js
fields:
{
    _id:ObjectId,
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: String,
    image: String,
    gallery: [String],
    category: String,
    mostwanted: {
        type: Boolean,
        default: false
    },
    store:{
        type:schema.Types.ObjectId,
        ref:Store,
        required:false
    },
}
```

GET:

- /products (get all products)
- /products/:id (get specific product based on id)

POST:

- /products
- /products/new

-PUT,PATCH

- /products/:id
- /products/:id/edit

-DELETE

- /products/:id
- /products/:id/edit

### Store

```js
fields:
{
    email:{
        type:String,
        required:false
    },
    name:{
        type:String,
        required:true
    },
    address:{
        city:String,
        street:String,
        number:Number,
        zipcode:String,
        geolocation:{
            lat:String,
            long:String
        }
    },
    phone:String
}
```

GET:

- /stores (get all stores)
- /stores/:id (get specific store based on id)

POST:

- /stores
- /stores/new

PUT,PATCH:

- /stores/:id
- /stores/:id/new
