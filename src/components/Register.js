import React from 'react';
import { Link } from 'react-router-dom';

function Register() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card p-4" style={{ maxWidth: 350, width: '100%' }}>
        <div className="text-center mb-4">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" width="48" />
          <h4 className="mt-2 mb-0 fw-bold">Instagram</h4>
        </div>
        <form>
          <input type="text" className="form-control mb-2" placeholder="Username" />
          <input type="email" className="form-control mb-2" placeholder="Email" />
          <input type="password" className="form-control mb-3" placeholder="Password" />
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
