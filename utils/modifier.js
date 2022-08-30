class ComponentModifier {
  constructor(component) {
    this.component = component;
  }
  setKey(key, value) {
    this.component = this.component.replace(`{{${key}}}`, `${value}`);
    return true;
  }
  appendCssStart(code) {
    this.component = `<style> ${code} </style>` + this.component;
  }
  appendCssEnd(code) {
    this.component = this.component + `<style> ${code} </style>`;
  }
  appendJsStart(code) {
    this.component = `<script> ${code} </script>` + this.component;
  }
  appendJsEnd(code) {
    this.component = this.component + `<script> ${code} </script>`;
  }
  appendMeta(name, content, isOg = false) {
    this.component = this.component.replace(
      `{{Header}}`,
      `<meta name='${
        isOg === true ? `og:` : ""
      }${name}' content='${content}'></meta>\n{{Header}}`
    );
  }
  finalize() {
    this.component = this.component.replace(/({{*.*}})/gi, "");
  }
}

module.exports = ComponentModifier;
