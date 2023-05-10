import axios from 'axios'
import React, {useState} from 'react'

const Quiz = () => {
    const questions = ["Which of the following best describes the type of music you listen to?",
                        "Which of these acvitities best fit your music?", 
                        "How would you describe the singers in your music?", 
                        "How would someone else describe your music?",
                        "Pick your favorite out of these artists",
                        "Pick your favorite song"]
// 1	Rap 
// 2	Country
// 3	R&B
// 4	EDM
// 5	Rock
// 6	Lo-fi
// 7	Pop
// 8	Jazz
    const answers = [
        [
            {genre: "",text: ""}, {genre: "",text: ""}, {genre: "",text: ""}, {genre: "",text: ""}
        ],
        [
            {genre: "",text: ""}, {genre: "",text: ""}, {genre: "",text: ""}, {genre: "",text: ""}
        ],
        [
            {genre: "",text: ""}, {genre: "",text: ""}, {genre: "",text: ""}, {genre: "",text: ""}
        ],
        [
            {genre: "",text: ""}, {genre: "",text: ""}, {genre: "",text: ""}, {genre: "",text: ""}
        ],
        [
            {genre: "",text: ""}, {genre: "",text: ""}, {genre: "",text: ""}, {genre: "",text: ""}
        ],
        [
            {genre: "",text: ""}, {genre: "",text: ""}, {genre: "",text: ""}, {genre: "",text: ""}
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
        r.data.forEach(el => genres.push(0)) 
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