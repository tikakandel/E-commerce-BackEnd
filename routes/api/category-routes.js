const router = require("express").Router();
///const { Where } = require('sequelize/types/lib/utils');
//onst sequelize = require('../../config/connection');
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: {
      model: Product,
      attributes: ["product_name", "price", "stock"],
    },
  })
    .then((categoryData) => res.json(categoryData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const { id } = req.params;
  Category.findOne({
    where: {
            id, // or id:req.params.id,
            },

    include: {
      model: Product,
    },
  })
    .then((categoryData) => {
      if (!categoryData) {
        res.status(404).json({ message: "No Category found with that ID." });
        return;
      }
      res.status(200).json(categoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  // create a new category

  Category.create({
    category_name: req.body.category_name,
     })
    .then((categoryData) => {
      res.status(200).json(categoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.put("/:id", (req, res) => {
  // update a category by its `id` value
  const { id } = req.params;
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id, //id: req.params.id.
      },
    }
  )
    .then((categoryData) => {
      console.log(categoryData);
      if (!categoryData) {
        res.status(404).json({ message: "No Category found with that ID." });
        return;
      }
      res.json(categoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//Personally deleating Category is not ideal as it has many product related best to upedat the category or move product to differnt category
//however in event You need to delete the product related to this category that will be different
router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  // const { id } = req.params;
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })

    .then((categoryData) => {
      console.log(categoryData);
      if (!categoryData) {
        res.status(404).json({ message: "No Category found with that ID." });
        return;
      }
      res.status(200).json(categoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
