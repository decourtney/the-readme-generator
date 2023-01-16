const inquirer = require('inquirer');
const inquirerFileTreeSelection = require('inquirer-file-tree-selection-prompt');
const chalk = require('chalk');
const fs = require('fs');
const generateMarkdown = require('./assets/js/generateMarkdown');

inquirer.registerPrompt("loop", require("inquirer-loop")(inquirer));
inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection);


// TODO: Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'Enter Your Name:',
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
        message: 'Insert an Image?',
        default: false
    },
    {
        type: 'confirm',
        name: 'isImages',
        message: 'Insert an Image?',
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
        type: 'list',
        name: 'license',
        message: 'Select a License',
        choices: ['Creative Commons License', 'GNU GPL v3', 'Hippocratic License 3.0', 'ICS License', 'Unlicense', 'MIT'],
        default: 'MIT'
    }


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

// TODO: Create a function to write README file
function writeToFile(fileName, data)
{
    fs.writeFile(fileName, data, (err) =>
        err ? console.log(err) : console.log("Successfully created README file!")
    );
}

// TODO: Create a function to initialize app 
function init()
{
    inquirer.prompt(questions).then((answers) =>
    {
        const readmeContent = generateMarkdown(answers);

        writeToFile('./READMEtoo.md', readmeContent);
    });
}

// Function call to initialize app
init();