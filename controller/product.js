const Product = require("../model/product");

module.exports.getAllProducts = (req, res) => {
  const limit = Number(req.query.limit) || 0;
  const sort = req.query.sort == "desc" ? -1 : 1;

  Product.find()
    //.select(["-_id"])
    .limit(limit)
    .sort({ id: sort })
    .then((products) => {
      res.json(products);
    })
    .catch((err) => console.log(err));
};

module.exports.getProduct = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Product.findById(id)
    //.select(["-_id"])
    .then((product) => {
      res.json(product);
    })
    .catch((err) => console.log(err));
};

module.exports.getProductCategories = (req, res) => {
  Product.distinct("category")
    .then((categories) => {
      res.json(categories);
    })
    .catch((err) => console.log(err));
};

module.exports.getProductsInCategory = (req, res) => {
  const category = req.params.category;
  const limit = Number(req.query.limit) || 0;
  const sort = req.query.sort == "desc" ? -1 : 1;

  Product.find({
    category,
  })
    .select(["-_id"])
    .limit(limit)
    .sort({ id: sort })
    .then((products) => {
      res.json(products);
    })
    .catch((err) => console.log(err));
};

module.exports.getMostWantedProducts = (req, res) => {
  const limit = Number(req.query.limit) || 0;
  const sort = req.query.sort == "desc" ? -1 : 1;
  Product.find({
    mostwanted: true
  })
    .limit(limit)
    .sort({ id: sort })
    .then((products) => {
      res.json(products);
    })
    .catch((err) => console.log(err));
};

module.exports.getRelatedProducts = (req, res) => {
  const id = req.params.id;
  const limit = Number(req.query.limit) || 0;
  const sort = req.query.sort == "desc" ? -1 : 1;

  Product.findById(id)
    //.select(["-_id"])
    .then((product) => {
      Product.find({
        category: { $eq: product.category },
        _id: { $ne: product._id },
      })
        .limit(limit)
        .sort({ id: sort })
        .then((products) => {
          res.json(products);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));

};

module.exports.addProduct = (req, res) => {
  if (typeof req.body == undefined) {
    res.json({
      status: "error",
      message: "data is undefined",
    });
  } else {
    const product = new Product({
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category,
      mostwanted: req.body.mostwanted,
    });
    product.save()
      .then(product => res.json(product))
      .catch(err => console.log(err))
  }
};

module.exports.editProduct = (req, res) => {
  if (typeof req.body == undefined || req.params.id == null) {
    res.json({
      status: "error",
      message: "something went wrong! check your sent data",
    });
  } else {
    res.json({
      id: req.params.id,
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
      category: req.body.category,
    });
  }
};

module.exports.deleteProduct = (req, res) => {
  if (req.params.id == null) {
    res.json({
      status: "error",
      message: "cart id should be provided",
    });
  } else {
    Product.findOne({
      id: req.params.id,
    })
      .select(["-_id"])
      .then((product) => {
        res.json(product);
      })
      .catch((err) => console.log(err));
  }
};
