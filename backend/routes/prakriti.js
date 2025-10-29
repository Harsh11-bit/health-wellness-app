const express = require('express');
const jwt = require('jsonwebtoken');
const Prakriti = require('../models/Prakriti');
const router = express.Router();

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

router.post('/submit', auth, async (req, res) => {
  const { skin, bodyBuild, hair, eyes, mindset, memory, emotions, diet, sleep, energy, weather, stress } = req.body;
  
  // Validate required fields
  if (!skin || !bodyBuild || !hair || !eyes || !mindset || !memory || !emotions || !diet || !sleep || !energy || !weather || !stress) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Calculate Pitta, Vata, Kapha percentages
    let pitta = 0, vata = 0, kapha = 0;
    const traits = { skin, bodyBuild, hair, eyes, mindset, memory, emotions, diet, sleep, energy, weather, stress };

    // Assign points based on traits
    if (skin.includes('oily')) pitta += 30; else if (skin.includes('dry')) vata += 30; else kapha += 30;
    if (bodyBuild.includes('Muscular')) pitta += 30; else if (bodyBuild.includes('Thin')) vata += 30; else kapha += 30;
    if (hair.includes('Oily')) pitta += 30; else if (hair.includes('Dry')) vata += 30; else kapha += 30;
    if (eyes.includes('Medium-sized')) pitta += 30; else if (eyes.includes('Small')) vata += 30; else kapha += 30;
    if (mindset.includes('Intense')) pitta += 30; else if (mindset.includes('Restless')) vata += 30; else kapha += 30;
    if (memory.includes('Sharp')) pitta += 30; else if (memory.includes('Forgetful')) vata += 30; else kapha += 30;
    if (emotions.includes('Angry')) pitta += 30; else if (emotions.includes('Anxious')) vata += 30; else kapha += 30;
    if (diet.includes('spicy')) pitta += 30; else if (diet.includes('dry')) vata += 30; else kapha += 30;
    if (sleep === 'Moderate') pitta += 30; else if (sleep === 'Light') vata += 30; else kapha += 30;
    if (energy.includes('High')) pitta += 30; else if (energy.includes('Variable')) vata += 30; else kapha += 30;
    if (weather.includes('Cool')) pitta += 30; else if (weather.includes('Warm')) vata += 30; else kapha += 30;
    if (stress.includes('Irritable')) pitta += 30; else if (stress.includes('Anxious')) vata += 30; else kapha += 30;

    // Normalize percentages
    const total = pitta + vata + kapha || 1; // Prevent division by zero
    pitta = Math.round((pitta / total) * 100);
    vata = Math.round((vata / total) * 100);
    kapha = Math.round((kapha / total) * 100);

    // Generate recommendations and health summary
    const recommendations = [];
    let healthSummary = 'Based on your Prakriti analysis:\n';
    if (pitta >= 50) {
      recommendations.push('Incorporate cooling foods like cucumber, coconut water, and mint to balance Pitta.');
      recommendations.push('Avoid excessive spicy or hot foods to prevent Pitta aggravation.');
      healthSummary += '- Your dominant dosha is Pitta, indicating a fiery, intense constitution. You may experience irritability or heat-related issues under stress. Focus on cooling and calming practices.\n';
    } else if (vata >= 50) {
      recommendations.push('Practice grounding activities like meditation or yoga to balance Vata.');
      recommendations.push('Ensure a warm, peaceful sleeping environment to improve light sleep.');
      healthSummary += '- Your dominant dosha is Vata, suggesting a light, airy constitution. You may feel anxious or restless. Prioritize stability and warmth in your routine.\n';
    } else if (kapha >= 50) {
      recommendations.push('Engage in stimulating exercises like running to balance Kapha.');
      recommendations.push('Avoid heavy, sweet foods to prevent sluggishness.');
      healthSummary += '- Your dominant dosha is Kapha, indicating a stable, grounded constitution. You may tend toward lethargy. Focus on light, energizing activities.\n';
    } else {
      recommendations.push('Maintain a balanced diet with a mix of warm and cooling foods.');
      recommendations.push('Practice regular exercise and mindfulness to support overall health.');
      healthSummary += '- You have a balanced constitution with influences from Pitta, Vata, and Kapha. Maintain equilibrium with a varied diet and routine.\n';
    }
    if (stress.includes('Anxious') || mindset.includes('Restless')) {
      recommendations.push('Incorporate daily meditation or breathing exercises to manage anxiety.');
    }
    if (sleep === 'Light') {
      recommendations.push('Create a quiet, dark sleeping environment to improve rest quality.');
    }
    if (diet.includes('spicy')) {
      recommendations.push('Balance spicy foods with cooling options like yogurt or leafy greens.');
    }

    const prakriti = new Prakriti({
      userId: req.userId,
      ...traits,
      analysis: { pitta, vata, kapha },
      recommendations,
      healthSummary,
    });

    await prakriti.save();
    res.json({ message: 'Prakriti data saved successfully', analysis: { pitta, vata, kapha }, recommendations, healthSummary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error: Unable to process form data' });
  }
});

router.get('/data', auth, async (req, res) => {
  try {
    const data = await Prakriti.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error: Unable to fetch data' });
  }
});

module.exports = router;