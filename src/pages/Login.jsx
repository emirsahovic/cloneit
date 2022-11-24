import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setErrorLoginToNo } from "../redux/auth/authSlice";
import { useEffect } from "react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoadingLogin, isSuccessLogin, isErrorLogin, messageLogin } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Enter a valid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(loginUser(values));
      resetForm();
    },
  });

  useEffect(() => {
    if (isSuccessLogin) {
      navigate("/");
    }

    if (isErrorLogin) {
      setTimeout(() => {
        dispatch(setErrorLoginToNo());
      }, 5000);
    }
  }, [isSuccessLogin, isErrorLogin, navigate, dispatch]);

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white py-10 px-12 rounded-lg my-32 md:mt-64">
        <h2 className="font-bold text-2xl mb-8">Sign In</h2>
        {isErrorLogin && <p className="text-red-500 font-semibold rounded-md mb-2">{messageLogin}</p>}
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col">
            <input
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              className="rounded-md block bg-[#eee] p-3 mt-4 outline-none"
              placeholder="Email Address"
            />
            {formik.touched.email && formik.errors.email && <p className="text-red-600 text-sm ml-1 mt-1">{formik.errors.email}</p>}
            <input
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
              className="rounded-md block bg-[#eee] p-3 mt-4 outline-none"
              placeholder="Password"
            />
          </div>
          {formik.touched.password && formik.errors.password && <p className="text-red-600 text-sm ml-1 mt-1">{formik.errors.password}</p>}
          <button
            disabled={isLoadingLogin}
            type="submit"
            className="bg-green-500 px-14 py-2 text-white mt-12 rounded-md font-bold text-lg hover:opacity-90 duration-200"
          >
            {isLoadingLogin ? "Loading..." : "Sign In"}
          </button>
        </form>
        <Link to="/signup" className="inline-block mt-1 text-blue-500 hover:opacity-80 duration-200">
          Don't have an account?
        </Link>
      </div>
    </div>
  );
};

export default Login;
