const responseOk = (data, message) => {
	let dt = {
		status: 'Ok',
		data
	};
	if(message) dt['message'] = message;
  return dt;
};

const responseError = (message, data) => {
	let dt = {
		status: 'Error',
		message
	};
	if(data) dt['data'] = data;
  return dt;
};

module.exports = { responseOk, responseError };
