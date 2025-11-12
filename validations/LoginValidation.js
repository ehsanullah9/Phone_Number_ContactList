import validator from "fastest-validator";

const v = new validator();

const LoginValidationSchema = {
  email: {
    type: "string",
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    messages: {
      stringPattern: "ایمل یا پسورد اشتباه است",
      stringMin:"پسورد  یا ایمل اشتباه است"
    },
  },
  password: {
    type: "string",
    min: 8,
    pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    messages: {
      stringMin:"پسورد  یا ایمل اشتباه است",
      stringPattern: "پسورد یا ایمل اشتباه است",
    },
  },
};

const LoginValidation = v.compile(LoginValidationSchema);
export default LoginValidation;
