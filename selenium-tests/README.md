# Selenium Test Suite for GeoProof

This folder contains an automated Selenium + Mocha test suite that runs a set of tests across categories (functional, UI, compatibility, performance, security, API, database, accessibility, mobile, regression). The runner writes an Excel report to `reports/test-results.xlsx`.

Quick start:

1. Open a terminal and change to this folder:

```bash
cd selenium-tests
```

2. Install dependencies:

```bash
npm install
```

3. Start the GeoProof dev server (from project root):

```bash
cd ..
npm run dev
```

4. Run the tests and generate Excel report:

```bash
cd selenium-tests
npm run test:report
```

Notes:
- By default tests hit `http://localhost:3002`. Set `BASE_URL` env var to change.
- To see browsers live, set `SHOW_BROWSER=1` in env before running.
- Reports are written to `selenium-tests/reports/test-results.xlsx`.
