import axios from 'axios'
import React, {useState} from 'react'

const Quiz = () => {
    const questions = ["Which of the following best describes the type of music you listen to?",
                        "Which of these acvitities best fit your music?", 
                        "How would you describe the singers in your music?", 
                        "How would someone else describe your music?",
                        "Pick your favorite out of these artists",
                        "Pick your favorite song"]
    const answers = [
        [
            {text: "Heavy Hitting", genre: "Rock"}, {genre: "Lo-fi", text: "Relaxing"}, {genre: "R&B", text: "Radio Music"}, {genre: "Rap", text: "Trap"}
        ],
        [
            {genre: "Rock", text: "Working Out"}, {genre: "Lo-fi", text: "Sleeping"}, {genre: "R&B", text: "Dancing At A Club"}, {genre: "Country", text: "Working On A Farm"}
        ],
        [
            {genre: "EDM", text: "What Singers?"}, {genre: "R&B", text: "Autotuned And Upbeat"}, {genre: "Country", text: "Slow And Clear"}, {genre: "Rap", text: "Rhythmic"}
        ],
        [
            {genre: "Lo-fi",text: "Background Music"}, {genre: "Rock",text: "Angry"}, {genre: "Country",text: "Meaningful"}, {genre: "R&B",text: "Radio Music"}
        ],
        [
            {genre: "Rap",text: "Drake"}, {genre: "Country", text: "Luke Bryan"}, {genre: "R&B",text: "The Weeknd"}, {genre: "EDM",text: "Marshmello"}
        ],
        [
            {genre: "Rap",text: "Bubbly - Young Thug"}, {genre: "EDM",text: "KAIVON - All I Wanted"}, {genre: "Rock",text: "3 Days Grace - Never Too Late"}, {genre: "Lo-fi",text: "Lilac - Honey and Lemon"}
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
        if (curQ !== 6)
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
        const r = await axios.get("api/genres")
        const genres = []
        r.data.forEach(el => genres.push(0)) //Rap, Country, RB, EDM, Rock, Lofi
        let i = 6
        completed.forEach(el => {
            if (el === 'Rap')
                genres[0] += i
            else if (el === 'Country')
                genres[1] += i
            else if (el === 'R&B')
                genres[2] += i
            else if (el === 'EDM')
                genres[3] += i
            else if (el === 'Rock')
                genres[4] += i
            else if (el === 'Lo-fi')
                genres[5] += i
            i-=1
        })
        console.log(genres)
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
            <button className='btn-default'>Awesome! Take Me Home</button>
            </>
        }
        </div>
            
        )
}

export default Quiz