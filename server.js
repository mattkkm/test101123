const express = require('express');
const axios = require('axios');

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { events: [] });
});

app.get('/events', async (req, res) => {
  const { owner, repo, type } = req.query;

  try {
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/events`);
    const events = response.data.filter(event =>{
        if(type === "Other") return true
        return event.type === type
    });
    res.render('index', { events });
  } catch (err) {
    res.send('Error fetching events');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
