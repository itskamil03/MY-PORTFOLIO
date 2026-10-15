# Mohammad Kamil Akhtar - Portfolio (frontend)

Plain HTML, CSS and JavaScript. No install or build step: open `index.html`, or deploy the folder to Vercel/Netlify.

## Things to update
1. **Profile photo:** put your image at `assets/profile.jpg` (portrait, about 800x1000). Until then the site shows your initials.
2. **Links:** in `js/data.js` replace the `#` values for LinkedIn, GitHub and the two Swarn Bharat One links.
3. **Content:** every text, skill, project and job is in `js/data.js`.

## Admin panel later
`js/data.js` defines one `window.PORTFOLIO` object. Your admin panel and API can return the same shape as JSON,
then replace the `data.js` script tag with a `fetch()` call before `main.js` runs.
