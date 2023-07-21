import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import "./style/app.css"

const ForgotPassword = () => {
  const [passShow, setPassShow] = useState(false);

  const handleToggleConfirmPassword = () => {
    setPassShow(!passShow);
  };

  const { id, token } = useParams();

  const history = useNavigate();

  const [data2, setData] = useState(false);

  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const userValid = async () => {
    const res = await fetch(`/forgotpassword/${id}/${token}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json()

    if (data.status == 201) {
      console.log("user valid")
    } else {
      history("*")
    }
  }


  const setval = (e) => {
    setPassword(e.target.value)
  }

  const sendpassword = async (e) => {
    e.preventDefault();

    if (password === "") {
      toast.error("password is required!", {
        position: "top-center"
      });
    } else if (password.length < 6) {
      toast.error("password must be 6 char!", {
        position: "top-center"
      });
    } else {
      const res = await fetch(`/${id}/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ password })
      });

      const data = await res.json()

      if (data.status == 201) {
        setPassword("")
        setMessage(true)
      } else {
        toast.error("! Token Expired generate new LInk", {
          position: "top-center"
        })
      }
    }
  }

  useEffect(() => {
    userValid()
    setTimeout(() => {
      setData(true)
    }, 3000)
  }, [])

  return (
    <>
      {
        data2 ? (
          <>
            <section className="login-section">
              <div className="reset-container">
                <div className="newpassword_heading">
                  <h1>New Password</h1>
                </div>

                <form>
                  {/* {message ? <p style={{ color: "green", fontWeight: "bold" ,marginTop: "-34px", marginBottom: "10px"}}>Password Successfully Updated! </p> : ""} */}
                  <div className="newpassword_side">
                    <label htmlFor="password">New password</label>
                  </div>
                  <div className="password-wrapper">
                  <input type={passShow ? 'text' : 'password'} style={{ width: '100%' }} value={password} onChange={setval} name="password" id="password" placeholder='Enter Your new password' />
                  <div className="showpass" onClick={handleToggleConfirmPassword}>
                    {passShow ? 'Hide' : 'Show'}
                  </div>
                  </div>
                  {message ? <p style={{ color: "green", fontWeight: "bold" ,marginTop: "14px", marginBottom: "-10px"}}>Password Successfully Updated! </p> : ""}
                  <br/>
                  <button className='btn' onClick={sendpassword}>Send</button>
                  <br/>
                </form>
                <p><NavLink to="/" style={{ color: "black", fontWeight: "bold", alignItems:"center" }}>Login</NavLink></p>
                <ToastContainer />
              </div>
            </section>
          </>
        ) : <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
          Loading... &nbsp;
          <CircularProgress />
        </Box>
      }
    </>
  )
}

export default ForgotPassword