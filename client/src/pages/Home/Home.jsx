import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll"; // Import Link from react-scroll
import Login from "../../components/login/index";
import "./style.css";
import Image from "./homePageImage.jpg";

export default function Home() {
    const [showLogin, setShowLogin] = useState(false);  // State to toggle login popup
    const navigate = useNavigate();

    // Redirect to login page when navbar login is clicked
    function loginRedirect() {
        console.log("navbar button");
        navigate('/account/login');  // Navigate to the /login page
    }

    function signUpRedirect() {
        navigate('/account/signup');
    }

    // Show login popup when body login button is clicked
    function loginPopUp() {
        console.log("body button");
        setShowLogin(true);  // Show the login popup
    }

    return (
        <div className="main">
            <nav className="pt-3 navbar navbar-expand-lg navbar-light nav position- " style={{}} >
                <div className="container-fluid" >
                    <a className="navbar-brand" href="#">Jewellery Creator</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav m-auto"  >
                            <ScrollLink to="homeSection" smooth={true} duration={500} className="nav-link navItem_lg active">Home</ScrollLink>
                            <ScrollLink to="featuresSection" smooth={true} duration={500} className="nav-link navItem_lg active">Key Features</ScrollLink>
                            <ScrollLink to="aboutSection" smooth={true} duration={500} className="nav-link navItem_lg active">About Us</ScrollLink>
                        </div>
                        <button id="login_signup_button_lg" onClick={loginRedirect}>Login</button>  
                    </div>
                </div>
            </nav>

            <div id="homeSection" style={{marginLeft: "75px", height:"95vh" , display:"flex",justifyContent:"center",alignItems:'center',marginTop:""}}>
                <div className="container-fluid">
                    <div className="column">
                        <div className="row" style={{display:"flex",justifyContent:"space-around",alignItems:"center"}}>
                            <div className="col-6" style={{marginTop:"65px"}}>
                                <h1 style={{fontFamily: "playfair display", fontWeight: "bolder", fontSize: "72px"}}>Elevate Your<br/>Jewellery<br/> Experience</h1>
                                <p style={{fontSize:"18px", marginTop:"15px"}}>Discover the art of jewellery design enhanced by Deep Learning<br/> Technology, transforming low-quality images into stunning, high resolution<br/> masterpieces.</p>
                                <button className="Get_Started" onClick={signUpRedirect}>Get Started</button>
                            </div>
                            <div className="col-6 text-center" style={{ marginTop:"84px"}}>
                                <img src={Image} alt="Jewellery image" height={"500px"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="featuresSection" style={{minHeight:"100vh"}}>
                <div className="conatiner" style={{marginTop:"90px", marginLeft:"20px"}}>
                    <div className="column">
                        <div className="row" style={{width:"100%"}}>
                            <div className="col-12">
                                
                                <h1 style={{ fontSize:"45px", fontWeight:"600"}} className="text-center">Innovate your Design</h1>
                                <p style={{}} className="text-center">Enhance your jewellery designs effortlessly. Our tool uses Deep Learning technology to create<br/>high-quality visuals that capture the essence of luxury.</p>
                            </div>
                            <div className="col-12 d-flex flex-row justify-content-center">
                                <div className="keyFeatures">
                                    <i className="fa-solid fa-robot mb-4" style={{fontSize: "25px", color:"black"}}></i>
                                    <h1 style={{fontSize:"15px",color:"black"}}>Creative Design Generation</h1>
                                    <p style={{color:"grey"}}>Generate unique and realistic<br/>jewellery designs based on your<br/>sketches, ensuring each piece<br/>is one-of-a-kind</p>
                                </div>
                                <div className="keyFeatures">
                                    <i className="fa-solid fa-handshake-simple mb-4" style={{fontSize: "25px", color:"black"}}></i>
                                    <h1 style={{fontSize:"15px",color:"black"}}>User-Friendly Interface</h1>
                                    <p style={{color:"grey"}}>Navigate through our sleek and<br/>modern interface designed for ease<br/>of use, making your design<br/>process enjoyable.</p>
                                </div>
                                <div className="keyFeatures">
                                    <i className="fa-solid fa-star mb-4" style={{fontSize: "25px", color:"black"}}></i>
                                    <h1 style={{fontSize:"15px", color:"black"}}>Seamless Integration</h1>
                                    <p style={{color:"grey"}}>Easily integrate your designs into<br/>your existing workflow, allowing for a<br/>smooth transition from concept to<br/>creation</p>
                                </div>
                            </div>
                            <div className="col-12 working" style={{marginTop:"100px", padding:"50px 0 50px 150px"}} id="aboutSection">
                                <h1 style={{color:"black", fontSize:"35px", fontWeight: "600"}}>How It Works</h1>
                                <div className="mt-5 d-flex flex-row justify-content-around">
                                    <div style={{marginRight:"100px"}} className="col-3">
                                        <i className="fa-solid fa-cloud-arrow-up mb-3" style={{fontSize: "25px", color:"black"}}></i>
                                        <p>Step 1: Upload Image</p>
                                        <p>Easily upload your low-quality jewellery images for<br/>enhancement</p>
                                    </div>
                                    <div style={{marginRight:"100px"}} className="col-3">
                                        <i className="fa-solid fa-arrows-rotate mb-3" style={{fontSize: "25px", color:"black"}}></i>
                                        <p>Step 2: Processing</p>
                                        <p>Watch as our Deep Learning technology crafts stunning<br/>designs in real-time</p>
                                    </div>
                                    <div style={{marginRight:"100px"}} className="col-3">
                                        <i className="fa-solid fa-cloud-arrow-down mb-3" style={{fontSize: "25px", color:"black"}}></i>
                                        <p>Step 3: Download Image</p>
                                        <p >Save the high quality image to your<br/> device with a quick click</p>
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
