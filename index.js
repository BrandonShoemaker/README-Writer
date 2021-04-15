// TODO: Include packages needed for this application
const  writeToFile = require('./utils/generateDocument.js');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');


function validateNotEmpty(confirmNotBlank){
    if(!confirmNotBlank) return false;
    return true;
}

// TODO: Create an array of questions for user input
let steps = [];

const questions = [
{
    type: "input",
    name: "title",
    message: "What is the title of your Project? ",
    validate: confirmNotBlank => {
        return validateNotEmpty(confirmNotBlank);
    }
},
{
    type: "input",
    name: "description",
    message: "Please enter a brief description of the project: ",
    validate: confirmNotBlank => {
        return validateNotEmpty(confirmNotBlank);
    }
},
{
    type: "input",
    name: "usage",
    message: "Explain how to use your program: ",
    validate: confirmNotBlank => {
        return validateNotEmpty(confirmNotBlank);
    }
},
{
    type: "input",
    name: "tests",
    message: "Explain how to run the tests for your program (ENTER to skip): "
},
{
    type: 'list',
    name: 'license',
    message: 'Which license is your README using?',
    choices: ['BSD 3-Clause', 'MIT', 'GPL v3', 'None'],
},
{
    type: "input",
    name: "githubUsername",
    message: "Enter your Github Username: ",
    validate: confirmNotBlank => {
        return validateNotEmpty(confirmNotBlank);
    }
},
{
    type: "input",
    name: "email",
    message: "Enter your email"
},
{
    type: "input",
    name: "howToReach",
    message: "Enter any additional information on how to reach you: (ENTER for none)"
},
{
    type: "input",
    name: "contributors",
    message: "Who contributed to this project? ",
    validate: confirmNotBlank => {
        return validateNotEmpty(confirmNotBlank);
    }
},
{
    type: "number",
    name: "numberOfSteps",
    message: "How many steps are there to install this projects functionalities?",
    validate: confirmNotBlank => {
        if(!confirmNotBlank) return "Please Enter a number, 0-...";
        debugger;
        for(let i = 1; i<=confirmNotBlank; i++){
            steps.push({
                type: "input",
                name: "step" + i,
                message: "Step " + i + ": ",
                validate: confirmNotBlank => {
                    return validateNotEmpty(confirmNotBlank);
                }
            });
        }
        return true;
    },
    filter: input => {
        // clear the invalid input
        // if user enters an empty value or number less than 0, return an empty string
        // else continue
        return Number.isNaN(input) || Number(input) <= 0 ? '' : Number(input)
    },
}
];


// TODO: Create a function to initialize app
function init() {
    // begins inquirer question flow
    return inquirer
    .prompt(questions)
    // first round of questions answered
    .then(answersPart1 => {
        return getStepsForInstall(steps, answersPart1)
    })
    .then(answers => {
        // writes the readme file
        writeToFile("README.md", generateMarkdown(answers), err => {
            if(err){
                console.log(err);
                return;
            }
            console.log("README Constructed!");
        })
    })
}

// gets all steps on how to 
function getStepsForInstall(stepQuestions, answersPart1){
    // if is a new readme, initialize steps attribute
    if(!steps) return;

    // begining of inquirer question flow
    return inquirer
    .prompt(stepQuestions)
    .then(answers => {
        // adds the new step to the attribute queue
        answersPart1.steps = answers;
        // return updated question object
        return answersPart1;
    })
}

// Function call to initialize app
init();
