/*
 * The main window to test the Registry Functionality
 * Includes three buttons
 * The three buttons will direct the user to Application 1, Application 2 and Unit Tests respectively
 */

// include the libraries


// create two buttons to launch application1.js and application2.js
var app1btn = mcd.ui.createStandardButton('Launch Locator', '25%', '10%', 'auto','80%');
var app2btn = mcd.ui.createStandardButton('Launch Ordering','35%', '10%', 'auto','80%');

// create a button to launch the unit tests
var testAllBtn = mcd.ui.createStandardButton('Unit Tests', '55%', '10%', 'auto', '80%');

// add event listeners for the buttons
app1btn.addEventListener('click',function(e){
Ti.include('/apps/testRegistry/application1.js');
})

app2btn.addEventListener('click',function(e){
Ti.include('/apps/testRegistry/application2.js');
})

testAllBtn.addEventListener('click',function(e){
Ti.include('/apps/testRegistry/testRegistry.js');
})

// create a window to hold the three buttons
var homeWin = mcd.ui.constructWindow('Testing Registry', 'single', [app1btn,app2btn,testAllBtn]);
homeWin.open();