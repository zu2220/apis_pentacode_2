import axios from 'axios';

const GOV_API_URL = process.env.GOV_API_URL;
const GOV_API_KEY = process.env.GOV_API_KEY;

async function queryGovApi(payload) {
  const res = await axios.post(GOV_API_URL, payload, {
    headers: { Authorization: `Bearer ${GOV_API_KEY}` }
  });
  return res.data;
}

function mapGovResponseToVotacion(data) {
  return {
    local: data.local || null,
    direccion: data.direccion || null,
    latitud: data.latitud || null,
    longitud: data.longitud || null,
    mesa: data.mesa || null,
    pabellon: data.pabellon || null,
    es_miembro_mesa: data.es_miembro_mesa || false,
    raw: data
  };
}

async function getVotacionByDni(info) {
  const raw = await queryGovApi(info);
  return mapGovResponseToVotacion(raw);
}

export default { getVotacionByDni };