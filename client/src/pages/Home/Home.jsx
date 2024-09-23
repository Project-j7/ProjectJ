import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Login from "../../components/login/index";
import "./style.css";

export default function Home() {
    const [showLogin, setShowLogin] = useState(false);  // State to toggle login popup
    const navigate = useNavigate();

    // Redirect to login page when navbar login is clicked
    function loginRedirect() {
        console.log("navbar button");
        navigate('/account/login');  // Navigate to the /login page
    }

    // Show login popup when body login button is clicked
    function loginPopUp() {
        console.log("body button");
        setShowLogin(true);  // Show the login popup
    }

    return (
        <div>
            <nav className="pt-3 navbar navbar-expand-lg navbar-light position-">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Jewellery Creator</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav m-auto">
                            <a className="nav-link navItem_lg" href="#">Home</a>
                            <a className="nav-link navItem_lg" href="#">Key Features</a>
                            <a className="nav-link navItem_lg" href="#">About Us</a>
                        </div>
                        <button id="login_signup_button_lg" onClick={loginRedirect}>Login</button>  {/* Trigger the redirect */}
                    </div>
                </div>
            </nav>

            <div style={{marginLeft: "75px", minHeight:"100vh"}}>
                <div className="container-fluid">
                    <div className="column">
                        <div className="row">
                            <div className="col-7" style={{marginTop:"100px"}}>
                                <h1 style={{fontFamily: "playfair display", fontWeight: "bolder", fontSize: "65px"}}>Elevate Your<br/>Jewellery<br/> Experience</h1>
                                <p style={{color:"#71717a", fontSize:"18px", marginTop:"15px"}}>Discover the art of jewellery design enhanced by Deep Learning<br/> Technology, transforming low-quality images into stunning, high resolution<br/> masterpieces.</p>
                                <button className="Get_Started" onClick={loginPopUp}>Get Started</button> {/* Trigger the popup */}
                            </div>
                            <div className="col-5">
                                <img className="w-75 img-fluid" style={{marginTop:"145px", borderRadius:"25px"}} alt="image"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showLogin && <Login />}  {/* Conditionally render the login popup */}

            {/* Additional sections for Key Features and How It Works */}
            <div id="sectioninfo_page" style={{minHeight:"100vh"}}>
                <div className="conatiner" style={{marginTop:"90px", marginLeft:"20px"}}>
                    <div className="column">
                        <div className="row" style={{width:"100%"}}>
                            <div className="col-12">
                                <h1 className="text-center" style={{fontSize: "20px", color: "#347273"}}>Key Features</h1>
                                <h1 style={{color:"black", fontSize:"45px", fontWeight:"600"}} className="text-center">Innovate your Design</h1>
                                <p style={{color:"grey"}} className="text-center">Enhance your jewellery designs effortlessly...</p>
                            </div>
                            <div className="col-12 d-flex flex-row justify-content-center">
                                {/* Features */}
                            </div>
                            <div className="col-12" style={{marginTop:"100px", padding:"50px 0 50px 150px", backgroundColor:"whitesmoke"}}>
                                <h1 style={{color:"black", fontSize:"35px", fontWeight: "600"}}>How It Works</h1>
                                <div className="mt-5 d-flex flex-row justify-content-start">
                                    <div style={{marginRight:"100px"}}>
                                        <i className="fa-solid fa-cloud-arrow-up mb-3" style={{fontSize: "25px", color:"#347273"}}></i>
                                        <p>Step 1: Upload Image</p>
                                        <p style={{color:"grey"}}>Easily upload your low-quality jewellery images...</p>
                                    </div>
                                    {/* More Steps */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
