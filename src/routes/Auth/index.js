import { Cta } from "../../components";
import { MdOutlineKeyboardArrowRight } from "../../icons";
import "./index.css";
export function Login() {
  return (
    <div className="auth-form">
      <h2>SparkWind</h2>
      <form>
        <center>
          <h2>Login</h2>
        </center>
        <div>
          <label>Email address</label>
          <input type="email" placeholder="email" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" placeholder="********" />
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
        <div>
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
