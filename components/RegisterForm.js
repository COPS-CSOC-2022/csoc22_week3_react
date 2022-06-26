
/*import React, { useState } from 'react';










import axios from '../utils/axios';
import { useAuth } from '../context/auth';
import { useRouter } from 'next/router';
import { displaySuccessToast, displayInfoToast ,displayErrorToast} from '../components/alert';

export default function Register() {
  const { setToken } = useAuth();
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const registerFieldsAreValid = (
    firstName,
    lastName,
    email,
    username,
    password
  ) => {
    if (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      username === '' ||
      password === ''
    ) {
      
      displayInfoToast('Please fill all the details')
      return false;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
     displayInfoToast('Please enter a valid email address')
      return false
    }
    return true
  }

  const register = (e) => {
    e.preventDefault()

    if (
      registerFieldsAreValid(firstName, lastName, email, username, password)
    ) {
      displayInfoToast('Please wait')

      const dataForApiRequest = {
        name: firstName + ' ' + lastName,
        email: email,
        username: username,
        password: password,
      }

      axios.post(
        'auth/register/',
        dataForApiRequest,
      )
        .then(function ({ data, status }) {
          setToken(data.token);
          router.push('/');
        })
        .catch(function (err) {
          iziToast.destroy();
          displayErrorToast
          ('An account using same email id or password is created')
         
        })
    }
  }

  return (
    
    <div className="box">
     <form>
     <h1 className='mb-8 text-3xl text-center'>Register</h1>
     <div className="input-container">
        <input type="text" required=""
        name="inputUsername"
        id="inputUsername"
        value={username}
        onChange={(e) => setUsername(e.target.value)}/>
        <label
    
        >Username</label>		
    </div>
    <div className="input-container">

        <input type="text" required=""
        name="inputFirstName"
        id="inputFirstName"
        className='block border border-grey-light w-full p-3 rounded mb-4'
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}/>
        <label
    
        >Firstname</label>
        
    </div>
    <div className="input-container">
        <input type="text" required=""
       name="inputLastName"
       className='block border border-grey-light w-full p-3 rounded mb-4'
       id="inputLastName"
       value={lastName}
       onChange={(e) => setLastName(e.target.value)}/>
        <label
    
        >Lastname</label>		
    </div>
    <div className="input-container">
        <input type="text" required=""
        name="inputEmail"
        className='block border border-grey-light w-full p-3 rounded mb-4'
        id="inputEmail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}/>
        <label
    
        >Email</label>		
    </div>
    <div className="input-container">		
        <input type="password" required=""
        name="inputPassword"
        className='block border border-grey-light w-full p-3 rounded mb-4'
        id="inputPassword"
        value={password}
        onChange={(e) => setPassword(e.target.value)}/>
        <label
    
        >Password</label>
    </div>
        <button type="button" className="btn"
        onClick={register}>Register</button>
</form>	
</div>


);
}*/
/*import React, { useState } from 'react'
import axios from '../utils/axios'
import { useAuth } from '../context/auth'
import { useRouter } from 'next/router'
import { displaySuccessToast, displayInfoToast ,displayErrorToast} from '../components/alert'
/*import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { Store } from 'react-notifications-component';

  Store.addNotification({
      title: title,
      message: message,
      type: type,
      insert: "top",
      container: "top-center",
      animationIn: ["animate__animated", "animate__zoomInDown"],
      animationOut: ["animate__animated", "animate__zoomOutUp"],
      dismiss: {
        duration: 3000,
        onScreen: true
      }
  });
}*/

