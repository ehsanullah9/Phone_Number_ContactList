const { Schema, model, models } = require("mongoose");

const contactSchema = new Schema({
  firstname: {
    type: String,
    minLength: [3, "اسم حداقل 3 کراکترباشد"],
    maxLength: [10, "اسم حداقل 3 کراکترباشد"],
    required: ["اسم ضروری است"],
  },
  lastname: {
    type: String,
    minLength: [3, "اسم حداقل 3 کراکترباشد"],
    maxLength: [10, "اسم حداقل 3 کراکترباشد"],
    required: ["اسم ضروری است"],
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
  phone: {
    type: String,
  },
});

const ContactM = models.ContactsModel || model("ContactsModel", contactSchema);

export default ContactM;
