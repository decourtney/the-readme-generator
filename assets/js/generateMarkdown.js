const dedent = require('dedent-js');

// Create License Badge
function getLicense(license)
{
  let requestedLicenseBadge = '';

  switch (license)
  {
    case 'GNU AGPLv3':
      requestedLicenseBadge = ['[![License: GNU AGPLv3](https://img.shields.io/badge/License-AGPLv3-blue.svg)]','(https://choosealicense.com/licenses/agpl-3.0/)']
      break;
    case 'GNU GPLv3':
      requestedLicenseBadge = ['[![License: GNU GPLv3](https://img.shields.io/badge/License-GPLv3-blue.svg)]','(https://choosealicense.com/licenses/gpl-3.0/)'];
      break;
    case 'GNU LGPLv3':
      requestedLicenseBadge = ['[![License: GNU LGPLv3](https://img.shields.io/badge/License-LGPLv3-blue.svg)]','(https://choosealicense.com/licenses/lgpl-3.0/)'];
      break;
    case 'Mozilla Public License 2.0':
      requestedLicenseBadge = ['[![License: Mozilla Public License 2.0](https://img.shields.io/badge/License-Mozilla_Public-blue.svg)]','(https://choosealicense.com/licenses/mpl-2.0/)'];
      break;
    case 'Apache License 2.0':
      requestedLicenseBadge = ['[![License: Apache License 2.0](https://img.shields.io/badge/License-Apache-blue.svg)]','(https://choosealicense.com/licenses/apache-2.0/)'];
      break;
    case 'Boost Software License 1.0':
      requestedLicenseBadge = ['[![License: Boost Software License 1.0](https://img.shields.io/badge/License-Boost_Software-blue.svg)]','(https://choosealicense.com/licenses/bsl-1.0/)'];
      break;
    case 'The Unlicense':
      requestedLicenseBadge = ['[![License: The Unlicense](https://img.shields.io/badge/License-Unlicense-blue.svg)]','(https://choosealicense.com/licenses/unlicense/)'];
      break;
    default:
      // We've been using MIT as the default license throughout the course
      requestedLicenseBadge = ['[![License: MIT License](https://img.shields.io/badge/License-MIT-blue.svg)]','(https://choosealicense.com/licenses/mit/)'];
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

  // This section handled any additional sections created by the inquirer-loop
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
  let licenseInfo = getLicense(data.license);

  let tmpMD = dedent(
    `# ${data.title}

  ${licenseInfo.join('')}
  
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
    
    ${data.tests}

    `)

  // Add Questions Section
  tmpMD += dedent(
    `
    
    ## Questions
    
    Feel free to contact me with any questions or comments:  
    <${data.email}>  
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

    Code and Docs released under [${data.license}]${licenseInfo[1]}.
    
    `)


  return tmpMD;
}


module.exports = generateMarkdown;
