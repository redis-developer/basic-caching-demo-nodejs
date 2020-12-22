require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const redis = require('redis');
const responseTime = require('response-time');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 5000;

const client = redis.createClient(process.env.REDIS_ENDPOINT_URI, {
  password: process.env.REDIS_PASSWORD,
});

const app = express();

// Set response
function composeResponse(username, repos, cached) {
  return {
    username,
    repos,
    cached,
  };
}

// Make request to Github for data
async function getRepos(req, res, next) {
  try {
    const { username } = req.params;

    const response = await fetch(`https://api.github.com/users/${username}`);

    const data = await response.json();

    const repos = data.public_repos;

    if (!isNaN(repos)) {
      client.setex(username, 3600, repos);
      res.json(composeResponse(username, repos, false));
    } else {
      res.status(404);
    }

  } catch (err) {
    console.error(err);
    res.status(500);
  }
}

app.use('/', express.static(path.join(__dirname, 'client/dist')));
app.use(responseTime());
app.use(cors({
  exposedHeaders: ['X-Response-Time'],
}));

function cacheMiddleware(req, res, next) {
  const { username } = req.params;

  client.get(username, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      res.json(composeResponse(username, data, true));
    } else {
      next();
    }
  });
}

app.get('/repos/:username', cacheMiddleware, getRepos);


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

module.exports = app
