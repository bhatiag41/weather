
export const GeoApiOptions = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c104c1be9fmsh1851666d2761267p143057jsnd1eda2d03da0',
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};
export const GEO_API_URL='https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions'
try {
	const response = await fetch(GEO_API_URL, GeoApiOptions);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}