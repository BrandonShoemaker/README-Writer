// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  if(license === 'None') return `No Badges`;
  let licensesObj = renderLicenseLink(license);
  console.log(licensesObj);

  return `
  [![License: ${license}](${licensesObj.ioLink})](${licensesObj.endLink})
  `
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  let licenseLink = {};
  switch(license){
    case 'MIT':           licenseLink.ioLink = 'https://img.shields.io/badge/License-MIT-yellow.svg';
                          licenseLink.endLink = 'MIT';
                          break;
    case 'GPL v3':        licenseLink.ioLink = 'https://img.shields.io/badge/License-GPLv3-blue.svg';
                          licenseLink.endLink = 'https://www.gnu.org/licenses/gpl-3.0';
                          break;
    case 'BSD 3-Clause':  licenseLink.ioLink = 'https://img.shields.io/badge/License-BSD%203--Clause-blue.svg';
                          licenseLink.endLink = 'https://opensource.org/licenses/BSD-3-Clause';
                          break;
    default: break;
  }
  return licenseLink;

}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  const today = new Date;
  const year = today.getFullYear();
  switch(license){
    case 'MIT':           return `
    ## License Notice

    Project Athena, Athena Dashboard, Athena MUSE, Kerberos, X Window System, TechInfo, and Zephyr are trademarks of the Massachusetts Institute of Technology (MIT). Athena, Discuss, Hesiod, Moria, OLC, and TechMail are registered trademarks of MIT. No commercial use of these trademarks may be made without prior written permission of MIT.
    This software is being provided to you, the LICENSEE, by the Massachusetts Institute of Technology (M.I.T.) under the following license. By obtaining, using and/or copying this software, you agree that you have read, understood, and will comply with these terms and conditions:    
    Permission to use, copy, modify and distribute this software and its documentation for any purpose and without fee or royalty is hereby granted, provided that you agree to comply with the following copyright notice and statements, including the disclaimer, and that the same appear on ALL copies of the software and documentation, including modifications that you make for internal use or for distribution:
    Copyright 1995 by the Massachusetts Institute of Technology. All rights reserved.  

    THIS SOFTWARE IS PROVIDED "AS IS", AND M.I.T. MAKES NO REPRESENTATIONS OR WARRANTIES, EXPRESS OR IMPLIED. By way of example, but not limitation, M.I.T. MAKES NO REPRESENTATIONS OR WARRANTIES OF MERCHANTABILITY OR FITNESS FOR ANY PARTICULAR PURPOSE OR THAT THE USE OF THE LICENSED SOFTWARE OR DOCUMENTATION WILL NOT INFRINGE ANY THIRD PARTY PATENTS, COPYRIGHTS, TRADEMARKS OR OTHER RIGHTS.
    
    The name of the Massachusetts Institute of Technology or M.I.T. may NOT be used in advertising or publicity pertaining to distribution of the software. Title to copyright in this software and any associated documentation shall at all times remain with M.I.T., and LICENSEE agrees to preserve same.`
    

    case 'BSD 3-Clause':       return `
    ## License Notice
    
    Copyright ${year} BSD 3-Clause

    Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
    
    1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
    
    2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
    
    3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
    
    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.`
    

    case 'GPL v3':    return `
    ## License Notice
    
    Copyright ${year} GPL v3

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.`
    
    default: return `
    ## License Notice

    There is no license on this program.
    `;
  }
}

function generateStepContent(steps){
  if(steps.numberOfSteps === 0) return `
  There are no installation steps for this program.
  `;
  let compiledSteps = '';
  let stepAttrReferencer;
  for (let i = 1; i <= steps.numberOfSteps; i++) {
     stepAttrReferencer = 'step' + i;
     compiledSteps += 'Step '+ i +': '+ steps.steps[stepAttrReferencer] +'\n\n';
  }
  return `
  ${compiledSteps}`;
}

function validateTestsAttr(tests){
  if(!tests) return `
  ## Tests

  There are no tests available for this program.
  `;
  return `
  ## Tests

  ${tests}
  `
}

function validateHowToReach(howToReach) {
  if(!howToReach) return `
  
  There are no additional instructions provided on how to obtain contact with the creator of this program.
  `;
  return `${howToReach}`
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  const {title, description, usage, tests, license, githubUsername, email, howToReach, contributors, ...steps} = data;
  return `
# ${title}
${renderLicenseBadge(license)}

##### Table of Contents:
[Description](#description)
[Installation](#install)
[Usage](#usage)
[Contact](#contact)
[Email](#email)
[Additional Info](#addContact)
[Tests](#tests)
[Github](#github)
[License Notice](#license)
[Contributors](#contributors)

<a name="description"/>
## Description

${description}

<a name="install"/>
## Installation

${generateStepContent(steps)}

<a name="usage"/>
## Usage 

${usage}

<a name="contact"/>
## Contact

<a name="email"/>
### Email
${email}

<a name="addContact"/>
### Additional instructions on contacting me
${validateHowToReach(howToReach)}

<a name="tests"/>
${validateTestsAttr(tests)}

<a name="github"/>
## Github Profile

${'https://github.com/' + githubUsername}

<a name="license"/>
${renderLicenseSection(license)}

<a name="contributors"/>
## Contributors

${contributors}


`;
}

module.exports = generateMarkdown;
