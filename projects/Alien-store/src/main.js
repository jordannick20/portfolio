
import { addKey } from "./Toolkit.js";

// --------------------------------------------------
// STORE PATHS
// --------------------------------------------------

// Finds the root folder of the Alien Store project.
// This works when hosted inside /projects/Alien-store/.
const storeRoot = new URL("../", import.meta.url);

function storePage(page) {
    return new URL(page, storeRoot).href;
}

// --------------------------------------------------
// ADVERTISEMENTS
// --------------------------------------------------

const ads = [
    `
        <div class="alien-ad">
            <img src="${storePage("images/ezgif.com-gif-maker.gif")}" alt="alien gif">
        </div>
    `,
    `
        <div class="alien-ad">
            <img src="${storePage("images/ezgif.com-gif-maker2.gif")}" alt="alien gif">
        </div>
    `
];

let currentad = 0;

// --------------------------------------------------
// GLOBAL VARIABLES
// --------------------------------------------------

let secondbox;
let brokeloser;
let alienimage;
let nobutton;
let yesbutton;

let selectedPrice = 0;
let quantity = 0;

// --------------------------------------------------
// PRODUCT DESCRIPTIONS
// --------------------------------------------------

const descriptions = {
    "zombie-in-cage": "A hostile zombie contained in a steel cage. It transmits infection to humans through bites or scratches.",

    "bolt_pistoll": "The Bolt Pistol is a high caliber firearm that shoots rocket propelled rounds. Once the round penetrates a target, it detonates, easily killing heavily armored foes.",

    "MK-rifle": "A simple bullpup rifle chambered in 5.56.",

    "space-weed": "Premium space cannabis with 50% THC content. These buds will get any alien faded as fuck.",

    "spacer-wood": "Treated alien wood that is fire resistant, acid resistant, and sandstorm resistant, capable of withstanding the elements of any planet it's placed on. Packed with enough pesticides, fungicides, and herbicides to kill anything that tries to chew on it. We assure you this wood will last for decades.",

    "Adamantine": "99.9% pure adamantine.",

    "sqwig": "This violent creature attacks any humans it sees. According to orks, it also tastes pretty good.",

    "alien-birth-control": "A pill that prevents the alien you plan to penetrate from becoming pregnant. The last thing you want is to be a father of 72 after a one night stand. Side effects vary depending on species.",

    "chain-sword": "This promethium powered blade can cut through metal better than any conventional blade.",

    "space-coke": "Premium space coke for the best galactic parties.",

    "steel-wood": "The strength of steel with the lightness of wood.",

    "alien-heath-juice": "A health pack that heals all wounds—except heartbreak.",

    "ray-gun": "A ray gun perfect for killing zombies.",

    "light-saber": "A lightsaber: a beam that cuts through anything. May the Force be with you.",

    "implo-grenade": "Instead of blasting everything outward, this grenade violently sucks everything nearby into a compacted ball upon detonation.",

    "dragon_knife_01": "A rare knife with a dragon's talon attached to it.",

    "surasia-surasia-spikerifleartstationcover": "Double the lasers, double the power. Features a steel spike on the front for close quarters combat.",

    "bomb": "A bomb useful for many situations: blast mining, destroying enemies, or collapsing a building when a plane can't take it out.",

    "alien-mininuke": "With a blast equivalent to 100 tons of TNT, nothing will stand in your way.",

    "alien-minigun": "Say hello to my little friend a laser Gatling gun.",

    "tunnel-entity": "A mysterious tunnel entity. Make sure not to turn your back on it.",

    "mutant-wasp": "A giant mutant wasp—terrifying and perfect for sending after your enemies.",

    "possesed-dog": "Don't be concerned when it starts floating in the air and speaking in distorted voices.",

    "alien-bug": "A flying alien insect from a distant planet. They make surprisingly good pets.",

    "x9ela8h944k91": "?????",

    "floating-eye-creature": "Perfect for surveillance.",

    "face-hugger": "Face huggers are parasitic organisms that hatch from Xenomorph eggs. Their sole purpose is to implant an embryo into a living host.",

    "snail_1000x1000": "What do you get when you mix 50% tarantula genes and 50% snail genes into a fertilized Uitkujilniax egg? You get a snidder.",

    "mimic": "Perfect for pranks.",

    "glorper-pet": "One of the rarest organisms in the universe—highly sought after by quadrillionaires.",

    "anti-gravity-belt": "Don't leave footprints on the ceiling.",

    "grapple-hook": "With 100 ft of rope, this bad boy will have you feeling like SpiderMan.",

    "intergalatic-tracker": "Detects signals from halfway across the Milky Way.",

    "invisablity-watch": "I am ze spy.",

    "mindcontrol-headset": "Perfect for someone who has zero friends.",

    "pip-boy": "It's like a computer on your wrist.",

    "power-armor": "Tank bullets, run through brick walls, conquer planets.",

    "sheild-belt": "Prevents you from getting shot but also prevents you from shooting others. Best used in combination with melee weapons.",

    "sonic-screwdriver": "The sonic screwdriver manipulates sound waves, radiation, frequencies, signals, and electromagnetism. It can hack, disable, activate, and control technology—truly a super tool.",

    "space-soilder-armor": "Just like power armor, but worse.",

    "x-ray-goggles": "You better not use these to look through women's clothes, you pervert.",

    "super-serum": "A serum that boosts strength and toughness. Wears off after a week.",

    "hydraserum": "Causes the user to grow massively, increasing strength and muscle mass to monstrous levels. Cannot be reversed.",

    "alien-dewormer": "This medicine kills off any parasite that may have entered your body during your travels.",

    "brain-inhancer": "A super drug developed to increase intelligence. While effective, users become slow once off it. Dangerous side effects may include seizures, suicidality, and brain damage from long term abuse.",

    "other-drug": "This injectable research psychedelic causes hallucinations similar to LSD and DMT, but long term effects are not understood.",

    "blue-alien-drug": "Shooter Juice is given to space soldiers across the galaxy, increasing accuracy and reaction time. Side effects include visual hallucinations, dizziness, eye strain, and long term abuse may cause permanent vision loss or blindness.",

    "alien-powder": "Get buff with swole alien energy!!!",

    "regen-medicin": "Tiny bacteria that use your genetic code to regenerate wounds substantially faster. They last about a week before dying off.",

    "plasteel": "A super metal that is lightweight and extremely durable.",

    "Plutonium_ring": "Do not use it as an engagement ring!",

    "uranium": "Uranium fever has done and got me down.",

    "gold-thing": "Useful for jewelry or electronics.",

    "cobolt-60": "Warning: standing next to it for longer than 5 minutes will give you a lethal dose of radiation.",

    "radioactive-waste": "Glowing green goo!!!",

    "compressed-darkmatter": "The most energy dense compound ever created.",

    "alien-metal": "Like gold, but grey.",

    "alien-wood": "An exotic wood that's great for making expensive furniture.",

    "adimantine": "A rare powerfull metal."
};

