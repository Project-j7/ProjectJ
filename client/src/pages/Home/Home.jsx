import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../../components/login/index";
import "./style.css";
import image1 from "./pic1.png";
import image2 from "./pic2.jpg"; // Fixed space in the filename
import image3 from "./pic3.png"; // Fixed space in the filename
import image4 from "./pic4.png"; // Fixed space in the filename
import image5 from "./pic5.png"; // Fixed space in the filename
import image6 from "./pic6.jpg"; // Fixed space in the filename
import image7 from "./pic7.jpg"; // Fixed space in the filename
import image8 from "./pic8.png"; // Fixed space in the filename
import image9 from "./pic9.png"; // Fixed space in the filename

export default function Home() {
    const [showLogin, setShowLogin] = useState(false); // State to toggle login popup
    const navigate = useNavigate();

    // Redirect to login page when navbar login is clicked
    function loginRedirect() {
        console.log("navbar button");
        navigate('/account/login'); // Navigate to the /login page
    }

    function signUpRedirect() {
        navigate('/account/signup');
    }

    // Show login popup when body login button is clicked
    function loginPopUp() {
        console.log("body button");
        setShowLogin(true); // Show the login popup
    }
    const faqs = document.querySelectorAll(".faqs");
    faqs.forEach(function (faq) {
        faq.addEventListener("click", function () {
            faq.classList.toggle("active");
            const icon = faq.querySelector(".fa-solid");
            if (icon) {
                icon.classList.toggle("fa-chevron-right");
                icon.classList.toggle("fa-chevron-down");
            }
        });
    });

    return (
        <div className="back">
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

            <div style={{ marginLeft: "75px", minHeight: "80vh" }}>
                <div className="container-fluid">
                    <div className="column" id="Home">
                        <div className="row">
                            <div className="col-7" style={{ marginTop: "100px" }}>
                                <h1 style={{
                                    fontFamily: "playfair display",
                                    fontWeight: "bolder",
                                    fontSize: "65px"
                                }}>
                                    Elevate Your<br />Jewellery<br /> Experience
                                </h1>
                                <p style={{ color: "#71717a", fontSize: "18px", marginTop: "15px" }}>
                                    Discover the art of jewellery design enhanced by Deep Learning<br /> 
                                    Technology, transforming low-quality images into stunning, high-resolution<br /> 
                                    masterpieces.
                                </p>
                                <button className="Get_Started" onClick={signUpRedirect}>Get Started</button>
                            </div>
                            <div className="col-5" style={{ marginTop: "80px" }}>
                                <img className="img-fluid home_page_pic_1 mr-5" src={image1} alt="Jewellery Design 1" />
                                <img className="img-fluid home_page_pic_2 mr-5" src={image2} alt="Jewellery Design 2" />
                                <img className="img-fluid home_page_pic_7 mr-5" src={image3} alt="Jewellery Design 3" /><br /><br />
                                <img className="img-fluid home_page_pic_3 ml-5 mr-5" src={image4} alt="Jewellery Design 4" />
                                <img className="img-fluid home_page_pic_4 mr-5" src={image5} alt="Jewellery Design 5" />
                                <img className="img-fluid home_page_pic_8 mr-5" src={image6} alt="Jewellery Design 6" /><br /><br />
                                <img className="img-fluid home_page_pic_5 mr-5" src={image7} alt="Jewellery Design 7" />
                                <img className="img-fluid home_page_pic_6 mr-5" src={image8} alt="Jewellery Design 8" />
                                <img className="img-fluid home_page_pic_9 mr-5" src={image9} alt="Jewellery Design 9" />
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
                                    <i className="fa-solid fa-robot mb-4" style={{fontSize: "25px", color:"#006666"}}></i>
                                    <h1 style={{fontSize:"15px",color:"black"}}>Creative Design Generation</h1>
                                    <p style={{color:"grey"}}>Generate unique and realistic<br/>jewellery designs based on your<br/>sketches, ensuring each piece<br/>is one-of-a-kind</p>
                                </div>
                                <div className="keyFeatures">
                                    <i className="fa-solid fa-handshake-simple mb-4" style={{fontSize: "25px", color:"#006666"}}></i>
                                    <h1 style={{fontSize:"15px",color:"black"}}>User-Friendly Interface</h1>
                                    <p style={{color:"grey"}}>Navigate through our sleek and<br/>modern interface designed for ease<br/>of use, making your design<br/>process enjoyable.</p>
                                </div>
                                <div className="keyFeatures">
                                    <i className="fa-solid fa-star mb-4" style={{fontSize: "25px", color:"#006666"}}></i>
                                    <h1 style={{fontSize:"15px", color:"black"}}>Seamless Integration</h1>
                                    <p style={{color:"grey"}}>Easily integrate your designs into<br/>your existing workflow, allowing for a<br/>smooth transition from concept to<br/>creation</p>
                                </div>
                            </div>
                            <div className="col-12 working" style={{marginTop:"100px", padding:"50px 0 50px 150px"}} id="aboutSection">
                                <h1 style={{color:"black", fontSize:"35px", fontWeight: "600"}}>How It Works</h1>
                                <div className="mt-5 d-flex flex-row justify-content-around">
                                    <div style={{marginRight:"100px"}} className="col-3">
                                        <i className="fa-solid fa-cloud-arrow-up mb-3" style={{fontSize: "25px", color:"#006666"}}></i>
                                        <p>Step 1: Upload Image</p>
                                        <p>Easily upload your low-quality jewellery images for<br/>enhancement</p>
                                    </div>
                                    <div style={{marginRight:"100px"}} className="col-3">
                                        <i className="fa-solid fa-arrows-rotate mb-3" style={{fontSize: "25px", color:"#006666"}}></i>
                                        <p>Step 2: Processing</p>
                                        <p>Watch as our Deep Learning technology crafts stunning<br/>designs in real-time</p>
                                    </div>
                                    <div style={{marginRight:"100px"}} className="col-3">
                                        <i className="fa-solid fa-cloud-arrow-down mb-3" style={{fontSize: "25px", color:"#006666"}}></i>
                                        <p>Step 3: Download Image</p>
                                        <p >Save the high quality image to your<br/> device with a quick click</p>
                                    </div>
                                </div>
                            </div>
                            <>
  <div id="FAQs" className="mt-5 w-100">
    <div style={{ marginLeft: 130 }}>
      <div className="column">
        <div className="row" style={{ width: "100%" }}>
          <div className="col-12">
            <h2 className="faq_heading">FAQs</h2>
          </div>
          <div className="col-12">
            <div className="faqs mt-5 mr-5 mb-3 pb-2">
              <div className="question">
                <h1>Is the colorization done in real-time?</h1>
                <i className="fa-solid fa-chevron-right" />
              </div>
              <div className="answer">
                <p>
                  The process is near real-time for standard aimages. However,
                  very high-resolution images or complex transformations may
                  take a bit longer.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="faqs mt-3 mr-5 mb-3 pb-2">
              <div className="question">
                <h1>How can I get started with using this tool?</h1>
                <i className="fa-solid fa-chevron-right" />
              </div>
              <div className="answer">
                <p>
                  To start colorizing your greyscale images, simply upload your
                  image file to our platform, and the deep learning model will
                  automatically process and return a colorized version.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="faqs mt-3 mr-5 mb-3 pb-2">
              <div className="question">
                <h1>How accurate is the colorization process?</h1>
                <i className="fa-solid fa-chevron-right" />
              </div>
              <div className="answer">
                <p>
                  The accuracy of the colorization depends on the quality and
                  features of the greyscale image. While the deep learning model
                  provides realistic color outputs, minor adjustments may
                  sometimes be needed for specific color tones. However, the
                  results are typically impressive and visually appealing.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="faqs mt-3 mr-5 mb-3 pb-2">
              <div className="question">
                <h1>How do you ensure the privacy of the uploaded images?</h1>
                <i className="fa-solid fa-chevron-right" />
              </div>
              <div className="answer">
                <p>
                  All uploaded images are processed securely, and we do not
                  store or share any user data or images without consent. We
                  take privacy very seriously and adhere to best practices in
                  data protection.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12">
            <div className="faqs mt-3 mr-5 mb-3 pb-2">
              <div className="question">
                <h1>
                  What technology do you use to colorize greyscale images?
                </h1>
                <i className="fa-solid fa-chevron-right" />
              </div>
              <div className="answer">
                <p>
                  We use advanced deep learning algorithms, particularly
                  convolutional neural networks (CNNs), trained on large
                  datasets of colored images. The models learn how to predict
                  and generate realistic colors for black-and-white images.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="ContactUs" style={{ margin: "200px 0 50px 0" }}>
    <div className="column">
      <div className="row" style={{ width: "100%" }}>
        <div className="col-6">
          <img src="" alt="" />
        </div>
        <div className="col-6 d-flex flex-column justify-content-start">
          <h1 className="mb-3">Connect with Us</h1>
          <div className="d-flex flex-row justify-content-start ml-2 mt-5 mr-5 mb-5">
            <div className="office_hours mr-5">
              <h1>
                <i className="fa-solid fa-clock mr-2" />
                Office Hours
              </h1>
              <p style={{ marginLeft: 35 }}>
                Monday-Friday
                <br />
                8:00 am to 5:00 pm
              </p>
            </div>
            <div className="address ml-5">
              <h1>
                <i className="fa-solid fa-location-dot mr-2" />
                Our Address
              </h1>
              <p style={{ marginLeft: 30 }}>
                8502 Preston Rd.Ingle
                <br />
                Maine 98380, USA
              </p>
            </div>
          </div>
          <div className="d-flex flex-row justify-content-start ml-2 mt-5 mr-5 mb-5">
            <div className="office_hours mr-5">
              <h1>
                <i className="fa-solid fa-building mr-2" />
                Design Studio
              </h1>
              <p style={{ marginLeft: 35 }}>
                5678 Jewel Ave
                <br />
                Brooklyn, NY 11201, USA
              </p>
            </div>
            <div className="phone_no ml-3">
              <h1>
                <i className="fa-solid fa-phone mr-2" />
                Get In Touch
              </h1>
              <p style={{ marginLeft: 30 }}>
                +1-246-888-0653
                <br /> +1-222-632-0194
              </p>
            </div>
          </div>
        </div>
        <div className="text-center col-12 mb-3">
          <h1 className="copy_rights">
            <i className="fa-solid fa-copyright" />
            2024 Jewel Vision. Pioneering Jewelry Design with Deep Learning.
          </h1>
        </div>
        <div className="links text-center col-12">
          <a className="mr-5" href="">
            About Us
          </a>
          <a className="mr-5" href="">
            Our Designs
          </a>
          <a className="mr-5" href="">
            Privacy Policy
          </a>
          <a className="mr-5" href="">
            Terms &amp; Conditions
          </a>
          <a className="mr-5" href="">
            Contact Us
          </a>
          <span style={{ borderRight: "1px solid black", marginRight: 40 }} />
          <a className="mr-3" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={13}
              height={13}
              fill="currentColor"
              className="bi bi-google"
              viewBox="0 0 16 16"
            >
              <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z" />
            </svg>
          </a>
          <a className="mr-3" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={13}
              height={13}
              fill="currentColor"
              className="bi bi-facebook"
              viewBox="0 0 16 16"
            >
              <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
            </svg>
          </a>
          <a className="mr-3" href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={13}
              height={13}
              fill="currentColor"
              className="bi bi-twitter-x"
              viewBox="0 0 16 16"
            >
              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}