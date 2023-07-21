import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import "./style/app.css"

const PasswordReset = () => {

  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");

  const setVal = (e) => {
    setEmail(e.target.value)
  }

  const sendLink = async (e) => {
    e.preventDefault();

    if (email === "") {
      toast.error("email is required!", {
        position: "top-center"
      });
    } else if (!email.includes("@")) {
      toast.warning("includes @ in your email!", {
        position: "top-center"
      });
    } else {
      const res = await fetch("/sendpasswordlink", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (data.status == 201) {
        setEmail("");
        setMessage(true)
      } else {
        toast.error("Invalid User", {
          position: "top-center"
        })
      }
    }
  }

  return (
    <>
      <section className="login-section">
        <div className="reset-container">
          <div className="reset-heading">
            <h1>Reset Password</h1>
          </div>

          {message ? <p style={{ color: "green", fontWeight: "bold" }}>Reset Password link sent successfully to your Email</p> : ""}
          <form>
            <div className="reset_input">
              <br />
              <label htmlFor="email">Email</label>
              <br />
              <input className="reset-inp" type="email" value={email} onChange={setVal} name="email" id="email" placeholder='Enter Your Email Address' />
              <br/>
            </div>
            <br/>
            <button className='btn-login' onClick={sendLink}>Send</button>
          </form>
          <ToastContainer />
        </div>
      </section>
    </>
  )
}

export default PasswordReset