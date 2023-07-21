import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import "./style/app.css"

const Login = () => {
  const [passShow, setPassShow] = useState(false);

  const handleTogglePassword = () => {
    setPassShow(!passShow);
  };

  const history = useNavigate();

  const [inpval, setInpval] = useState({
    email: "",
    password: ""
  })

  const setVal = (e) => {
    const { name, value } = e.target;
    setInpval(() => {
      return {
        ...inpval,
        [name]: value
      }
    })
  };


  const loginuser = async (e) => {
    e.preventDefault();
    const { email, password } = inpval;
    if (email === "") {
      toast.error("email is required!", {
        position: "top-center"
      });
    } else if (!email.includes("@")) {
      toast.warning("includes @ in your email!", {
        position: "top-center"
      });
    } else if (password === "") {
      toast.error("password is required!", {
        position: "top-center"
      });
    } else if (password.length < 6) {
      toast.error("password must be 6 char!", {
        position: "top-center"
      });
    } else {
      const data = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email, password
        })
      });
      const res = await data.json();
      if (res.status === 201) {
        localStorage.setItem("usersdatatoken", res.result.token);
        history("/dash")
        setInpval({ ...inpval, email: "", password: "" });
      } else {
        toast.error("Invalid Credentials", {
          position: "top-center"
        });
      }
    }
  }

  return (
    <section className="login-section">
      <div className="login-container">
        <h1 className="form-heading">LOG IN</h1>

        <form className="login-form">
          <div className="form-input">
            <label htmlFor="email">Email</label>
            <input type="email" onChange={setVal} value={inpval.email} name="email" id="email" placeholder="Enter Your Email Address" />
          </div>
          <div className="form-input">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                type={passShow ? 'text' : 'password'}
                value={inpval.password}
                name="password"
                onChange={setVal}e
                id="password"
                placeholder="Enter Your Password"
                style={{ width: '100%' }} // Set the width to 100% to keep it consistent
              />
              <div className="showpass" onClick={handleTogglePassword}>
                {passShow ? 'Hide' : 'Show'}
              </div>
            </div>
          </div>

          <button className="btn-login" onClick={loginuser}>Login</button>
          {/* <p className="signup-link">Don't have an Account? <NavLink to="/Signup" className="navlink">Sign Up</NavLink></p> */}
          <p className="signup-link">Don't have an Account? <NavLink to="/register" className="navlink">Sign Up</NavLink></p>
          <p style={{ color: "black", fontWeight: "bold", alignItems:"center" }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Forgotten your Password?  <NavLink style={{ color: "black", fontWeight: "bold", alignItems:"center" }} to="/password-reset">Click Here</NavLink> </p>
        </form>
        <ToastContainer />
      </div>
    </section>
  );
};

export default Login;





// import React, { useState } from 'react'
// import { NavLink, useNavigate } from "react-router-dom"
// import { ToastContainer, toast } from 'react-toastify';
// import "./mix.css"

// const Login = () => {
//   const [passShow, setPassShow] = useState(false);
//   const [inpval, setInpval] = useState({
//     email: "",
//     password: "",
//   });


//   const history = useNavigate();

//   const setVal = (e) => {
//     const { name, value } = e.target;
//     setInpval(() => {
//       return {
//         ...inpval,
//         [name]: value
//       }
//     })
//   };


//   const loginuser = async (e) => {
//     e.preventDefault();
//     const { email, password } = inpval;
//     if (email === "") {
//       toast.error("email is required!", {
//         position: "top-center"
//       });
//     } else if (!email.includes("@")) {
//       toast.warning("includes @ in your email!", {
//         position: "top-center"
//       });
//     } else if (password === "") {
//       toast.error("password is required!", {
//         position: "top-center"
//       });
//     } else if (password.length < 6) {
//       toast.error("password must be 6 char!", {
//         position: "top-center"
//       });
//     } else {
//       const data = await fetch("/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           email, password
//         })
//       });
//       const res = await data.json();
//       if (res.status === 201) {
//         localStorage.setItem("usersdatatoken", res.result.token);
//         history("/dash")
//         setInpval({ ...inpval, email: "", password: "" });
//       } else {
//         toast.error("Invalid Credentials", {
//           position: "top-center"
//         });
//       }
//     }
//   }

//   return (
//     <>
//       <section>
//         <div className="form_data">
//           <div className="form_heading">
//             <h1>Welcome Back, Log In</h1>
//             <p>Hi, we are you glad you are back. Please login.</p>
//           </div>

//           <form>
//             <div className="form_input">
//               <label htmlFor="email">Email</label>
//               <input type="email" value={inpval.email} onChange={setVal} name="email" id="email" placeholder='Enter Your Email Address' />
//             </div>
//             <div className="form_input">
//               <label htmlFor="password">Password</label>
//               <div className="two">
//                 <input type={!passShow ? "password" : "text"} onChange={setVal} value={inpval.password} name="password" id="password" placeholder='Enter Your password' />
//                 <div className="showpass" onClick={() => setPassShow(!passShow)}>
//                   {!passShow ? "Show" : "Hide"}
//                 </div>
//               </div>
//             </div>

//             <button className='btn' onClick={loginuser}>Login</button>
//             <p>Don't have an Account? <NavLink to="/register">Sign Up</NavLink> </p>
//             <p style={{ color: "black", fontWeight: "bold" }}>Forgot Password  <NavLink to="/password-reset">Click Here</NavLink> </p>
//           </form>
//           <ToastContainer />
//         </div>
//       </section>
//     </>
//   )
// }

// export default Login