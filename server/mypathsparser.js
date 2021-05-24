const vm = require('vm');
var fs = require("fs");

// Text file containing the expression for the directory structure
const FILE_PATH = `${__dirname}/mypaths.txt`

/**
 * Convert occurences of special HTML entities into string characters
 * 
 * @param {*} str 
 * @returns 
 */
function decodeHTMLEntities(str){
    return str.replace(/&#([0-9]{1,3});/gi, (match, numStr) => {
        return String.fromCharCode(parseInt(numStr, 10));
    });
}


/**
 * Recursive DFS function for obtaining a list of unique paths from the structure
 * 
 * @param {*} obj 
 * @param {*} pathStr 
 * @param {*} pathList 
 * @returns 
 */
function traversePath(obj, pathStr="", pathList=[]) {
    const keys = Object.keys(obj);

    // keys represent meta data about a path
    if (keys.includes("type")) {
        const children = (obj.type === "dir") ? obj.children : null;
        return (children != null)? traversePath(children, pathStr, pathList): pathList
    }

    // keys represent paths in the current directory
    else if(keys.length >= 1){        
        keys.map((pathName) => {
            const newPathStr = `${pathStr}/${pathName}`;
            
            pathList.push({
                path: newPathStr,
                type: obj[pathName].type
            })
            return traversePath(obj[pathName], newPathStr, pathList)
        });
    }

    return pathList
}


/**
 * Read the directory structure from a text file as a string and parse it into a JS object
 * 
 * @param {*} filePath 
 * @returns 
 */
const parseDirectoryStructure = (filePath) => {
    // Read the JS code in the text file as a string 
    var code = fs.readFileSync(filePath).toString('utf-8')

    const context = {};
    vm.createContext(context); // Contextify the object.

    // 1) parse all occurences of special HTML entities such as '&#34;'
    // 2) replace 'let' to 'var' (vm is unable to read ES6 statements)
    code = decodeHTMLEntities(code.slice()).replace(/let/g, 'var')
    vm.runInContext(code, context);

    // return a deep copy of the root object
    return JSON.parse(JSON.stringify(context.root));
}


/**
 * Return a list of unique routes from the directory structure
 * 
 * @param {*} filePath 
 * @returns 
 */
const getRoutes = (filePath) => {
    let routes = traversePath(parseDirectoryStructure(filePath))

    // add an entry for the root path to the list of routes
    routes = (routes.length > 0)? [{path: '/', type:'dir'}, ...routes]: routes

    //  return a clone of the list
    return [...routes]; 
}


/**
 * Extracts the directory structure per call.
 * New changes to the structure will be reflected
 * @returns 
 */
exports.routes = function(){
    return getRoutes(FILE_PATH);
}

/**
 * Extracts the directory structure once on build time.
 * New changes to the structure will not be reflected until the server is restarted
 * 
 */
//exports.routes = getRoutes(FILE_PATH);
