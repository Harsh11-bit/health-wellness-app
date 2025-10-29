import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import '../css/Progress.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Progress() {
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

  const chartData = {
    labels: data.map((_, index) => `Submission ${data.length - index}`),
    datasets: [
      {
        label: 'Pitta (%)',
        data: data.map(entry => entry.analysis.pitta),
        borderColor: '#ff6b6b',
        fill: false,
      },
      {
        label: 'Vata (%)',
        data: data.map(entry => entry.analysis.vata),
        borderColor: '#4dabf7',
        fill: false,
      },
      {
        label: 'Kapha (%)',
        data: data.map(entry => entry.analysis.kapha),
        borderColor: '#51cf66',
        fill: false,
      },
    ],
  };

  return (
    <div className="progress-container">
      <h2>Your Progress</h2>
      <p>Track your health journey and improvements over time based on your Prakriti submissions.</p>
      {data.length > 0 ? (
        <>
          <div className="chart-container">
            <Line data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Prakriti Trends Over Time' } } }} />
          </div>
          <h3>Progress Insights</h3>
          {data.map((entry, index) => (
            <div key={index} className="progress-entry">
              <h4>Submission {data.length - index}</h4>
              <p><strong>Pitta:</strong> {entry.analysis.pitta}% | <strong>Vata:</strong> {entry.analysis.vata}% | <strong>Kapha:</strong> {entry.analysis.kapha}%</p>
              <p><strong>Key Observations:</strong></p>
              <ul>
                {entry.sleep === 'Light' && <li>Your light sleep may indicate Vata imbalance. Prioritize a calm bedtime routine.</li>}
                {entry.stress.includes('Anxious') && <li>Anxiety suggests Vata influence. Try daily meditation.</li>}
                {entry.diet.includes('spicy') && <li>Spicy diet may increase Pitta. Balance with cooling foods.</li>}
                {entry.energy.includes('Balanced') && <li>Balanced energy supports overall health. Maintain with regular exercise.</li>}
              </ul>
            </div>
          ))}
        </>
      ) : (
        <p>No submissions yet. Complete the Prakriti form to track your progress.</p>
      )}
    </div>
  );
}

export default Progress;