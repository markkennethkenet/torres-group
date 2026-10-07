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
