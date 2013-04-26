$(function() {
  window.CALC = new Calculator({
    template: "/views/calculators/" + calcName + ".ejs",
    renderTo: ".output"
  });

  CALC.render();
});

