var compression = require("compression");
const fs = require("fs");
const db = require("./db/index");
const fetch = require("node-fetch");
const server = require("express")();
const minifyHTML = require("express-minify-html");
const Tayparser = require("./utils/tayparser");

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
Document.appendCssStart(
  fs.readFileSync(`./src/style/custom-prism.css`, "utf-8")
);
Document.appendJsStart(fs.readFileSync(`./src/js/prism.js`, "utf-8"));

server.use("*", (req, res, next) => {
  res.header("Content-type", "text/html");
  res.header("x-powered-by", "Anonymous");
  next();
});

server.use(compression());
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

server.get("/post/:id", async (req, res) => {
  const Main = new ComponentModifier(Document.component);
  const Parse = new Tayparser();

  let HeaderC = new ComponentModifier(Header);
  let BodyC = new ComponentModifier(Body);

  db.fetchPostById(req.params.id)
    .then((data) => {
      const Post = data[0];

      BodyC.setKey("Heading", Post.title);
      BodyC.setKey("Code", Parse.parse(Post.code) || "");
      Main.setKey("Body", Combine([, BodyC.component]));

      res.send(Main.component);
    })
    .catch((err) => {
      res.send(`not found`);
    });
});

server.listen({ port: 3000 });
