const mongoose = require('mongoose');

const CustomerSchema = mongoose.Schema({
  name: String,
});

const CustomerModal = mongoose.model('customer', CustomerSchema);

module.exports = CustomerModal;
