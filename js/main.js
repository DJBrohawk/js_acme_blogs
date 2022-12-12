
/*createElemWithText
a. Receives up to 3 parameters
b. 1st parameter is the HTML element string name to be created (h1, p, button, etc)
c. Set a default value for the 1st parameter to “p”
d. 2nd parameter is the textContent of the element to be created
e. Default value of the 2nd parameter is “”
f. 3rd parameter is a className if one is to be applied (optional)
g. Use document.createElement() to create the requested HTML element
h. Set the other desired element attributes.
i. Return the created element */


function createElemWithText(ele = "p", text = "", className = "") {

    const element = document.createElement(ele);
    element.textContent = text;
    element.className = className;

    return element;
}


/*2. createSelectOptions
a. Test users JSON data available here: https://jsonplaceholder.typicode.com/users
b. For testing (not in function) you may want to define users with the test data.
c. Receives users JSON data as a parameter
d. Returns undefined if no parameter received
e. Loops through the users data
f. Creates an option element for each user with document.createElement()
g. Assigns the user.id to the option.value
h. Assigns the user.name to the option.textContent
i. Return an array of options elements
 */


function createSelectOptions(jsonData){

    if (jsonData === undefined) return undefined;

    let eles = [];

    jsonData.forEach((user) => {

        const element = document.createElement("option");
        element.value = user.id;
        element.textContent = user.name;

        eles.push(element);

    })

    return eles;


}

/* 3. toggleCommentSection
a. Receives a postId as the parameter
b. Selects the section element with the data-post-id attribute equal to the postId
received as a parameter
c. Use code to verify the section exists before attempting to access the classList
property
d. At this point in your code, the section will not exist. You can create one to test if
desired.
e. Toggles the class 'hide' on the section element
f. Return the section element
*/

function toggleCommentSection(postId){

    const element = document.querySelector(`section[data-post-id='${postId}']`);

    if (postId === undefined) return undefined;
    if (element === null) return null;

    element.classList.toggle("hide");

    return element;


}

/*
4. toggleCommentButton
a. Receives a postId as the parameter
b. Selects the button with the data-post-id attribute equal to the postId received as a
parameter
c. If the button textContent is 'Show Comments' switch textContent to 'Hide
Comments'
d. If the button textContent is 'Hide Comments' switch textContent to 'Show
Comments'
e. Suggestion (not required) for above: try a ternary statement
f. Return the button element

*/

function toggleCommentButton(postId) {

    const btn = document.querySelector(`button[data-post-id='${postId}']`);
    if (postId === undefined) return undefined;
    if (btn === null) return null;

    //future me, this bit may not work right
    if(btn.textContent === "Show Comments")
        btn.textContent = "Hide Comments";
    else
        btn.textContent = "Show Comments";


    return btn;

}


/*


5. deleteChildElements
a. Receives a parentElement as a parameter
b. Define a child variable as parentElement.lastElementChild
c. While the child exists…(use a while loop)
d. Use parentElement.removeChild to remove the child in the loop
e. Reassign child to parentElement.lastElementChild in the loop
f. Return the parentElement
NOTE: The above functions had no dependency on other functions. They were very
self-contained which is ideal. That is not always possible though. We will try to limit
dependencies as we go. The next several functions have small dependencies.
*/

function deleteChildElements(parentElement){

    if(parentElement instanceof HTMLElement === false) return undefined;

    let child = parentElement.lastElementChild;

    while(child != null) {

        parentElement.removeChild(child);

        child = parentElement.lastElementChild;


    }

    return parentElement;
}

/*
6. addButtonListeners
a. Selects all buttons nested inside the main element
b. If buttons exist:
c. Loop through the NodeList of buttons
d. Gets the postId from button.dataset.postId
e. Adds a click event listener to each button (reference addEventListener)
f. The listener calls an anonymous function (see cheatsheet)
g. Inside the anonymous function: the function toggleComments is called with the
event and postId as parameters
h. Return the button elements which were selected
i. You may want to define an empty toggleComments function for now. Not all tests
will pass for addButtonListeners until toggleComments exists. I recommend
waiting on the logic inside the toggleComments function until we get there.
*/

function addButtonListeners (){

    const btnList = document.querySelectorAll("main button");

    if(btnList){

        for (let i = 0; i < btnList.length; i++) {

            let postId = btnList[i].dataset.postId;

            btnList[i].addEventListener("click", function(event){
              
                toggleComments(event, postId);

            });
        }
    }

    return btnList;

}

