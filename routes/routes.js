const express = require("express");
const router = new express.Router();
const moment = require("moment");
const multer = require("multer");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const passport = require("passport");
const Joi = require("joi");
require("../db/conn");
const stripe = require("stripe")(
  "sk_test_51IuscrSBUuqsQcOURd3VDvakpixJ6lIP2LHffPabKhozIe15uS8xV5uN9oB2RCf01dNvOw2uMP8556wFkbfALWR000YYUvBuOT"
);
const generateAuthToken = require("../utils/genAuthToken");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "604995091388-io13bqqg3g6sv6o70mjv3mh6gh2laev6.apps.googleusercontent.com"
);


const { Order } = require("../model/Order");
const registerS = require("../model/registerSchema");
const Product = require("../model/productSchema");
const CategoryS = require("../model/categorySchema");
const SubCategory = require("../model/subcategorySchema");
const FeatureProduct = require("../model/featureProduct");
const Authenticate = require("../middleware/auth");
// const OrderSchema = require("../model/orderSchema");

// img storage path
const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    console.log(file);
    callback(null, `image-${Date.now()}. ${file.originalname}`);
  },
});

///////////////////////////////////////////////////////////// img filter
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("only images is allowd"));
  }
};

const upload = multer({
  storage: imgconfig,
  fileFilter: isImage,
});

router.get("/cartItem", Authenticate, (req, res) => {
  console.log("jello cart item ");
  res.send(req.rootUser);
});

// ///////////////////////////////////

router.post("/api/google-login", async (req, res) => {
  const { token } = req.body;
  // console.log(token);

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  console.log(ticket);

  const { name, email, picture } = ticket.getPayload();

  const userExist = await registerS.findOne({ email: email });
  console.log("userExist", userExist);

  if (!userExist) {
    // token generate
    // return res.redirect("/signup");
    res.status(200).json({message: "User not exist"});

  } else {
    const token = req.body.token;

    const result = {
      userExist,
      token,
    };
    res.status(201).json({ status: 201, result });
    //   const user = new registerS({
    //     username:name,
    //     fullname:name,
    //     email:email,
    //   });

    //   await user.save();

    //   const token = generateAuthToken(user);
    //   res.send(token);
  }
});

// ///////////////////////////////////

router.post("/register", async (req, res) => {
  const { username, fullname, phone, address, email, password } = req.body;

  if (!username || !fullname || !phone || !email || !password || !address) {
    return res.status(400).json({ error: "Plz fill all fields" });
  }

  try {
    // console.log("inside")
    const userExist = await registerS.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email alread exist" });
    }

    const user = new registerS({
      username,
      fullname,
      phone,
      address,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = generateAuthToken(user);
    res.send(token);

    res.status(200).json({ message: "message successful" });
  } catch (err) {
    console.log(err);
  }
  console.log(req.body);
});

// user Login

router.post("/login", async (req, res) => {
  // console.log(req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(422).json({ error: "fill all the details" });
  }

  // try {
  const userValid = await registerS.findOne({ email: email });
  console.log(userValid);

  if (userValid) {
    const isMatch = await bcrypt.compare(password, userValid.password);

    if (!isMatch) {
      res.status(422).json({ error: "invalid Credentials" });
    } else {
      // token generate
      const token = await userValid.generateAuthtoken();

      // cookiegenerate
      res.cookie("usercookie", token, {
        expires: new Date(Date.now() + 9000000),
        httpOnly: true,
      });

      const result = {
        userValid,
        token,
      };
      res.status(201).json({ status: 201, result });
    }
  }

  // } catch (error) {
  //     res.status(401).json(error);
  //     console.log("catch block");
  // }
});

