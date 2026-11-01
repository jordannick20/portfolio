const ads = [
    `
        <div class="alien-ad">
            <img src="images/ezgif.com-gif-maker.gif" alt="alien gif">
        </div>
    `,
    `
        <div class="alien-ad">
            <img src="images/ezgif.com-gif-maker2.gif" alt="alien gif">
        </div>
    
    `
];

let currentad = 0;
let secondbox;
let brokeloser;
let alienimage;
let nobutton;
let yesbutton;
let selectedPrice = 0;


secondbox = document.getElementById("alien-centerbar")
secondbox.hidden = true;
brokeloser = document.getElementById("brokeloser")
brokeloser.hidden = true;
alienimage = document.getElementById("glorper")
alienimage.hidden = false;



let theinput = document.getElementById("theinput")
let theinput2 = document.getElementById("theinput2")
let plus = document.getElementById("plus")

if (plus && theinput) {
    plus.addEventListener("click", () => { 
        theinput.value = Number(theinput.value) + selectedPrice;
        theinput2.value = Number(theinput2.value) + 1;

    });
}

if (window.location.pathname.includes("Materials.html")) {

    document.querySelectorAll(".item").forEach(img => {
        img.addEventListener("click", () => {
            localStorage.setItem("lastpage", window.location.pathname);
            selectedPrice = Number(img.dataset.price);
            let src = img.getAttribute("src");
            let name = img.dataset.name;
            window.location.href = `itempage.html?img=${src}&name=${name}&price=${img.dataset.price}`;
        });
    });
}

if (window.location.pathname.includes("Creatures.html")) {

    document.querySelectorAll(".item").forEach(img => {
        img.addEventListener("click", () => {
            localStorage.setItem("lastpage", window.location.pathname);
            selectedPrice = Number(img.dataset.price);
            let src = img.getAttribute("src");
            let name = img.dataset.name;

            window.location.href = `itempage.html?img=${src}&name=${name}&price=${img.dataset.price}`;
        });
    });
}

if (window.location.pathname.includes("index.html")) {

    document.querySelectorAll(".item").forEach(img => {
        img.addEventListener("click", () => {
            localStorage.setItem("lastpage", window.location.pathname);
            selectedPrice = Number(img.dataset.price);
            let src = img.getAttribute("src");
            let name = img.dataset.name;

            window.location.href = `itempage.html?img=${src}&name=${name}&price=${img.dataset.price}`;
        });
    });
}

if (window.location.pathname.includes("drugs.html")) {

    document.querySelectorAll(".item").forEach(img => {
        img.addEventListener("click", () => {
            localStorage.setItem("lastpage", window.location.pathname);
            selectedPrice = Number(img.dataset.price);
            let src = img.getAttribute("src");
            let name = img.dataset.name;

            window.location.href = `itempage.html?img=${src}&name=${name}&price=${img.dataset.price}`;
        });
    });
}

if (window.location.pathname.includes("Gadgets.html")) {

    document.querySelectorAll(".item").forEach(img => {
        img.addEventListener("click", () => {
            localStorage.setItem("lastpage", window.location.pathname);
            selectedPrice = Number(img.dataset.price);
            let src = img.getAttribute("src");
            let name = img.dataset.name;

            window.location.href = `itempage.html?img=${src}&name=${name}&price=${img.dataset.price}`;
        });
    });
}

if (window.location.pathname.includes("Weapons.html")) {

    document.querySelectorAll(".item").forEach(img => {
        img.addEventListener("click", () => {
            localStorage.setItem("lastpage", window.location.pathname);
            selectedPrice = Number(img.dataset.price);
            let src = img.getAttribute("src");
            let name = img.dataset.name;

            window.location.href = `itempage.html?img=${src}&name=${name}&price=${img.dataset.price}`;
            
        });
    });
}

let minus = document.getElementById("minus")

if (minus && theinput) {
    minus.addEventListener("click", () => { 
        theinput.value = Number(theinput.value) - selectedPrice ;
        theinput2.value = Number(theinput2.value) - 1;

        if (theinput.value < 1) 
            theinput.value = 0;
        if (theinput2.value < 1) 
            theinput2.value = 0;

    });
}


