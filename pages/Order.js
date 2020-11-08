import Router from 'next/router'
import styles from '../styles/Order.module.css'
import { useRef, useState } from 'react'
import axios from 'axios'

function Order() {
  const [ orderDetails, setOrderDetails ] = useState(`  Shakib Al Hasan
  01712233445
  10/81 Tejkuni para, Mohagonj, Kumilla
  500
  come on at 5 pm`);

  const getOrderDetailsEl = useRef();
  const nameEl = useRef();
  const phoneEl = useRef();
  const addressEl = useRef();
  const amountEl = useRef();
  const messageEl = useRef();

  const autoFill = () => {
    let getOrderDetails = getOrderDetailsEl.current.value;

    if(getOrderDetails === '' ) {
     window.alert('Please fill the textarea')

    } else {
      let orderArray = getOrderDetails.match(/[^\r\n]+/g);

      // console.log(orderArray)

      orderArray = orderArray.map((item) => item.trim());
      nameEl.current.value = orderArray[0];

      if(orderArray[1] === undefined){
        phoneEl.current.value = ''
      } else{
        phoneEl.current.value = orderArray[1];
      }

      if(orderArray[2] === undefined){
        addressEl.current.value = ''
      } else{
        addressEl.current.value = orderArray[2];
      }

      if(orderArray[3] === undefined){
        amountEl.current.value = ''
      } else{
        amountEl.current.value = orderArray[3];
      }

      if(orderArray[4] === undefined){
        messageEl.current.value = ''
      } else{
        messageEl.current.value = orderArray[4];
      }
    }
  };

  const submitOrder = (event) => {
    event.preventDefault();

    const orderData = {
      name: nameEl.current.value,
      phone: phoneEl.current.value,
      address: addressEl.current.value,
      amount: amountEl.current.value,
      message: messageEl.current.value
    }

    const token = localStorage.getItem('token');
    // console.log(orderData)


    axios.post('https://now-quiz.vercel.app/api/order', orderData, {
      headers: { token: token }
    })
      .then(res => {
        res
        return Router.push('/OrderSuccessful')
      })
      .catch(err => {
        err
      })

  };

  const logoutHandle = (e) => {

    localStorage.clear()
    return Router.push('/')
  }


  return (
    <div className='container'>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.navbar_container}>
          <div>
            <span className={styles.navbar_hello_text}>Hi! </span>
            <span className={styles.navbar_name_text}> there </span>
          </div>
          <button onClick={logoutHandle} className={styles.logout_btn}>Logout</button>
        </div>
      </nav>

      {/* Order Form */}
      <div className={styles.order_form_container}>
        <div className={styles.order_form_wrap}>

          <h1>Order</h1>

          <div className={styles.order_form_textarea}>
            <textarea value={orderDetails} onChange={ (e) => setOrderDetails(e.target.value)} ref={getOrderDetailsEl} rows='5'></textarea>
          </div>

          <button type="submit" onClick={autoFill} className={styles.autofill_btn}>Auto fill</button>

          <form onSubmit={() => submitOrder(event)}>
            <div className={styles.order_form_group}>
              <label htmlFor="full_name">Name</label>
              <input ref={nameEl} type="text" name="full_name" id="full_name" placeholder="Eg: John Doe" required />
            </div>

            <div className={styles.order_form_group}>
              <label htmlFor="phone">Phone</label>
              <input ref={phoneEl} type="number" name="phone" id="phone" placeholder="Eg: +8801832089083" required/>
            </div>

            <div className={styles.order_form_group}>
              <label htmlFor="address">Address</label>
              <input ref={addressEl} type="address" name="address" id="address" placeholder="Eg: Wari, Dhaka -1203" required/>
            </div>

            <div className={styles.order_form_group}>
              <label htmlFor="amount">Amount</label>
              <input ref={amountEl} type="number" name="amount" id="amount" placeholder="Eg: 5000" required/>
            </div>

            <div className={styles.order_form_group}>
              <label htmlFor="message">Message</label>
              <textarea ref={messageEl} name="message" id="message" placeholder="Eg: Hello there" required></textarea>
            </div>

            <button type="submit" className={styles.order_btn}>Order</button>
          </form>
        </div>
      </div>
      <footer className='footer'>
          <p>Created by <a href="https://raihanahmad.netlify.app/" target="_blank">Raihan Ahmad</a></p>
      </footer>
    </div>
  )
}

export default Order
