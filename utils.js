const addMinutes = (date, minutes) => {
  const d = new Date(date);
  return d.setTime(d.getTime() + minutes * 60_000);
};

const jsonOrThrowError = async (response) => {
  console.log(response);
  if (!response.ok) throw new Error(await response.json().then((r) => JSON.stringify(r)));
  return response.json();
};

module.exports = {
  addMinutes,
  jsonOrThrowError,
};