import { LoadingButton } from "@mui/lab";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { TRegisterRequest } from "../../interfaces/user-interfaces";
import * as authService from "../../services/auth-service";
import "./RegisterForm.scss";

interface IRegisterProps {
  setHasAccount: (value: boolean) => void;
}
const RegisterForm = ({ setHasAccount }: IRegisterProps) => {
  const isSignIn = false;

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Trường này không được bỏ trống"),
    lastName: Yup.string().required("Trường này không được bỏ trống"),
    email: Yup.string()
      .email(
        "Email của bạn nhập không đúng. Xin vui lòng nhập lại hoặc liên hệ với admin"
      )
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleNavigateSignIn = () => {
    setHasAccount(true);
  };

  const handleSubmit = (values: TRegisterRequest) => {
    authService.register(values, handleNavigateSignIn);
  };

  return (
    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 register__form">
      <Formik
        initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => (
          <Form>
            <div className="divider d-flex align-items-center my-4">
              <div className="text-center fw-bold mx-3 mb-0 login-title">
                Đăng Ký
              </div>
            </div>

            <div className="form-outline mb-4 register__row">
              <div>
                <Field
                  type="text"
                  name="firstName"
                  id="form3Example3"
                  className={`form-control form-control-lg  ${
                    formikProps.errors.firstName &&
                    formikProps.touched.firstName &&
                    "login-error-field"
                  }`}
                  placeholder="Họ"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="login-error-text"
                />
              </div>

              <div>
                <Field
                  type="text"
                  name="lastName"
                  id="form3Example3"
                  className={`form-control form-control-lg  ${
                    formikProps.errors.lastName &&
                    formikProps.touched.lastName &&
                    "login-error-field"
                  }`}
                  placeholder="Tên"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="login-error-text"
                />
              </div>
            </div>

            <div className="form-outline mb-4">
              <Field
                type="email"
                name="email"
                id="form3Example3"
                className={`form-control form-control-lg  ${
                  formikProps.errors.email &&
                  formikProps.touched.email &&
                  "login-error-field"
                }`}
                placeholder="Enter a valid email address"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="login-error-text"
              />
            </div>

            <div className="form-outline mb-3">
              <Field
                type="password"
                name="password"
                id="form3Example4"
                className={`form-control form-control-lg  ${
                  formikProps.errors.password &&
                  formikProps.touched.password &&
                  "login-error-field"
                }`}
                placeholder="Enter password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="login-error-text"
              />
            </div>
            <div className="text-center text-lg-start mt-4 pt-2 login-actions">
              <LoadingButton
                loading={isSignIn}
                type="submit"
                variant="contained"
                className="btn btn-primary btn-lg btn-login"
              >
                Đăng Ký
              </LoadingButton>
              <p className="small fw-bold mt-2 pt-1 mb-0 text-center">
                Bạn đã có tài khoản?
                <a
                  href="#!"
                  className="link-danger"
                  onClick={() => setHasAccount(true)}
                >
                  Đăng nhập
                </a>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterForm;
