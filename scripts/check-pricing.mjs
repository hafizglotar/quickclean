#!/usr/bin/env node
/* ============================================================
   Price table sanity check (runs before every build)
   ------------------------------------------------------------
   Fails the build unless, in lib/pricing.js:
     • every plan has one price per unit type;
     • within a plan, each row is dearer than the row above it;
     • on every row, Premium > Standard > Basic;
     • the advertised starting prices equal each plan's first row;
     • PRICE_RANGE spans the cheapest to the dearest published rate.
   ============================================================ */

import {
  cleanTypes,
  propertySizes,
  startingPrices,
  PRICE_RANGE,
  lowestPrice,
  highestPrice,
  currency,
} from '../app/lib/pricing.js';

const failures = [];

for (const plan of cleanTypes) {
  if (plan.prices.length !== propertySizes.length) {
    failures.push(`${plan.name}: ${plan.prices.length} prices for ${propertySizes.length} unit types`);
    continue;
  }
  plan.prices.forEach((price, i) => {
    if (!Number.isFinite(price) || price <= 0) failures.push(`${plan.name}: ${propertySizes[i].label} has an invalid price (${price})`);
    if (i > 0 && !(price > plan.prices[i - 1])) {
      failures.push(`${plan.name}: ${propertySizes[i].label} (${price}) is not above ${propertySizes[i - 1].label} (${plan.prices[i - 1]})`);
    }
  });
}

propertySizes.forEach((size, i) => {
  for (let j = 1; j < cleanTypes.length; j += 1) {
    const lower = cleanTypes[j - 1];
    const upper = cleanTypes[j];
    if (!(upper.prices[i] > lower.prices[i])) {
      failures.push(`${size.label}: ${upper.name} (${upper.prices[i]}) must be above ${lower.name} (${lower.prices[i]})`);
    }
  }
});

for (const plan of cleanTypes) {
  if (startingPrices[plan.key] !== plan.prices[0]) {
    failures.push(`startingPrices.${plan.key} (${startingPrices[plan.key]}) does not equal the ${plan.name} first row (${plan.prices[0]})`);
  }
}

const expectedRange = `${currency.format(lowestPrice)} - ${currency.format(highestPrice)}`;
if (PRICE_RANGE !== expectedRange) failures.push(`PRICE_RANGE is "${PRICE_RANGE}", expected "${expectedRange}"`);

if (failures.length) {
  console.error('check-pricing: FAILED');
  for (const f of failures) console.error('  - ' + f);
  process.exit(1);
}
console.log(`check-pricing: ${cleanTypes.length} plans x ${propertySizes.length} unit types ok, priceRange ${PRICE_RANGE}.`);
