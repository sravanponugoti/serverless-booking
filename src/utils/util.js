module.exports = function buildResponse(status, responseObj) {
    return {
        statusCode: status,
        headers: {
            "Access-Control-Allow-Origin": "*", // Required for CORS support to work
            "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify(responseObj)
    }
}