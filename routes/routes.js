const express = require("express");
const router = express.Router();
const Contact = require("../products/Producs");
const User = require("../products/User");
const users = require("../productsListForDataBase");
//get all users
router.get("/users", (req, res) => {
  User.find({})
    .then((response) =>
      response
        ? res.json(response)
        : res.status(400).json(`Users base iz empty`)
    )
    .catch((err) => res.status(400).json(err));
});
//get all contacts of user with certain id
router.get("/users/contacts/:id", (req, res) => {
  const { id } = req.params;
  User.find({ _id: id })
    .then((response) => {
      response
        ? res.json(response[0].contacts)
        : res.status(400).json(`Did not find users concats with id: ${id}`);
    })
    .catch((err) => res.status(400).json(err));
});
//get  user with certain id
router.get("/users/:id", (req, res) => {
  const { id } = req.params;
  User.find({ _id: id })
    .then((response) =>
      response
        ? res.json(response)
        : res.status(400).json(`Did not find user with id: ${id}`)
    )
    .catch((err) => res.status(400).json(err));
});
// generate users in database without registering
router.post("/", (req, res) => {
  users.forEach((el) => {
    const novi = new User(el).save();
  });
  res.json("Added all users from list");
});
//delete user with id
router.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  User.findOneAndDelete({ _id: id })
    .then((data) => {
      data
        ? res.json(`Successfully deleted User with _id: ${id}!`)
        : res.status(404).json(`User with _id:${id} was not found and deleted`);
    })
    .catch((err) => res.status(404).json(err));
});

//validation of contacts
const validateContacts = (con) => {
  //TODO
  return true;
};

//Change users informations
router.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, password, contacts } = req.body;
  const arayNames = ["name", "email", "password", "contacts"];
  const aray = [name, email, password, contacts];
  const check = validateContacts(contacts); // TODO
  if (!check) {
    res.status(400).json("Invalid contacts");
  }
  let objekt = {};
  let k = 0;
  aray.forEach((el, i) => {
    if (el) {
      k++;
      objekt[arayNames[i]] = el;
    }
  });
  if (k !== 0) {
    User.findByIdAndUpdate(id, objekt)
      .then((data) => res.json(data))
      .catch((err) => res.status(404).json(err));
    return;
  } else {
    res.json("No changes occurred");
  }
});

// add contact to user with certain id
router.post("/users/:id", (req, res) => {
  const { name, surrname, address, phoneNumber } = req.body;
  const { id } = req.params;
  const arayNames = ["name", "surrname", "address", "phoneNumber"];
  const aray = [name, surrname, address, phoneNumber];

  let objekt = {};
  let k = 0;
  aray.forEach((el, i) => {
    if (el) {
      k++;
      objekt[arayNames[i]] = el;
    }
  });
  User.findOne({ _id: id })
    .then((data) => {
      data.contacts = [...data.contacts, objekt];
      data.save();
      return data;
    })
    .then((e) => res.json(e))
    .catch((err) => res.status(400).json(err));
});
// add contact to user with certain id
router.post("/users/contact/:id", (req, res) => {
  const { name, surrname, address, phoneNumber } = req.body;
  const { id } = req.params;
  const arayNames = ["name", "surrname", "address", "phoneNumber"];
  const aray = [name, surrname, address, phoneNumber];

  let objekt = {};
  let k = 0;
  aray.forEach((el, i) => {
    if (el) {
      k++;
      objekt[arayNames[i]] = el;
    }
  });
  User.findOne({ _id: id })
    .then((data) => {
      data.contacts = [...data.contacts, objekt];
      data.save();
      return data;
    })
    .then((e) => res.json(e))
    .catch((err) => res.status(400).json(err));
});
//change users contact name
router.put("/users/name/:id", (req, res) => {
  const { id } = req.params;
  const { name, newName } = req.body;
  User.findOne({ _id: id })
    .then((data) => {
      aray = ChangeContact(newName, name, "name", data.contacts);

      data.contacts = [];
      data.contacts = aray;

      data.save();
      return data;
    })
    .then((e) => res.json(e))
    .catch((err) => res.status(400).json(err));
});
//change users contact surrname
router.put("/users/surrname/:id", (req, res) => {
  const { id } = req.params;
  const { surrname, newName } = req.body;
  User.findOne({ _id: id })
    .then((data) => {
      aray = ChangeContact(newName, surrname, "surrname", data.contacts);

      data.contacts = [];
      data.contacts = aray;

      data.save();
      return data;
    })
    .then((e) => res.json(e))
    .catch((err) => res.status(400).json(err));
});
//change users contact adress
router.put("/users/address/:id", (req, res) => {
  const { id } = req.params;
  const { address, newName } = req.body;
  User.findOne({ _id: id })
    .then((data) => {
      aray = ChangeContact(newName, address, "address", data.contacts);

      data.contacts = [];
      data.contacts = aray;

      data.save();
      return data;
    })
    .then((e) => res.json(e))
    .catch((err) => res.status(400).json(err));
});
//change users contact phone
router.put("/users/phoneNumber/:id", (req, res) => {
  const { id } = req.params;
  const { phoneNumber, newName } = req.body;
  User.findOne({ _id: id })
    .then((data) => {
      aray = ChangeContact(newName, phoneNumber, "phoneNumber", data.contacts);

      data.contacts = [];
      data.contacts = aray;

      data.save();
      return data;
    })
    .then((e) => res.json(e))
    .catch((err) => res.status(400).json(err));
});

// delete contact of user by surrname
router.delete("/users/surrname/:id", (req, res) => {
  const { id } = req.params;
  const { surrname } = req.body;
  User.findOne({ _id: id })
    .then((data) => {
      data.contacts = deleteContact(surrname, "surrname", data.contacts);
      data.save();
      return data;
    })
    .then((newData) => res.json(newData))
    .catch((err) => res.status(400).json(err));
});

const deleteContact = (name, change, aray) => {
  let array = [];
  aray.forEach((el, i) => {
    if (el[change] !== name) {
      array = [...array, el];
    }
  });
  return array;
};

const ChangeContact = (newName, name, change, aray) => {
  const array = aray.map((el, i) => {
    let word = el;
    if (el[change] === name) {
      word[change] = newName;
    }
    return word;
  });
  return array;
};

module.exports = router;
