import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../css/Recommendations.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Recommendations() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/prakriti/data', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const chartData = (entry) => ({
    labels: ['Pitta', 'Vata', 'Kapha'],
    datasets: [
      {
        label: 'Prakriti Analysis (%)',
        data: [entry.analysis.pitta, entry.analysis.vata, entry.analysis.kapha],
        backgroundColor: ['#ff6b6b', '#4dabf7', '#51cf66'],
      },
    ],
  });

  return (
    <div className="recommendations-container">
      <h2>Your Health Recommendations</h2>
      {data.length > 0 ? (
        <>
          {data.map((entry, index) => (
            <div key={index} className="recommendation-entry">
              <h3>Submission {data.length - index}</h3>
              <table className="recommendations-table">
                <thead>
                  <tr>
                    <th>Trait</th>
                    <th>Your Input</th>
                    <th>Pitta</th>
                    <th>Vata</th>
                    <th>Kapha</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Skin</td><td>{entry.skin}</td><td>{entry.skin.includes('oily') ? '✓' : ''}</td><td>{entry.skin.includes('dry') ? '✓' : ''}</td><td>{entry.skin.includes('Balanced') ? '✓' : ''}</td></tr>
                  <tr><td>Body Build</td><td>{entry.bodyBuild}</td><td>{entry.bodyBuild.includes('Muscular') ? '✓' : ''}</td><td>{entry.bodyBuild.includes('Thin') ? '✓' : ''}</td><td>{entry.bodyBuild.includes('Balanced') ? '✓' : ''}</td></tr>
                  <tr><td>Hair</td><td>{entry.hair}</td><td>{entry.hair.includes('Oily') ? '✓' : ''}</td><td>{entry.hair.includes('Dry') ? '✓' : ''}</td><td>{entry.hair.includes('Thick') ? '✓' : ''}</td></tr>
                  <tr><td>Mindset</td><td>{entry.mindset}</td><td>{entry.mindset.includes('Intense') ? '✓' : ''}</td><td>{entry.mindset.includes('Restless') ? '✓' : ''}</td><td>{entry.mindset.includes('Calm') ? '✓' : ''}</td></tr>
                  <tr><td>Memory</td><td>{entry.memory}</td><td>{entry.memory.includes('Sharp') ? '✓' : ''}</td><td>{entry.memory.includes('Forgetful') ? '✓' : ''}</td><td>{entry.memory.includes('otherwise') ? '✓' : ''}</td></tr>
                  <tr><td>Emotions</td><td>{entry.emotions}</td><td>{entry.emotions.includes('Angry') ? '✓' : ''}</td><td>{entry.emotions.includes('Anxious') ? '✓' : ''}</td><td>{entry.emotions.includes('cheerful') ? '✓' : ''}</td></tr>
                  <tr><td>Diet</td><td>{entry.diet}</td><td>{entry.diet.includes('spicy') ? '✓' : ''}</td><td>{entry.diet.includes('dry') ? '✓' : ''}</td><td>{entry.diet.includes('sweet') ? '✓' : ''}</td></tr>
                  <tr><td>Sleep</td><td>{entry.sleep}</td><td>{entry.sleep === 'Moderate' ? '✓' : ''}</td><td>{entry.sleep === 'Light' ? '✓' : ''}</td><td>{entry.sleep === 'Deep' ? '✓' : ''}</td></tr>
                  <tr><td>Energy</td><td>{entry.energy}</td><td>{entry.energy.includes('High') ? '✓' : ''}</td><td>{entry.energy.includes('Variable') ? '✓' : ''}</td><td>{entry.energy.includes('Balanced') ? '✓' : ''}</td></tr>
                  <tr><td>Weather</td><td>{entry.weather}</td><td>{entry.weather.includes('Cool') ? '✓' : ''}</td><td>{entry.weather.includes('Warm') ? '✓' : ''}</td><td>{entry.weather.includes('dry') ? '✓' : ''}</td></tr>
                  <tr><td>Stress</td><td>{entry.stress}</td><td>{entry.stress.includes('Irritable') ? '✓' : ''}</td><td>{entry.stress.includes('Anxious') ? '✓' : ''}</td><td>{entry.stress.includes('Calm') ? '✓' : ''}</td></tr>
                </tbody>
              </table>
              <h4>Prakriti Composition</h4>
              <p>Pitta: {entry.analysis.pitta}% | Vata: {entry.analysis.vata}% | Kapha: {entry.analysis.kapha}%</p>
              <div className="chart-container">
                <Bar data={chartData(entry)} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
              </div>
              <h4>Health Summary</h4>
              <p>{entry.healthSummary}</p>
              <h4>Recommendations</h4>
              <ul>
                {entry.recommendations.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>
          ))}
        </>
      ) : (
        <p>No data available. Please complete the Prakriti form.</p>
      )}
    </div>
  );
}

export default Recommendations;