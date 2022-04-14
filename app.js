// const printProfileData = profileDataArr => {
//     // This...
//     for (let i = 0; i < profileDataArr.length; i += 1) {
//         console.log(profileDataArr[i]);
//     }

//         console.log('================');

//     // Is the same as this...
//     profileDataArr.forEach(profileItem => console.log(profileItem));
// };

// printProfileData(profileDataArgs);
const fs = require('fs');

const { writeFile, copyFile } = require('./utils/generate-site.js'); //put at the top in files we want to recieve those exported functions

const inquirer = require('inquirer');

const promptUser = () =>{
    return inquirer
.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'what is your name?',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log("Please enter your name!");
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: "Enter your GitHub Username",
        validate: githubInput => {
            if (githubInput){
            return true;
        } else {
            console.log("Please enter your github username!");
            return false;
        }
    }
    },
    {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to enter some information about yourself for an "About" section?',
        default: true
    },
    {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:',
        when: ({confirmAbout}) => {
            if (confirmAbout) {
                return true;
            } else {
                return false;
            }
        }
    },
]);
};

const promptProject = (portfolioData) => {
    //If there is no projects array propertyu, create one:
    if(!portfolioData.projects){
    portfolioData.projects = [];
    }
    console.log(`=================
    Add a New Project
    =================`);
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of your project?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log("Please enter the name of your project!");
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a description of the project (Required)',
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log("Please enter a description of your project!");
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log("Please enter your GitHub link!");
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
    ])
    .then(projectData => {
        console.log(projectData);
        portfolioData.projects.push(projectData);
        console.log(portfolioData);
        if (projectData.confirmAddProject) { // evaluating if user wants to add more projects or not
            return promptProject(portfolioData); //if true, the condition will evaluate to true and call the function again
        } else {
            return portfolioData; //if false, then nothing
        }
    });
};

promptUser()
    .then(promptProject)
    .then(portfolioData => {
        return generatePage(portfolioData);
    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .then(writeFileResponse => {
        console.log(writeFileResponse);
        return copyFile();
    })
    .then(copyFileResponse => {
        console.log(copyFileResponse);
    })
    .catch(err => {
        console.log(err);
    });