/* ===================================================================== ###
............................................................................
............................................................................
............................................................................
   <=( Entry Point )=>
............................................................................
............................................................................
............................................................................
*/

const path = require("path")
module.exports = _helperName => require(path.join(__dirname, _helperName))