/*export default function Register() {
  const { setToken } = useAuth()
  const router = useRouter()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const registerFieldsAreValid = (
    firstName,
    lastName,
    email,
    username,
    password
  ) => {
    if (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      username === '' ||
      password === ''
    ) {
      
      displayInfoToast('Please fill all the fields correctly.');
      return false
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      displayErrorToast('Please enter a valid email address.');
      return false
    }
    return true
  }

  const register = (e) => {
    e.preventDefault()

    if (
      registerFieldsAreValid(firstName, lastName, email, username, password)
    ) {
      displayInfoToast('Please wait...');

      const dataForApiRequest = {
        name: firstName + ' ' + lastName,
        email: email,
        username: username,
        password: password,
      }

      axios.post(
        'auth/register/',
        dataForApiRequest,
      )
        .then(function ({ data, status }) {
          setToken(data.token)
          router.push('/')
        })
        .catch(function (err) {
          displayErrorToast('An account with same credentials exists already')
          
        })
    }
  }
  return (
    
    <div className="box">
     <form>
     <h1 className='mb-8 text-3xl text-center'>Register</h1>
     <div className="input-container">
        <input type="text" required=""
        name="inputUsername"
        id="inputUsername"
        value={username}
        onChange={(e) => setUsername(e.target.value)}/>
        <label
    
        >Username</label>		
    </div>
    <div className="input-container">

        <input type="text" required=""
        name="inputFirstName"
        id="inputFirstName"
        className='block border border-grey-light w-full p-3 rounded mb-4'
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}/>
        <label
    
        >Firstname</label>
        
    </div>
    <div className="input-container">
        <input type="text" required=""
       name="inputLastName"
       className='block border border-grey-light w-full p-3 rounded mb-4'
       id="inputLastName"
       value={lastName}
       onChange={(e) => setLastName(e.target.value)}/>
        <label
    
        >Lastname</label>		
    </div>
    <div className="input-container">
        <input type="text" required=""
        name="inputEmail"
        className='block border border-grey-light w-full p-3 rounded mb-4'
        id="inputEmail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}/>
        <label
    
        >Email</label>		
    </div>
    <div className="input-container">		
        <input type="password" required=""
        name="inputPassword"
        className='block border border-grey-light w-full p-3 rounded mb-4'
        id="inputPassword"
        value={password}
        onChange={(e) => setPassword(e.target.value)}/>
        <label
    
        >Password</label>
    </div>
        <button type="button" className="btn"
        onClick={register}>Register</button>
</form>	
</div>


);
}*/
import React, { useState } from 'react';
import axios from '../utils/axios';
import { useAuth } from '../context/auth';
import { useRouter } from 'next/router';
import { displayErrorToast, displayInfoToast } from './alert';

export default function Register() {
  const { setToken } = useAuth();
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const registerFieldsAreValid = (
    firstName,
    lastName,
    email,
    username,
    password
  ) => {
    if (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      username === '' ||
      password === ''
    ) {
      iziToast.destroy();
      displayInfoToast('Please fill all the details')
      return false;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
     displayInfoToast('Please enter a valid email address')
      return false
    }
    return true
  }

  const register = (e) => {
    e.preventDefault()

    if (
      registerFieldsAreValid(firstName, lastName, email, username, password)
    ) {
      displayInfoToast('Please wait')

      const dataForApiRequest = {
        name: firstName + ' ' + lastName,
        email: email,
        username: username,
        password: password,
      }

      axios.post(
        'auth/register/',
        dataForApiRequest,
      )
        .then(function ({ data, status }) {
          setToken(data.token);
          router.push('/');
        })
        .catch(function (err) {
          iziToast.destroy();
          displayErrorToast
          ('An account using same email id or password is created')
         
        })
    }
  }

  return (
    
    <div className="box">
     <form>
     <h1 className='mb-8 text-3xl text-center'>Register</h1>
     <div className="input-container">
        <input type="text" required=""
        name="inputUsername"
        id="inputUsername"
        value={username}
        onChange={(e) => setUsername(e.target.value)}/>
        <label
    
        >Username</label>		
    </div>
    <div className="input-container">

        <input type="text" required=""
        name="inputFirstName"
        id="inputFirstName"
        className='block border border-grey-light w-full p-3 rounded mb-4'
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}/>
        <label
    
        >Firstname</label>
        
    </div>
    <div className="input-container">
        <input type="text" required=""
       name="inputLastName"
       className='block border border-grey-light w-full p-3 rounded mb-4'
       id="inputLastName"
       value={lastName}
       onChange={(e) => setLastName(e.target.value)}/>
        <label
    
        >Lastname</label>		
    </div>
    <div className="input-container">
        <input type="text" required=""
        name="inputEmail"
        className='block border border-grey-light w-full p-3 rounded mb-4'
        id="inputEmail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}/>
        <label
    
        >Email</label>		
    </div>
    <div className="input-container">		
        <input type="password" required=""
        name="inputPassword"
        className='block border border-grey-light w-full p-3 rounded mb-4'
        id="inputPassword"
        value={password}
        onChange={(e) => setPassword(e.target.value)}/>
        <label
    
        >Password</label>
    </div>
        <button type="button" className="btn"
        onClick={register}>Register</button>
</form>	
</div>


);
}