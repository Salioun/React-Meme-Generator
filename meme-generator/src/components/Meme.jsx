import { useEffect, useState } from "react";
import "../App.css"

function Meme() {

    const [meme, setMeme] = useState({
        topText: "Shut up",
        bottomText: "And Take My Money",
        memeImage: "https://i.imgflip.com/3si4.jpg"
    });

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMeme(data))
    },[])

    const [allMeme, setAllMeme] = useState({});

    function getRandomMeme() {
        
        const memes = allMeme.data.memes;
        const randomMeme = memes[Math.floor(Math.random() * memes.length)];
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                memeImage:randomMeme.url
            }
        })
    }

    function handleChange(event) {
        const {name, value} = event.target;
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]:value
        }))
    }

    return (
        <div className="meme-form">
            <div className="form-inputs">
                <div className="input-wrapper">
                    <h2>Top Text</h2>
                    <input 
                        type="text"
                        placeholder="Shut up" 
                        name="topText"
                        value={meme.topText}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-wrapper">
                    <h2>Bottom Text</h2>
                    <input 
                        type="text" 
                        placeholder="and take my money" 
                        name="bottomText"
                        value={meme.bottomText}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <button onClick={getRandomMeme} className="form-btn">Get a new meme image 🖼️</button>
            <div className="meme">
                <img className="meme-image" src={meme.memeImage} />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </div>
    );
}

//It is a good way to use grid 

export default Meme