if (window.location.pathname.includes("itempage.html")) {
    let backbutton = document.getElementById("back")
    backbutton.addEventListener("click", () => {
        let last = localStorage.getItem("lastpage");

        if (last) {
            window.location.href = last;
        } else {
            window.location.href = "/index.html"; // fallback
        }
        showLoading()
        

    });

    let params = new URLSearchParams(window.location.search);

    let img = params.get("img");
    let name = params.get("name");
    let price = Number(params.get("price"));

    selectedPrice = price;

    document.getElementById("itempage-image").src = img;

    let addtocartbutton = document.getElementById("addtocart")
    addtocartbutton.addEventListener("click", () => {
            localStorage.setItem(name, JSON.stringify({name, price, img}))
    });

if (window.location.pathname.includes("Checkout.html")) {
    let item = JSON.parse(
    localStorage.getItem(name)
    )


console.log(item.price);
console.log(item.img);
};

if (name === "zombie-in-cage")
    document.getElementById("descriptcont").innerHTML =
    "<div>A hostile zombie contained in a steel cage. It transmits infection to humans through bites or scratches.</div>";

if (name === "bolt_pistoll")
    document.getElementById("descriptcont").innerHTML =
    "<div>The Bolt Pistol is a high caliber firearm that shoots rocket propelled rounds. Once the round penetrates a target, it detonates, easily killing heavily armored foes.</div>";

if (name === "MK-rifle")
    document.getElementById("descriptcont").innerHTML =
    "<div>A simple bullpup rifle chambered in 5.56.</div>";

if (name === "space-weed")
    document.getElementById("descriptcont").innerHTML =
    "<div>Premium space cannabis with 50% THC content. These buds will get any alien faded as fuck.</div>";

if (name === "spacer-wood")
    document.getElementById("descriptcont").innerHTML =
    "<div>Treated alien wood that is fire resistant, acid resistant, and sandstorm resistant, capable of withstanding the elements of any planet it's placed on. Packed with enough pesticides, fungicides, and herbicides to kill anything that tries to chew on it. We assure you this wood will last for decades.</div>";

if (name === "Adamantine")
    document.getElementById("descriptcont").innerHTML =
    "<div>99.9% pure adamantine.</div>";

if (name === "sqwig")
    document.getElementById("descriptcont").innerHTML =
    "<div>This violent creature attacks any humans it sees. According to orks, it also tastes pretty good.</div>";

if (name === "alien-birth-control")
    document.getElementById("descriptcont").innerHTML =
    "<div>A pill that prevents the alien you plan to penetrate from becoming pregnant. The last thing you want is to be a father of 72 after a one night stand. Side effects vary depending on species.</div>";

if (name === "chain-sword")
    document.getElementById("descriptcont").innerHTML =
    "<div>This promethium powered blade can cut through metal better than any conventional blade.</div>";

if (name === "space-coke")
    document.getElementById("descriptcont").innerHTML =
    "<div>Premium space coke for the best galactic parties.</div>";

if (name === "steel-wood")
    document.getElementById("descriptcont").innerHTML =
    "<div>The strength of steel with the lightness of wood.</div>";

if (name === "alien-heath-juice")
    document.getElementById("descriptcont").innerHTML =
    "<div>A health pack that heals all wounds—except heartbreak.</div>";

if (name === "ray-gun")
    document.getElementById("descriptcont").innerHTML =
    "<div>A ray gun perfect for killing zombies.</div>";

if (name === "light-saber")
    document.getElementById("descriptcont").innerHTML =
    "<div>A lightsaber: a beam that cuts through anything. May the Force be with you.</div>";

if (name === "implo-grenade")
    document.getElementById("descriptcont").innerHTML =
    "<div>Instead of blasting everything outward, this grenade violently sucks everything nearby into a compacted ball upon detonation.</div>";

if (name === "dragon_knife_01")
    document.getElementById("descriptcont").innerHTML =
    "<div>A rare knife with a dragon's talon attached to it.</div>";

if (name === "surasia-surasia-spikerifleartstationcover")
    document.getElementById("descriptcont").innerHTML =
    "<div>Double the lasers, double the power. Features a steel spike on the front for close quarters combat.</div>";

if (name === "bomb")
    document.getElementById("descriptcont").innerHTML =
    "<div>A bomb useful for many situations: blast mining, destroying enemies, or collapsing a building when a plane can't take it out.</div>";

if (name === "alien-mininuke")
    document.getElementById("descriptcont").innerHTML =
    "<div>With a blast equivalent to 100 tons of TNT, nothing will stand in your way.</div>";

if (name === "alien-minigun")
    document.getElementById("descriptcont").innerHTML =
    "<div>Say hello to my little friend a laser Gatling gun.</div>";

if (name === "tunnel-entity")
    document.getElementById("descriptcont").innerHTML =
    "<div>A mysterious tunnel entity. Make sure not to turn your back on it.</div>";

if (name === "mutant-wasp")
    document.getElementById("descriptcont").innerHTML =
    "<div>A giant mutant wasp—terrifying and perfect for sending after your enemies.</div>";

if (name === "possesed-dog")
    document.getElementById("descriptcont").innerHTML =
    "<div>Don't be concerned when it starts floating in the air and speaking in distorted voices.</div>";

if (name === "alien-bug")
    document.getElementById("descriptcont").innerHTML =
    "<div>A flying alien insect from a distant planet. They make surprisingly good pets.</div>";

if (name === "x9ela8h944k91")
    document.getElementById("descriptcont").innerHTML =
    "<div>?????</div>";

if (name === "floating-eye-creature")
    document.getElementById("descriptcont").innerHTML =
    "<div>Perfect for surveillance.</div>";

if (name === "face-hugger")
    document.getElementById("descriptcont").innerHTML =
    "<div>Face huggers are parasitic organisms that hatch from Xenomorph eggs. Their sole purpose is to implant an embryo into a living host.</div>";

if (name === "snail_1000x1000")
    document.getElementById("descriptcont").innerHTML =
    "<div>What do you get when you mix 50% tarantula genes and 50% snail genes into a fertilized Uitkujilniax egg? You get a snidder.</div>";

if (name === "mimic")
    document.getElementById("descriptcont").innerHTML =
    "<div>Perfect for pranks.</div>";

if (name === "glorper-pet")
    document.getElementById("descriptcont").innerHTML =
    "<div>One of the rarest organisms in the universe—highly sought after by quadrillionaires.</div>";

if (name === "anti-gravity-belt")
    document.getElementById("descriptcont").innerHTML =
    "<div>Don't leave footprints on the ceiling.</div>";

if (name === "grapple-hook")
    document.getElementById("descriptcont").innerHTML =
    "<div>With 100 ft of rope, this bad boy will have you feeling like SpiderMan.</div>";

if (name === "intergalatic-tracker")
    document.getElementById("descriptcont").innerHTML =
    "<div>Detects signals from halfway across the Milky Way.</div>";

if (name === "invisablity-watch")
    document.getElementById("descriptcont").innerHTML =
    "<div>I am ze spy.</div>";

if (name === "mindcontrol-headset")
    document.getElementById("descriptcont").innerHTML =
    "<div>Perfect for someone who has zero friends.</div>";

if (name === "pip-boy")
    document.getElementById("descriptcont").innerHTML =
    "<div>It's like a computer on your wrist.</div>";

if (name === "power-armor")
    document.getElementById("descriptcont").innerHTML =
    "<div>Tank bullets, run through brick walls, conquer planets.</div>";

if (name === "sheild-belt")
    document.getElementById("descriptcont").innerHTML =
    "<div>Prevents you from getting shot but also prevents you from shooting others. Best used in combination with melee weapons.</div>";

if (name === "sonic-screwdriver")
    document.getElementById("descriptcont").innerHTML =
    "<div>The sonic screwdriver manipulates sound waves, radiation, frequencies, signals, and electromagnetism. It can hack, disable, activate, and control technology—truly a super tool.</div>";

if (name === "space-soilder-armor")
    document.getElementById("descriptcont").innerHTML =
    "<div>Just like power armor, but worse.</div>";

if (name === "x-ray-goggles")
    document.getElementById("descriptcont").innerHTML =
    "<div>You better not use these to look through women's clothes, you pervert.</div>";

if (name === "super-serum")
    document.getElementById("descriptcont").innerHTML =
    "<div>A serum that boosts strength and toughness. Wears off after a week.</div>";

if (name === "hydraserum")
    document.getElementById("descriptcont").innerHTML =
    "<div>Causes the user to grow massively, increasing strength and muscle mass to monstrous levels. Cannot be reversed.</div>";

if (name === "alien-dewormer")
    document.getElementById("descriptcont").innerHTML =
    "<div>This medicine kills off any parasite that may have entered your body during your travels.</div>";

if (name === "brain-inhancer")
    document.getElementById("descriptcont").innerHTML =
    "<div>A super drug developed to increase intelligence. While effective, users become slow once off it. Dangerous side effects may include seizures, suicidality, and brain damage from long term abuse.</div>";

if (name === "other-drug")
    document.getElementById("descriptcont").innerHTML =
    "<div>This injectable research psychedelic causes hallucinations similar to LSD and DMT, but long term effects are not understood.</div>";

if (name === "blue-alien-drug")
    document.getElementById("descriptcont").innerHTML =
    "<div>Shooter Juice is given to space soldiers across the galaxy, increasing accuracy and reaction time. Side effects include visual hallucinations, dizziness, eye strain, and long term abuse may cause permanent vision loss or blindness.</div>";

if (name === "alien-powder")
    document.getElementById("descriptcont").innerHTML =
    "<div>Get buff with swole alien energy!!!</div>";

if (name === "regen-medicin")
    document.getElementById("descriptcont").innerHTML =
    "<div>Tiny bacteria that use your genetic code to regenerate wounds substantially faster. They last about a week before dying off.</div>";

if (name === "plasteel")
    document.getElementById("descriptcont").innerHTML =
    "<div>A super metal that is lightweight and extremely durable.</div>";

if (name === "Plutonium_ring")
    document.getElementById("descriptcont").innerHTML =
    "<div>Do not use it as an engagement ring!</div>";

if (name === "uranium")
    document.getElementById("descriptcont").innerHTML =
    "<div>Uranium fever has done and got me down.</div>";

if (name === "gold-thing")
    document.getElementById("descriptcont").innerHTML =
    "<div>Useful for jewelry or electronics.</div>";

if (name === "cobolt-60")
    document.getElementById("descriptcont").innerHTML =
    "<div>Warning: standing next to it for longer than 5 minutes will give you a lethal dose of radiation.</div>";

if (name === "radioactive-waste")
    document.getElementById("descriptcont").innerHTML =
    "<div>Glowing green goo!!!</div>";

if (name === "compressed-darkmatter")
    document.getElementById("descriptcont").innerHTML =
    "<div>The most energy dense compound ever created.</div>";

if (name === "alien-metal")
    document.getElementById("descriptcont").innerHTML =
    "<div>Like gold, but grey.</div>";

if (name === "alien-wood")
    document.getElementById("descriptcont").innerHTML =
    "<div>An exotic wood that's great for making expensive furniture.</div>";

if (name === "adimantine")
    document.getElementById("descriptcont").innerHTML =
    "<div>A rare powerfull metal.</div>";

}


