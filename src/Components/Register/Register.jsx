// import './Register.css';
import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


export default function Register() {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  let navigate=useNavigate();

  let validatorschema = Yup.object({
    name: Yup.string("name is required ").min(3, "min name length 3 ").max(10, "max name lenght 10"),
    email: Yup.string("email is required ").email(),
    password: Yup.string("password is requied ").matches(/^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,10}$/, "Password must contain at least one uppercase and one lowercase letter"),
    rePassword:Yup.string('rePassword is required').oneOf([Yup.ref('password')] , 'rePassword must match'),
    phone:Yup.string('phone is required ').matches(/^01[0125][0-9]{8}$/, "phone must be egyption number"),
})
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit:handleRegister,
    validationSchema:validatorschema
  });
  async function handleRegister(values){
    setIsLoading(true)
    const {data}=await axios.post('',values).catch((error)=>{
    setError(error.response.data.errors.msg+ " " +error.response.data.errors.param ) 
    setIsLoading(false)
    })
    if(data.message ==='success'){
      console.log(data);
      setIsLoading(false)
      navigate('/login')
    }
  }
  return (
    <>
      <div className="container w-75 mx-auto ">
        <form action="" onSubmit={formik.handleSubmit}>
          <h2 className='main-color'>Registration</h2>
          {error?<div className="alert alert-danger">{error}</div>  :' '}
          <label htmlFor="name"  className='text-white'>Name</label>
          {formik.errors.name && formik.touched.name ? <div className='alert alert-danger'> {formik.errors.name}</div> :''}
          <input
            type="text"
            className="form-control mb-4"
            name="name"
            id="name"
            value={formik.values.name}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />

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

          <label htmlFor="rePassword"  className='text-white'>rePassword</label>
          {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger'> {formik.errors.rePassword}</div> :''}
          <input
            type="password"
            className="form-control mb-4"
            name="rePassword"
            id="rePassword"
            value={formik.values.rePassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />

          <label htmlFor="phone"  className='text-white'>phone</label>
          {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'> {formik.errors.phone}</div> :''}
          <input
            type="tel"
            className="form-control mb-4"
            name="phone"
            id="phone"
            value={formik.values.phone}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          {isLoading? 
            <button type="button" className="btn text-white  main-bg mt-2">
              <i className="fas fa-spinner fa-spin "></i>
            </button>
          : ''}           <button
            disabled={! (formik.isValid && formik.dirty)  }               
            type="submit"
            className="btn text-white  main-bg mt-2"
            >
              Register
            </button>
        </form>
      </div>
    </>
  );
}