/*
7. removeButtonListeners
a. Selects all buttons nested inside the main element
b. Loops through the NodeList of buttons
c. Gets the postId from button.dataset.id
d. Removes the click event listener from each button (reference
removeEventListener)
e. Refer to the addButtonListeners function as this should be nearly identical
f. Return the button elements which were selected
*/

function removeButtonListeners(){

const btnList = document.querySelectorAll("main button");

for (let i = 0; i < btnList.length; i++) {

    let postId = btnList[i].dataset.id;
    btnList[i].removeEventListener("click", function(event){
              
        toggleComments(event, postId);


    });

}

return btnList;

}

/*

8. createComments
a. Depends on the createElemWithText function we created
b. Receives JSON comments data as a parameter
c. Creates a fragment element with document.createDocumentFragment()
d. Loop through the comments
e. For each comment do the following:
f. Create an article element with document.createElement()
g. Create an h3 element with createElemWithText('h3', comment.name)
h. Create an paragraph element with createElemWithText('p', comment.body)
i. Create an paragraph element with createElemWithText('p', `From:
${comment.email}`)
j. Append the h3 and paragraphs to the article element (see cheatsheet)
k. Append the article element to the fragment
l. Return the fragment element
*/

function createComments(jsonData){

    if(!jsonData) return;

    const dFrag = document.createDocumentFragment();

    jsonData.forEach((comment) => {

        const art = document.createElement("article");
        const h3 = createElemWithText('h3', comment.name);
        const par1 = createElemWithText('p', comment.body);
        const par2 = createElemWithText('p', `From: ${comment.email}`);

        art.append(h3, par1, par2);
        dFrag.append(art);


    });

    return dFrag;

}

/*
9. populateSelectMenu
a. Depends on the createSelectOptions function we created
b. Receives the users JSON data as a parameter
c. Selects the #selectMenu element by id
d. Passes the users JSON data to createSelectOptions()
e. Receives an array of option elements from createSelectOptions
f. Loops through the options elements and appends each option element to the
select menu
g. Return the selectMenu element
NOTE: The next functions use Async / Await to request data from an API. We cover this in
Week 13. I do not recommend proceeding beyond this point until you have completed the
learning module for Week 13.
*/

function populateSelectMenu(jsonData){

    if(!jsonData) return;

    const menu = document.querySelector("#selectMenu");
    const optionList = createSelectOptions(jsonData);

    for (let i = 0; i < optionList.length; i++) {

        menu.append(optionList[i]);

    }

    return menu;

}

/*
10. getUsers
a. Fetches users data from: https://jsonplaceholder.typicode.com/ (look at
Resources section)
b. Should be an async function
c. Should utilize a try / catch block
d. Uses the fetch API to request all users
e. Await the users data response
f. Return the JSON data
*/

const getUsers = async() => {

    try{

    const response = await fetch("https://jsonplaceholder.typicode.com/users/");
    const jsonUsers = response.json();
    return jsonUsers;

    } catch (e) {
        return;
    }

   

}

/*
11. getUserPosts
a. Receives a user id as a parameter
b. Fetches post data for a specific user id from:
https://jsonplaceholder.typicode.com/ (look at Routes section)
c. Should be an async function
d. Should utilize a try / catch block
e. Uses the fetch API to request all posts for a specific user id
f. Await the users data response
g. Return the JSON data
*/

const getUserPosts = async(userId) => {

    if(!userId) return;

    try {

        const response = await fetch("https://jsonplaceholder.typicode.com/users/" + userId + "/posts");
        const jsonPosts = response.json();
        return jsonPosts;

    } catch (e) {
        return;
    }

  
}

/*
12. getUser
a. Receives a user id as a parameter
b. Fetches data for a specific user id from: https://jsonplaceholder.typicode.com/
(look at Routes section)
c. Should be an async function
d. Should utilize a try / catch block
e. Uses the fetch API to request a specific user id
f. Await the user data response
g. Return the JSON data
*/

const getUser = async(userId) => {

    if(!userId) return;

    try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/" + userId + "/");
    const user = response.json();
    return user;

    } catch(e) {
        return;
    }

}

/*
13. getPostComments
a. Receives a post id as a parameter
b. Fetches comments for a specific post id from:
https://jsonplaceholder.typicode.com/ (look at Routes section)
c. Should be an async function
d. Should utilize a try / catch block
e. Uses the fetch API to request all comments for a specific post id
f. Await the users data response
g. Return the JSON data
NOTE: The next functions will depend on the async API data functions we just created.
Therefore, these functions will also need to be async. When they call the API functions, they will
need to await data from those functions.
*/

