import axios from 'axios'
import React, {useState} from 'react'

const Quiz = () => {
    const questions = ["When your favorite song comes on at a party, how would you dance to it?",
                        "When do you usually listen to your music?", 
                        "How would you describe the singers in your music?", 
                        "How would you describe your music?",
                        "Pick your favorite out of these artists",
                        "Pick your favorite song",
                        "What kind of artists do you generally listen to?",
                        "Which of these do you usually experience when you listen to your music?"]
    const answers = [
        [
            {genre: "Rock",text: "Moshing"}, {genre: "Country",text: "Line Dancing"}, {genre: "Pop",text: "Whatever Is Popular"}, {genre: "EDM",text: "Jumping"}
        ],
        [
            {genre: "Lo-fi",text: "Studying or Sleeping"}, {genre: "Jazz",text: "Relaxing Or Driving"}, {genre: "Rap", text: "Working Out"}, {genre: "R&B",text: "Playing Video Games"}
        ],
        [
            {genre: "Country", text: "Deep and Raspy"}, {genre: "Jazz",text: "Soothing"}, {genre: "Lo-fi",text: "Singers? What?"}, {genre: "Rock",text: "Loud and Upbeat"}
        ],
        [
            {genre: "Lo-fi",text: "Peaceful, Calm, Chill"}, {genre: "Rock",text: "Loud, Energetic, Intense"}, {genre: "Jazz",text: "Deep, Blue, Moody"}, {genre: "Rap",text: "Rhythmic, Rhymes"}
        ],
        [
            {genre: "Pop",text: "Taylor Swift"}, {genre: "R&B",text: "Usher"}, {genre: "EDM",text: "Skrillex"}, {genre: "Country",text: "Luke Bryan"}
        ],
        [
            {genre: "Rap",text: "Jimmy Cooks - Drake"}, {genre: "R&B",text: "DJ Got Us Fallin' In Love - Usher"}, {genre: "EDM",text: "Bangarang - Skrillex"}, {genre: "Pop", text: "As It Was - Harry Styles"}
        ],
        [
            {genre: "Rap",text: "Rappers"}, {genre: "Pop",text: "Pop Singers"}, {genre: "EDM",text: "DJs"}, {genre: "Rock",text: "Bands"}
        ],
        [
            {genre: "Jazz",text: "Saxaphones Solos"}, {genre: "Lo-fi",text: "Synthwaves"}, {genre: "R&B",text: "Keyboards and Drums"}, {genre: "Country",text: "Acoustic Guitars"}
        ]
    ]

    const [completed, setCompleted] = useState([])
    const [question, setQuestion] = useState(questions[0])
    const [result, setResult] = useState("")
    const curQ = questions.indexOf(question)+1
    const questionClass = 'border rounded text-white w-80 h-40 hover:bg-white hover:text-black transition hover:font-bold duration-150 ease-in-out';
    function handleClick(e) {
        completed.push(answers[curQ-1][e.target.id].genre)
        console.log(answers[curQ-1][e.target.id].genre)
        if (curQ !== 8)
        {
            setQuestion(questions[curQ])
        }
        else
        {
            setQuestion(null)
            getResult()
        }
    }
    async function getResult() {
        const r = await axios.get("/api/genres")
        const genres = []
        r.data.forEach(el => genres.push(0)) 
        completed.forEach(el => {
            if (el === "Rap")
            genres[0] += 1
            else if (el === "Country")
            genres[1] += 1
            else if (el === "R&B")
                genres[2] += 1
                else if (el === "EDM")
                genres[3] += 1
                else if (el === "Rock")
                genres[4] += 1
                else if (el === "Lo-fi")
                genres[5] += 1
                else if (el === "Pop")
                genres[6] += 1
                else if (el === "Jazz")
                genres[7] += 1
            })
            let highest = 0
            genres.forEach(el => {
                if (el > genres[highest])
                    highest = genres.indexOf(el)
            })
            await axios.patch('/api/add_user_genre', {genre: r.data[highest].name})
            setResult(r.data[highest].name)
    }
    return (
        <div className='flex items-center mt-12 flex-col gap-10'>
                {question ? 
                <>
                <h1 className='text-white text-6xl'>Quiz</h1>
                <h1 className='text-white text-4xl'>Question {curQ}</h1>
                <h1 className='text-white text-4xl'>{question}</h1>
                <div className='flex justify-center gap-4 flex-wrap w-[50vw]'>
                    <button className={questionClass} id={0} onClick={handleClick}>{answers[curQ-1][0].text}</button>
                    <button className={questionClass} id={1} onClick={handleClick}>{answers[curQ-1][1].text}</button>
                    <button className={questionClass} id={2} onClick={handleClick}>{answers[curQ-1][2].text}</button>
                    <button className={questionClass} id={3} onClick={handleClick}>{answers[curQ-1][3].text}</button>
                </div>
                </>
                :
                <>
            <h1 className="text-white text-6xl">Based on your responses...</h1>
            <h1 className="text-white text-4xl">We predict your favorite music genre is</h1>
            <h1 className="text-white text-9xl mt-16">{result}</h1>
            <button className='btn-default' onClick={() => window.location.reload()}>Awesome! Take Me Home</button>
            </>
        }
        </div>
            
        )
}

export default Quiz