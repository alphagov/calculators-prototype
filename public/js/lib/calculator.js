var Calculator = function(opts) {
  this.template = opts.template;
  this.data = opts.data || {};
  this.bindings = {};
  this.values = {};
  this.computed = {};
  this.destination = opts.renderTo || ".output"
};

Calculator.prototype.generateTemplate = function() {
  return new EJS({url: this.template}).render(this.data);
};

Calculator.prototype.generateBindings = function() {
  this.processElementsForBinding($(".has-binding"), "value", "from");
  this.processElementsForBinding($(".takes-binding"), "text", "to");
  this.makeBindings();
};

Calculator.prototype.makeBindings = function() {
  var self = this;
  for(var key in this.bindings) {
    var handlerFn = function(theKey) {
      $(this).on("keydown change", function() {
        $(document).trigger(theKey + ":change", {
          value: this.value
        });
        self.values[theKey.split(".")[1]] = +this.value;
      });
    };

    var binderFn = function(theKey) {
      var innerSelf = this;
      $(document).on(theKey + ":change", function(_, data) {
        $(innerSelf).html(data.value);
        self.updateComputedProperties();
      });
    };

    var elemsFrom = this.bindings[key].from;
    $(elemsFrom).each(function(i, item) {
      $(item).on("keydown", handlerFn.bind(this, key));
    });

    var elemsTo = self.bindings[key].to;
    $(elemsTo).each(function(i, item) {
      binderFn.call(item, key);
    });
  };
};


Calculator.prototype.processElementsForBinding = function(elems, dataValue, key) {
  var self = this;
  $(elems).each(function(i, item) {
    var $item = $(item);
    var binding = $item.data(dataValue);
    if(self.bindings[binding]) {
      if(self.bindings[binding][key]) {
        self.bindings[binding][key].push($item[0])
      } else {
        self.bindings[binding][key] = [$item[0]];
      }
    } else {
      self.bindings[binding] = { from: [], to: [] };
      self.bindings[binding][key].push($item[0]);
    }
  });
};

Calculator.prototype.addComputedProperty = function(name, func) {
  this.computed[name] = {
    elem: $(".takes-binding[data-text='calculator." + name + "']")[0],
    fn: func
  }
};

Calculator.prototype.updateComputedProperties = function() {
  for(var key in this.computed) {
    var val = this.computed[key];
    $(val.elem).html(val.fn.call(this));
  };
};

Calculator.prototype.render = function() {
  $(this.destination).html(this.generateTemplate())
  this.generateBindings();
};
