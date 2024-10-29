import { useNavigate } from "react-router-dom";
import { useFirebaseUser } from "../../contextStore/firebaseUserContext";
import { useServerUser } from "../../contextStore/serverUserContext";
import { useState, useEffect } from 'react';
import Navbar from "../../components/navbar";
import './styles.css';

function Pinned(){
    const firebaseUser = useFirebaseUser();
    const serverUser = useServerUser();
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState(null);
    const [images, setImages] = useState([]);
    const navigate = useNavigate();

    function getImages() {
        fetch('http://localhost:8000/dashboard/getimages', {
            method: 'GET', 
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'user-info': JSON.stringify(user)  
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.images) {
                setImages(data.images.filter( (img) => {
                    return (img.pinned === true)
                }));
            } else {
                console.log("No images found for the user.");
            }
        })
        .catch(err => console.log(err));
    }

    function likeImage(imageId) {
        fetch('http://localhost:8000/dashboard/like', {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ imageId })
        })
        .then(response => response.json())
        .then(data => {
            setImages(images.map(img => 
                img._id === imageId ? { ...img, favourite: data.favourite } : img
            ));
        })
        .catch(err => console.log(err));
    }

    function pinImage(imageId) {
        fetch('http://localhost:8000/dashboard/pin', {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ imageId })
        })
        .then(response => response.json())
        .then(data => {
            setImages(images.map(img => 
                img._id === imageId ? { ...img, pinned: data.pinned } : img
            ));
        })
        .catch(err => console.log(err));
    }

    useEffect(() => {
        if (serverUser) {
            setUser(serverUser);
            setUsername(serverUser.username);
        } else if (firebaseUser) {
            setUser(firebaseUser);
            setUsername(firebaseUser.displayName); 
        }
    }, [serverUser, firebaseUser]);

    useEffect(() => {
        if (user) {
            getImages();
        }
    }, [user]);

    return (
        <div>
            <Navbar />
            <h3>Favourites</h3>
            <div className="image-gallery">
                {images.length > 0 ? (
                    images.map((img) => (
                        <div key={img._id} className="card" id="card-image">
                            <div className="pin-icon">
                                {img.pinned && <i className="fa-solid fa-thumbtack"></i>}
                            </div>
                            <img src={`http://localhost:8000/${img.uploaded_image_path}`} alt="User uploaded" className="card-img-top" />
                            <div className="card-body">
                                <p className="card-text">User uploaded image</p>
                                <button onClick={() => likeImage(img._id)}>
                                    <i className={img.favourite ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
                                </button>
                                <button 
                                    onClick={() => pinImage(img._id)}
                                    style={{ backgroundColor: img.pinned ? 'red' : 'green', color: 'white' }}
                                >
                                    {img.pinned ? 'Unpin' : 'Pin'}
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No images found for this user.</p>
                )}
            </div>
        </div>
    );
}

export default Pinned;