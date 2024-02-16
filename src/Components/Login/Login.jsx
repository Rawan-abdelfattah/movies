import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login({setUserDataFun}) {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  let navigate=useNavigate();

  let validatorschema = Yup.object({
    email: Yup.string("email is required ").email(),
    password: Yup.string("password is requied ").matches(/^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,10}$/, "Password must contain at least one uppercase and one lowercase letter"),
})
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit:handleLogin,
    validationSchema:validatorschema
  });
  async function handleLogin(values){
    setIsLoading(true)
    const {data}=await axios.post('',values).catch((error)=>{
    setError(error.response.data.errors.msg+ " " +error.response.data.errors.param ) 
    setIsLoading(false)
    })
    if(data.message ==='success'){
      console.log(data);
      localStorage.setItem('userToken',data.token)
      setUserDataFun()
      setIsLoading(false)
      navigate('/')
    }
  }
  return (
    <>
         <div className="container w-75 mx-auto mt-4 ">
        <form action="" onSubmit={formik.handleSubmit}>
          <h2 className='main-color'>Login</h2>
          {error?<div className="alert alert-danger">{error}</div>  :' '}
         

          <label htmlFor="email"  className='text-white'>email</label>
          {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'> {formik.errors.email}</div> :''}
          <input
            type="email"
            className="form-control mb-4"
            name="email"
            id="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <label htmlFor="password"  className='text-white'>password</label>
          {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'> {formik.errors.password}</div> :''}
          <input
            type="password"
            className="form-control mb-4"
            name="password"
            id="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {isLoading?
            <button type="button" className="btn text-white  main-bg mt-2">
              <i className="fas fa-spinner fa-spin "></i>
            </button>
          :       ''}     <button  disabled={! (formik.isValid && formik.dirty)  }               
            type="submit"
            className="btn text-white main-bg mt-2"
            >
              Login
            </button>
          
        </form>
      </div> 
    </>
  )
}
