import React,{useState, useEffect} from 'react'

const Meme = () => {

    const [meme, setMeme] = useState({
        topName : "",
        bottomName : "",
        randomImages :"http://i.imgflip.com/1bij.jpg"
    })

    const [allMeme, setAllMeme] = useState([])

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMeme(data.data.memes))
    },[])

    function handleClick(){
        const randomNumber = Math.floor(Math.random() * allMeme.length)
        const url = allMeme[randomNumber].url
        setMeme(prevState => {
            return {
                ...prevState,
                randomImages : url
            }
        })
    }

    function handleChange(event){
        const {name, value} = event.target
        setMeme(prevData => {
            return {
                ...prevData,
                [name] : value
            }
        })
    }

    return(
        <main className='main'>
            <div className='form'>
                <input type='text' value={meme.topName} name='topName' placeholder='Top Text' onChange={handleChange}/>
                <input type='text' value={meme.bottomName} name='bottomName' placeholder='Bottom Text' onChange={handleChange}/>
                <div>
                    <button onClick={handleClick}>Get New Images</button>
                </div>
            </div>
            <div className='meme'>
                <img src={meme.randomImages} alt="random" className='meme--image'/>
                <h2 className='meme--text top'>{meme.topName}</h2>
                <h2 className='meme--text bottom'>{meme.bottomName}</h2>
            </div>
        </main>
    )
}

export default Meme
