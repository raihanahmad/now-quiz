import styles from '../styles/SignUp.module.css'
import { useRef, useEffect } from 'react'
import Link from 'next/link'
import Axios from 'axios'
import Router from 'next/router'



function SignUp() {
  let nameEl = useRef();
  let emailEl = useRef();
  let passEl = useRef();

  const handleEmailSubmit = (event) => {
    event.preventDefault();
    
    let name = nameEl.current.value;
    let email = emailEl.current.value;
    let pass = passEl.current.value;

    const data = {
      "email": "eve.holt@reqres.in",
      "password": "pistol"
  }
    
    const checkToken = (restoken) => {
      let token = localStorage.getItem("token");

      if(token === restoken){
        localStorage.setItem("Login", 'Login');
        return Router.push('/Order')
      }

      // console.log(token)
    }

    Axios.post('https://reqres.in/api/register', data)
      .then(res => {
        let token = res.data.token
        checkToken(token)
      })
      .catch(err => {
        err
      })
  };

  useEffect(() => {
    
    if (localStorage.getItem("Login") === null) {
      // console.log("You are not logged in")
    } else {
      let Login = localStorage.getItem("Login");
      if(Login === 'Login'){
        localStorage.setItem("Login", 'Login');
        return Router.push('/Order')
      }
    }

    localStorage.setItem("token", 'QpwL5tke4Pnpja7X4');
  }, []);

  return (
    <div className='container'>
      <div className={styles.form_container}>
        <div className={styles.form_wrap}>

          <h1>Sign up</h1>

          <form onSubmit={handleEmailSubmit}>
            <div className={styles.form_group}>
              <label htmlFor="full_name">Full name</label>
              <input ref={nameEl} type="text" name="full_name" id="full_name" placeholder="Eg: John Doe" required />
            </div>

            <div className={styles.form_group}>
              <label htmlFor="email">Email</label>
              <input ref={emailEl} type="email" name="email" id="email" placeholder="Eg: johndoe@email.com" required/>
            </div>

            <div className={styles.form_group}>
              <label htmlFor="password">Password</label>
              <input ref={passEl} type="password" name="password" id="password" placeholder="Eg: JohnDoe#53" required/>
            </div>

            <button type="submit" className={styles.signup_btn}>Sign up</button>
            <p className={styles.already_account_text} >Already have an account? <Link href="/Login"><a> Log in</a></Link></p>
          </form>

        </div>
      </div>

      <footer className='footer'>
          <p>Created by <a href="https://raihanahmad.netlify.app/" target="_blank">Raihan Ahmad</a></p>
      </footer>
    </div>
  )
}

export default SignUp