import Validator from "fastest-validator";

const v = new Validator();

const ContactVschema = {
  firstname: {
    type: "string",
    max: 15,
    min: 3,
    require: true,
    messages: {
      stringMin: "اسم حداقل سه کراکتر باشد",
      stringMax: "اسم بیشتر از پانزده حرف بوده نمیتواند",
      required: "اسم ضروری میباشد",
    },
  },
  lastname: {
    type: "string",
    max: 15,
    min: 3,
    require: true,
    messages: {
      stringMin: "تخلص حداقل سه کراکتر باشد",
      stringMax: "تخلص بیشتر از پانزده حرف بوده نمیتواند",
      required: "تخلص ضروری میباشد",
    },
  },
  gender: {
    type: "string",
    enum: ["male", "female"],
    require: true,
    messages: {
      stringEnum: "جنسیت ضزوزی است ضروری میباشد",
    },
  },
  age: {
    type: "number",
    integer: true,
    min: 18,
    max: 35,
    require: true,
    messages: {
      numberMin: "سن حداقل 18 کراکتر باشد",
      numberMax: "سن بیشتر از 35 حرف بوده نمیتواند",
      required: "سن ضروری میباشد",
    },
  },
  phone: {
    type: "string",
    integer: true,
    pattern: /^07\d{8}$/,
    messages: {
      stringPattern: "شماره وارد شده شماره معتبری نیست",
    },
  },
};

const validateContact = v.compile(ContactVschema);
export default validateContact;
