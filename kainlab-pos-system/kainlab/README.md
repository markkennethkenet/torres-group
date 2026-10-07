# KainLab POS

KainLab is a touchscreen Point-of-Sale / product ordering and payment app (IT415 Practical Exam).

## Features
Browse 10 products (search + categories) · Small/Large sizes · add to cart · +/− quantity · remove · automatic subtotals and total · Order Summary with Back/Modify · Cash, QR and Card payment (simulated) · insufficient-cash rejection · change calculation · unique transaction reference · receipt · history · New Transaction full reset.

## Technologies
HTML, CSS, vanilla JavaScript (no framework, no build step). Data is kept in the browser's `localStorage`.

## How to run
1. Download or clone the repository.
2. Open `index.html` in Chrome, Edge or Firefox (double-click is enough, no server needed).
3. Optional: `npx serve .` or the VS Code "Live Server" extension.

## Project structure
```
index.html          Menu / product selection + cart summary
review.html         Order summary (Back / Proceed to Payment)
method.html         Choose Cash, QR or Card
cash.html           Cash payment, keypad, change
qr.html             QR payment (simulation)
card.html           Card payment (simulation)
success.html        Payment Successful
receipt.html        Receipt
history.html        Past transactions
css/
  tokens.css        Colors (light/dark) and page reset
  base.css          Body, headings, icons, buttons
  layout.css        App shell, sidebar, top bar, grids
  components.css    Product cards, cart, toast, alerts
  pages.css         Summary table, payment screens, receipt
  responsive.css    Tablet/phone, print, reduced motion
js/
  data/products.js      Catalog (items, categories, sizes, unit price)
  lib/utils.js          Money, dates, storage helpers, shared messages, toast
  modules/cart.js       Cart persistence and totals
  modules/payment.js    Cash checks and simulated pay
  modules/transaction.js  References, history, complete sale
  modules/receipt.js    Receipt HTML
  ui/icons.js           Line icons
  ui/art.js             Product images (inline SVG)
  ui/components.js      Shared UI pieces
  ui/shell.js           Layout, navigation, page guards
  pages/*.js            One page object per screen (init / render / handlers)
.prettierrc.json    Code formatting settings
```

## Payment simulation
No real payment is made. **Cash** is validated (amount must be ≥ total; change = cash − total). **QR** shows a placeholder code and a "Confirm Payment" button. **Card** shows a simulated reader and a "Process Payment" button. QR and Card wait about 1.6 seconds, then succeed. No card data is read or stored.

## Transaction reference
`TXN-YYYYMMDD-NNN`. The counter only increases, is checked against used references, and is saved in `localStorage`.

## GitHub development process
*(fill in with your real repository details)* — one shared repo, `main` as the integration branch, feature branches (`feature/product-ui`, `feature/cart`, `feature/payment`, `feature/receipt`, `feature/validation`, `feature/documentation`), pull requests with review before merging.

## Group members and contributions
*(fill in: name — what each member built and can explain)*

## AI development documentation
*(fill in: prompts used, what was generated, what you accepted/changed/rejected, bugs found and how they were fixed)*
