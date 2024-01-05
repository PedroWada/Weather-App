import axios from "axios"
import { useState } from "react";
 
function App() {
 
  const [info, setInfo] = useState({})
  const [ location, setLocation] = useState()
  const [listAdded, setListAdded] = useState([])

  const url = `http://localhost:8000/weather/${location}`

 const search = (e) => {
  if(e.key === 'Enter'){
      axios.get(url).then((resp) => {
      setInfo(resp.data)
    }).catch((err)=> {console.log(err)})
    setLocation('')
  }
 }
 function searchList(e,location) {
  axios.get(`http://localhost:8000/weather/${location}`).then((resp) => {
    setInfo(resp.data)
  }).catch((err)=> {console.log(err)})
  setLocation('')
  Closing(e)
 }

 function addList(name) {
  let a = false
  listAdded.map((el,i) => {
     if(el === name){
       a = true
     } 
     return a
  })
  if(!a){
    setListAdded([...listAdded, name])
  }
    
 }
function Closing(e){
  const menu = e.target.parentNode;
  menu.className += " up"
}
function Open(e){
  const div = e.target.nextElementSibling
  div.className = "menu"
}

  return (
    
    <div className="app"> 
      <div className="container">
        {listAdded.length !== 0 
        ? <div className="hamburguer" onClick={(e) => Open(e)}>
        &#9776;
       </div>
       : null
      }
        
        <div className="menu up">
            <div className="close" onClick={(e) => Closing(e)}>
              &#10005;
            </div> 
          {listAdded.map((el,i) => {
            return <div className="divs" key={i} onClick={(e) => searchList(e,el)}>{el}</div>
          })}
        </div>
        <div className="search">
          <input type="text"
          value={location || ''} 
          placeholder="Enter Location..."
          onKeyDown={search}
          onChange={(e)=> setLocation(e.target.value)}
          />
        </div>
      
          <div className="top">
              <div className="location">
                <p>{info.name}</p>
              </div>
              <div className="temp">
               {info.main 
               ? <div> 
                <h1>{info.main.temp.toFixed()}˚C</h1> <br></br>
                <button className="button" onClick={() => addList(info.name)}>+ ADD</button>
                </div> : null}

              </div>
              <div className="description">
                {info.main ? <p>{info?.weather[0].main}</p> : null}
              </div>
          </div>
          
            <div className="bottom">
            <div className="feels">
              {info.main ? <p className="bold">{info?.main.feels_like.toFixed()}˚C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {info.main ? <p className="bold">{info?.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {info.main ? <p className="bold">{info?.wind.speed}m/s</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
      </div>
    </div>
  );
}

export default App;
