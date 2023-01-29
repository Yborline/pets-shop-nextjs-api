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
    price: {
      type: Number,
      required: [true, "price must be exist"],
      min: 0.01,
    },

    active: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ["dog", "cat"],
      required: true,
    },
    model: {
      type: String,
      enum: [
        "overall",
        "vest",
        "blanket",
        "jacket",
        "suit",
        "skinny",
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
      ],
    },

    code: {
      type: String,
      required: true,
      unique: true,
      match: codeRegexp,
      // регулярные выражения выучить
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "admin",
      required: true,
    },
    image: {
      type: Object,
      required: true,
    },
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

const joiSchema = Joi.object().keys({
  name: Joi.string().required(),
  price: Joi.number().min(0.01).required(),
  active: Joi.bool(),
  status: Joi.string().valid("cat", "dog").required(),
  code: Joi.string().pattern(codeRegexp).required(),
  image: Joi.object().required(),
});

// image: Joi.array().items(Joi.any()),
const statusJoiSchema = Joi.object({
  status: Joi.string().valid("cat", "dog").required(),
});

const Cloth = model("clothes", clothesSchema);

module.exports = { Cloth, joiSchema, statusJoiSchema };
