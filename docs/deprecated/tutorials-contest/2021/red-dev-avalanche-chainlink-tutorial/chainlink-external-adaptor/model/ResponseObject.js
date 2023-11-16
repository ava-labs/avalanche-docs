"use strict"


function ResponseObject() {

}

ResponseObject.setter = function (request, response, statusCode) {
	return {
		jobRunID: request.id,
		StatusCode: statusCode,
		data: { "result": response }
	}
}

module.exports = ResponseObject;
