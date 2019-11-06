module.exports = {
    
    flatten: function flatten(arr, depth = Number.MAX_SAFE_INTEGER) {
        var result = [];
        console.log('depth: ' + depth);
        var depthObj = {depth: depth};
        this.recursiveUntangling(arr, result, depthObj);
        return result
    },

    recursiveUntangling: function(arr, result, depthObj) {
        console.log("result so far: " + result);
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
    }
}