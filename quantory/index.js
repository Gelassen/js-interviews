module.exports = {
    
    flatten: function flatten(arr, depth = Number.MAX_SAFE_INTEGER) {
        var result = new Array();
        try {
            //console.log('depth: ' + depth);
            var depthObj = {depth: depth};
            this.recursiveUntangling(arr, result, depthObj);        
        } catch(ex) {
            console.log("Failed to process data", ex);
        }
        //console.log("return result")
        return result
    },

    recursiveUntangling: function(arr, result, depthObj) {
        //console.log("Array: " + arr + " " + arr.isArray)
        //console.log("result so far: " + result);
        arr.forEach(element => {
           // console.log("Element: " + element);
            if (Array.isArray(element)) {
                if (depthObj.depth == 0) {
                    //console.log("Put a whole array");
                    result.push(element);
                } else {
                    //console.log("Iteration: " + depthObj.depth);
                    --depthObj.depth;
                    this.recursiveUntangling(element, result, depthObj);   
                }
            } else {
                result.push(element);
            }
         });
         ++depthObj.depth;
         //console.log("Return result: " + result);
         return result;
    },

    convertToArray: function(str) {
        if (typeof(str) != 'string') {
            console.log('Passed param is not a string ' + str);
            return [];
        }

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
            if  (!re.test(ch)) continue;

            if (ch == '[') {
                ++idObj.id
                result.push(this.convert(str, idObj));
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
        // receive substring
        console.log("evaluateNextInt: substr " + substr);

        var data = substr.split(/[\[\],\"]+/);
        //console.log("evaluateNextInt: data " + JSON.stringify(data));
        var nextId = id;
        if (data[0].length != 1) {
            nextId = id  + data[0].length;
        }
        return {nextInt: parseInt(data[0], 10), nextId: nextId}
    }
}