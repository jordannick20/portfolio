import { cacheImages } from "./Toolkit.js";

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
let warning;
let imageFiles = [];

let spinner = new Spinner({ color: "#FF0000", lines: 10 }).spin(document.querySelector(".g-loading-overlay"));

function hideLoading() {
    spinner.stop();
    overlay.style.display = "none";
}

function loadAlbumData() {

    albumData = [
        { id: 1, source: "city.jpg", title:"A neat patio", caption:"A cool patio in the city.", comments: [] },
        { id: 2, source: "coldwoods.jpg", title:"Winter woods", caption:"It`s very cold here.", comments: [] },
        { id: 3, source: "coolpaint.jpg", title:"A neat painting", caption:"It has a deer in it.", comments: [] },
        { id: 4, source: "mount.jpg", title:"Mountains", caption:"Some mountains.", comments: [] },
        { id: 5, source: "plankswamp.jpg", title:"A little pond", caption:"Kinda swampy.", comments: [] },
        { id: 6, source: "stones.jpg", title:"Stones", caption:"Stones in the grass.", comments: [] },
        { id: 7, source: "watersummer.jpg", title:"A lake in the summer", caption:"A nice place to go swimming", comments: [] },
        { id: 8, source: "woods.jpg", title:"Fall woods", caption:"A little foggy", comments: [] }
    ];

    // FIXED: Correct method name
    let savedComments = localStorage.getItem("galleryComments");

    if (savedComments) {
        let parsedComments = JSON.parse(savedComments);
        for (let i = 0; i < albumData.length; i++) {
            if (parsedComments[i]) {
                albumData[i].comments = parsedComments[i];
            }
        }
    }

    imageFiles = albumData.map(photo => photo.source);

    cacheImages(imageFiles, "images/", onImagesCached);
}

function onImagesCached() {
    displayPhoto();
    buildJumpPanel();
    hideLoading();
}

// FIXED: This is the REAL displayComments function
function displayComments() {
    commentsList.innerHTML = "";

    let comments = albumData[currentIndex].comments;

    if (comments.length === 0) {
        commentsList.textContent = "No comments yet";
        return;
    }

    for (let i = 0; i < comments.length; i++) {
        let commentBox = document.createElement("div");
        commentBox.classList.add("comment");

        let author = document.createElement("div");
        author.textContent = `submitted by: ${comments[i].author}`;

        let text = document.createElement("div");
        text.textContent = `> ${comments[i].comment}`;

        commentBox.append(author, text);
        commentsList.append(commentBox);
    }
}

function displayPhoto() {
    currentPhoto = albumData[currentIndex];

    photoImage.src = `images/${currentPhoto.source}`;
    photoImage.alt = currentPhoto.title;

    photoTitle.textContent = currentPhoto.title;
    photoCaption.textContent = currentPhoto.caption;

    photoCounter.textContent = `Photo ${currentIndex + 1} of ${albumData.length}`;

    displayComments();
    updateNavButtons();
}

function onNext() {
    currentIndex++;
    displayPhoto();
}

function onPrevious() {
    currentIndex--;
    displayPhoto();
}

function onToggleJumpPanel() {
    jumpPanel.classList.toggle("hidden");
    btnJumpTo.textContent = btnJumpTo.textContent === "Jump" ? "Close" : "Jump";
}

function onToggleCommentPanel() {
    commentPanel.classList.toggle("hidden");
}

function onSubmitComment() {
    let author = txtAuthor.value.trim();
    let comment = txtComment.value.trim();

    if (author === "" || comment === "") {
        warning.textContent = "Please fill out both fields";
        return;
    }

    let newComment = { author, comment };

    albumData[currentIndex].comments.push(newComment);

    saveComments();
    displayComments();

    txtAuthor.value = "";
    txtComment.value = "";
    warning.textContent = "Comment added!";
}

function saveComments() {
    let commentsOnly = albumData.map(photo => photo.comments);
    localStorage.setItem("galleryComments", JSON.stringify(commentsOnly));
}

function buildJumpPanel() {
    thumbnailContainer.innerHTML = "";

    for (let i = 0; i < albumData.length; i++) {
        let thumb = document.createElement("img");
        thumb.src = `images/${albumData[i].source}`;
        thumb.alt = albumData[i].title;
        thumb.classList.add("thumbnail");

        thumb.addEventListener("click", () => {
            currentIndex = i;
            displayPhoto();
        });

        thumbnailContainer.append(thumb);
    }
}

function updateNavButtons() {
    btnPrevious.disabled = currentIndex === 0;
    btnNext.disabled = currentIndex === albumData.length - 1;
}

function main() {
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

    btnNext.addEventListener("click", onNext);
    btnPrevious.addEventListener("click", onPrevious);
    btnJumpTo.addEventListener("click", onToggleJumpPanel);
    btnAddComment.addEventListener("click", onToggleCommentPanel);
    btnCommentOK.addEventListener("click", onSubmitComment);

    loadAlbumData();
}

main();