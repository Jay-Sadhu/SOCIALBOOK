import React, { useState } from 'react'
import { NavLink } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./mix.css"

const Register = () => {

    const [passShow, setPassShow] = useState(false);
    const [cpassShow, setCPassShow] = useState(false);
    const handleTogglePassword = () => {
      setPassShow(!passShow);
    };
    const handleToggleConfirmPassword = () => {
      setCPassShow(!cpassShow);
    };

    const [inpval, setInpval] = useState({
        fname: "",
        email: "",
        password: "",
        cpassword: ""
    });


    const setVal = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    };

    const addUserdata = async (e) => {
        e.preventDefault();

        const { fname, email, password, cpassword } = inpval;

        if (fname === "") {
            toast.warning("fname is required!", {
                position: "top-center"
            });
        } else if (email === "") {
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
        } else if (cpassword === "") {
            toast.error("cpassword is required!", {
                position: "top-center"
            });
        }
        else if (cpassword.length < 6) {
            toast.error("confirm password must be 6 char!", {
                position: "top-center"
            });
        } else if (password !== cpassword) {
            toast.error("pass and Cpass are not matching!", {
                position: "top-center"
            });
        } else {
            // console.log("user registration succesfully done");


            const data = await fetch("/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fname, email, password, cpassword
                })
            });

            const res = await data.json();
            // console.log(res.status);

            if (res.status === 201) {
                toast.success("Registration Successfully done 😃!", {
                    position: "top-center"
                });
                setInpval({ ...inpval, fname: "", email: "", password: "", cpassword: "" });
            }
        }
    }
  return (
    <section className="login-section">
      <div className="signup-container">
        <h1 className="signup-heading">SIGN UP</h1>

        <form className="login-form">
          <div className="form-input">
            <label htmlFor="fname">Name</label>
            <input type="text" onChange={setVal} value={inpval.fname} name="fname" id="fname" placeholder="Enter Your name" />
          </div>
          <div className="form-input">
            <label htmlFor="email">Email</label>
            <input type="email" onChange={setVal} value={inpval.email} name="email" id="email" placeholder="Enter Your Email Address" />
          </div>
          <div className="form-input">
            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input
                type={passShow ? 'text' : 'password'}
                onChange={setVal}
                value={inpval.password}
                name="password"
                id="password"
                placeholder="Enter Your Password"
                style={{ width: '100%' }} // Set the width to 100% to keep it consistent
              />
              <div className="showpass" onClick={handleTogglePassword}>
                {passShow ? 'Hide' : 'Show'}
              </div>
            </div>
          </div>

          <div className="form-input">
            <label htmlFor="password">Confirm Password</label>
            <div className="password-wrapper">
              <input
                type={cpassShow ? 'text' : 'password'}
                onChange={setVal}
                value={inpval.cpassword}
                name="cpassword"
                id="cpassword"
                placeholder="Confirm Your Password"
                style={{ width: '100%' }} // Set the width to 100% to keep it consistent
              />
              <div className="showpass" onClick={handleToggleConfirmPassword}>
                {cpassShow ? 'Hide' : 'Show'}
              </div>
            </div>
          </div>

          <button className="btn-login" onClick={addUserdata}>Signup</button>
          <p className="signup-link">Already have an Account? <NavLink to="/" className="navlink">Log in </NavLink></p>
        </form>
        <ToastContainer />
      </div>
    </section>
  );
};

export default Register;


// import React, { useState } from 'react'
// import { NavLink } from "react-router-dom"
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import "./mix.css"

// const Register = () => {

//     const [passShow, setPassShow] = useState(false);
//     const [cpassShow, setCPassShow] = useState(false);

//     const [inpval, setInpval] = useState({
//         fname: "",
//         email: "",
//         password: "",
//         cpassword: ""
//     });


//     const setVal = (e) => {
//         // console.log(e.target.value);
//         const { name, value } = e.target;

//         setInpval(() => {
//             return {
//                 ...inpval,
//                 [name]: value
//             }
//         })
//     };

//     const addUserdata = async (e) => {
//         e.preventDefault();

//         const { fname, email, password, cpassword } = inpval;

//         if (fname === "") {
//             toast.warning("fname is required!", {
//                 position: "top-center"
//             });
//         } else if (email === "") {
//             toast.error("email is required!", {
//                 position: "top-center"
//             });
//         } else if (!email.includes("@")) {
//             toast.warning("includes @ in your email!", {
//                 position: "top-center"
//             });
//         } else if (password === "") {
//             toast.error("password is required!", {
//                 position: "top-center"
//             });
//         } else if (password.length < 6) {
//             toast.error("password must be 6 char!", {
//                 position: "top-center"
//             });
//         } else if (cpassword === "") {
//             toast.error("cpassword is required!", {
//                 position: "top-center"
//             });
//         }
//         else if (cpassword.length < 6) {
//             toast.error("confirm password must be 6 char!", {
//                 position: "top-center"
//             });
//         } else if (password !== cpassword) {
//             toast.error("pass and Cpass are not matching!", {
//                 position: "top-center"
//             });
//         } else {
//             // console.log("user registration succesfully done");


//             const data = await fetch("/register", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({
//                     fname, email, password, cpassword
//                 })
//             });

//             const res = await data.json();
//             // console.log(res.status);

//             if (res.status === 201) {
//                 toast.success("Registration Successfully done 😃!", {
//                     position: "top-center"
//                 });
//                 setInpval({ ...inpval, fname: "", email: "", password: "", cpassword: "" });
//             }
//         }
//     }

//     return (
//         <>
//             <section>
//                 <div className="form_data">
//                     <div className="form_heading">
//                         <h1>Sign Up</h1>
//                         <p style={{ textAlign: "center" }}>We are glad that you will be using Project Cloud to manage <br />
//                             your tasks! We hope that you will get like it.</p>
//                     </div>

//                     <form>
//                         <div className="form_input">
//                             <label htmlFor="fname">Name</label>
//                             <input type="text" onChange={setVal} value={inpval.fname} name="fname" id="fname" placeholder='Enter Your Name' />
//                         </div>
//                         <div className="form_input">
//                             <label htmlFor="email">Email</label>
//                             <input type="email" onChange={setVal} value={inpval.email} name="email" id="email" placeholder='Enter Your Email Address' />
//                         </div>
//                         <div className="form_input">
//                             <label htmlFor="password">Password</label>
//                             <div className="two">
//                                 <input type={!passShow ? "password" : "text"} value={inpval.password} onChange={setVal} name="password" id="password" placeholder='Enter Your password' />
//                                 <div className="showpass" onClick={() => setPassShow(!passShow)}>
//                                     {!passShow ? "Show" : "Hide"}
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="form_input">
//                             <label htmlFor="password">Confirm Password</label>
//                             <div className="two">
//                                 <input type={!cpassShow ? "password" : "text"} value={inpval.cpassword} onChange={setVal} name="cpassword" id="cpassword" placeholder='Confirm password' />
//                                 <div className="showpass" onClick={() => setCPassShow(!cpassShow)}>
//                                     {!cpassShow ? "Show" : "Hide"}
//                                 </div>
//                             </div>
//                         </div>

//                         <button className='btn' onClick={addUserdata}>Sign Up</button>
//                         <p>Already have an account? <NavLink to="/">Log In</NavLink></p>
//                     </form>
//                     <ToastContainer />
//                 </div>
//             </section>
//         </>
//     )
// }

// export default Register