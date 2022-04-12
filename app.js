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

const generatePage = require('./src/page-template.js'); //put at the top in files we want to recieve those exported functions

const profileDataArgs = process.argv.slice(2);

const [name, github] = profileDataArgs;




fs.writeFile('index.html', generatePage(name, github), err =>{ //first is the filename, then the data being written (so the html string) and then handles errors
    if (err) throw err;

    console.log("portfolio complete! check out index.html to see the output!");
});
