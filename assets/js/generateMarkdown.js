const dedent = require('dedent-js');

// Create License Badge
function getLicenseBadge(license)
{
  let requestedLicenseBadge = '';

  switch (license.split(' ')[0])
  {
    // Change available licences to the list here https://choosealicense.com/licenses/
    case 'Creative':
      requestedLicenseBadge = '[![License: CC0-1.0](https://licensebuttons.net/l/zero/1.0/80x15.png)](http://creativecommons.org/publicdomain/zero/1.0/)';
      break;
    case 'GNU':
      requestedLicenseBadge = '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)';
      break;
    case 'Hippocratic':
      requestedLicenseBadge = '[![License: Hippocratic 3.0](https://img.shields.io/badge/License-Hippocratic_3.0-lightgrey.svg)](https://firstdonoharm.dev)';
      break;
    case 'ICS':
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

// Create and return the ToC based on user provided categories
function createTOC(data)
{
  let tmpTOC = dedent(
    `
    
  ## Table of Contents
  
  `);

  tmpTOC += dedent(
    `

  * [Description](#description)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Contribution](#contribution)
  * [Testing](#testing)
  * [Questions](#questions)
  * [Licensing](#licensing)

  `);

  // // If additional sections created add to ToC
  // if (data.additionalSections.length > 0)
  // {
  //   data.additionalSections.forEach(element =>
  //   {
  //     tmpTOC += dedent(
  //       `

  //       * [${element.sectionTitle}](#${element.sectionTitle.toLowerCase()})
  //       `)
  //   });
  // }

  // tmpTOC += dedent(
  //   `

  //   * [Licensing](#licensing)
    
  //   `
  // )

  return tmpTOC;
}

// Piece together the README
function generateMarkdown(data)
{
  let tmpMD = dedent(
    `# ${data.title}

  ${getLicenseBadge(data.license)}
  
  `);

  // Add ToC
  tmpMD += createTOC(data);

  // Add Description Section
  tmpMD += dedent(
    `

  ## Description

  ${data.description}
  
  `);

  // If a Deployed URL was provided then add to the Description
  if (data.isDeployed)
  {
    tmpMD += dedent(
      `
    
    Deployed Project: ${data.deployedURL}
    
    `);
  }

  // If a pic was provided then add to the Description
  if (data.isDescriptionMedia)
  {
    data.descriptionMedia.forEach(element =>
    {
      tmpMD += dedent(
        `
      
      <br>
        <div>  
            <img src="./assets${element.split("assets")[1].replaceAll("\\", "/")}" target="_blank" alt="" style="max-width: 300px; display: block;" />  
        </div>
      <br>
      
      `)
    });
  }

  // Add Installation instructions
  tmpMD += dedent(
    `

  ## Installation

  ${data.installation}
  
  `);

  // Add Usage directions
  tmpMD += dedent(
    `

  ## Usage

  ${data.usage}
  
  `);

  // If media files where selected for the Usage section
  if (data.isUsageMedia)
  {
    data.usageMedia.forEach(element =>
    {
      tmpMD += dedent(
          `

        <br>
          <div>
              <img src="./assets${element.split("assets")[1].replaceAll("\\", "/")}" target="_blank" alt="" style="max-width: 300px; display: block;" />  
          </div>
        <br>

        `)
    });
  }

  // Add Contribution Section
  tmpMD += dedent(
      `

    ## Contribution

    Follow the "fork-and-pull" Git workflow.

      1. **Fork** the repo on GitHub
      2. **Clone** the project to your own machine
      3. **Commit** changes to your own branch
      4. **Push** your work back up to your fork
      5. Submit a **Pull request** so that we can review your changes
    
    NOTE: Be sure to merge the latest from "upstream" before making a pull request!
    
    `);

  // Add Testing Section
  tmpMD += dedent(
      `
    
    ## Testing
    
    `)

  // Add Questions Section
  tmpMD += dedent(
      `
    
    ## Questions
    
    If you have any questions or would like to collaborate contact me via email:

    <${data.email}>

    Please visit some of my other projects:

    <https://github.com/${data.githubUsername}>
    
    `)

  // // If additional sections were added insert here
  // if (data.additionalSections.length > 0)
  // {
  //   data.additionalSections.forEach(element =>
  //   {
  //     tmpMD += dedent(
  //       `

  //       ## ${element.sectionTitle}

  //       ${element.sectionInfo}

  //       `)
  //   });
  // }

  // Add License info
  tmpMD += dedent(
      `

    ## Licensing

    Code and Docs released under ${data.license}.
    
    `)


  return tmpMD;
}


module.exports = generateMarkdown;
