Currently on gov.uk we have some [Smart Answers](http://www.github.com/alphagov/smart-answers) that work primarily with input that we perform calculations on. For example, a lot will ask the user for their salary, dates or time periods, and so on. Various calculations are then performed to determine a result. 

This repository is an experiment / early prototype as to a new format that might better suit those Smart Answers, by providing live calculations and instant feedback.


### Installation

Once you clone the repository down and `cd` into it, you just need to install dependencies and then run the app:

```
$ bundle
$ ruby app.rb
```

Visit `localhost:4567/child-benefits` to see an example. 

Calculator logic is stored in `public/js/calculators`, and the view files (EJS is used for templating) are in `public/views/`. There is currently only one fake calculator there to demonstrate how it works.
