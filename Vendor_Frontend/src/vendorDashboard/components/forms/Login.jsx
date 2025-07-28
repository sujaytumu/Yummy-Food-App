import React, { useState } from 'react';
import { API_URL } from '../../data/apiPath';
import { ThreeCircles } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

const Login = ({ showWelcomeHandler }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/vendor/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login success');
        setEmail("");
        setPassword("");

        // ✅ Save token
        localStorage.setItem('loginToken', data.token);

        const vendorId = data.vendorId;
        console.log("checking for VendorId:", vendorId);

        // ✅ Fetch vendor details
        const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);
        const vendorData = await vendorResponse.json();

        if (vendorResponse.ok && vendorData.vendor) {
          // ✅ Safe destructure with fallbacks
          const vendorFirmId = vendorData.vendor?.firm?.[0]?._id || "";
          const vendorFirmName = vendorData.vendor?.firm?.[0]?.firmName || "";
          const vendorUsername = vendorData.vendor?.username || "";
          const vendorEmail = vendorData.vendor?.email || "";

          // ✅ Save details
          localStorage.setItem('firmId', vendorFirmId);
          localStorage.setItem('firmName', vendorFirmName);
          localStorage.setItem('vendorUsername', vendorUsername);
          localStorage.setItem('vendorEmail', vendorEmail);

          showWelcomeHandler();

          // ✅ Optional small delay before reload
          setTimeout(() => {
            window.location.reload();
          }, 200);
        } else {
          alert("Login failed: Unable to fetch vendor details");
        }
      } else {
        alert("Login failed: Invalid credentials");
      }
    } catch (error) {
      alert("Login error: Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginSection">
      {loading && (
        <div className="loaderSection">
          <ThreeCircles
            visible={loading}
            height={100}
            width={100}
            color="#4fa94d"
            ariaLabel="three-circles-loading"
          />
          <p>Login in process... Please wait</p>
        </div>
      )}
      {!loading && (
        <form className="authForm" onSubmit={loginHandler} autoComplete="off">
          <h3>Vendor Login</h3>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="enter your email"
          /><br />
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="enter your password"
          /><br />
          <span className="showPassword" onClick={handleShowPassword}>
            {showPassword ? 'Hide' : 'Show'}
          </span>
          <div className="btnSubmit">
            <button type="submit">Submit</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
