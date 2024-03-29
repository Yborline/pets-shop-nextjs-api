const { Schema, model, SchemaTypes } = require("mongoose");

const Joi = require("joi");

const codeRegexp = /^[0-9]{9}$/;

const clothesSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for clothes"],
      minlength: 2,
      maxlength: 50,
    },

    code: {
      type: String,
      required: true,
      unique: true,
      match: codeRegexp,
      // регулярные выражения выучить
    },
    // optprice: {
    //   type: Number,
    //   required: [true, "price must be exist"],
    //   min: 0.01,
    // },
    allprice: {
      type: Object,
      required: [true, "price must be exist"],
      xs: {
        type: Object,
        // required: [true, "price must be exist"],
        price: { type: Number, min: 0.01 },
        optPrice: { type: Number, min: 0.01 },
        active: { type: Boolean },
      },
      s: {
        type: Object,
        price: { type: Number, min: 0.01 },
        optPrice: { type: Number, min: 0.01 },
        active: { type: Boolean },
      },
      sm: {
        type: Object,
        price: { type: Number, min: 0.01 },
        optPrice: { type: Number, min: 0.01 },
        active: { type: Boolean },
      },
      m: {
        type: Object,
        price: { type: Number, min: 0.01 },
        optPrice: { type: Number, min: 0.01 },
        active: { type: Boolean },
      },
      ml: {
        type: Object,
        price: { type: Number, min: 0.01 },
        optPrice: { type: Number, min: 0.01 },
        active: { type: Boolean },
      },
      l: {
        type: Object,
        price: { type: Number, min: 0.01 },
        optPrice: { type: Number, min: 0.01 },
        active: { type: Boolean },
      },
      xl: {
        type: Object,
        price: { type: Number, min: 0.01 },
        optPrice: { type: Number, min: 0.01 },
        active: { type: Boolean },
      },
      xxl: {
        type: Object,
        price: { type: Number, min: 0.01 },
        optPrice: { type: Number, min: 0.01 },
        active: { type: Boolean },
      },
      xl3: {
        type: Object,
        price: { type: Number, min: 0.01 },
        optPrice: { type: Number, min: 0.01 },
        active: { type: Boolean },
      },
      xl4: {
        type: Object,
        price: { type: Number, min: 0.01 },
        optPrice: { type: Number, min: 0.01 },
        active: { type: Boolean },
      },
      xl5: {
        type: Object,
        price: { type: Number, min: 0.01 },
        optPrice: { type: Number, min: 0.01 },
        active: { type: Boolean },
      },
      xl6: {
        type: Object,
        price: { type: Number, min: 0.01 },
        optPrice: { type: Number, min: 0.01 },
        active: { type: Boolean },
      },
      xl7: {
        type: Object,
        price: { type: Number, min: 0.01 },
        optPrice: { type: Number, min: 0.01 },
        active: { type: Boolean },
      },
    },

    description: {
      type: String,
    },
    // price: {
    //   type: Number,
    //   required: [true, "price must be exist"],
    //   min: 0.01,
    // },
    rating: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
    },
    active: {
      type: Boolean,
      required: [true, "for active pls"],
    },

    discount: {
      type: Number,
      min: 0,
      default: 0,
    },

    model: {
      type: String,
      enum: [
        "overall",
        "vest",
        "blanket",
        "jacket",
        "suit",
        "hoodies",
        "bomber",
        "sweatshirt",
        "trousers",
        "hats",
        "scarves",
        "tShirt",
        "singlet",
        "shirt",
        "embroidery",
        "dress",
        "skirt",
        "briefs",
        "footwear",
        "couch",
      ],
    },

    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
      required: true,
    },
    image: [
      {
        type: Object,
        required: true,
      },
    ],
    // image: {
    //   type: Object,
    //   required: true,
    // },
  },

  { versionKey: false, timestamps: true }
);

// const joiSchema = Joi.object({
//   name: Joi.string().required(),
//   price: Joi.number().min(0.01).required(),
//   active: Joi.bool(),
//   status: Joi.string().valid("cat", "dog").required(),
//   code: Joi.string().pattern(codeRegexp).required(),
//   image: Joi.object().required(),
//   // image: Joi.array().items(Joi.any()),
// });

const discountSchema = Joi.object({
  discount: Joi.number(),
});

const joiSchema = Joi.object().keys({
  name: Joi.string().required(),
  // price: Joi.number().min(0.01).required(),
  // optprice: Joi.number().min(0.01).required(),
  allprice: Joi.object().required(),
  active: Joi.bool(),
  description: Joi.string(),
  // status: Joi.string().valid("cat", "dog").required(),
  // code: Joi.string().pattern(codeRegexp).required(),
  // image: Joi.required(),
  model: Joi.string()
    .valid(
      "overall",
      "vest",
      "blanket",
      "jacket",
      "suit",
      // "skinny",
      "bomber",
      "sweatshirt",
      "trousers",
      "hats",
      "scarves",
      "tShirt",
      "singlet",
      "shirt",
      "embroidery",
      "dress",
      "skirt",
      "briefs",
      "hoodies",
      "footwear",
      "couch"
    )
    .required(),
});

// image: Joi.array().items(Joi.any()),

clothesSchema.index({
  name: "text",
});

const Cloth = model("clothes", clothesSchema);

module.exports = { Cloth, joiSchema, discountSchema };
