$(function() {
  CALC.addComputedProperty("total", function() {
    return this.values.yearly * this.values.people;
  });
});



