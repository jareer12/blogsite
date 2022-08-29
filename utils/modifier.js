class ComponentModifier {
  constructor(component) {
    this.component = component;
  }
  setKey(key, value) {
    this.component = this.component.replace(`{{${key}}}`, value);
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
}

module.exports = ComponentModifier;
