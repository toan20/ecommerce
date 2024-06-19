const Category = require("../models/categoryModel");
const Produce = require("../models/produceModel");

class produceController {
  async index(req, res, next) {
    try {
      const produces = await Produce.find({}).populate("category").lean();
      const categories = await Category.find({}).lean();
      res.render("admin/produce", { categories, produces });
    } catch (err) {
      next(err);
    }
  }
  create(req, res, next) {
    const createProduce = new Produce(req.body);
    createProduce
      .save()
      .then(function () {
        res.send("thành công");
      })
      .catch(function () {
        return next;
      });
  }
  destroy(req, res, next) {
    Produce.deleteOne({ _id: req.params.id })
      .then(() => {
        res.send("Thành công");
      })
      .catch(next);
  }
  getDataUpdate(req, res, next) {
    Produce.findById(req.params.id)
      .populate("category")
      .then((Produce) => {
        res.json(Produce);
      })
      .catch(next);
  }
  update(req, res, next) {
    Produce.updateOne({ _id: req.params.id }, req.body)
      .then(() => {
        res.send("Thành công");
      })
      .catch(next);
  }
  getData(req, res, next) {
    Produce.find({})
      .populate("category")
      .lean()
      .then((data) => res.json(data));
  }
}

module.exports = new produceController();
