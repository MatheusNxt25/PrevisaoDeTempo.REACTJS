import React, { useEffect, useState } from "react";

const Capitais = [
    ["Porto Velho", "Rondônia"],
    ["Manaus", "Amazonas"],
    ["Rio Branco", "Acre"],
    ["Campo Grande, MS", "Mato Grosso do Sul"],
    ["Macapá", "Amapá"],
    ["Brasília", "Distrito Federal"],
    ["Boa Vista", "Roraima"],
    ["Cuiabá", "Mato Grosso"],
    ["Palmas", "Tocantins"],
    ["São Paulo", "São Paulo"],
    ["Teresina", "Piauí"],
    ["Rio de Janeiro", "Rio de Janeiro"],
    ["Belém", "Pará"],
    ["Goiânia", "Goiás"],
    ["Salvador", "Bahia"],
    ["Florianópolis", "Santa Catarina"],
    ["São Luís", "Maranhão"],
    ["Maceió", "Alagoas"],
    ["Porto Alegre", "Rio Grande do Sul"],
    ["Curitiba", "Paraná"],
    ["Belo Horizonte", "Minas Gerais"],
    ["Fortaleza", "Ceará"],
    ["Recife", "Pernambuco"],
    ["João Pessoa", "Paraíba"],
    ["Aracaju", "Sergipe"],
    ["Natal", "Rio Grande do Norte"],
    ["Vitória", "Espírito Santo"]
  ];

function Raffle(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
}






const Random = () => {
  const keyID = '276028a84e6f633afbd7b4e1d68552bf';

  const [cidade, setCidade] = useState("");
  const [stateActive, setStateActive] = useState(false);

  const resultadoAtualizado = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${Capitais[Raffle(0, 26)][0]}&appid=${keyID}&units=metric`)
      .then(res => res.json())
      .then(data => {
        const { main, name, sys, } = data;
        if (sys !== undefined) {
          setCidade(
            `<div className="resultado row">
              <div>
                <h1>${main.temp} °C </h1>
                <h5>Max: ${main.temp_max} °C </h5>
                <h5>Min: ${main.temp_min} °C </h5>
              </div>
              <div>
                <h4>${sys.country}</h4>
                <h4>${name}</h4>
              </div>
            </div>`
          );
        }
      });
  }

  useEffect(() => {
    const response = setInterval(() => {
      if (stateActive) {
        resultadoAtualizado();
      }
    }, 3000);
    return () => clearInterval(response);
  })

  return (
    
    
    <main className="container justify-content-center d-flex align-items-center">
        <div className="randomWraper">
        <div className='jumbotron text-center'>
            <h3>Previsões das Capitais</h3>
            <br>
            </br>
            <button onClick={() => setStateActive(true)} className="btn  btn-success  btn-lg" >Começar</button>
            <br>
            </br>
            {
            (cidade !== "") ?
            <div  dangerouslySetInnerHTML={{ __html: cidade }} /> : ""
        }
        </div>
       

        </div>
    </main>
  );
}

export default Random;