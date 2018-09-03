import React from 'react';
import ReactDOM from 'react-dom';

const MainHeader = (props) => {
    return (
        <div>
            <h1>{props.content}</h1>
        </div>
    )
}

const SmallHeader = (props) => {
    return (
        <div>
            <h2>{props.content}</h2>
        </div>
    )
}

const Button = (props) => {
    return (
        <button onClick={() => {
            this.setState
        } }>
            {props.name}
        </button>   
    )
}

const ButtonList = (props) => {
    const t = props.buttons
    console.log(t[0])
   
    return (
        <div>
           <Button name={t[0].text} clicks={t[0].clickCounter}/>
           <Button name={t[1].text} clicks={t[1].clickCounter}/>
           <Button name={t[2].text} clicks={t[2].clickCounter}/>
        </div>        
    )
}

const Statistics = () => {
    return (
        <div>

        </div>
    )
}

const App = () => {
    const headerText = 'Unicafen palautesivu'
    const upperSmallHeaderText = 'Anna palautetta'
    const lowerSmallHeaderText = 'Statistiikka'
    let buttonData = [
        {
            text: 'Hyvä',
            clickCounter: 0
        },
        {
            text: 'Neutraali',
            clickCounter: 0
        },
        {
            text: 'Huono',
            clickCounter: 0
        }
    ]

    return (
        <div>         
            <MainHeader content={headerText}/>
            <SmallHeader content={upperSmallHeaderText}/>
            <ButtonList buttons={buttonData}/>
            <SmallHeader content={lowerSmallHeaderText}/>
        </div>        
    )
} 

ReactDOM.render(<App />, document.getElementById('root'));

 