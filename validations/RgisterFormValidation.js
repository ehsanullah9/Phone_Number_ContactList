import Validator from "fastest-validator";

const v = new Validator();

const RegisterValidatorSchema = {
  firstname: {
    type: "string",
    min: 3,
    max: 15,
    trim: true,
    messages: {
      stringMin: "اسم حداقل سه کراکتر باشد",
      stringMax: "اسم بیشتر از پانزده حرف بوده نمیتواند",
      required: "اسم ضروری میباشد",
    },
  },
  lastname: {
    type: "string",
    min: 3,
    max: 15,
    trim: true,
    messages: {
      stringMin: "تخلص حداقل سه کراکتر باشد",
      stringMax: "تخلص بیشتر از پانزده حرف بوده نمیتواند",
      required: "تخلص ضروری میباشد",
    },
  },
  gender: {
    type: "enum",
    values: ["male", "female"],
    messages: {
      enumValue: "جنسیت ضروری میباشد",
      required: "جنسیت ضروری میباشد",
    },
  },
  email: {
    type: "string",
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    messages: {
      stringPattern: "ایمیل وارد شده معتبر نیست",
      required: "ایمیل ضروری میباشد",
    },
  },
  password: {
    type: "string",
    min:8,
    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    messages: {
    stringMin: "رمز ضروری میباشد",
      stringPattern: "رمز باید حداقل ۸ کراکتر باشد و شامل حروف بزرگ و کوچک و عدد باشد",
    },
  },
};

const validateRegisterform = v.compile(RegisterValidatorSchema);
export default validateRegisterform;
