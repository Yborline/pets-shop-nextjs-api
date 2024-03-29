// const clothesOperations = require("../../models/clothes");
// const { Cloth } = require("../../models");
const { sendEmail } = require("../../helpers");

const sendMail = async (req, res) => {
  const {
    numberOrder,
    clothes,
    summary,
    name,
    surname,
    phone,
    number,
    city,
    email,
    service,
  } = req.body;

  const mail = {
    from: "kotovanasta1512032002@gmail.com",
    subject: `Новий заказ`,
    html: `<h1>Номер замовлення : ${numberOrder}</h1>
    <h2>Сумма заказа : ${summary}</h2>
    <p>${name} ${surname}</p>
    <p>Зв'язок : ${email} , ${phone}</p>
    <p>Почта : ${service}</p>
    <p>Місто: ${city} </p>
    <p>Відділення : ${number} </p>
${clothes.map(
  (item) =>
    `<p>${item.code} - розмір : ${item.allprice.size}, кол-во: ${item.amount} </p>`
)}
    `,
  };
  // поиск своих товаров только определенному юзеру
  // const { _id, name, email } = req.admin;

  // const clothes = await Cloth.find({ owner: _id }).populate(
  //   "owner",
  //   "_id name email"
  // );

  //   const clothesAll = await Cloth.find({});
  //   const clothes = await Cloth.find({}).populate("owner", "_id name email");
  try {
    await sendEmail(mail);
    res.json({
      status: "send Mail success",
    });
  } catch (error) {
    throw error.message;
  }
};

module.exports = sendMail;