function showNextAdd() {
    let box = document.getElementById("alien-ad")

    box.innerHTML = ads[currentad];

    currentad = (currentad + 1) % ads.length;

}

function showPopUp() {
    secondbox.hidden = false;

    nobutton = document.getElementById("nobutton")
    nobutton.hidden = false;

    nobutton.addEventListener("click", () => {
        brokeloser.hidden = false;
        alienimage.hidden = true;
        yesbutton.hidden = true;
        nobutton.hidden = true;

        setTimeout(() => {secondbox.hidden = true;}, 1000);});

    yesbutton = document.getElementById("yesbutton")
    yesbutton.hidden = false

    yesbutton.addEventListener("click", () => {
        brokeloser.hidden = true;
        alienimage.hidden = true;
        yesbutton.hidden = true;
        nobutton.hidden = true;
        secondbox.hidden = true;
        window.location.href = `itempage.html?img=images/glorper-pet.jpg&name=glorper-pet`;

    })

}

window.addEventListener("DOMContentLoaded", () => {

    const overlay = document.querySelector(".g-loading-overlay");
    const page = document.querySelector("#p-page");

    let spinner = new Spinner({
        color: "#00FF00",
        lines: 8,
        length: 30,
        width: 12,
        radius: 25,
        speed: 2

        

    }).spin(overlay);

    window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        hideLoading();
    }

});

    function hideLoading() {
        spinner.stop();
        overlay.style.display = "none";
        page.classList.add("loaded");
    }

    // | makes it global!!! |
    // V                    V
    window.showLoading = function () {
        overlay.style.display = "block";

        spinner = new Spinner({
            color: "#00FF00",
            lines: 8,
            length: 30,
            width: 12,
            radius: 25,
            speed: 2
        }).spin(overlay);

        page.classList.remove("loaded");

        setTimeout(hideLoading, 300);
    }

    window.addEventListener("load", () => setTimeout(hideLoading, 300));
    
    document.querySelectorAll("#imagesforpage img").forEach(otherlink => {
        otherlink.addEventListener("click", showLoading);
    });

    window.addEventListener("load", () => setTimeout(hideLoading, 300));

    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", showLoading);
    });
    
});



showNextAdd();

setInterval(showNextAdd, 8000);

setTimeout(showPopUp, 20000)