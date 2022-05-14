import { Cta } from "components";
import { MdOutlineKeyboardArrowRight } from "icons";
import { useRef, useState } from "react";
import { useNotifyUser, useAuthProvider } from "contexts";
import "./index.css";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser, signupUser } from "networkCalls";
export function Login() {
  const navigate = useNavigate();
  const { setLogin } = useAuthProvider();
  const location = useLocation();
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const { toast } = useNotifyUser();
  const [validatedCredentials, validteCredentials] = useState({
    email: false,
    password: false,
  });

  const [testCredentials, setTestCredentials] = useState(null);

  const submitLoginForm = async (e) => {
    e.preventDefault();
    if (emailInput.current.value === "" && passwordInput.current.value !== "")
      validteCredentials({ email: true, password: false });
    else if (
      passwordInput.current.value === "" &&
      emailInput.current.value !== ""
    )
      validteCredentials({ email: false, password: true });
    else if (
      passwordInput.current.value === "" &&
      emailInput.current.value === ""
    )
      validteCredentials({ email: true, password: true });
    else {
      const loginResponse = await loginUser({
        email: emailInput.current.value,
        password: passwordInput.current.value,
      });
      setLogin(true);
      navigate(location.state?.from?.pathname ?? "/", { replace: true });
    }

    try {
    } catch (e) {
      if (e.response.status === 401) {
        toast.error("Invalid email or password. Please try again.");
      } else if (e.response.status === 404) {
        toast.error("No user found with this email. Please try again.");
      } else {
        toast.error("Unexpected error. Please try again in some time.");
      }
    }
  };
  return (
    <div className="auth-form">
      <h2>SparkWind</h2>
      <form onSubmit={submitLoginForm}>
        <center>
          <h2>Login</h2>
        </center>
        <div>
          <label>Email address</label>
          <input
            type="email"
            placeholder="email"
            ref={emailInput}
            value={testCredentials && testCredentials.tesetEmail}
            onChange={() =>
              validteCredentials((prev) => ({
                ...prev,
                email: false,
              }))
            }
          />
          {validatedCredentials.email && <p>Please Provide Email</p>}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            placeholder="********"
            ref={passwordInput}
            value={testCredentials && testCredentials.testPassword}
            onChange={() =>
              validteCredentials((prev) => ({
                ...prev,
                password: false,
              }))
            }
          />
          {validatedCredentials.password && <p>Please Provide password</p>}
        </div>
        <div className="flex-H-space-bw">
          <div className="flex-H-center-V">
            <input type="checkbox" className="checkbox" />
            <p>Remember Me</p>
          </div>
          <p>Forgot Your Password</p>
        </div>
        <div>
          <Cta type={"primary-cta"} text={"Login"} />
        </div>
        <div
          onClick={() =>
            setTestCredentials({
              tesetEmail: "adarshbalika@gmail.com",
              testPassword: "adarshBalika1234",
            })
          }
        >
          <Cta type={"primary-cta"} text={"TestLogin"} />
        </div>

        <div className="account-info">
          <p>Create New Acccount</p>
          <MdOutlineKeyboardArrowRight className="icon" />
        </div>
      </form>
    </div>
  );
}

export function Signup() {
  return (
    <div className="auth-form">
      <h2>SparkWind</h2>
      <form>
        <center>
          <h2>Signup</h2>
        </center>
        <div>
          <label>Fullname</label>
          <input type="text" placeholder="name" />
        </div>
        <div>
          <label>Username</label>
          <input type="text" placeholder="username" />
        </div>
        <div>
          <label>Email address</label>
          <input type="email" placeholder="email" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" placeholder="********" />
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="password" placeholder="********" />
        </div>

        <div className="flex-H-center-V">
          <input type="checkbox" className="checkbox" />
          <p>I accept all terms and conditions</p>
        </div>

        <div>
          <Cta type={"primary-cta"} text={"Signup"} />
        </div>
        <div className="account-info">
          <p>Already have an account</p>
          <MdOutlineKeyboardArrowRight className="icon" />
        </div>
      </form>
    </div>
  );
}
