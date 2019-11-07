const subject = require("../quantory/index")

exports.flatten = async function(res, data, depth) {
    var result = await subject.flatten(data, depth);

    res.send(result);
    res.end();    
}