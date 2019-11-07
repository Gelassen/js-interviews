module.exports = {
    
    flatten: function flatten(arr, depth = Number.MAX_SAFE_INTEGER) {
        return new Promise((resolve) => {
            try {
                var result = new Array();
                var depthObj = {depth: depth};
                result = this.recursiveUntangling(arr, result, depthObj);
                resolve(JSON.stringify({result: result}));       
            } catch(ex) {
                console.log("Failed to process data", ex);
                resolve(JSON.stringify({result: "Failed to process data"}));
            }
        });
    },

    recursiveUntangling: function(arr, result, depthObj) {
        arr.forEach(element => {
            if (Array.isArray(element)) {
                if (depthObj.depth == 0) {
                    result.push(element);
                } else {
                    --depthObj.depth;
                    this.recursiveUntangling(element, result, depthObj);   
                }
            } else {
                result.push(element);
            }
         });
         ++depthObj.depth;
         return result;
    },

    convertToArray: function(str) {
        if (typeof(str) != 'string') {
            console.log('Passed param is not a string ' + str);
            return [];
        }
        
        depthCounter = 0;

        var result = new Array();
        var idObj = {id: 1};
        result = this.convert(str, idObj);
        return result;
    },

    convert: function(str, idObj) {
        console.log(str + " at " + idObj.id);
        
        var re = /^[0-9\[\]]*$/ 
        var result = new Array();
        for (; idObj.id < str.length; idObj.id++) {
            var ch = str.charAt(idObj.id);
            if  (!re.test(ch)) continue; // skip non integer and non bracket

            if (ch == '[') {
                ++idObj.id
                result.push(this.convert(str, idObj));
                if (idObj.id == 32) console.log(str);
            } else if (ch == ']') {
                return result;
            } else {
                var nextIntObj = this.evaluateNextInt(str.substr(idObj.id), idObj.id);
                idObj.id = nextIntObj.nextId;
                result.push(nextIntObj.nextInt); 
            }
        }
        return result;
    },

    evaluateNextInt: function(substr, id) {
        var data = substr.split(/[\[\],\"]+/);
        var nextId = id;
        if (data[0].length != 1) {
            nextId = id  + data[0].length - 1;
        }
        return {nextInt: parseInt(data[0], 10), nextId: nextId}
    }
}