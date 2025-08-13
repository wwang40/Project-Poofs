class POOF {
    constructor(name, img, rarity, features, description) {
        if (!(name & img & rarity & features & description)) {
            console.log("Using default POOF settings");
            this.name = "POOF1";
            this.img = "POOF1.png";
            this.rarity = 1;
            this.features = ["Joke", "Words of Affirmation", "Cat Picture"]
            this.description = "I am a POOF whose only purpose in life is to serve as a placeholder for testing."
        }

        this.name = name;
        this.img = chrome.runtime.getURL(`assets/${img.replace('assets/', '')}`);
        this.rarity = rarity;
        this.features = features
        this.description = description
        this.css_element;
    }

    getName() {
        return this.name;
    }
    getRarity() {
        return this.rarity;
    }
    getFeatures(num) {
        return this.features[num];
    }
    getDescription() {
        return this.description;
    }

    //Replace square with image design
    setUpCSS(positionX, positionY, document) {
        const Add_Custom_CSS = css => document.head.appendChild(document.createElement("style")).innerHTML = css

            const poofSprite = this.img.replace(/"/g, '\\"');
            console.log('Image path:', poofSprite.replace(/"/g, '\\"'));
            let scale = 1;
            const poofDimensions = 100 * scale; // 100 is default
            Add_Custom_CSS(`
                .poof {
                    all: initial;
                    position: fixed;
                    width: ${poofDimensions}px !important;
                    height: ${poofDimensions}px !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    background-image: url(' ${poofSprite}');
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position: center;
                    z-index: 2147483647; /* Maximum possible */
                    transform: translateZ(0);
                    box-sizing: content-box !important;
                    ${`left: ${positionX};`}
                    ${`top: ${positionY};`}
                    pointer-events: auto;
                }
                .speech_bubble {
                    line-height: normal !important;
                    position: absolute;
                    background: #ffffff;
                    color: #000000;
                    font-family: Arial;
                    text-align: center;
                    width: 150px;
                    height: ${this.features.length * 20}px;
                    border-radius: 10px;
                    padding: 0px;
                    z-index: 2147483645;
                    right: 110% !important;
                    top: 0% !important;
                    display: none;
                    visibility: hidden;
                    margin-top: 0px !important;
                }
                .speech_bubble.input {
                    position: absolute;
                    type: text;
                    background: #cceef9ff; 
                    display: block;
                    z-index: 2147483647;
                }
                .feature {
                    position: absolute;
                    width: 150px !important;
                    height: 20px !important;
                    margin-top: 0px !important;
                    padding: 0 !important;
                    background: transparent;
                    z-index: 2147483647; /* Maximum possible */
                    transform: translateZ(0);
                    box-sizing: content-box !important;
                    visibility: hidden;
                    right: 0px;
                    top: 0px;
                    font-size: 15px;
                }
            `)
    }

    // Adds HTML element to webpage which we can change through functions
    Create_Custom_Element(tag, attr_name, id, text) {
        const custom_element = document.createElement(tag);
        custom_element.className = attr_name || 'poof';
        if (id) custom_element.id = id;
        //if (text) custom_element.textContent = text; // Comment off for testing
        document.body.append(custom_element);
        this.css_element = custom_element;
    }

    hideElement() {
        this.css_element.style.display = 'none';
    }
    showElement() {
        this.css_element.style.display = 'block';
    }

    // Adds drag functionality to HTML component
    dragElement() {
        const elmnt = this.css_element;

        elmnt.onmousedown = dragMouseDown;

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
            

            displaySprite(e);
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // Calculate new position
            const newX = e.clientX;
            const newY = e.clientY;
            
            // Update position
            elmnt.style.left = (newX - 40) + "px";
            elmnt.style.top = (newY - 10) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
            chrome.storage.local.set({
                positionX: elmnt.style.left,
                positionY: elmnt.style.top
            });
        }

        const displaySprite = (e) => {
            const dragSprite = chrome.runtime.getURL(`assets/${this.name}_drag.gif`);

            console.log('GIF path: ' + dragSprite);
            this.css_element.style.backgroundImage = `url("${dragSprite}")`;
        };

        elmnt.onmouseup = (e) => {
            elmnt.style.backgroundImage = `url("${this.img}")`;
            console.log("Returned to original sprite: " + this.img)
        }
    }

    // Add click event to HTML component
    dialogueElement(document) {
        const element = this.css_element;
        let startTime = 0;
        let startX = 0;
        let startY = 0;

        // Store references to XY positions
        const mouseDownHandler = (e) => {
            startTime = Date.now();
            startX = parseInt(element.style.left) || 0;
            startY = parseInt(element.style.top) || 0;
        };

        // Store reference to duration of mouse held down
        const clickHandler = (e) => {
            const duration = Date.now() - startTime;
            const currentX = parseInt(element.style.left) || 0;
            const currentY = parseInt(element.style.top) || 0;

            // Calculate if click or drag
            if (duration < 150 && 
                Math.abs(currentX - startX) < 50 && 
                Math.abs(currentY - startY) < 50) {
                    
                this.handleFeatureDisplay(document)
                
                console.log("You clicked the POOF! Duration: " + duration + "ms");
            }
        };


        // Add listeners to component
        element.addEventListener("mousedown", mouseDownHandler);
        element.addEventListener("click", clickHandler);

        this.cleanupDialogueListeners = () => {
            element.removeEventListener("mousedown", mouseDownHandler);
            element.removeEventListener("click", clickHandler);
        };
    }

    setUpFeatures() {
        let speech_bubble = document.createElement("div");
        speech_bubble.className = "speech_bubble";

        for (let i = 0; i < this.features.length; i ++) {
            let feature = new Feature(this.features[i].toString, i);
            feature.Create_Custom_Element("div", "feature", this.features[i].toString());
            speech_bubble.appendChild(feature.getCSS())
        }

        this.css_element.append(speech_bubble);
    }

    handleFeatureDisplay(document) {
        let elements = document.getElementsByClassName("feature");
        Array.from(elements).forEach(element => {
            if (element.style.visibility == "visible") {
                element.style.visibility = "hidden"
            } else {
                element.style.visibility = "visible"
            }
        })
        elements = document.getElementsByClassName("speech_bubble");
        Array.from(elements).forEach(element => {
            if (element.style.visibility == "visible") {
                element.style.visibility = "hidden";
                element.style.display = "none";
            } else {
                element.style.visibility = "visible";
                element.style.display = "block";
            }
        })
    }


    
}