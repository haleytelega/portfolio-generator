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
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:'
    }
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
        portfolioData.projects.push(projectData);
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
        console.log(portfolioData);
});
// const fs = require('fs');

// const generatePage = require('./src/page-template.js'); //put at the top in files we want to recieve those exported functions

// const pageHTML = generatePage(name, github);


// fs.writeFile('./index.html', pageHTML, err =>{ //first is the filename, then the data being written (so the html string) and then handles errors
//     if (err) throw err;

//     console.log("portfolio complete! check out index.html to see the output!");
// });
