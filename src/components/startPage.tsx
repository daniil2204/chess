import {Link} from 'react-router-dom';

interface StartPageProps{
    setGameTime: (time:number) => void
}

const StartPage = ({setGameTime}:StartPageProps) => {
    return(
        <div className="startPage">
            <p>Chess</p>
            <input 
                type="number" 
                className="input"
                placeholder="Enter game time in seconds"
                onChange={(e) => {
                    setGameTime(+e.target.value)
                    localStorage.setItem('gameTime',e.target.value);
                }}/>
            <Link to='/chess'>
                <button className="button">
                    Start chess
                </button>
            </Link>
        </div>
    )
}

export default StartPage;