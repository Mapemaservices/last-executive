// List of services and Nairobi areas for SEO coverage
const services = [
  "barber", "spa", "massage", "grooming", "facial", "manicure", "pedicure", "shaving", "body-scrub", "aromatherapy", "hot-stone", "reflexology", "prenatal", "nuru", "hair-removal", "private", "sensual", "couples", "male2female"
];
const areas = [
  "Westlands", "Karen", "Lavington", "Kilimani", "Kileleshwa", "Parklands", "South C", "South B", "Langata", "Runda", "Muthaiga", "Eastleigh", "Embakasi", "Donholm", "Buruburu", "Kasarani", "Roysambu", "Ngong Road", "Hurlingham", "Upper Hill", "CBD"
];

// Helper to check if a URL is valid and keyword-rich
function isValidUrl(service, location) {
  return services.includes(service.toLowerCase()) && areas.map(a => a.toLowerCase()).includes(location.toLowerCase());
}

// Helper to generate keyword-rich URLs
function generateUrl(service, location) {
  return `/` + encodeURIComponent(service.toLowerCase()) + '-' + encodeURIComponent(location.toLowerCase());
}

module.exports = (req, res) => {
  // Extract service and location from the URL, e.g. /api/barber-westlands
  const { service = "service" } = req.query;

  // Parse service and location
  let [mainService, location] = service.split("-");
  mainService = mainService || "Service";
  location = location || "Nairobi";

  // Best practice: Only serve valid, live, keyword-rich URLs
  if (!isValidUrl(mainService, location)) {
    res.status(404).send('<h1>404 Not Found</h1><p>This service or location is not available. Please check your URL or visit <a href="/">Executive Gents Dollhouse</a>.</p>');
    return;
  }

  // SEO meta tags
  const title = `${mainService.charAt(0).toUpperCase() + mainService.slice(1)} in ${location.charAt(0).toUpperCase() + location.slice(1)} | Executive Gents Dollhouse`;
  const description = `Book the best ${mainService} services in ${location}, Nairobi County. Executive Gents Dollhouse offers exclusive, luxury grooming, spa, and massage experiences for men in ${location}.`;
  const canonical = `https://executivegents.com${generateUrl(mainService, location)}`;

  // HTML response
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title}</title>
      <meta name="description" content="${description}" />
      <link rel="canonical" href="${canonical}" />
      <meta name="robots" content="index, follow">
      <meta property="og:title" content="${title}">
      <meta property="og:description" content="${description}">
      <meta property="og:type" content="website">
      <meta property="og:url" content="${canonical}">
      <meta property="og:image" content="https://executivegents.com/logo.png">
      <meta property="twitter:card" content="summary_large_image">
      <meta property="twitter:title" content="${title}">
      <meta property="twitter:description" content="${description}">
      <meta property="twitter:image" content="https://executivegents.com/logo.png">
    </head>
    <body>
      <h1>${title}</h1>
      <p>${description}</p>
      <ul>
        <li>Service: ${mainService}</li>
        <li>Location: ${location}</li>
      </ul>
      <a href="/">Back to Home</a>
    </body>
    </html>
  `);
};