const getPostComments = async(postId) => {

    if(!postId) return;

    try {

        const response = await fetch("https://jsonplaceholder.typicode.com/posts/" + postId + "/comments/");
        const comments = response.json();
        return comments;
 
    } catch (e) {

        return;
    }

    


}

/*
14. displayComments
a. Dependencies: getPostComments, createComments
b. Is an async function
c. Receives a postId as a parameter
d. Creates a section element with document.createElement()
e. Sets an attribute on the section element with section.dataset.postId
f. Adds the classes 'comments' and 'hide' to the section element
g. Creates a variable comments equal to the result of await
getPostComments(postId);
h. Creates a variable named fragment equal to createComments(comments)
i. Append the fragment to the section
j. Return the section element
*/

const displayComments = async(postId) => {

    if(!postId) return;

    const element = document.createElement("section");
    //element.setAttribute("section.dataset.postId", postId);
    element.dataset.postId = postId;
    element.classList.add("comments", "hide");

    const comments = await getPostComments(postId);
    const fragment = createComments(comments);
    //console.log(comments);
    //console.log(fragment);
    element.append(fragment);
    console.log(element);
    return element;

}

/*
15. createPosts
a. Dependencies: createElemWithText, getUser, displayComments
b. Is an async function
c. Receives posts JSON data as a parameter
d. Create a fragment element with document.createDocumentFragment()
e. Loops through the posts data
f. For each post do the following:
g. Create an article element with document.createElement()
h. Create an h2 element with the post title
i. Create an p element with the post body
j. Create another p element with text of `Post ID: ${post.id}`
k. Define an author variable equal to the result of await getUser(post.userId)
l. Create another p element with text of `Author: ${author.name} with
${author.company.name}`
m. Create another p element with the author’s company catch phrase.
n. Create a button with the text 'Show Comments'
o. Set an attribute on the button with button.dataset.postId = post.id
p. Append the h2, paragraphs, button, and section elements you have created to
the article element.
q. Create a variable named section equal to the result of await
displayComments(post.id);
r. Append the section element to the article element
s. After the loop completes, append the article element to the fragment
t. Return the fragment element
*/

const createPosts = async(jsonData) => {

    if(!jsonData) return;

    const fragment = document.createDocumentFragment();

    for(let i = 0; i < jsonData.length; i++){

            const art = document.createElement("article");

            const h2 = document.createElement("h2");
            h2.textContent = jsonData[i].title;

            const p = document.createElement("p");
            p.textContent = jsonData[i].body;

            const p2 = document.createElement("p");
            p2.textContent = `Post ID: ${jsonData[i].id}`;

            const author = await getUser(jsonData[i].userId);

            const p3 = document.createElement("p");            
            p3.textContent = `Author: ${author.name} with ${author.company.name}`;

            const phrase = document.createElement("p");            
            phrase.textContent = "Multi-layered client-server neural-net";

            const btn = document.createElement("button");
            btn.textContent = "Show Comments";
            //btn.setAttribute("button.dataset.postId", jsonData[i].id);
            btn.dataset.postId = jsonData[i].id;
            art.append(h2, p, p2, p3, phrase, btn);

            //console.log(art);
            const section = await displayComments(jsonData[i].id);

            art.append(section);
            fragment.append(art);

        };

    

    return fragment;



}


/*
16. displayPosts
a. Dependencies: createPosts, createElemWithText
b. Is an async function
c. Receives posts data as a parameter
d. Selects the main element
e. Defines a variable named element that is equal to:
i. IF posts exist: the element returned from await createPosts(posts)
ii. IF post data does not exist: create a paragraph element that is identical to
the default paragraph found in the html file.
iii. Optional suggestion: use a ternary for this conditional
f. Appends the element to the main element
g. Returns the element variable
NOTE: This is the last group of functions. I call them “procedural functions” because they exist
to pull the other functions together in an order that allows the web app to function as it should.
This means their sole purpose is to call dependencies with the correct data in the proper order.
*/

const displayPosts = async(jsonData) => {

    const main = document.querySelector("main");
    let element;

    if(jsonData) {

        element = await createPosts(jsonData);

    } else {

        element = createElemWithText("p", "Select an Employee to display their posts.", "default-text");

    }
   
    main.append(element);
    return element;


}

