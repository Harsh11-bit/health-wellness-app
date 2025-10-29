import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/PrakritiForm.css';

function PrakritiForm() {
  const [formData, setFormData] = useState({
    skin: '',
    bodyBuild: '',
    hair: '',
    eyes: '',
    mindset: '',
    memory: '',
    emotions: '',
    diet: '',
    sleep: '',
    energy: '',
    weather: '',
    stress: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/prakriti/submit', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setMessage(res.data.message);
      navigate('/recommendations');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Submission failed');
    }
  };

  return (
    <div className="prakriti-container">
      <form className="prakriti-form" onSubmit={handleSubmit}>
        <h2>Prakriti Analysis</h2>
        {message && <p className="message">{message}</p>}
        <div className="form-group">
          <label>Skin Type</label>
          <select name="skin" onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Dry">Dry</option>
            <option value="Oily">Oily</option>
            <option value="Balanced, sometimes oily, mostly dry">Balanced, sometimes oily, mostly dry</option>
          </select>
        </div>
        <div className="form-group">
          <label>Body Build</label>
          <select name="bodyBuild" onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Thin">Thin</option>
            <option value="Muscular">Muscular</option>
            <option value="Balanced, tall">Balanced, tall</option>
          </select>
        </div>
        <div className="form-group">
          <label>Hair Type</label>
          <select name="hair" onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Dry, thin">Dry, thin</option>
            <option value="Oily, thinning">Oily, thinning</option>
            <option value="Thick with oil, dry and thin without">Thick with oil, dry and thin without</option>
          </select>
        </div>
        <div className="form-group">
          <label>Eyes</label>
          <select name="eyes" onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Small">Small</option>
            <option value="Medium-sized, black, normal vision">Medium-sized, black, normal vision</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="form-group">
          <label>Mindset</label>
          <select name="mindset" onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Restless">Restless</option>
            <option value="Intense">Intense</option>
            <option value="Calm with slight intensity">Calm with slight intensity</option>
          </select>
        </div>
        <div className="form-group">
          <label>Memory</label>
          <select name="memory" onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Forgetful">Forgetful</option>
            <option value="Sharp">Sharp</option>
            <option value="Sharp for favorites, otherwise forgetful">Sharp for favorites, otherwise forgetful</option>
          </select>
        </div>
        <div className="form-group">
          <label>Emotions</label>
          <select name="emotions" onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Anxious">Anxious</option>
            <option value="Angry">Angry</option>
            <option value="Short-tempered but cheerful">Short-tempered but cheerful</option>
          </select>
        </div>
        <div className="form-group">
          <label>Diet Preference</label>
          <select name="diet" onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Warm, dry food">Warm, dry food</option>
            <option value="Cold, spicy">Cold, spicy</option>
            <option value="Hot and spicy">Hot and spicy</option>
          </select>
        </div>
        <div className="form-group">
          <label>Sleep Pattern</label>
          <select name="sleep" onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Light">Light</option>
            <option value="Moderate">Moderate</option>
            <option value="Deep">Deep</option>
          </select>
        </div>
        <div className="form-group">
          <label>Energy Levels</label>
          <select name="energy" onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Variable">Variable</option>
            <option value="High, bursts">High, bursts</option>
            <option value="Balanced">Balanced</option>
          </select>
        </div>
        <div className="form-group">
          <label>Weather Preference</label>
          <select name="weather" onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Warm">Warm</option>
            <option value="Cool">Cool</option>
            <option value="Warm and dry">Warm and dry</option>
          </select>
        </div>
        <div className="form-group">
          <label>Stress Response</label>
          <select name="stress" onChange={handleChange} required>
            <option value="">Select</option>
            <option value="Anxious">Anxious</option>
            <option value="Irritable">Irritable</option>
            <option value="Calm and irritable">Calm and irritable</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PrakritiForm;