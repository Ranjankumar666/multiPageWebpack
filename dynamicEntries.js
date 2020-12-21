const glob = require("glob");
const path = require("path");


module.exports = {
  entries(pathname) {
    return glob.sync(pathname).reduce((acc, filePath) => {
      const name = path.basename(filePath, ".js");
      acc[name] = filePath;
      return acc;
    }, {});
  },
  HTMLPlugins(Plugin, entries){
  const plugins = [];

  for (let entry in entries) {
    const config = {
      filename: entry + ".html",
      title: entry,
      chunks: [entry],
      template: "./src/template.ejs",
    };

    plugins.push(new Plugin(config));
  }

  return plugins;
}
};
