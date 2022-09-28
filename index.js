const TITLE = document.querySelector(".title");
const INPUT = document.querySelector(".input-area");
const CONVERT = document.querySelector(".input-btn");
const DIRECTION = document.querySelector(".conversion-direction-button")
const LENGTHTITLE = document.querySelector(".length-title");
const VOLUMETITLE = document.querySelector(".volume-title");
const MASSTITLE = document.querySelector(".mass-title");
const LENGTHCARD = document.querySelector(".length-container");
const VOLUMECARD = document.querySelector(".volume-container");
const MASSCARD = document.querySelector(".mass-container");


let enteredAmount = "";
let convertedUnits = [];
let refreshedCards = [LENGTHCARD, VOLUMECARD, MASSCARD];
let newValueText = [];



DIRECTION.addEventListener("click", function() {
    if (DIRECTION.value === "Imperial") {
        changeConversionToMetric();
        DIRECTION.value = "Metric";
    }else {
        changeConversionToImperial();
        DIRECTION.value = "Imperial";
    }
    clearInput()
});

CONVERT.addEventListener("click", function() {
    enteredAmount = Number(INPUT.value);
    if (typeof enteredAmount === "number" && enteredAmount != "NaN") {
        renderAnswers();
    }
    clearInput();
})



function renderAnswers() {
    deleteNewValues(refreshedCards)
    createNewValues();
    getConversions(DIRECTION.value)
    writeNewValues(newValueText)
};

function getConversions(direct) {
    if (direct === "Metric") {
        let toMetricLength = (enteredAmount * 0.3048).toFixed(2);
        let toMetricVolume = (enteredAmount * 4.546).toFixed(2);
        let toMetricMass = (enteredAmount * 0.45359237).toFixed(2);
        convertedUnits = [toMetricLength, toMetricVolume, toMetricMass]
    }else {
        let toImperialLength = (enteredAmount * 0.3048).toFixed(2);
        let toImperialVolume = (enteredAmount * 4.546).toFixed(2);
        let toImperialMass = (enteredAmount * 0.45359237).toFixed(2);
        convertedUnits = [toImperialLength, toImperialVolume, toImperialMass]
    }
};


function createNewValues() {
    let newLength = document.createElement("p");
    LENGTHCARD.appendChild(newLength);
    let newVolume = document.createElement("p");
    VOLUMECARD.appendChild(newVolume);
    let newMass = document.createElement("p");
    MASSCARD.appendChild(newMass);
    newValueText = [newLength, newVolume, newMass];
    
    for (i = 0; i < newValueText.length; i++) {
        newValueText[i].setAttribute("class", "card-conversion-text");
    };
};


function writeNewValues(newValue) {
    if (DIRECTION.value === "Metric") {
        newValue[0].textContent = `${enteredAmount} feet ≈ ${convertedUnits[0]} meters.`;
        newValue[1].textContent = `${enteredAmount} gallons ≈ ${convertedUnits[1]} liters.`;
        newValue[2].textContent = `${enteredAmount} pounds ≈ ${convertedUnits[2]} kilograms.`;
    }else {
        newValue[0].textContent = `${enteredAmount} meters ≈ ${convertedUnits[0]} feet`;
        newValue[1].textContent = `${enteredAmount} liters ≈ ${convertedUnits[1]} gallons.`;
        newValue[2].textContent = `${enteredAmount} kilograms ≈ ${convertedUnits[2]} pounds.`;
    }
};


function deleteNewValues(cards) {
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].lastChild != cards[i].firstChild) {
            cards[i].removeChild(cards[i].lastChild)
        }
    };
};

function clearInput() {
    INPUT.value = "";
    enteredAmount = "";
    newValueText = [];
    convertedUnits = [];
};


function changeConversionToMetric() {
    TITLE.textContent = "Imperial → Metric";
    DIRECTION.textContent = "→ Imperial"
    LENGTHTITLE.textContent = "Length (Feet → Meters)";
    VOLUMETITLE.textContent = "Volume (Gallons → Liters)";
    MASSTITLE.textContent = "Mass (Pounds → Kilograms)"
};


function changeConversionToImperial() {
    TITLE.textContent = "Metric → Imperial";
    DIRECTION.textContent = "→ Metric"
    LENGTHTITLE.textContent = "Length (Meters → Feet)";
    VOLUMETITLE.textContent = "Volume (Liters → Gallons)";
    MASSTITLE.textContent = "Mass (Kilograms → Pounds)"
};