EJS.Helpers.prototype.text_field = function(text, value) {
  var output = [];
  output.push("<div>");
  output.push(this.label(text));
  output.push('<input type="text" class="has-binding" data-value="' + value + '">');
  output.push("</div>");
  return output.join("");

};

EJS.Helpers.prototype.label = function(text) {
  return "<label>" + text + "</label>";
};

EJS.Helpers.prototype.output = function(binding) {
  return '<span class="takes-binding" data-text="' + binding + '"></span>';
};

