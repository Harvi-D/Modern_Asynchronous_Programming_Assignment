const axios = require("../utils/axios");
const BASE_URL = "http://localhost:5000";

function isValid({ id, name, meaning, quadrant, starsWithPlanets }) {
  return id && name && meaning && quadrant && starsWithPlanets;
}

async function update(constellation) {
  try {
    const url = `${BASE_URL}/constellations/${constellation.id}`;
    return await axios.put(url, constellation)
  }catch(error){
    return error.message;
  }
}

async function bulkImport(constellations) {
  let isArray = Array.isArray(constellations);
  if (isArray === false){
    throw error;
  }
  let newConst = isValid(constellations);
  console.log(newConst);
  if(newConst === false){
    throw error;
  }
  try {
    const promises = constellations.map((constellation) => {
      const url = `${BASE_URL}/constellations/${constellation.id}`;
      return axios.put(url, constellation)
    });
    return Promise.allSettled(promises);
  }catch(error){
    return error.message;
  }
}

module.exports = { bulkImport, update };
