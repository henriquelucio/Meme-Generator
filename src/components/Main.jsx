import React from "react"

export default function Main(){

    const [meme, setMeme] = React.useState({
        topText:"One does not simply",
        bottomText:"Walk into Mordor",
        imageUrl:"http://i.imgflip.com/1bij.jpg"
    })
    const [arrMemes, setArrMemes] = React.useState([])

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setArrMemes(data.data.memes))
            .catch((error) => console.log(error))
    }, [])

    function rndMemeGenerator(){
        const memeImg = Math.floor(Math.random() * arrMemes.length)
        const newMemeUrl = arrMemes[memeImg].url
        setMeme(prevMeme => ({
            ...prevMeme, 
            imageUrl: newMemeUrl
        }))
    }

    function handleChange(event){
        const {value, name} = event.currentTarget
        setMeme(prevMeme => ({
            ...prevMeme, 
            [name]: value
        }))
    }

    return (
        <main>
            <div className="form">
                <label>Top Text
                    <input
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        onChange={handleChange}
                        value={meme.topText}
                    />
                </label>
                <label>Botton Text
                    <input 
                        type="text"
                        placeholder="Walk into mordor"
                        name="bottonText"
                        onChange={handleChange}
                        value={meme.bottomText}
                    />
                </label>
                <button onClick={rndMemeGenerator}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.imageUrl} />
                <span className="top">{meme.topText}</span>
                <span className="bottom">{meme.bottomText}</span>
            </div>
        </main>
    )
}