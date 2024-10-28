import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import Login from "../../components/login/index";
import "./style.css";
import Image from "./homePageImage.jpg";

export default function Home() {
    const [showLogin, setShowLogin] = useState(false);
    const [username, setUsername] = useState();
    const [showOptions, setShowOptions] = useState(false);
    const navigate = useNavigate();

    function loginRedirect() {
        console.log("navbar button");
        navigate('/account/login');
    }

    function signUpRedirect() {
        if (username) {
            navigate('/account/main');
        } else {
            navigate("/account/signup");
        }
    }

    function loginPopUp() {
        console.log("body button");
        setShowLogin(true);
    }

    const handleProfileClick = () => {
        setShowOptions(!showOptions);
    };

    async function handleLogout() {
        alert("HandleLogout");
        try {
            const response = await fetch("http://localhost:8001/user/logout", {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();
            if (response.status === 200) {
                alert("Logout successful");
                window.location.href = "http://localhost:3000/";
            } else {
                alert(result.error || "Logout failed.");
            }
        } catch (error) {
            console.error("Logout failed:", error);
            alert("An error occurred. Please try again.");
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:8001/user/main", {
                    method: "POST",
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Unauthorized access");
                }
                const data = await response.json();
                setUsername(data.username);
            } catch (error) {
                console.error("Failed to fetch main page data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="main" id="main">
            <nav className="pt-3 navbar navbar-expand-lg navbar-light nav position- " style={{}}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="">Jewellery Creator</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav m-auto">
                            <Link to="homeSection" smooth={true} duration={500} className="nav-link navItem_lg active">Home</Link>
                            <Link to="featuresSection" smooth={true} duration={500} className="nav-link navItem_lg active">Key Features</Link>
                            <Link to="aboutSection" smooth={true} duration={500} className="nav-link navItem_lg active">About Us</Link>
                        </div>
                        {username ? (
                            <div>
                                <div className="profile" onClick={handleProfileClick}>{username[0].toUpperCase()}</div>
                                {showOptions && (
                                    <div className="dropdown">
                                        <button className="drop-btn">Gallery</button>
                                        <button className="logoutButton drop-btn" onClick={handleLogout}>Logout</button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button id="login_signup_button_lg" onClick={loginRedirect} title="Login">Login</button>
                        )}
                    </div>
                </div>
            </nav>

            <div id="homeSection" style={{ marginLeft: "75px", height: "95vh", display: "flex", justifyContent: "center", alignItems: 'center', marginTop: "" }}>
                <div className="container-fluid">
                    <div className="column">
                        <div className="row" style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                            <div className="col-6" style={{ marginTop: "65px" }}>
                                <h1 style={{ fontFamily: "playfair display", fontWeight: "bolder", fontSize: "72px" }}>Elevate Your<br />Jewellery<br /> Experience</h1>
                                <p style={{ fontSize: "18px", marginTop: "15px" }}>Discover the art of jewellery design enhanced by Deep Learning<br /> Technology, transforming low-quality images into stunning, high resolution<br /> masterpieces.</p>
                                <button className="Get_Started" onClick={signUpRedirect}>Get Started</button>
                            </div>
                            <div className="col-6 text-center" style={{ marginTop: "84px" }}>
                                <img className="homeImage" src={Image} alt="Jewellery image"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="featuresSection" style={{ minHeight: "100vh" }}>
                <div className="conatiner" style={{ marginTop: "90px", marginLeft: "20px" }}>
                    <div className="column">
                        <div className="row" style={{ width: "100%" }}>
                            <div className="col-12">
                                <h1 style={{ fontSize: "45px", fontWeight: "600" }} className="text-center">Innovate your Design</h1>
                                <p style={{}} className="text-center">Enhance your jewellery designs effortlessly. Our tool uses Deep Learning technology to create<br />high-quality visuals that capture the essence of luxury.</p>
                            </div>
                            <div className="col-12 d-flex flex-md-row flex-column justify-content-center">
                                <div className="keyFeatures">
                                    <div className="icons-div"><div className="icons-background"><i className="fa-solid fa-robot mb-4" style={{ fontSize: "25px", color: "black" }}></i></div></div>
                                    <h1 style={{ fontSize: "15px", color: "black" }}>Creative Design Generation</h1>
                                    <p style={{ color: "grey" }}>Generate unique and realistic<br />jewellery designs based on your<br />sketches, ensuring each piece<br />is one-of-a-kind</p>
                                </div>
                                <div className="keyFeatures">
                                    <div className="icons-div"><div className="icons-background"><i className="fa-solid fa-handshake-simple mb-4" style={{ fontSize: "25px", color: "black" }}></i></div></div>
                                    <h1 style={{ fontSize: "15px", color: "black" }}>User-Friendly Interface</h1>
                                    <p style={{ color: "grey" }}>Navigate through our sleek and<br />modern interface designed for ease<br />of use, making your design<br />process enjoyable.</p>
                                </div>
                                <div className="keyFeatures">
                                    <div className="icons-div"><div className="icons-background"><i className="fa-solid fa-star mb-4" style={{ fontSize: "25px", color: "black" }}></i></div></div>
                                    <h1 style={{ fontSize: "15px", color: "black" }}>Seamless Integration</h1>
                                    <p style={{ color: "grey" }}>Easily integrate your designs into<br />your existing workflow, allowing for a<br />smooth transition from concept to<br />creation</p>
                                </div>
                            </div>

                            <div className="col-12 working" style={{ marginTop: "100px", padding: "50px 0 50px 150px" }} id="aboutSection">
                                <h1 style={{ color: "black", fontSize: "35px", fontWeight: "600" }}>How It Works</h1>
                                <div className="col-12 mt-5 d-flex flex-md-row flex-column justify-content-center">
                                    <div style={{ marginRight: "100px" }} >
                                        <i className="fa-solid fa-cloud-arrow-up mb-3" style={{ fontSize: "25px", color: "black" }}></i>
                                        <p>Step 1: Upload Image</p>
                                        <p>Easily upload your low-quality jewellery images for enhancement</p>
                                    </div>
                                    <div style={{ marginRight: "100px" }} >
                                        <i className="fa-solid fa-arrows-rotate mb-3" style={{ fontSize: "25px", color: "black" }}></i>
                                        <p>Step 2: Processing</p>
                                        <p>Watch as our Deep Learning technology crafts stunning designs in real-time</p>
                                    </div>
                                    <div style={{ marginRight: "100px" }}>
                                        <i className="fa-solid fa-cloud-arrow-down mb-3" style={{ fontSize: "25px", color: "black" }}></i>
                                        <p>Step 3: Download Image</p>
                                        <p>Once complete, download your enhanced jewellery images directly</p>
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
