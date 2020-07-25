const path = require("path");
const projectRoot = path.resolve(__dirname, "..");

module.exports = {
    /**
     * root(relpath)
     *  Creates an absolute path from a path relative to the project root.
     */
    resolve: function (relpath) {
        if (relpath) {
            return path.resolve(projectRoot, relpath);
        } else {
            return projectRoot;
        }
    }
}
