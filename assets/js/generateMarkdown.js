// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function getLicenseBadge(license)
{
  let requestedLicenseBadge = '';

  // Check output of requestedLicenseBadge regarding the use of []
  switch (license)
  {
    case 'CCO':
      requestedLicenseBadge = '[![License: CC0-1.0](https://licensebuttons.net/l/zero/1.0/80x15.png)](http://creativecommons.org/publicdomain/zero/1.0/)';
      break;
    case 'GNU':
      requestedLicenseBadge = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)';
      break;
    case 'Hippocratic':
      requestedLicenseBadge = '[![License: Hippocratic 3.0](https://img.shields.io/badge/License-Hippocratic_3.0-lightgrey.svg)](https://firstdonoharm.dev)';
      break;
    case 'ISC':
      requestedLicenseBadge = '[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)';
      break;
    case 'Unlicense':
      requestedLicenseBadge = '[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)';
      break;
    default:
      // We've been using MIT as the default license throughout the course
      requestedLicenseBadge = '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)'
      break;
  }

  return requestedLicenseBadge;
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) { }

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) { }

// TODO: Create a function to generate markdown for README
function generateMarkdown(data)
{
  return `
    # ${data.title}\n\n
    ## Description\n
    ${data.description}\n\n
    ${data.deployedURL}\n\n
    ${data.images}\n\n
    ## Installation\n
    ${data.installation}\n\n
    ## Usage\n
    ${data.usage}\n\n
    ## License\n
    ${data.license}`;
}


module.exports = generateMarkdown;