/*
17. toggleComments
a. Dependencies: toggleCommentSection, toggleCommentButton
b. Receives 2 parameters: (see addButtonListeners function description)
i. The event from the click event listener is the 1st param
ii. Receives a postId as the 2nd parameter
c. Sets event.target.listener = true (I need this for testing to be accurate)
d. Passes the postId parameter to toggleCommentSection()
e. toggleCommentSection result is a section element
f. Passes the postId parameter to toggleCommentButton()
g. toggleCommentButton result is a button
h. Return an array containing the section element returned from
toggleCommentSection and the button element returned from
toggleCommentButton: [section, button]
*/

function toggleComments(event, postId) {

    if(!event || !postId) return;

    event.target.listener = true;

    let arr = [];
    arr.push(toggleCommentSection(postId));
    arr.push(toggleCommentButton(postId));

    return arr;

}

/*
18. refreshPosts
a. Dependencies: removeButtonListeners, deleteChildElements, displayPosts,
addButtonListeners
b. Is an async function
c. Receives posts JSON data as a parameter
d. Call removeButtonListeners
e. Result of removeButtonListeners is the buttons returned from this function
f. Call deleteChildElements with the main element passed in as the parameter
g. Result of deleteChildElements is the return of the main element
h. Passes posts JSON data to displayPosts and awaits completion
i. Result of displayPosts is a document fragment
j. Call addButtonListeners
k. Result of addButtonListeners is the buttons returned from this function
l. Return an array of the results from the functions called: [removeButtons, main,
fragment, addButtons]
*/

const refreshPosts = async(jsonData) => {

    if(!jsonData) return;
//maybe need to separate the pushes from the functions somehow
    let arr = [];

    arr.push(removeButtonListeners());
    arr.push(deleteChildElements(document.querySelector("main")));
    arr.push(await displayPosts(jsonData));
    arr.push(addButtonListeners());

    return arr;


}

/*
19. selectMenuChangeEventHandler
a. Dependencies: getUserPosts, refreshPosts
b. Should be an async function
c. Automatically receives the event as a parameter (see cheatsheet)
d. Disables the select menu when called into action (disabled property)
e. Defines userId = event.target.value || 1; (see cheatsheet)
f. Passes the userId parameter to await getUserPosts
g. Result is the posts JSON data
h. Passes the posts JSON data to await refreshPosts
i. Result is the refreshPostsArray
j. Enables the select menu after results are received (disabled property)
k. Return an array with the userId, posts and the array returned from refreshPosts:
[userId, posts, refreshPostsArray]
*/

const selectMenuChangeEventHandler = async(event) => {

    if(!event) return;

    let arr = [];
    const menu = document.querySelector("#selectMenu");
    menu.disabled = true;
//maybe test to see if the menu is being disabled here?
    const userId = event.target.value || 1;
    arr.push(userId);

    let postData = await getUserPosts(userId);
    arr.push(postData);

    let refresh = await refreshPosts(postData);
    arr.push(refresh);

    menu.disabled = false;

    return arr;

}

/*
20. initPage
a. Dependencies: getUsers, populateSelectMenu
b. Should be an async function
c. No parameters.
d. Call await getUsers
e. Result is the users JSON data
f. Passes the users JSON data to the populateSelectMenu function
g. Result is the select element returned from populateSelectMenu
h. Return an array with users JSON data from getUsers and the select element
result from populateSelectMenu: [users, select]
*/

const initPage = async() => {

    let arr = [];

    const jsonData = await getUsers();
    arr.push(jsonData);

    const element = populateSelectMenu(jsonData);
    arr.push(element);

    return arr;

}

/*
21. initApp
a. Dependencies: initPage, selectMenuChangeEventHandler
b. Call the initPage() function.
c. Select the #selectMenu element by id
d. Add an event listener to the #selectMenu for the “change” event
e. The event listener should call selectMenuChangeEventHandler when the change
event fires for the #selectMenu
f. NOTE: All of the above needs to be correct for you app to function correctly.
However, I can only test if the initApp function exists. It does not return anything.
*/

const initApp = async() => {

    initPage();
    const element = document.querySelector("#selectMenu");
    element.addEventListener("change", selectMenuChangeEventHandler);


}

/*
NOTE: There is one last step to get your app to function correctly. I cannot test for this, but you
must apply it to call the script into action.
*** This must be underneath the definition of initApp in your file.
1. Add an event listener to the document.
2. Listen for the “DOMContentLoaded” event.
3. Put initApp in the listener as the event handler function.
4. This will call initApp after the DOM content has loaded and your app will be started.*/

document.addEventListener("DOMContentLoaded", initApp);