import {useState} from 'react';



function App() {
  const [city, setCity] = useState('');
  const [weatherForecast, setWeatherForecast] = useState(null);

  const handleChange = (e) => {
      setCity(e.target.value);

  };


  const handleSearch = () => {
    fetch(`https://api.weatherapi.com/v1/current.json?key=29293322e82849acbc432107222011&q=${city}&lang=pt`)
    .then((response) => {
       if(response.status === 200){
        return response.json();
       }
    })
    .then((data) =>{
      setWeatherForecast(data);
    });
  };


  return (
    <div >
        <nav className="navbar justify-content-center navbar-expand-md navbar-dark bg-primary  mb-4">
            <a class="navbar-brand text-white" href="#top">
              PREVISÃO DO TEMPO
            </a>
        </nav>
        <main className="container ">
          <div className='jumbotron'>
            <h1>
              Verifique agora a previsão do tempo da sua cidade!
            </h1>
            <p className="lead">
              Digite a cidade!
            </p>

            <div className="row mb-4">
              <div className="col-md-10">
                <input 
                  onChange={handleChange}
                  className="form-control" 
                  value={city}/>
              </div>
            </div>

            <button onClick={handleSearch} className="btn  btn-success  btn-lg">
              Pesquisar
            </button>
            {
              weatherForecast ? (
                <div>
                  <div className="mt-4 d-flex align-items-center">
                      <div>
                          <img src={weatherForecast.current.condition.icon}/>
                      </div>

                      <div>
                          <h3>Hoje o dia está: {weatherForecast.current.condition.text}</h3>
                        <p className='lead'>
                          Temperatura: {weatherForecast.current.temp_c} °C
                        </p>
                        <p className='lead'>
                        </p>
                        <p className='lead'>
                          Data e Hora: {weatherForecast.current.last_updated} 
                        </p>
                      </div>
                  </div>
                </div>

              ) : null}

          </div>
         </main>
         
    </div>
  );
}

export default App;
