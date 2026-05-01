import "../sass/styles.scss";
import { getJSONData } from "./Toolkit.js";
import { sendJSONData } from "./Toolkit.js";
import { Spinner } from "spin.js";
import sanitized from "sanitized";
import { cacheImages } from "./Toolkit.js";
import "spin.js/spin.css";
// albumData is array
let albumData = [];
let currentIndex = 0;
let currentPhoto;
let overlay;
let photoImage;
let photoTitle;
let photoCaption;
let photoCounter;
let btnNext;
let btnPrevious; 
let btnJumpTo; 
let btnAddComment; 
let commentsList; 
let commentPanel; 
let txtAuthor; 
let txtComment; 
let btnCommentOK; 
let jumpPanel; 
let thumbnailContainer; 
let commentBox;
let thumb;
let author;
let text;
let comments;
let comment;
let warning;
let imageFiles = [];

let spinner = new Spinner({ color: "#FF0000", lines: 10 }).spin(document.querySelector(".g-loading-overlay"));

function hideLoading() {
    spinner.stop();
    overlay.style.display = "none";
}

function loadAlbumData() {
    const URL = `https://www.seanmorrow.ca/_lessons/albumRetrieve.php?id=w0525971&count=11`;
    // get the json data run onResponse when the data is returned
    getJSONData(URL, onResponse, onFailure, true);   
}

function onResponse(jsonData) {
    // stores photos in albumData
    albumData = jsonData.photos;
    
    // if no photos stop
    if (albumData.length == 0) {
        noPhotos();
        hideLoading();
        return;
    }
    // builds array of image files like [img2.jpg img3.jpg]
    for (let i = 0; i < albumData.length; i++) {
        imageFiles.push(albumData[i].source);
    }
    // preload images
    cacheImages(imageFiles, "images/", onImagesCached);
    console.log(imageFiles);
    
}
// show first photo build thumbnails
function onImagesCached() {
    displayPhoto();
    buildJumpPanel();
    hideLoading();
}

function onFailure() {
    hideLoading();
    console.log("error loading data");

}

function displayComments() {
    commentsList.innerHTML = "";
    // get comments for current photo
    comments = albumData[currentIndex].comments;
    // if no comments show "No comments yet"
    if (comments.length == 0) {
        commentsList.innerHTML = "No comments yet";
        return;
    }
    // loops backwards so newest comments show first
    for (let i = 0; i < comments.length; i++) {
    //for (let i = comments.length - 1; i >= 0; i--) {
        // creates <div class="comment"></div>
        commentBox = document.createElement("div");
        commentBox.classList.add("comment");

        author = document.createElement("div");
        author.textContent = `submitted by: ${comments[i].author}`;

        text = document.createElement("div");
        text.textContent = `> ${comments[i].comment}`;

        commentBox.append(author);
        commentBox.append(text);
        // commentsList on html
        commentsList.append(commentBox);
    }
}

function displayPhoto() {
    // get current photo
    currentPhoto = albumData[currentIndex];
    // update image
    photoImage.src = `images/${currentPhoto.source}`;
    photoImage.alt = currentPhoto.title;
    // update text
    photoTitle.textContent = currentPhoto.title;
    photoCaption.textContent = currentPhoto.caption;
    // update counter
    photoCounter.textContent = `Photo ${currentIndex + 1} of ${albumData.length}`;
    displayComments();
    updateNavButtons();

}
// move forward 
function onNext() {
    currentIndex++;
    displayPhoto();
}
// move backward
function onPrevious() {
    currentIndex--;
    displayPhoto();   
}
// show thumbnails
function onToggleJumpPanel() {
    jumpPanel.classList.toggle("hidden");
    if (btnJumpTo.textContent == "Close") {
        btnJumpTo.textContent = "Jump";
        return;
    }
    if ( btnJumpTo.textContent =="Jump") {
        btnJumpTo.textContent = "Close";
        return;
    }
}
// show comment panel
function onToggleCommentPanel() {
    commentPanel.classList.toggle("hidden");

}

