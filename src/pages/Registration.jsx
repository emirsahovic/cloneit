import * as Yup from "yup";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const options = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
  { value: "Not", label: "Prefer not to respond" },
];

const customStyles = {
  control: (base) => ({
    ...base,
    background: "#eee",
    border: 0,
    boxShadow: "none",
    padding: "4.8px",
  }),
};

const Registration = () => {
  const { isLoadingRegister, isSuccessRegister, isErrorRegister, messageRegister } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [phoneNumber, setPhoneNumber] = useState();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      gender: "",
      email: "",
      // phoneNumber: "",
      county: "",
      street: "",
      apartment: "",
      city: "",
      state: "",
      zip: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      middleName: Yup.string(),
      lastName: Yup.string().required("Required"),
      email: Yup.string().email("Enter a valid email address").required("Required"),
      // phoneNumber: Yup.string()
      //   .matches(/^[0-9]+$/, "Phone number must contain only digits")
      //   .min(8, "Phone number should contain at least 8 digits")
      //   .max(15, "Phone number cannot be longer than 15 digits")
      //   .required("Required"),
      county: Yup.string().required("Required"),
      street: Yup.string().required("Required"),
      apartment: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      zip: Yup.string().required("Required"),
      password: Yup.string()
        .matches(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
          "Password must contain 8 characters, one uppercase, one lowercase, one number and one special character"
        )
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords do not match")
        .required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(phoneNumber);
      resetForm();
    },
  });

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white py-10 px-12 rounded-lg my-12 lg:mt-44">
        <h2 className="font-bold text-2xl mb-8">Sign Up</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col md:flex-row md:space-x-12">
            <div>
              <input
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                className="rounded-md block bg-[#eee] p-3 outline-none"
                placeholder="First Name*"
              />
              {formik.touched.firstName && formik.errors.firstName && <p className="text-red-600 text-sm ml-1 mt-1">{formik.errors.firstName}</p>}
              <input
                name="middleName"
                value={formik.values.middleName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                className="rounded-md block bg-[#eee] p-3 mt-4 outline-none"
                placeholder="Middle Name (optional)"
              />
              {formik.touched.middleName && formik.errors.middleName && <p className="text-red-600 text-sm ml-1 mt-1">{formik.errors.middleName}</p>}
              <input
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                className="rounded-md block bg-[#eee] p-3 mt-4 outline-none"
                placeholder="Last Name*"
              />
              {formik.touched.lastName && formik.errors.lastName && <p className="text-red-600 text-sm ml-1 mt-1">{formik.errors.lastName}</p>}
              <Select
                className="mt-4"
                styles={customStyles}
                name="gender"
                options={options}
                value={formik.values.gender}
                onChange={(value) => formik.setFieldValue("gender", value)}
                placeholder="Gender"
              />
              {formik.touched.gender && formik.errors.gender && <p className="text-red-600 text-sm ml-1 mt-1">{formik.errors.gender}</p>}
              <input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                className="rounded-md block bg-[#eee] p-3 mt-4 outline-none"
                placeholder="Email Address*"
              />
              {formik.touched.email && formik.errors.email && <p className="text-red-600 text-sm ml-1 mt-1">{formik.errors.email}</p>}
              <PhoneInput
                placeholder="Enter phone number"
                defaultCountry="US"
                value={phoneNumber}
                onChange={setPhoneNumber}
                className="mt-4 ml-[1px] w-[17rem] bg-[#eee] pl-3 rounded-lg"
              />
              {/* <input
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                className="rounded-md block bg-[#eee] p-3 mt-4 outline-none"
                placeholder="Phone Number*"
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <p className="text-red-600 text-sm ml-1 mt-1">{formik.errors.phoneNumber}</p>
              )} */}
              <input
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password"
                className="rounded-md block bg-[#eee] p-3 mt-4 outline-none"
                placeholder="Password*"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-600 text-sm ml-1 mt-1 max-w-[17rem]">{formik.errors.password}</p>
              )}
              <input
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password"
                className="rounded-md block bg-[#eee] p-3 mt-4 outline-none"
                placeholder="Confirm Password*"
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <p className="text-red-600 text-sm ml-1 mt-1">{formik.errors.confirmPassword}</p>
              )}
            </div>
            <div>
              <input
                name="county"
                value={formik.values.county}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                className="rounded-md block bg-[#eee] mt-4 md:mt-0 p-3 outline-none"
                placeholder="County*"
              />
              {formik.touched.county && formik.errors.county && <p className="text-red-600 text-sm ml-1 mt-1">{formik.errors.county}</p>}
              <input
                name="street"
                value={formik.values.street}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                className="rounded-md block bg-[#eee] p-3 mt-4 outline-none"
                placeholder="Street*"
              />
              {formik.touched.street && formik.errors.street && <p className="text-red-600 text-sm ml-1 mt-1">{formik.errors.street}</p>}
              <input
                name="apartment"
                value={formik.values.apartment}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                className="rounded-md block bg-[#eee] p-3 mt-4 outline-none"
                placeholder="Apartment*"
              />
              {formik.touched.apartment && formik.errors.apartment && <p className="text-red-600 text-sm ml-1 mt-1">{formik.errors.apartment}</p>}
              <input
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                className="rounded-md block bg-[#eee] p-3 mt-4 outline-none"
                placeholder="City*"
              />
              {formik.touched.city && formik.errors.city && <p className="text-red-600 text-sm ml-1 mt-1">{formik.errors.city}</p>}
              <input
                name="state"
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                className="rounded-md block bg-[#eee] p-3 mt-4 outline-none"
                placeholder="State*"
              />
              {formik.touched.state && formik.errors.state && <p className="text-red-600 text-sm ml-1 mt-1">{formik.errors.state}</p>}
              <input
                name="zip"
                value={formik.values.zip}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                className="rounded-md block bg-[#eee] p-3 mt-4 outline-none"
                placeholder="ZIP*"
              />
              {formik.touched.zip && formik.errors.zip && <p className="text-red-600 text-sm ml-1 mt-1">{formik.errors.zip}</p>}
            </div>
          </div>
          <button type="submit" className="bg-green-500 px-14 py-3 text-white mt-12 rounded-md font-bold text-lg hover:opacity-90 duration-200">
            Sign Up
          </button>
        </form>
        <Link to="/signin" className="inline-block mt-1 text-blue-500 hover:opacity-80 duration-200">
          Already have an account?
        </Link>
      </div>
    </div>
  );
};

export default Registration;