// --------------------------------------------------
// INITIALIZE ALIEN POPUP
// --------------------------------------------------

secondbox = document.getElementById("alien-centerbar");
brokeloser = document.getElementById("brokeloser");
alienimage = document.getElementById("glorper");

if (secondbox) {
    secondbox.hidden = true;
}

if (brokeloser) {
    brokeloser.hidden = true;
}

if (alienimage) {
    alienimage.hidden = false;
}

// --------------------------------------------------
// ITEM PAGE
// --------------------------------------------------

function initializeItemPage() {

    const params = new URLSearchParams(window.location.search);

    const img = params.get("img");
    const name = params.get("name");
    const price = Number(params.get("price"));

    const description = document.getElementById("descriptcont");
    const itemImage = document.getElementById("itempage-image");

    const backbutton = document.getElementById("back");
    const addtocartbutton = document.getElementById("addtocart");

    const plus = document.getElementById("plus");
    const minus = document.getElementById("minus");

    const theinput = document.getElementById("theinput");
    const theinput2 = document.getElementById("theinput2");

    // Check that the item information exists.

    if (!name || !img || !Number.isFinite(price)) {
        if (description) {
            description.textContent = "Item information could not be loaded.";
        }

        return;
    }

    selectedPrice = price;

    // Display product description.

    if (description) {
        description.textContent =
            descriptions[name] || "No description available.";
    }

    // Display product image.

    if (itemImage) {
        itemImage.src = img;
        itemImage.alt = name;
    }

    // Update quantity and total.

    function updateCartTotal() {

        if (theinput) {
            theinput.value = quantity * selectedPrice;
        }

        if (theinput2) {
            theinput2.value = quantity;
        }
    }

    // Increase quantity.

    if (plus) {
        plus.addEventListener("click", () => {

            quantity++;

            updateCartTotal();

        });
    }

    // Decrease quantity.

    if (minus) {
        minus.addEventListener("click", () => {

            if (quantity > 0) {
                quantity--;
            }

            updateCartTotal();

        });
    }

    // Add item to localStorage.

    if (addtocartbutton) {
        addtocartbutton.addEventListener("click", () => {

            if (quantity < 1) {
                alert("Please select at least one item.");
                return;
            }

            const cartItem = {
                name: name,
                price: price,
                img: img,
                quantity: quantity
            };

            localStorage.setItem(
                name,
                JSON.stringify(cartItem)
            );

            alert("Item added to your cart!");

        });
    }

    // Return to previous category.

    if (backbutton) {
        backbutton.addEventListener("click", () => {

            const last = localStorage.getItem("lastpage");

            if (last && last.startsWith("/")) {
                window.location.href = last;
            } else {
                window.location.href = storePage("index.html");
            }

        });
    }
}