// user valid
router.get("/validuser", Authenticate, async (req, res) => {
  // console.log(req.userId)
  // console.log(req.email)
  try {
    const ValidUserOne = await registerS.findOne({ _id: req.userId });
    res.status(201).json({ status: 201, ValidUserOne });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

// USER LOGIN

// router.post("/signin", async (req, res) => {
//   console.log(req.body);

//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ error: "Plz fill  email and password" });
//   }

//   const userLogin = await registerS.findOne({ email: email });
//   console.log(userLogin)

//   if (userLogin) {
//     const userPassword = await bcrypt.compare(password, userLogin.password);

//     const token = await userLogin.generateAuthToken();
//     console.log(token)
//     // localStorage.setItem("usersdatatoken",token);
//     res.cookie("jwtoken", token, {
//       expires: new Date(Date.now() + 25892000000),
//       httpOnly: true,
//     })

//     if (!userPassword) {
//       // console.log(token);
//       // res.send(token);
//       res.status(422).json({message:"user signin Failed"})
//     } else {
//       // console.log(req.body)
//         res.json({message:"user signin successfully"})
//     }
//   } else {
//     res.status(422).json({message:"user signin Failed"})
//   }
// });

router.get("/myOrder", async (req, res) => {
  // console.log(req.email)
  try {
    // const getCat = await Order.findOne({ email: req.email });
    const getCat = await Order.find();

    res.status(201).json({ status: 201, getCat });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

router.get("/userList", async (req, res) => {
  try {
    const getCat = await registerS.find();

    res.status(201).json({ status: 201, getCat });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});
router.get("/orderList", async (req, res) => {
  try {
    const getCat = await Order.find();

    res.status(201).json({ status: 201, getCat });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

router.delete("/user/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const dltUser = await registerS.findByIdAndDelete({ _id: id });

    res.status(201).json({ status: 201, dltUser });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

router.get("/user/:id", async (req, res) => {
  const { id } = req.params;

  let result = await registerS.findById({ _id: id });
  console.log(result);
  if (result) {
    res.send(result);
  } else {
    res.send({ message: "No Record Found" });
  }
});
// registerS
router.put("/userUpdate/:id", (req, res) => {
  const { id } = req.params;
  const date = moment(new Date()).format("YYYY-MM-DD");
  const { username, fullname, phone, address, email } = req.body;

  registerS
    .findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          username,
          fullname,
          phone,
          address,
          email,
          date,
        },
      }
    )
    .then((result) => {
      res.status(201).json({ updated_product: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(401).json({ error: error });
    });
});

// ///////////////////   END SUBCATEGORY /////////////////
// user data get
router.get("/getdata", async (req, res) => {
  try {
    const getUser = await Product.find();

    res.status(201).json({ status: 201, getUser });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

// delete user data
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const dltUser = await Product.findByIdAndDelete({ _id: id });

    res.status(201).json({ status: 201, dltUser });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

// ////////////////////////////////////    START PRODUCT       ////////////////////////////////////////////////////////////
// user product
router.post("/product", upload.single("imgpath"), async (req, res) => {
  console.log(req.file);

  // return false;

  const { filename } = req.file;

  const { fname, description, price, category, subcategory, stock, quantity } =
    req.body;

  if (
    !fname ||
    !description ||
    !filename ||
    !price ||
    !category ||
    !subcategory ||
    !stock
  ) {
    res.status(401).json({ status: 401, message: "fill all the data" });
  }

  try {
    const date = moment(new Date()).format("YYYY-MM-DD");

    const userdata = new Product({
      fname: fname,
      description: description,
      price: price,
      category: category,
      subcategory: subcategory,
      stock: stock,
      quantity: quantity,
      imgpath: filename,
      date: date,
    });

    console.log(userdata);
    const finaldata = await userdata.save();
    res.status(201).json({ status: 201, finaldata });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

router.get("/productList", async (req, res) => {
  try {
    const getCat = await Product.find();

    res.status(201).json({ status: 201, getCat });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

router.get("/product/:id", upload.single("photo"), async (req, res) => {
  let result = await Product.findById({ _id: req.params.id });
  // console.log(result)
  if (result) {
    res.send(result);
  } else {
    res.send({ message: "No Record Found" });
  }
});

router.put("/product/:id", upload.single("imgpath"), (req, res) => {
  console.log(req.file + "yes");
  // console.log("yes")
  // return false;
  // try{
  const { id } = req.params;
  const date = moment(new Date()).format("YYYY-MM-DD");
  const { _id, fname, description } = req.body;

  // const {imgpath} = req.file;

  Product.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        fname: fname,
        description: description,
        imgpath: req.file.filename,
      },
    }
  )
    .then((result) => {
      res.status(201).json({ updated_product: result });
    })
    .catch((error) => {
      console.log(error);
      res.status(401).json({ error: error });
    });

  // console.log(updateuser);
  // }catch (error){
  //     res.status(422).json(error);
  // }
});

// delete product data
router.delete("/product/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const dltUser = await Product.findByIdAndDelete({ _id: id });

    res.status(201).json({ status: 201, dltUser });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

////////////////////////////////////////////////FEATURE PRODIUCT
router.post("/featureProduct", upload.single("imgpath"), async (req, res) => {
  console.log(req.file);

  // return false;

  const { filename } = req.file;

  const { fname, price } = req.body;

  if (!fname || !filename || !price) {
    res.status(401).json({ status: 401, message: "fill all the data" });
  }

  try {
    const date = moment(new Date()).format("YYYY-MM-DD");

    const userdata = new FeatureProduct({
      fname: fname,
      price: price,
      imgpath: filename,
      date: date,
    });

    console.log(userdata);
    const finaldata = await userdata.save();
    res.status(201).json({ status: 201, finaldata });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

router.get("/featureProduct", async (req, res) => {
  try {
    const getCat = await FeatureProduct.find();

    res.status(201).json({ status: 201, getCat });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

// router.patch("/product/:id",upload.single("imgpath"),async(req,res)=>{

//     console.log(req.file.path + "yes")

//         try {
//             // console.log("yes")
//         const {filename} = req.file.path;
//         const {fname,description} = req.body;
//         const date = moment(new Date()).format("YYYY-MM-DD");

//         const userdata = new Product({ fname:fname, description:description,  imgpath:req.file.path, date:date  });
//         // const userdata = await Product.findByIdAndUpdate({id},{fname},{description},{imgpath:filename},{
//         //     new:true
//         // });
//         console.log(userdata)
//         console.log("yes")
//         const finaldata = await userdata.findOneAndUpdate();
//         res.status(201).json({status:201,finaldata});
//         // res.status(201).json({status:201,userdata});

//     }
//     catch (error) {
//         res.status(401).json({status:401,error})
//     }
// });

// delete user data
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const dltUser = await Product.findByIdAndDelete({ id });

    res.status(201).json({ status: 201, dltUser });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

// //////////////////////     START CATEGORT  //////////////
// user Category
router.post("/category", async (req, res) => {
  const { fname, status } = req.body;

  if (!fname || !status) {
    res.status(401).json({ status: 401, message: "fill all the data" });
  }

  try {
    const date = moment(new Date()).format("YYYY-MM-DD");

    const Cdata = new CategoryS({
      fname: fname,
      status: status,
      date: date,
    });

    const finaldata = await Cdata.save();

    res.status(201).json({ status: 201, finaldata });
  } catch (error) {
    res.send({ message: "No Record Found" });
  }
});

// category data get
router.get("/categoryData", async (req, res) => {
  try {
    const getCat = await CategoryS.find();

    res.status(201).json({ status: 201, getCat });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

// delete Category data
router.delete("/category/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const dltUser = await CategoryS.findByIdAndDelete({ _id: id });

    res.status(201).json({ status: 201, dltUser });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

// Edit Category data
router.get("/editCategory/:id", async (req, res) => {
  let result = await CategoryS.findById({ _id: req.params.id });

  if (result) {
    res.send(result);
  } else {
    res.send({ message: "No Record Found" });
  }
});

router.patch("/editCategory/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const date = moment(new Date()).format("YYYY-MM-DD");
    const { fname, status } = req.body;

    const updateuser = await CategoryS.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    console.log(updateuser);
    res.status(201).json(updateuser);
  } catch (error) {
    res.status(422).json(error);
  }
});

// ///////////////////  END CATEGORY /////////////////

// //////////////////   START SUBCATEGORY /////////////////

// user Category

router.post("/subCategory", async (req, res) => {
  const { category, sname, c_id } = req.body;

  if (!category || !sname) {
    res.status(401).json({ status: 401, message: "fill all the data" });
  }

  try {
    const date = moment(new Date()).format("YYYY-MM-DD");
    const status = "0";
    const SCdata = new SubCategory({
      category: category,
      sname: sname,
      status: status,
      c_id: c_id,
      date: date,
    });

    const finaldata = await SCdata.save();

    res.status(201).json({ status: 201, finaldata });
  } catch (error) {
    // res.status(401).json({status:401,error})
  }
});

// category data get
router.get("/subcategoryData", async (req, res) => {
  try {
    const getSubcat = await SubCategory.find();

    res.status(201).json({ status: 201, getSubcat });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

// Edit Category data
router.get("/editSubCategory/:id", async (req, res) => {
  let result = await SubCategory.findById({ _id: req.params.id });

  if (result) {
    res.send(result);
  } else {
    res.send({ message: "No Record Found" });
  }
});

router.patch("/editSubCategory/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const date = moment(new Date()).format("YYYY-MM-DD");
    const { fname, status } = req.body;

    const updateuser = await SubCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    console.log(updateuser);
    res.status(201).json(updateuser);
  } catch (error) {
    res.status(422).json(error);
  }
});

// delete Category data
router.delete("/Subcategory/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const dltUser = await SubCategory.findByIdAndDelete({ _id: id });

    res.status(201).json({ status: 201, dltUser });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

// ///////////////////   END SUBCATEGORY /////////////////

// ////////////////////////stripe

router.post("/api/create-checkout-session", async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      // userId: req.body.userId,
      cart: JSON.stringify(req.body.cart),
    },
  });

  const line_items = req.body.cart.map((item) => {
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: item.fname,
          //   images:[item.imgpath],
          description: item.description,
          metadata: {
            id: item.id,
          },
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };
  });
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["IN"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "inr",
          },
          display_name: "Free shipping",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "inr",
          },
          display_name: "Next day air",
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    customer: customer.id,
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cartItem",
  });
  res.json({ id: session.id });
});

//   Create Order

const createOrder = async (customer, data) => {
  console.log("CUSTOMERS", customer);
  console.log("DATAAAAA", data);
  const Items = JSON.parse(customer.metadata.cart);

  const products = Items.map((item) => {
    return {
      productId: item._id,
      quantity: item.quantity,
      name: item.fname,
      price: item.price,
      imgpath: item.imgpath,
    };
  });

  try {
    const newOrder = new Order({
      userId: customer.id,
      customerId: data.customer,
      paymentIntentId: data.payment_intent,
      products,
      subtotal: data.amount_subtotal,
      total: data.amount_total,
      shipping: data.customer_details,
      payment_status: data.payment_status,
    });
    const savedOrder = await newOrder.save();
    console.log("Processed Order:", savedOrder);
  } catch (err) {
    console.log(err);
  }
};

//webhook

// This is your Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret;

// endpointSecret = "whsec_375dae95a9d21f606b180dfd82131c8f53e76e8ffa9c18cb6634960f350c4f18";

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const sig = req.headers["stripe-signature"];

    let data;
    let eventType;

    if (endpointSecret) {
      let event;

      try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        console.log("WEBHOOK Verified");
      } catch (err) {
        console.log(`Webhook Error: ${err.message}`);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
      }

      data = event.data.object;
      eventType = event.type;
    } else {
      data = req.body.data.object;
      eventType = req.body.type;
    }

    // Handle the event

    if (eventType === "checkout.session.completed") {
      stripe.customers
        .retrieve(data.customer)
        .then((customer) => {
          createOrder(customer, data);
          console.log("data", data);
        })
        .catch((err) => console.log(err.message));
    }

    // Return a 200 response to acknowledge receipt of the event
    res.send().end();
  }
);

module.exports = router;
