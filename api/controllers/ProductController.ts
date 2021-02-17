// Product = require('../models/ProductModel');
// const {verifyToken} = require('../utils/Token');
//
// const priorities = ['Low', 'Medium', 'High'];
//
// exports.index = function (req, res) {
//   Product.get(function (err, rows) {
//     if (err) {
//       res.json({
//         status: "error",
//         message: err,
//       });
//     }
//     res.json({
//       status: "success",
//       message: "Contacts retrieved successfully",
//       data: rows
//     });
//   });
// };
//
// // Handle create contact actions
// exports.new = function (req, res) {
//   verifyToken(req, (data) => {
//     if (!data.status) res.status(403).send();
//   });
//
//   console.log(JSON.stringify(req.body));
//
//   const product = new Product();
//   product.id = req.body.id;
//   product.name = req.body.name ? req.body.name : product.name;
//   product.priority = priorities.indexOf(req.body.priority) !== -1 ? req.body.priority : "Low";
//   product.user = req.body.user;
//
//   // save the contact and check for errors
//   product.save(function (err) {
//     if (err) console.log(`Product adding error: ${JSON.stringify(err)}`);
//     res.json({
//       message: 'New product added!',
//       data: product
//     });
//   });
// };
//
// exports.all = (req, res) => {
//   verifyToken(req, (data) => {
//     if (!data.status) res.status(403).send();
//   });
//
//   Product.find({}, (err, data) => {
//     if (err) res.send(err);
//
//     res.json({
//       message: "All products",
//       data: data
//     })
//   });
// }
//
// // exports.view = function (req, res) {
// //   Product.findById(req.params.user_id, function (err, contact) {
// //     if (err)
// //       res.send(err);
// //     res.json({
// //       message: 'Contact details loading..',
// //       data: contact
// //     });
// //   });
// // };
//
// // Handle update contact info
// exports.update = function (req, res) {
//   verifyToken(req, (data) => {
//     if (!data.status) res.status(403).send()
//   });
//
//   if ( typeof req.body.status === "undefined") { res.status(400).send(); return}
//
//   Product.findOne({id: req.params.product_id}, function (err, product) {
//     if (err) {
//       res.status(500).send(err);
//       return;
//     }
//     product.status = req.body.status;
//
//     product.save(function (err) {
//       if (err) {
//         res.status(500).json(err);
//         return;
//       }
//
//       res.json({
//         message: 'Product status updated',
//         data: product
//       });
//     });
//   });
// };
//
// // Handle delete contact
// exports.delete = function (req, res) {
//   verifyToken(req, (data) => {
//     if (!data.status) res.status(403).send();
//   });
//
//   Product.remove({
//     id: req.params.product_id
//   }, function (err, product) {
//     if (err)
//       res.send(err);
//     res.json({
//       status: "success",
//       message: 'Contact deleted'
//     });
//   });
// };