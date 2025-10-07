import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Register(){
      const navigate=useNavigate()
     const [values,setValues]=useState(
      {
        phoneNumber:"",
        firstName:"",
        lastName:"",
        email:"",
        password:""
      }
  );
     const navigateToLoginPage=()=>{
      navigate("/login");
     }
    const handleChange=(e)=>{
      const {name,value}=e.target;
      setValues({...values,[name]:value});
    }
    const handleSubmission=async(e)=>{
      e.preventDefault();
      try{
        const response=await fetch("http://localhost:8081/cleancity/register",{
          method:"POST",
          headers:{
            "Content-type":"application/json",
          },
         body:JSON.stringify(values),
          
        });

        if(response.ok){
          navigate("/login")
        }
        else{
          alert("Not able to register");
        }
      }
      catch(error){
         console.error("Error",error)
      }
    };
    

     return (
    <div className="register">
      <form className="register-form" onSubmit={handleSubmission}>
        <input
          type="text"
          placeholder="Enter your first name"
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Enter your last name"
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
        />
        <input
          type="number"
          placeholder="Enter your mobile number"
          name="phoneNumber"
          value={values.phoneNumber}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Enter your email address"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
         <input
          type="password"
          placeholder="Enter your password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
        <p onClick={navigateToLoginPage}>Already registered? click here to login</p>
      </form>
    </div>
  );
}

export default Register;