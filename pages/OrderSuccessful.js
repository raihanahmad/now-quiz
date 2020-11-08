import Router from 'next/router'
import styles from '../styles/OrderSuccessful.module.css'


function Login() {
  
  const backToOrderPage = () => {
    return Router.push('/Order')
  }

  return (
    <div className='container'>
      
      <div className={styles.order_successful_box}>
        <p>Your Order Is Successfull</p>
        <button onClick={backToOrderPage} >Order Page</button>
      </div>

    </div>
  )
}

export default Login