const Category = require("../models/categoryModel");

class categoryController {
  index(req, res, next) {
    Category.find({})
      .lean()
      .then((category) => {
        res.render("admin/category", { category });
      })
      .catch(next);
  }
  async create(req, res, next) {
    try {
      const createCategory = new Category(req.body);
      await createCategory.save();
      res.send("Thành công");
    } catch (error) {
      next(error);
    }
  }
  getDataUpdate(req, res, next) {
    Category.findById(req.params.id)
      .then((category) => {
        res.json(category);
      })
      .catch(next);
  }
  update(req, res, next) {
    Category.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.send("Thành công");
      })
      .catch(next);
  }
  destroy(req, res, next) {
    Category.deleteOne({ _id: req.params.id })
      .then(() => {
        res.send("Thành công");
      })
      .catch(next);
  }
  getData(req, res, next) {
    Category.find({})
      .lean()
      .then((data) => res.json(data));
  }
}

module.exports = new categoryController();