// --------------------------------------------------
// PRODUCT CLICK EVENTS
// --------------------------------------------------

function initializeProducts() {

    document.querySelectorAll(".item").forEach(img => {

        img.addEventListener("click", () => {

            const src = img.getAttribute("src");
            const name = img.dataset.name;
            const price = img.dataset.price;

            if (!src || !name || price === undefined) {
                console.error("Product is missing information.");
                return;
            }

            // Remember the current category page.

            localStorage.setItem(
                "lastpage",
                window.location.pathname
            );

            // Create a safe URL containing product information.

            const params = new URLSearchParams({
                img: src,
                name: name,
                price: price
            });

            window.location.href =
                `${storePage("itempage.html")}?${params.toString()}`;

        });

    });
}

// --------------------------------------------------
// CHECKOUT PAGE
// --------------------------------------------------

function initializeCheckout() {

    const cartItems = [];

    // Find all stored products.

    for (let i = 0; i < localStorage.length; i++) {

        const key = localStorage.key(i);

        if (key === null) continue;

        try {

            const item = JSON.parse(localStorage.getItem(key));

            if (
                item &&
                item.name &&
                typeof item.price === "number"
            ) {
                cartItems.push(item);
            }

        } catch (error) {

            console.error("Could not read cart item:", error);

        }
    }

    // Display cart information in the console.

    console.log("Shopping cart:");

    let total = 0;

    cartItems.forEach(item => {

        console.log("Name:", item.name);
        console.log("Price:", item.price);
        console.log("Quantity:", item.quantity);
        console.log("Image:", item.img);

        total += item.price * (item.quantity || 1);

    });

    console.log("Total:", total);
}

// --------------------------------------------------
// PAGE NAVIGATION WITH ARROW KEYS
// --------------------------------------------------

const pages = [
    "index.html",
    "weapons.html",
    "Creatures.html",
    "gadgets.html",
    "drugs.html",
    "Materials.html"
];

function nextPage() {

    const current = window.location.pathname.split("/").pop();

    const index = pages.indexOf(current);

    if (index >= 0 && index < pages.length - 1) {

        window.location.href = storePage(pages[index + 1]);

    }
}