function onSubmitComment() {
    // sanitize user input
    author = sanitized(txtAuthor.value);
    comment = sanitized(txtComment.value);
    // if author input is greater than 40 or comment input is greater than 100 stop
    if (author.length > 40 || comment.length > 100) {
        warning.innerHTML = "One or more fields are to long!!!";
        return;
    }
    //if (comment.length > 100) {
    //    console.log("bad");
    //    return;
    //}   
    if (author == "" || comment == "") {
        warning.innerHTML = "One or more fields are empty!!!";
        return;
    }
    
    // the data that gets sent to the server
    let sendJSON = {
        "photoId": albumData[currentIndex].id,
        "author": author,
        "comment": comment
        
    };
    console.log(sendJSON);
    // where the data gets sent
    const SEND_URL = `https://www.seanmorrow.ca/_lessons/albumAddComment.php?id=w0525971`;
    console.log(SEND_URL);
    warning.innerHTML = " ";
    // on succsess run onCommentResponse 
    sendJSONData(SEND_URL, sendJSON, onCommentResponse, onFailure );

}

function onCommentResponse() {
    loadAlbumData(); 
}

function buildJumpPanel() {
    thumbnailContainer.innerHTML = "";
    // loop through photos 
    for (let i = 0; i < albumData.length; i++) {
        // create thumbnails
        thumb = document.createElement("img");
        thumb.src = `images/${albumData[i].source}`;
        thumb.alt = albumData[i].title;
        thumb.classList.add("thumbnail");
       
        
        // on click display that photo
        thumb.addEventListener("click", () => {
            currentIndex = i;
            console.log(i);
            displayPhoto();
        });
    
        thumbnailContainer.append(thumb);
    }
}

function updateNavButtons() {

    // Disable Previous button if at first image
    if (currentIndex == 0) {
        btnPrevious.disabled = true;
    } else {
        btnPrevious.disabled = false;
    }

    // Disable Next button if at last image
    if (currentIndex == albumData.length - 1) {
        btnNext.disabled = true;
    } else {
        btnNext.disabled = false;
    }
}

function noPhotos() {
    photoTitle.textContent = "No photos available";
    photoCaption.textContent = "";
    photoCounter.textContent = "Photo 0 of 0";
    // disable all buttons if no photos are returned
    btnPrevious.disabled = true;
    btnNext.disabled = true;
    btnJumpTo.disabled = true;
    btnAddComment.disabled = true;
    // commentsList on html
    commentsList.innerHTML = "No comments because there are no photos";
}

function main() {
    // query selectors
    overlay = document.querySelector(".g-loading-overlay");
    photoImage = document.querySelector("#photoImage");
    photoTitle = document.querySelector("#photoTitle");
    photoCaption = document.querySelector("#photoCaption");
    photoCounter = document.querySelector("#photoCounter");
    btnNext = document.querySelector("#btnNext");
    btnPrevious = document.querySelector("#btnPrevious");
    btnJumpTo = document.querySelector("#btnJumpTo");
    btnAddComment = document.querySelector("#btnAddComment");
    commentsList = document.querySelector("#commentsList");
    commentPanel = document.querySelector("#commentPanel");
    txtAuthor = document.querySelector("#txtAuthor");
    txtComment = document.querySelector("#txtComment");
    btnCommentOK = document.querySelector("#btnCommentOK");
    jumpPanel = document.querySelector("#jumpPanel");
    thumbnailContainer = document.querySelector("#thumbnailContainer");
    warning = document.querySelector("#warning");
    // event listeners
    btnNext.addEventListener("click", onNext);
    btnPrevious.addEventListener("click", onPrevious);
    btnJumpTo.addEventListener("click", onToggleJumpPanel);
    btnAddComment.addEventListener("click", onToggleCommentPanel);
    btnCommentOK.addEventListener("click", onSubmitComment);
    loadAlbumData();
}
main();