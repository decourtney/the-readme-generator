const inquirer = require('inquirer');
const inquirerFileTreeSelection = require('inquirer-file-tree-selection-prompt');
const chalk = require('chalk');
const fs = require('fs');
const generateMarkdown = require('./assets/js/generateMarkdown');

inquirer.registerPrompt("loop", require("inquirer-loop")(inquirer));
inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection);


// Array of questions
const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter your name:',
        validate: validateIsValue,
    },
    {
        type: 'input',
        name: 'title',
        message: 'Enter the Project Title:',
        validate: validateIsValue,
    },
    {
        type: 'editor',
        name: 'description',
        message: 'Enter the Project Description and Save Before Closing the Text Editor (CTRL/CMD S):',
        default: 'N/A'
    },
    {
        type: 'confirm',
        name: 'isDeployed',
        message: 'Is the Project Deployed? (y/n)',
        default: false
    },
    {
        type: 'input',
        name: 'deployedURL',
        message: 'Enter the Deployed URL:',
        validate: validateIsValue,
        when: (answers) => answers.isDeployed
    },
    {
        type: 'confirm',
        name: 'isImages',
        message: 'Insert an image?',
        default: false
    },
    {
        root: './',
        type: 'file-tree-selection',
        name: 'images',
        message: 'Select file(s) (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)',
        multiple: true,
        when: (answers) => answers.isImages
    },
    {
        type: 'editor',
        name: 'installation',
        message: 'Enter the Installation Instructions and Save Before Closing the Text Editor (CTRL/CMD S):',
        default: 'N/A'
    },
    {
        type: 'editor',
        name: 'usage',
        message: 'Enter the Usage Directions and Save Before Closing the Text Editor (CTRL/CMD S):',
        default: 'N/A'
    },
    {
        type: 'confirm',
        name: 'isMedia',
        message: 'Would you like to attach any media files to the Usage section?',
        default: false
    },
    {
        root: './',
        type: 'file-tree-selection',
        name: 'media',
        message: 'Select file(s) (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)',
        multiple: true,
        when: (answers) => answers.isMedia
    },
    {
        type: 'list',
        name: 'license',
        message: 'Select a License',
        choices: ['Creative Commons License', 'GNU GPL v3 License', 'Hippocratic License 3.0', 'ICS License', 'Unlicense', 'MIT License'],
        default: 'MIT'
    },
    {
        type: 'loop',
        name: 'additionalSections',
        message: 'Would you like to add more Sections to the README?',
        questions: [
            {
                type: 'input',
                name: 'sectionTitle',
                message: 'Enter the Section Title',
            },
            {
                type: 'editor',
                name: 'sectionInfo',
                message: 'Enter the Section Information and Save Before Closing the Text Editor (CTRL/CMD S):',
                default: 'N/A',
            },
        ],
    },
]

// Force the user to submit a value
function validateIsValue(value)
{
    if (!value)
    {
        return 'Please enter a value.';
    }
    return true;
}

// Write README to file
function writeToFile(fileName, data)
{
    fs.writeFile(fileName, data, (err) =>
        err ? console.log(err) : console.log("Successfully created README file!")
    );
}

// Start the app
function init()
{
    inquirer.prompt(questions).then((answers) =>
    {
        console.log(answers);
        const readmeContent = generateMarkdown(answers);
  
        writeToFile('./generatedREADME.md', readmeContent);
    });
}

// Function call to initialize app
init();