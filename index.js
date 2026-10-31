/**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// === Constants ===
const NAMES = ["Alice", "Bob", "Carol", "Dave", "Eve"];
const OCCUPATIONS = ["Writer", "Teacher", "Programmer", "Designer", "Engineer"];
const PRICE_RANGE = { min: 20, max: 200 };
const NUM_FREELANCERS = 100;

// === State ===
/*
 * **State** refers to data that _might_ change or update during the liftetime
 * of an application. Different HTML is rendered based on the current state.
 */

/** @returns {freelancer} a quote with a random sentence and random author */

function makeFreelancer() {
  const name = NAMES[Math.floor(Math.random() * NAMES.length)];
  const occupation =
    OCCUPATIONS[Math.floor(Math.random() * OCCUPATIONS.length)];
  const rate =
    Math.random() * (PRICE_RANGE.max - PRICE_RANGE.min) + PRICE_RANGE.min;
  return { name, occupation, rate };
}

const freelancers = Array.from({ length: NUM_FREELANCERS }, makeFreelancer);
// console.log("freelancers:" + freelancers);

function averageRateFn(freelancers) {
  return (
    freelancers.reduce((sum, line) => sum + line.rate, 0) / freelancers.length
  );
}
const averageRate = averageRateFn(freelancers);

// === Components ===
/*
 * **Components** are functions that return HTML elements, often based on state.
 * They are the main building blocks of a web application.
 */

/**
 * A single card with a quote and its author
 * @param {Quote} quote
 */
function FreelancerRow(freelancer) {
  const { name, occupation, rate } = freelancer;

  // The $ prefix is being used here to emphasize the distinction between a
  // "regular" JS variable and a variable that holds a DOM element.
  // It's stylistic and completely optional!
  const $row = document.createElement("figure");
  $row.classList.add("freelancer");
  $row.innerHTML = `
    <blockquote>${name}</blockquote>
    <figcaption>${occupation}</figcaption>
    <figcaption>$${rate.toFixed(2)}</figcaption>
  `;
  return $row;
}
//const tableHeader = ["NAME", "OCCUPATION", "RATE"];

/** An article of many QuoteCards */
function FreelancerTable() {
  const $cards = document.createElement("article");
  $cards.classList.add("freelancers");

  const $freelancers = freelancers.map(FreelancerRow);
  $cards.replaceChildren(...$freelancers);

  return $cards;
}

// === Render ===
/*
 * **Rendering** is when we _call_ the component functions. Even though we
 * are building and creating elements in JS, users will not see them until
 * the components are **mounted** onto an existing element in the document.
 */

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Freelancer Forum</h1>
    <h2>The Average Rate: $${averageRate.toFixed(2)}</h2>
    <FreelancerTable></FreelancerTable>
  `;
  $app
    .querySelector("FreelancerTable")
    .replaceWith(FreelancerTable(freelancers));
}
render();
