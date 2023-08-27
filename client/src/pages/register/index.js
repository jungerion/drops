import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
// import styles from "../../styles/register.module.css";
import styles from "../../styles/register.module.css";

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  phoneNumber: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  // email: Yup.string().email("Invalid email").required("Required"),
});

const Register = () => {
  const handleRegister = (values) => {
    // debugger;
    fetch("http://localhost:3005/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
  };
  return (
    <div className="styles.form">
      <h1>Signup</h1>
      <Formik
        initialValues={{
          fullName: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          // same shape as initial values
          handleRegister(values);
          console.log(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name="fullName" placeholder="fullName" />
            {errors.fullName && touched.fullName ? (
              <div>{errors.fullName}</div>
            ) : null}{" "}
            <br />
            <Field name="phoneNumber" placeholder="phoneNumber" />
            {errors.phoneNumber && touched.phoneNumber ? (
              <div>{errors.phoneNumber}</div>
            ) : null}
            <br />
            <Field name="password" type="password" placeholder="password" />
            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}{" "}
            <br />
            <Field
              name="confirmPassword"
              type="confirmPassword"
              placeholder="confirmPassword"
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <div>{errors.confirmPassword}</div>
            ) : null}{" "}
            <br />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;