const fs = require("fs");
const fetch = require("node-fetch");
const server = require("express")();
var minifyHTML = require("express-minify-html");

const Combine = require("./utils/combine");
const DummyText = require("./utils/lorem");
const Component = require("./utils/component");
const ComponentModifier = require("./utils/modifier");

const App = Component(__dirname + "/public/index.html");
const Body = Component(__dirname + "/src/components/Body.html");
const Header = Component(__dirname + "/src/components/Header.html");
const Document = new ComponentModifier(App);

Document.appendCssStart(fs.readFileSync(`./src/style/index.css`, "utf-8"));
Document.appendCssStart(fs.readFileSync(`./src/style/tailwinds.css`, "utf-8"));

server.use(
  minifyHTML({
    override: true,
    exception_url: false,
    htmlMinifier: {
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeEmptyAttributes: true,
      minifyJS: true,
    },
  })
);

server.use("*", (req, res, next) => {
  res.header("Content-type", "text/html");
  next();
});

server.get("/", (req, res) => {
  const Main = new ComponentModifier(Document.component);

  let HeaderC = new ComponentModifier(Header);
  let BodyC = new ComponentModifier(Body);

  Main.setKey("{BODY}", Combine([HeaderC.component, BodyC.component]));
  Main.setKey("{DummyText}", DummyText(125));

  res.send(Main.component);
});

server.listen({ port: 3000 });
