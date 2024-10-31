import {useNavigate} from "react-router-dom";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import homeGif from "../../assets/homeGIF.gif";

export default function Home() {
    const navigate = useNavigate();

    // Redirect to login page when navbar login is clicked
    function loginRedirect() {
        console.log("navbar button");
        navigate("/account/login"); // Navigate to the /login page
    }

    function signUpRedirect() {
        navigate("/account/signup");
    }

    return (
        <div>
            <nav className="pt-3 navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        Jewellery Creator
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav m-auto">
                            <a className="nav-link navItem_lg" href="#home">
                                Home
                            </a>
                            <a className="nav-link navItem_lg" href="#key-features">
                                Key Features
                            </a>
                            <a className="nav-link navItem_lg" href="#how-it-works">
                                About Us
                            </a>
                        </div>
                        <button id="login_signup_button_lg" onClick={loginRedirect}>
                            Login
                        </button>
                    </div>
                </div>
            </nav>

            <header id="home">
                <img src={homeGif} alt="Background Animation" className="bg-gif"/>
                <div className="header-content home-header-content">
                    <h1>Elevate Your Jewellery Design</h1>
                    <p>
                        Discover the art of jewellery design enhanced by Deep Learning
                        Technology. Transforming your jewellery sketches into realistic
                        jewels.
                    </p>
                    <button className="btn btn-animate btn-orange" onClick={signUpRedirect}>
                        Get Started
                    </button>
                </div>
            </header>

            <div className="container-fluid text-center my-5" id="key-features">
                <h2>Key Features</h2>
                <p className="centered-paragraph">
                    Enhance your jewellery designs effortlessly. Our tool uses Deep
                    Learning technology to create high-quality visuals that capture the
                    essence of luxury.
                </p>
                <div className="row my-4">
                    <div className="col-md-4">
                        <div className="glass-card key-feature-card">
                            <h3>Creative Design Generation</h3>
                            <p>
                                Generate unique and realistic jewellery designs based on your
                                sketches, ensuring each piece is one-of-a-kind.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="glass-card key-feature-card">
                            <h3>User Friendly Interface</h3>
                            <p>
                                Navigate through our sleek and modern interface designed for
                                ease of use, making your design process enjoyable.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="glass-card key-feature-card">
                            <h3>Seamless Integration</h3>
                            <p>
                                Easily integrate your designs into your existing workflow,
                                allowing for a smooth transition from concept to creation.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid text-center my-5" id="how-it-works">
                <h2>How it Works</h2>
                <div className="row my-4">
                    <div className="col-md-4">
                        <div className="glass-card how-it-works-card">
                            <h3>Step 1: Upload a Image</h3>
                            <p>Easily upload your low-quality jewellery images for enhancement.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="glass-card how-it-works-card">
                            <h3>Step 2: Processing Image</h3>
                            <p>Watch as our DL technology crafts stunning designs in real-time.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="glass-card how-it-works-card">
                            <h3>Step 3: Download Image</h3>
                            <p>Save the high-quality images to your device with a quick click.</p>
                        </div>
                    </div>
                </div>
            </div>

            <footer>
                <p>&copy; 2024 Jewellery Design. All Rights Reserved.</p>
            </footer>
        </div>
    );
}
