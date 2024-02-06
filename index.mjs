export const healthHandler = async (event)=> {
	return {
		body: `ok! origin: '${event.headers['origin']}'`
	}
}
