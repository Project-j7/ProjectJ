import {useNavigate} from "react-router-dom";
import "./style.css";

export default function Home() {
    const navigate = useNavigate();

    // Redirect to login page when navbar login is clicked
    function loginRedirect() {
        console.log("navbar button");
        navigate('/account/login');  // Navigate to the /login page
    }

    function signUpRedirect() {
        navigate('/account/signup');
    }

    return (
        <div>
            <nav className="pt-3 navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Jewellery Creator</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav m-auto">
                            <a className="nav-link navItem_lg" href="#Home">Home</a>
                            <a className="nav-link navItem_lg" href="#KeyFeatures">Key Features</a>
                            <a className="nav-link navItem_lg" href="#AboutUs">About Us</a>
                        </div>
                        <button id="login_signup_button_lg" onClick={loginRedirect}>Login</button>
                    </div>
                </div>
            </nav>

            <div className="main-content">
                <div className="container-fluid">
                    <div className="column" id="Home">
                        <div className="row">
                            <div className="col-7 content-text">
                                <h1>Elevate Your<br/>Jewellery<br/> Experience</h1>
                                <p>Discover the art of jewellery design enhanced by Deep Learning<br/> Technology,
                                    transforming low-quality
                                    images into stunning, high resolution<br/> masterpieces.</p>
                                <button className="Get_Started" onClick={signUpRedirect}>Get Started</button>
                            </div>
                            <div className="col-5">
                                <img className="w-75 img-fluid image" alt="jewellery"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sectioninfo_page" id="KeyFeatures">
                <div className="conatiner features-container">
                    <div className="column">
                        <div className="row">
                            <div className="col-12">
                                <h1 className="text-center section-header">Key Features</h1>
                                <h1 className="text-center section-title">Innovate your Design</h1>
                                <p className="text-center section-description">Enhance your jewellery designs
                                    effortlessly. Our tool uses Deep Learning technology to create<br/>high-quality
                                    visuals that capture the essence of luxury.</p>
                            </div>
                            <div className="col-12 d-flex flex-row justify-content-center feature-boxes">
                                <div className="feature-box">
                                    <i className="fa-solid fa-robot mb-4 feature-icon"></i>
                                    <h1>Creative Design Generation</h1>
                                    <p>Generate unique and realistic<br/>jewellery designs based
                                        on your<br/>sketches, ensuring each piece<br/>is one-of-a-kind</p>
                                </div>
                                <div className="feature-box">
                                    <i className="fa-solid fa-handshake-simple mb-4 feature-icon"></i>
                                    <h1>User-Friendly Interface</h1>
                                    <p>Navigate through our sleek and<br/>modern interface
                                        designed for ease<br/>of use, making your design<br/>process enjoyable.</p>
                                </div>
                                <div className="feature-box">
                                    <i className="fa-solid fa-star mb-4 feature-icon"></i>
                                    <h1>Seamless Integration</h1>
                                    <p>Easily integrate your designs into<br/>your existing
                                        workflow, allowing for a<br/>smooth transition from concept to<br/>creation</p>
                                </div>
                            </div>
                            <div className="col-12 about-us-section" id="AboutUs">
                                <h1>How It Works</h1>
                                <div className="d-flex flex-row justify-content-start about-us-steps">
                                    <div className="about-step">
                                        <i className="fa-solid fa-cloud-arrow-up mb-3"></i>
                                        <p>Step 1: Upload Image</p>
                                        <p>Easily upload your low-quality jewellery images for<br/>enhancement</p>
                                    </div>
                                    <div className="about-step">
                                        <i className="fa-solid fa-arrows-rotate mb-3"></i>
                                        <p>Step 2: Processing</p>
                                        <p>Watch as our Deep Learning technology crafts stunning<br/>designs in
                                            real-time</p>
                                    </div>
                                    <div className="about-step">
                                        <i className="fa-solid fa-cloud-arrow-down mb-3"></i>
                                        <p>Step 3: Download Image</p>
                                        <p>Save the high quality image to your<br/> device with a quick click</p>
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
