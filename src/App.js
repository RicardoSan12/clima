import React from 'react';
import './App.css';
import { Main } from './styles/main';

import CitySelector from './components/CitySelector';
import WeatherList from './components/WeatherList';

import useFetch from './hooks/useFetch';
import { apiKey, baseUrl } from './config';

function App() {
  const { data, error, inProgress, setUrl } = useFetch();
  console.log(data);
  console.log('-------------');
  console.log(error);

  return (
    <Main>
      <CitySelector
        onSelectButtonClick={(city) =>
          setUrl(
            `${baseUrl}?q=${city}&cnt=5&appId=${apiKey}&units=metric&lang=es`
          )
        }
      />
      {error ? (
        <h2>Error: {error}. Reinicia la pagina</h2>
      ) : !data && inProgress ? (
        <h2>Loading...</h2>
      ) : !data ? null : (
        [
          <h2>{data.city.name.toUpperCase()}</h2>,
          <WeatherList weathers={data.list} />,
        ]
      )}
    </Main>
  );
}

export default App;
