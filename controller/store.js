const Store = require('../model/store')

module.exports.getAllStore = (req, res) => {
  const limit = Number(req.query.limit) || 0
  const sort = req.query.sort == "desc" ? -1 : 1

  Store.find().select(['-_id']).limit(limit).sort({
    id: sort
  })
    .then(stores => {
      res.json(stores)
    })
    .catch(err => console.log(err))
}

module.exports.getStore = (req, res) => {
  const id = req.params.id
  Store.findById(id)
    //.select(['-_id'])
    .then(store => {
      res.json(store)
    })
    .catch(err => console.log(err))
}



module.exports.addStore = (req, res) => {
  console.log("---------------->", req.body);
  if (typeof req.body == undefined) {
    res.json({
      status: "error",
      message: "data is undefined"
    })
  } else {
    const store = new Store({
      email: req.body.email || null,
      name: req.body.name,
      address: {
        city: req.body.address?.city || null,
        street: req.body.address?.street || null,
        number: req.body.address?.number || null,
        zipcode: req.body.address?.zipcode || null,
        geolocation: {
          lat: req.body.address?.geolocation?.lat || null,
          long: req.body.address?.geolocation?.long || null
        }
      },
      phone: req.body.phone || null
    })
    store.save()
      .then(store => res.json(store))
      .catch(err => res.json(err))

    //res.json({id:Store.find().count()+1,...req.body})
  }
}

module.exports.editStore = (req, res) => {
  if (typeof req.body == undefined || req.params.id == null) {
    res.json({
      status: "error",
      message: "something went wrong! check your sent data"
    })
  } else {
    const id = req.params.id
    Store.findById(id)
      .then((store) => {
        store.email = req.body.email || store.email;
        store.name = req.body.name || store.name;
        store.address = {
          city: req.body.address?.city || null,
          street: req.body.address?.street || null,
          number: req.body.address?.number || null,
          zipcode: req.body.address?.zipcode || null,
          geolocation: {
            lat: req.body.address?.geolocation?.lat || null,
            long: req.body.address?.geolocation?.long || null
          }
        };
        store.phone = req.body.phone || store.phone;

        store.save().then(store => res.json(store))
      })
  }
}

module.exports.deleteStore = (req, res) => {
  if (req.params.id == null) {
    res.json({
      status: "error",
      message: "cart id should be provided"
    })
  } else {
    Store.findOneAndDelete({ _id: req.params.id })
      //.select(['-_id'])
      .then(store => {
        res.json(store)
      })
      .catch(err => res.json(err))
  }
}