const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

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
// get user by email
router.get("/users/:email", (req, res) => {
  const { email } = req.params;
  User.findOne({ email: email })
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

// add new user to db
router.post("/users", (req, res) => {
  const { name, email, password } = req.body;
  const contacts = [];
  const arayNames = ["name", "email", "password", "contacts"];
  const aray = [name, email, password, contacts];
  console.log("notri v userja vpisat");
  const arrayy = aray.filter((el) => el !== undefined);
  if (arrayy.length < 3) {
    res.status(400).json("Not all parameters are  given.");
    return;
  } else {
    let objekt = { name, email, password, contacts };

    const novi = User(objekt);
    console.log(objekt);
    novi
      .save()
      .then((e) => res.json("good"))
      .catch((err) => res.status(400).json(err));
  }
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
// add contact to user with certain email
router.post("/users/contacts/:email", (req, res) => {
  const { name, surrname, address, phoneNumber } = req.body;
  const { email } = req.params;
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
  User.findOne({ email: email })
    .then((data) => {
      data.contacts = [...data.contacts, objekt];
      data.save();
      return data;
    })
    .then((e) => res.json(e))
    .catch((err) => res.status(400).json(err));
});
//change users contact name
router.put("/users/name/:email", (req, res) => {
  const { email } = req.params;
  const { name, newName } = req.body;
  User.findOne({ email })
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
router.put("/users/surrname/:email", (req, res) => {
  const { email } = req.params;
  const { name, newName } = req.body;
  User.findOne({ email })
    .then((data) => {
      aray = ChangeContact(newName, name, "surrname", data.contacts);

      data.contacts = [];
      data.contacts = aray;

      data.save();
      return data;
    })
    .then((e) => res.json(e))
    .catch((err) => res.status(400).json(err));
});
//change users contact adress
router.put("/users/address/:email", (req, res) => {
  const { email } = req.params;
  const { name, newName } = req.body;
  User.findOne({ email: email })
    .then((data) => {
      aray = ChangeContact(newName, name, "address", data.contacts);

      data.contacts = [];
      data.contacts = aray;

      data.save();
      return data;
    })
    .then((e) => res.json(e))
    .catch((err) => res.status(400).json(err));
});
//change users contact phone
router.put("/users/phoneNumber/:email", (req, res) => {
  const { email } = req.params;
  const { name, newName } = req.body;
  User.findOne({ email: email })
    .then((data) => {
      aray = ChangeContact(newName, name, "phoneNumber", data.contacts);

      data.contacts = [];
      data.contacts = aray;

      data.save();
      return data;
    })
    .then((e) => res.json(e))
    .catch((err) => res.status(400).json(err));
});

// delete contact of user by surrname
router.delete("/users/surrname/:email", (req, res) => {
  const { email } = req.params;
  const { surrname, name } = req.body;
  User.findOne({ email: email })
    .then((data) => {
      data.contacts = deleteContact(name, surrname, "surrname", data.contacts);
      data.save();
      return data;
    })
    .then((newData) => res.json(newData))
    .catch((err) => res.status(400).json(err));
});

const deleteContact = (name1, name2, change, aray) => {
  let array = [];
  aray.forEach((el, i) => {
    if (el[change] === name2 && el["name"] === name1) {
      array = [...array];
    } else {
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
//check is password matches with hashed one
router.post("/checkLogin/:email", async (req, res) => {
  const { email } = await req.params;
  const { password } = req.body;
  const userr = await User.findOne({ email });
  if ((await userr) === null) {
    await res.status(404).json("User not found");
  } else {
    const isItTheSame = await bcrypt.compare(password, userr.password);
    (await isItTheSame) ? res.json(true) : res.json(false);
  }
});
router.post("/checkLoginRegular/:email", async (req, res) => {
  const { email } = await req.params;

  const { password } = req.body;
  const userr = await User.findOne({ email });
  if ((await userr) === null) {
    await res.status(404).json("User not found");
  } else {
    console.log(password, userr.password);
    (await userr.password) === password ? res.json(true) : res.json(false);
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  try {
    User.findOne({ email }).then((el) => {
      if (!el) {
        res.status(404).json("Error");
        return;
      }
      const preveri = bcrypt
        .compare(password, el.password)
        .then((ress) => {
          return ress ? res.json(true) : res.status(400).json(false);
        })
        .catch((e) => res.json(e));
    });
  } catch (e) {
    res.status(404).json(e);
  }
});
module.exports = router;
