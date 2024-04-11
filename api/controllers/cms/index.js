const journalist = require("./Journalist.controller");
const categories = require("./categories.controller");
const visitors = require("./visitors.controller");
const posts = require("./post.controller");
const review = require("./reviews.controller");

module.exports = { journalist, categories, visitors, posts, review };
