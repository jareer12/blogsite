class ComponentModifier {
  constructor(component) {
    this.component = component;
  }
  setKey(key, value) {
    this.component = this.component.replace(key, value);
    return true;
  }
  appendCssStart(css) {
    this.component = `<style> ${css} </style>` + this.component;
  }
  appendCssEnd(css) {
    this.component = this.component + `<style> ${css} </style>`;
  }
}

module.exports = ComponentModifier;
