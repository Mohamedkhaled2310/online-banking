import { Link } from "react-router-dom";

export const Index = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <div className="container-fluid d-flex align-items-center justify-content-center">
        <div className="row w-100">

          <div className="col-md-6 d-flex flex-column justify-content-center text-center text-lg-start">
            <h1 className="display-4 fw-bold text-dark">
              <span className="bg-warning text-success px-2 rounded">Revolutionize</span>{" "}
              Your Banking Experience with{" "}
              <span className="bg-primary text-white px-2 rounded"> Online-Bank!</span>
            </h1>

            <p className="text-secondary mt-3 fw-bold">
              Take your financial life online. Your E-Bank account will be a one-stop-shop for sending,
              saving, budgeting, withdrawing, and much more.
            </p>
            {! storedUser ? 
            <Link to="/signup" className="btn btn-success btn-lg mt-3 shadow-sm fw-bold">
                Sign Up
            </Link> : " "
            }
          </div>


          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <img src="/banker.jpg" alt="index" className="img-fluid rounded w-75" />
          </div>
        </div>
      </div>
    </>
  );
};
