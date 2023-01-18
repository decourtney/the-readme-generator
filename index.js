const inquirer = require('inquirer');
const inquirerFileTreeSelection = require('inquirer-file-tree-selection-prompt');
const chalk = require('chalk');
const fs = require('fs');
const validator = require('email-validator');
const generateMarkdown = require('./assets/js/generateMarkdown');

// inquirer.registerPrompt("loop", require("inquirer-loop")(inquirer)); // Loop caused minor bugs
inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection);

// Array of questions
const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter your name:',
        validate: validateIsValue
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address:',
        validate: validateIsEmail
    },
    {
        type: 'input',
        name: 'githubUsername',
        message: 'Enter your GitHub username:',
        validate: validateIsValue
    },
    {
        type: 'input',
        name: 'title',
        message: 'Enter the Project Title:',
        validate: validateIsValue
    },
    {
        type: 'editor',
        name: 'description',
        message: 'Enter the Project Description and ' + chalk.bgRed('Save Before Closing the Text Editor') + ':',
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
        name: 'isDescriptionMedia',
        message: 'Would you like to append media files to the Description Section?',
        default: false
    },
    {
        root: './',
        type: 'file-tree-selection',
        name: 'descriptionMedia',
        message: 'Select file(s) (Press ' + chalk.blue('<space>') + ' to select, ' + chalk.blue('<a>') + ' to toggle all, ' + chalk.blue('<i>') + ' to invert selection, and ' + chalk.blue('<enter>') + ' to proceed)',
        multiple: true,
        when: (answers) => answers.isDescriptionMedia
    },
    {
        type: 'editor',
        name: 'installation',
        message: 'Enter the Installation Instructions and ' + chalk.bgRed('Save Before Closing the Text Editor') + ':',
        default: 'N/A'
    },
    {
        type: 'editor',
        name: 'usage',
        message: 'Enter the Usage Directions and ' + chalk.bgRed('Save Before Closing the Text Editor') + ':',
        default: 'N/A'
    },
    {
        type: 'confirm',
        name: 'isUsageMedia',
        message: 'Would you like to append media files to the Usage Section?',
        default: false
    },
    {
        root: './',
        type: 'file-tree-selection',
        name: 'usageMedia',
        message: 'Select file(s) (Press ' + chalk.blue('<space>') + ' to select, ' + chalk.blue('<a>') + ' to toggle all, ' + chalk.blue('<i>') + ' to invert selection, and ' + chalk.blue('<enter>') + ' to proceed)',
        multiple: true,
        when: (answers) => answers.isUsageMedia
    },
    {
        type: 'confirm',
        name: 'isTests',
        message: 'Would you like to include Testing Instructions?',
        default: false
    },
    {
        type: 'editor',
        name: 'tests',
        message: 'Enter the Testing Instructions and ' + chalk.bgRed('Save Before Closing the Text Editor') + ':',
        default: 'N/A',
        when: (answers) => answers.isTests
    },
    {
        type: 'list',
        name: 'license',
        message: 'Select a License:',
        choices: ['GNU AGPLv3', 'GNU GPLv3', 'GNU LGPLv3', 'Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License', 'Boost Software License 1.0', 'The Unlicense'],
        default: 'MIT'
    },
    // The loop is neat however it doesn't play well with type: editor
    // The loop
    // {
    //     type: 'loop',
    //     name: 'additionalSections',
    //     message: 'Would you like to add more Sections to the README?',
    //     questions: [
    //         {
    //             type: 'input',
    //             name: 'sectionTitle',
    //             message: 'Enter the Section Title',
    //         },
    //         {
    //             type: 'editor',
    //             name: 'sectionInfo',
    //             message: 'Enter the Section Information and Save Before Closing the Text Editor (CTRL/CMD S):',
    //             default: 'N/A',
    //         },
    //     ],
    // },
];

// Force the user to submit a value
function validateIsValue(value)
{
    if (!value)
    {
        return 'Please enter a value.';
    }

    return true;
}

// Check for appropriate email format using validator module
function validateIsEmail(value)
{
    if (!validator.validate(value))
    {
        return 'Please enter an email address'
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
        // console.log(answers);
        const readmeContent = generateMarkdown(answers);

        writeToFile('./generatedREADME.md', readmeContent);
    });
}

// Function call to initialize app
init();