var depthCounter = 0;

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
        
        depthCounter = 0;

        var result = new Array();
        var idObj = {id: 1};
        result = this.convert(str, idObj);
        return result;
    },
    // id=29, for 11 , id=33 is for bracket bu have comma
// [1,2,[3,4,5],6,[7,[8,[9,[10,11]]],12]]
    

    convert: function(str, idObj) {
        console.log(str + " at " + idObj.id);
        
        var re = /^[0-9\[\]]*$/ 
        var result = new Array();
        for (; idObj.id < str.length; idObj.id++) {
            var ch = str.charAt(idObj.id);
            // console.log("Ch: " + ch + " at id " + idObj.id);
            if  (!re.test(ch)) continue; // skip non integer and non bracket

            // console.log("Ch: " + ch + " at id " + idObj.id);
            if (ch == '[') {
                ++idObj.id
                ++depthCounter;
                // console.log('Open array for left str: ' + str.substring(idObj.id - 1));
                // console.log("Depth: " + depthCounter);
                result.push(this.convert(str, idObj));
                // console.log("Close array at idx [upper level]" + idObj.id);
                if (idObj.id == 32) console.log(str);
            } else if (ch == ']') {
                --depthCounter;
                // console.log("Close array at idx " + idObj.id);
                // console.log("Depth: " + depthCounter);
                return result;
            } else {
                var nextIntObj = this.evaluateNextInt(str.substr(idObj.id), idObj.id);
                idObj.id = nextIntObj.nextId;
                // console.log("Next int: " + nextIntObj.nextInt);
                result.push(nextIntObj.nextInt); 
            }
        }
        return result;
    },

    evaluateNextInt: function(substr, id) {
        // console.log("evaluateNextInt: substr " + substr);

        var data = substr.split(/[\[\],\"]+/);
        //console.log("evaluateNextInt: data " + JSON.stringify(data));
        var nextId = id;
        if (data[0].length != 1) {
            nextId = id  + data[0].length - 1;
        }
        return {nextInt: parseInt(data[0], 10), nextId: nextId}
    }
}