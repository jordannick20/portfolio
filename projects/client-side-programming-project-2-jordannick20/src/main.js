//import { getJSONData } from "./Toolkit.js";
//import { sendJSONData } from "./Toolkit.js";
import { cacheImages } from "./Toolkit.js";
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

    albumData = [
        {
            id: 1,
            source: "city.jpg",
            title:"A neat patio ",
            caption:"A cool patio in the city.",
            comments: []

        },
        {
            id: 2,
            source: "coldwoods.jpg",
            title:"Winter woods",
            caption:"It`s very cold here.",
            comments: []

        },
        {
            id: 3,
            source: "coolpaint.jpg",
            title:"a neat painting",
            caption:"It has a dear in it.",
            comments: []

        },
        {
            id: 4,
            source: "mount.jpg",
            title:"mountains",
            caption:"some mountains.",
            comments: []

        },
        {
            id: 5,
            source: "plankswamp.jpg",
            title:"A little pond",
            caption:"Kinda swampy.",
            comments: []

        },
        {
            id: 6,
            source: "stones.jpg",
            title:"Stones",
            caption:"Stones in the grass.",
            comments: []

        },
        {
            id: 7,
            source: "watersummer.jpg",
            title:"A lake in the summer",
            caption:"A nice place to go swiming",
            comments: []

        },
        {
            id: 8,
            source: "woods.jpg",
            title:"Fall woods",
            caption:"A little foggy",
            comments: []
        }
    ];

    imageFiles = [];
 
    // builds array of image files like [img2.jpg img3.jpg]
    for (let i = 0; i < albumData.length; i++) {
        imageFiles.push(albumData[i].source);
    }
    // preload images
    cacheImages(imageFiles, "images/", onImagesCached);
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

    author = txtAuthor.value.trim();
    comment = txtComment.value.trim();

    if (author == "" || comment == "") {
        warning.innerHTML = "Please fill out both fields";
        return;
    }

    let newComment = {
        author: author,
        comment: comment
    };

    albumData[currentIndex].comments.push(newComment);

    displayComments();

    txtAuthor.value = "";
    txtComment.value = "";

    warning.innerHTML = "Comment added!";
}

//function onCommentResponse() {
//    loadAlbumData(); 
//}

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

//function noPhotos() {
//    photoTitle.textContent = "No photos available";
//    photoCaption.textContent = "";
//    photoCounter.textContent = "Photo 0 of 0";
    // disable all buttons if no photos are returned
//    btnPrevious.disabled = true;
//    btnNext.disabled = true;
//    btnJumpTo.disabled = true;
//    btnAddComment.disabled = true;
    // commentsList on html
//    commentsList.innerHTML = "No comments because there are no photos";
//}

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