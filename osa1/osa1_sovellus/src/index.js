import React from 'react'
import ReactDOM from 'react-dom'

const Otsikko = (props) => {
  return (
    <div>
     <h1>{props.kurssi.nimi}</h1>
    </div>
  )
}

const Osa = (props) => {
  return (
    <div>
      <p>{props.nimi}, {props.tehtavia} tehtävää</p>
    </div>
  )
}

const Sisalto = (props) => {
  const t = props.kurssi.osat
  return (
    <div>
      {t.map((o) =>
         <Osa nimi={o.nimi} tehtavia={o.tehtavia}/>
         )}
    </div>
  )
}



const Yhteensa = (props) => {
  let y = 0;
  props.kurssi.osat.forEach((osa) =>{
    y += osa.tehtavia
})
  return (
    <div>
      <p>Yhteensä {y} tehtavää</p>
    </div>
  )
}

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14
      }
    ]
  }

  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto kurssi={kurssi}/> 
      <Yhteensa kurssi={kurssi} /> 
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)