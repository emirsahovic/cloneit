import Container from "../components/Container";
import Select from "react-select";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUsersProfile } from "../redux/users/userSlice";

const options = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
  { value: "Prefer not to respond", label: "Prefer not to respond" },
];

const customStyles = {
  control: (base) => ({
    ...base,
    background: "#ededed",
    borderWidth: "1px",
    boxShadow: "none",
    padding: "5.8px",
    borderRadius: "8px",
  }),
  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#000",
    };
  },
};

const MyProfile = () => {
  const dispatch = useDispatch();
  const { user, isLoadingUsersProfile, isSuccessUsersProfile, isErrorUsersProfile, messageUsersProfile } = useSelector((state) => state.user);

  const [phoneNumber, setPhoneNumber] = useState("");
  const [focus, setFocus] = useState(false);
  const [blur, setBlur] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: user ? user.first_name : "",
      middleName: user ? user.middle_name : "",
      lastName: user ? user.last_name : "",
      gender: user ? user.gender : "",
      email: user ? user.email : "",
      county: user ? user.county : "",
      street: user ? user.street : "",
      apartment: user ? user.apartment : "",
      city: user ? user.city : "",
      state: user ? user.state : "",
      zip: user ? user.zip : "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      middleName: Yup.string(),
      lastName: Yup.string().required("Required"),
      gender: Yup.mixed().required("Required"),
      email: Yup.string().email("Enter a valid email address").required("Required"),
      county: Yup.string().required("Required"),
      street: Yup.string().required("Required"),
      apartment: Yup.string().required("Required"),
      city: Yup.string().required("Required"),
      state: Yup.string().required("Required"),
      zip: Yup.string().required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values, phoneNumber);
    },
  });

  useEffect(() => {
    dispatch(getUsersProfile());
  }, [dispatch]);

  if (isLoadingUsersProfile) {
    return <h1 className="text-center text-3xl font-bold">Loading...</h1>;
  }

  return (
    <div>
      <Container>
        <h1 className="text-center text-3xl md:text-4xl font-bold mt-8 md:mt-14">Edit Your Profile</h1>
        <div className="mx-auto bg-green-400 w-44 h-1 mt-1"></div>
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col space-y-6 items-center md:items-start md:flex-row md:justify-center md:space-x-6 md:space-y-0 mt-16">
            <div>
              <p className="mb-1 font-medium">First Name</p>
              <input
                name="firstName"
                onKeyPress={(e) => {
                  if (new RegExp(/[a-zA-Z]/).test(e.key)) {
                  } else e.preventDefault();
                }}
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                className="bg-[#ededed] px-2 py-3 outline-none rounded-lg border-[1px] border-slate-300"
              />
              {formik.touched.firstName && formik.errors.firstName && <p className="text-red-600 text-sm ml-1 mt-1">{formik.errors.firstName}</p>}
            </div>
            <div>
              <p className="mb-1 font-medium">Middle Name</p>
              <input
                name="middleName"
                onKeyPress={(e) => {
                  if (new RegExp(/[a-zA-Z]/).test(e.key)) {
                  } else e.preventDefault();
                }}
                value={formik.values.middleName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="bg-[#ededed] px-2 py-3 outline-none rounded-lg border-[1px] border-slate-300"
              />
            </div>
            <div>
              <p className="mb-1 font-medium">Last Name</p>
              <input
                name="lastName"
                onKeyPress={(e) => {
                  if (new RegExp(/[a-zA-Z]/).test(e.key)) {
                  } else e.preventDefault();
                }}
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="bg-[#ededed] px-2 py-3 outline-none rounded-lg border-[1px] border-slate-300"
              />
              {formik.touched.lastName && formik.errors.lastName && <p className="text-red-600 text-sm ml-1 mt-1">{formik.errors.lastName}</p>}
            </div>
          </div>
          <div className="flex flex-col space-y-6 items-center md:items-start md:flex-row md:justify-center md:space-x-6 md:space-y-0 mt-6 md:mt-12">
            <div>
              <p className="mb-1 font-medium">Gender</p>
              <Select
                name="gender"
                className="w-[16.75rem]"
                styles={customStyles}
                options={options}
                value={formik.values.gender}
                onChange={(value) => formik.setFieldValue("gender", value)}
                placeholder={`${user && user.gender !== undefined ? user.gender : "Select..."} `}
              />
              {formik.touched.gender && formik.errors.gender && <p className="text-red-600 text-sm ml-1 mt-1">{formik.errors.gender}</p>}
            </div>
            <div>
              <p className="mb-1 font-medium">Email Address</p>
              <input
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="bg-[#ededed] py-3 px-2 outline-none rounded-lg border-[1px] border-slate-300"
              />
              {formik.touched.email && formik.errors.email && <p className="text-red-600 text-sm ml-1 mt-1">{formik.errors.email}</p>}
            </div>
            <div>
              <p className="mb-1 font-medium">Phone Number</p>
              <PhoneInput
                value={phoneNumber || user?.phone_number}
                onChange={setPhoneNumber}
                onFocus={() => setFocus(true)}
                onBlur={() => setBlur(true)}
                defaultCountry="US"
                className="w-[16.75rem] bg-[#ededed] pl-3 rounded-lg border-[1px] border-slate-300"
              />
              {!phoneNumber && focus && blur && <p className="text-red-600 text-sm ml-1 mt-1">Required</p>}
            </div>
          </div>
          <div className="flex justify-center mt-14">
            <div className="border-[1px] border-green-400 bg-[#f2f2f2] py-12 px-10 md:px-36 rounded-lg">
              <h3 className="text-[1.6rem] font-bold">Full mailing address</h3>
              <div className="flex flex-col space-y-6 items-center md:items-start md:flex-row md:space-y-0 md:space-x-14 mt-8">
                <div>
                  <p className="mb-1 font-medium">County</p>
                  <input
                    name="county"
                    value={formik.values.county}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-[#ededed] px-2 py-3 outline-none rounded-lg border-[1px] border-slate-300"
                  />
                  {formik.touched.county && formik.errors.county && <p className="text-red-600 text-sm ml-1 mt-1">{formik.errors.county}</p>}
                </div>
                <div>
                  <p className="mb-1 font-medium">Street</p>
                  <input
                    name="street"
                    value={formik.values.street}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-[#ededed] px-2 py-3 outline-none rounded-lg border-[1px] border-slate-300"
                  />
                  {formik.touched.street && formik.errors.street && <p className="text-red-600 text-sm ml-1 mt-1">{formik.errors.street}</p>}
                </div>
              </div>
              <div className="flex flex-col space-y-6 items-center md:items-start md:flex-row md:space-y-0 md:space-x-14 mt-6">
                <div>
                  <p className="mb-1 font-medium">Apartment</p>
                  <input
                    name="apartment"
                    value={formik.values.apartment}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-[#ededed] px-2 py-3 outline-none rounded-lg border-[1px] border-slate-300"
                  />
                  {formik.touched.apartment && formik.errors.apartment && <p className="text-red-600 text-sm ml-1 mt-1">{formik.errors.apartment}</p>}
                </div>
                <div>
                  <p className="mb-1 font-medium">City</p>
                  <input
                    onKeyPress={(e) => {
                      if (new RegExp(/[a-zA-Z]/).test(e.key)) {
                      } else e.preventDefault();
                    }}
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-[#ededed] px-2 py-3 outline-none rounded-lg border-[1px] border-slate-300"
                  />
                  {formik.touched.city && formik.errors.city && <p className="text-red-600 text-sm ml-1 mt-1">{formik.errors.city}</p>}
                </div>
              </div>
              <div className="flex flex-col space-y-6 items-center md:items-start md:flex-row md:space-y-0 md:space-x-14 mt-6">
                <div>
                  <p className="mb-1 font-medium">State</p>
                  <input
                    onKeyPress={(e) => {
                      if (new RegExp(/[a-zA-Z]/).test(e.key)) {
                      } else e.preventDefault();
                    }}
                    name="state"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-[#ededed] px-2 py-3 outline-none rounded-lg border-[1px] border-slate-300"
                  />
                  {formik.touched.state && formik.errors.state && <p className="text-red-600 text-sm ml-1 mt-1">{formik.errors.state}</p>}
                </div>
                <div>
                  <p className="mb-1 font-medium">ZIP Code</p>
                  <input
                    name="zip"
                    value={formik.values.zip}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-[#ededed] px-2 py-3 outline-none rounded-lg border-[1px] border-slate-300"
                  />
                  {formik.touched.zip && formik.errors.zip && <p className="text-red-600 text-sm ml-1 mt-1">{formik.errors.zip}</p>}
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-500 text-white text-lg font-bold mt-10 py-3 px-8 rounded-md mb-16 md:mb-10 hover:opacity-90 duration-200"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default MyProfile;
