import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, getRedirectResult, GoogleAuthProvider } from "firebase/auth";

//local imports
import "./style.css";
import { useServerUser } from "../../contextStore/serverUserContext";
import { useFirebaseUser } from "../../contextStore/firebaseUserContext";
import Login from "../../components/login/index";
import { Logout } from "../../components/logout";

export default function Home() {
  const serverUser = useServerUser();

  const {googleSignOut} = useFirebaseUser();

  const [authUser, setAuthUser] = useState(undefined);
  const [showLogin, setShowLogin] = useState(false); 
  const navigate = useNavigate();

    

  useEffect(() => {
    console.log(serverUser);

    if (serverUser) {
      setAuthUser(serverUser.username);
    } 
    console.log(serverUser);
  }, [serverUser]);

  function loginRedirect() {
    navigate('/account/login'); 
  }

  function handleRedirect() {
    if(!authUser){
      navigate('/account/signup');
    }
    else{
      navigate('/dashboard');
    }
  }

  // Show login popup when body login button is clicked
  function loginPopUp() {
    setShowLogin(true); // Show the login popup
  }

  return (
    <div>
      
      <nav className="pt-3 navbar navbar-expand-lg navbar-light position-">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">SKREMSI</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav m-auto">
              <a className="nav-link navItem_lg" href="#">{authUser}</a>
              <a className="nav-link navItem_lg" href="#">Home</a>
              <a className="nav-link navItem_lg" href="#">Key Features</a>
              <a className="nav-link navItem_lg" href="#">About Us</a>
            </div>
            {(serverUser) ? <Logout/> : <button id="login_signup_button_lg" onClick={loginRedirect}>Login</button> }
          </div>
        </div>
      </nav>

      <div style={{ marginLeft: "75px", minHeight: "100vh" }}>
        <div className="container-fluid">
          <div className="column">
            <div className="row">
              <div className="col-7" style={{ marginTop: "100px" }}>
                <h1 style={{ fontFamily: "playfair display", fontWeight: "bolder", fontSize: "65px" }}>
                  Elevate Your<br />Jewellery<br /> Experience
                </h1>
                <p style={{ color: "#71717a", fontSize: "18px", marginTop: "15px" }}>
                  Discover the art of jewellery design enhanced by Deep Learning<br />
                  Technology, transforming low-quality images into stunning, high resolution<br />
                  masterpieces.
                </p>
                <button className="Get_Started" onClick={handleRedirect}>Get Started</button>
              </div>
              <div className="col-5">
                <img className="w-75 img-fluid" style={{ marginTop: "145px", borderRadius: "25px" }} alt="image" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="sectioninfo_page" style={{ minHeight: "100vh" }}>
        <div className="conatiner" style={{ marginTop: "90px", marginLeft: "20px" }}>
          <div className="column">
            <div className="row" style={{ width: "100%" }}>
              <div className="col-12">
                <h1 className="text-center" style={{ fontSize: "20px", color: "#347273" }}>Key Features</h1>
                <h1 style={{ color: "black", fontSize: "45px", fontWeight: "600" }} className="text-center">Innovate your Design</h1>
                <p style={{ color: "grey" }} className="text-center">
                  Enhance your jewellery designs effortlessly. Our tool uses Deep Learning technology to create<br />
                  high-quality visuals that capture the essence of luxury.
                </p>
              </div>
              <div className="col-12 d-flex flex-row justify-content-center">
                <div style={{ borderRadius: "20px", margin: "35px", padding: "40px", textAlign: "center", borderWidth: "1px", borderColor: "#347273", borderStyle: "solid" }}>
                  <i className="fa-solid fa-robot mb-4" style={{ fontSize: "25px", color: "#347273" }}></i>
                  <h1 style={{ fontSize: "15px", color: "black" }}>Creative Design Generation</h1>
                  <p style={{ color: "grey" }}>Generate unique and realistic<br />jewellery designs based on your<br />sketches, ensuring each piece<br />is one-of-a-kind</p>
                </div>
                <div style={{ borderRadius: "20px", margin: "35px", padding: "40px", textAlign: "center", borderWidth: "1px", borderColor: "#347273", borderStyle: "solid" }}>
                  <i className="fa-solid fa-handshake-simple mb-4" style={{ fontSize: "25px", color: "#347273" }}></i>
                  <h1 style={{ fontSize: "15px", color: "black" }}>User-Friendly Interface</h1>
                  <p style={{ color: "grey" }}>Navigate through our sleek and<br />modern interface designed for ease<br />of use, making your design<br />process enjoyable.</p>
                </div>
                <div style={{ borderRadius: "20px", margin: "35px", padding: "40px", textAlign: "center", borderWidth: "1px", borderColor: "#347273", borderStyle: "solid" }}>
                  <i className="fa-solid fa-star mb-4" style={{ fontSize: "25px", color: "#347273" }}></i>
                  <h1 style={{ fontSize: "15px", color: "black" }}>Seamless Integration</h1>
                  <p style={{ color: "grey" }}>Easily integrate your designs into<br />your existing workflow, allowing for a<br />smooth transition from concept to<br />creation</p>
                </div>
              </div>
              <div className="col-12" style={{ marginTop: "100px", padding: "50px 0 50px 150px", backgroundColor: "whitesmoke" }}>
                <h1 style={{ color: "black", fontSize: "35px", fontWeight: "600" }}>How It Works</h1>
                <div className="mt-5 d-flex flex-row justify-content-start">
                  <div style={{ marginRight: "100px" }}>
                    <i className="fa-solid fa-cloud-arrow-up mb-3" style={{ fontSize: "25px", color: "#347273" }}></i>
                    <p>Step 1: Upload Image</p>
                    <p style={{ color: "grey" }}>Easily upload your low-quality jewellery images for<br />enhancement</p>
                  </div>
                  <div style={{ marginRight: "100px" }}>
                    <i className="fa-solid fa-arrows-rotate mb-3" style={{ fontSize: "25px", color: "#347273" }}></i>
                    <p>Step 2: Processing</p>
                    <p style={{ color: "grey" }}>Watch as our Deep Learning technology crafts stunning<br />designs in real-time</p>
                  </div>
                  <div style={{ marginRight: "100px" }}>
                    <i className="fa-solid fa-cloud-arrow-down mb-3" style={{ fontSize: "25px", color: "#347273" }}></i>
                    <p>Step 3: Download Image</p>
                    <p style={{ color: "grey" }}>Save the high quality image to your<br /> device with a quick click</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
