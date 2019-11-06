exports.getMessage = function(code, message) {
    return {code: code, status: {message: message}};
}

exports.getPayloadMessage = function(payload) {
    return {code: "200", status: {message: "success", payload: payload}};
}

exports.getErrorMessage = function() {
    return getMessage(500, "unsuccess")
}