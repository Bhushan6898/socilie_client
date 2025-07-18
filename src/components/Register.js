import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../hook/user/useUser';
import logo from '../asset/logo.png';
import { toast } from 'react-toastify';
function Register() {
  const { getregister } = useUser();
  const [form, setForm] = useState({ email: '', password: '', name: '',username:'',number:'' });
const [loading, setLoading] = useState(false);
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    setLoading(true);
    e.preventDefault();
   const response= await getregister(form);
   if(response.status === 200) {
      setLoading(false);
      setForm({ email: '', password: '', name: '',username:'',number:'' });
     
    }
   console.log(response);
   
   
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card p-4" style={{ maxWidth: 350, width: '100%' }}>
         <div className="text-center mb-4">
                  <img src={logo} alt="Instagram" width="48" style={{borderRadius:"10px"}} />
                  <h4 className="mt-2 mb-0 fw-bold">SOCILITE</h4>
                </div>
        <form onSubmit={handleSubmit}>
          <input
            className="form-control mb-2"
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
           <input
            className="form-control mb-2"
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-2"
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
           <input
            className="form-control mb-3"
            type="text"
            name="number"
            placeholder="Number"
            value={form.number}
            onChange={handleChange}
            required
          />
          <input
            className="form-control mb-3"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn btn-primary w-100 mb-2">Sign Up</button>
        </form>
        <div className="text-center mt-3">
          <span>Have an account? </span>
          <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