function previousPage() {

    const current = window.location.pathname.split("/").pop();

    const index = pages.indexOf(current);

    if (index > 0) {

        window.location.href = storePage(pages[index - 1]);

    }
}

addKey(nextPage, "ArrowRight");
addKey(previousPage, "ArrowLeft");

// --------------------------------------------------
// CHANGE ADVERTISEMENTS
// --------------------------------------------------

function showNextAdd() {

    const box = document.getElementById("alien-ad");

    if (!box) return;

    box.innerHTML = ads[currentad];

    currentad = (currentad + 1) % ads.length;

}

// --------------------------------------------------
// ALIEN POPUP
// --------------------------------------------------

function showPopUp() {

    if (!secondbox) return;

    secondbox.hidden = false;

    nobutton = document.getElementById("nobutton");
    yesbutton = document.getElementById("yesbutton");

    if (!nobutton || !yesbutton) return;

    nobutton.hidden = false;
    yesbutton.hidden = false;

    // User chooses not to buy the Glorper.

    nobutton.onclick = () => {

        if (brokeloser) {
            brokeloser.hidden = false;
        }

        if (alienimage) {
            alienimage.hidden = true;
        }

        yesbutton.hidden = true;
        nobutton.hidden = true;

        setTimeout(() => {

            secondbox.hidden = true;

        }, 1000);

    };

    // User chooses to buy the Glorper.

    yesbutton.onclick = () => {

        if (brokeloser) {
            brokeloser.hidden = true;
        }

        if (alienimage) {
            alienimage.hidden = true;
        }

        yesbutton.hidden = true;
        nobutton.hidden = true;

        secondbox.hidden = true;

        const params = new URLSearchParams({
            img: "images/glorper-pet.jpg",
            name: "glorper-pet",
            price: "1000000"
        });

        window.location.href =
            `${storePage("itempage.html")}?${params.toString()}`;

    };
}

// --------------------------------------------------
// LOADING SPINNER
// --------------------------------------------------

function initializeLoading() {

    const overlay = document.querySelector(".g-loading-overlay");

    let spinner = null;

    function hideLoading() {

        if (spinner) {
            spinner.stop();
            spinner = null;
        }

        if (overlay) {
            overlay.style.display = "none";
        }

    }

    window.showLoading = function () {

        if (!overlay || !window.Spinner) return;

        overlay.style.display = "block";

        if (spinner) {
            spinner.stop();
        }

        spinner = new window.Spinner({
            color: "#00FF00",
            lines: 8,
            length: 30,
            width: 12,
            radius: 25,
            speed: 2
        }).spin(overlay);

        setTimeout(hideLoading, 300);

    };

    // Hide the spinner after the page loads.

    window.addEventListener("load", () => {

        setTimeout(hideLoading, 300);

    });

    // Handle browser back and forward navigation.

    window.addEventListener("pageshow", event => {

        if (event.persisted) {
            hideLoading();
        }

    });

    // Show spinner when clicking product images.

    document.querySelectorAll("#imagesforpage img").forEach(img => {

        img.addEventListener("click", () => {

            if (window.showLoading) {
                window.showLoading();
            }

        });

    });

    // Show spinner when navigating between pages.

    document.querySelectorAll("nav a").forEach(link => {

        link.addEventListener("click", () => {

            if (window.showLoading) {
                window.showLoading();
            }

        });

    });

}

// --------------------------------------------------
// INITIALIZE THE WEBSITE
// --------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {

    const currentPage = window.location.pathname.toLowerCase();

    // Product category pages.

    initializeProducts();

    // Item details page.

    if (currentPage.endsWith("/itempage.html")) {
        initializeItemPage();
    }

    // Checkout page.

    if (currentPage.endsWith("/checkout.html")) {
        initializeCheckout();
    }

    // Loading spinner.

    initializeLoading();

    // Advertisements.

    showNextAdd();

    setInterval(showNextAdd, 8000);

    // Alien popup.

    setTimeout(showPopUp, 20000);

});