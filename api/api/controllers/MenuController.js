const Menu = require("../models/Menu");

 
const getAllMenu = async (req, res) => {
  try {
    const menus = await Menu.find({});
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllMenu,
};
