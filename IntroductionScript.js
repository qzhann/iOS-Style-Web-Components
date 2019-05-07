let contentDiv = document.getElementById("contentDiv");

let bigTitleLabel = document.getElementById("bigTitleLabel");

let introductionLayer = document.getElementById("introductionLayer");
let animatedContentsLayer = document.getElementById("animatedContentsLayer");
let scrollIndicator = document.getElementById("scrollIndicator");
let iPhoneBackgroundLayer = document.getElementById("iPhoneBackgroundLayer");

let viewsLayer = document.getElementById("viewsLayer");
let iPhoneDiv = document.getElementById("iPhoneDiv");
let helloWorldLabel = document.getElementById("helloWorldLabel");
let peanutImageView = document.getElementById("peanutImageView");
let textView = document.getElementById("textView");
let continueViewButton = document.getElementById("continueViewButton");

let sliderDiv = document.getElementById("sliderDiv");
let slider = document.getElementById("slider");
let minimumTrack = document.getElementById("minimumTrack");
let continueControlButton = document.getElementById("continueControlButton");
let placeholderButton = document.getElementById("placeholderButton");

let switchDiv = document.getElementById("switchDiv");
let switchBackground = document.getElementById("switchBackground");
let switchToggle = document.getElementById("switchToggle");
let switchAnimatedBackground = document.getElementById("switchAnimatedBackground");
let ringTone = document.getElementById("iPhoneRingTone");

let viewsDescriptionDiv = document.getElementById("viewsDescriptionDiv");
let labelTitleLabel = document.getElementById("labelTitleLabel");
let labelDescriptionLabel = document.getElementById("labelDescriptionLabel");
let imageViewTitleLabel = document.getElementById("imageViewTitleLabel");
let imageViewDescriptionLabel = document.getElementById("imageViewDescriptionLabel");
let textViewTitleLabel = document.getElementById("textViewTitleLabel");
let textViewDescriptionLabel = document.getElementById("textViewDescriptionLabel");
let scrollViewTitleLabel = document.getElementById("scrollViewTitleLabel");
let scrollViewDescriptionLabel = document.getElementById("scrollViewDescriptionLabel");

let controlsDescriptionDiv = document.getElementById("controlsDescriptionDiv");
let buttonDescriptionLabel = document.getElementById("buttonDescriptionLabel");
let sliderTitleLabel = document.getElementById("sliderTitleLabel");
let sliderDescriptionLabel = document.getElementById("sliderDescriptionLabel");
let switchTitleLabel = document.getElementById("switchTitleLabel");
let switchDescriptionLabel = document.getElementById("switchDescriptionLabel");

let conclusionLayer = document.getElementById("conclusionLayer");

/*
Introduction Layer Methods
*/

function dismissIntroductionLayer() {
    let layer = introductionLayer;

    // Fade out the layer
    layer.style.opacity = 0;

    // Make the layer invisible to the layout
    setTimeout(function() {
        layer.style.display = "none";
    }, 1000);

    // Present views layer with a small delay
    setTimeout(function() {
        presentAnimatedContentsLayer();
    }, 2000); 
}

function presentAnimatedContentsLayer() {
    let iPhone = animatedContentsLayer;
    iPhone.style.opacity = 1;
    iPhone.style.visibility = "visible";

    presentViewsLayer();
}

function presentViewsLayer() {
    let layer = viewsLayer;

    layer.style.opacity = 1;
    layer.style.visibility = "visible";

    displayHandCursorForElement("viewsLayer", true);
}

/*
Views Layer Methods
*/

var canIntroduceLabel = true;   // Prevents the introduceLabel() from firing more than once

function introduceLabel() {
    // If the canIntroduceLabel flag is false, do not trigger the function
    if (Boolean(canIntroduceLabel) == false) { return; }

    // Adjust the cursor
    displayHandCursorForElement("viewsLayer", false);

    // Set the flag to false
    canIntroduceLabel = false;

    // Animate the hello world label
    helloWorldLabel.style.top = "90px";
    helloWorldLabel.style.border = "1px solid rgb(0, 115, 189)";

    // Animate the viewsDescriptionDiv to move the iPhoneDiv and prepare to show contents
    viewsDescriptionDiv.style.width = "340px";
    viewsDescriptionDiv.style.padding = "0px 0px 0px 60px";

    // After the animation, show description for label
    setTimeout(function() {
        showViewsDescriptionFor(helloWorldLabel);
    }, 1500);
}

var newViewElements = [scrollIndicator, textView, peanutImageView];

// introduceNewViewElement is called when introducing elements with no special transitions
function introduceNewViewElement() {
    // Get the next element to introduce
    if (newViewElements.length == 0) {
        presentControlsLayer();
        return;
    }
    let element = newViewElements.pop();

    // dismiss the continue button and shift its positions
    dismissContinueViewButtonToPresent(element);

    // Make the element visible
    element.style.transition = "all 0.5s ease-in-out";
    element.style.visibility = "visible";
    element.style.opacity = 1;
    element.style.transition = "all 1.5s ease-in-out";

    // Show description for element after 1.5 seconds
    setTimeout(function() {
        showViewsDescriptionFor(element);
    }, 1500);
}

function dismissContinueViewButtonToPresent(element) {
    
    continueViewButton.style.transition = "all 0.3s ease";

    // Animate to hide the continue button
    continueViewButton.style.visibility = "hidden";
    continueViewButton.style.opacity = 0;

    var top = "";

    // Calculate the top position to prepare for the next show
    if (element == peanutImageView) {
        top = "330px";

    } else if (element == textView) {
        top = "455px";

    } else if (element == scrollIndicator) {
        // Disable user input into the textView during and after presenting scroll view
        textView.readOnly = "true";

        // After the button is dismissed, hide it below the iPhoneDiv
        setTimeout(function() {
            continueViewButton.style.zIndex = "-2";
            continueViewButton.style.top = "580px";
            continueViewButton.transition = "opacity 1.5s ease, visibility 1.5s ease, color 0.3s";
        }, 1000);
        return;
    }

    // Adjust the position of the continue button after the hiding animation is completed
    setTimeout(function() {
        continueViewButton.style.top = top;
    }, 500);
}

var triggerCount = 0;

function showViewsDescriptionFor(element) {

    var titleLabel = labelTitleLabel;
    var descriptionLabel = labelDescriptionLabel;

    // Set corresponding title label and description label
    if (element == helloWorldLabel) {
        titleLabel = labelTitleLabel;
        descriptionLabel = labelDescriptionLabel;
    } else if (element == peanutImageView) {
        titleLabel = imageViewTitleLabel;
        descriptionLabel = imageViewDescriptionLabel;
    } else if (element == textView) {
        // When presenting text view, we wait until the user actually typed in something and then show the continue button
        titleLabel = textViewTitleLabel;
        descriptionLabel = textViewDescriptionLabel;

        // Adjust the can show continue button flag so that it would show only after the user provided input
        if (triggerCount == 0) {
            triggerCount += 1;
            return;
        } else if (triggerCount >= 2) {
            return;
        }

    } else if (element == scrollIndicator) {
        titleLabel = scrollViewTitleLabel;
        descriptionLabel = scrollViewDescriptionLabel;

        // Animate to display the labels while scrolling
        titleLabel.style.opacity = 1;
        descriptionLabel.style.opacity = 1;
        scrollUpViewsLayer();
        return;
    }

    // Animate to display the labels
    titleLabel.style.opacity = 1;
    descriptionLabel.style.opacity = 1;

    // Show continue button 2 seconds after the description is presented
    setTimeout(function() {
        showContinueViewButtonBelow(element);
    }, 2000);
}

function scrollUpViewsLayer() {
    

    // Show the continue Button after it has scrolled over the bottom edge of the iPhone image
    setTimeout(function() {
        // Make the continue button visible
        continueViewButton.style.visibility = "visible";
        continueViewButton.style.opacity = 1;
        continueViewButton.style.zIndex = 0;
    }, 500);
    
    // Animate the scroll indicator
    scrollIndicator.style.transition = "all 1.5s ease-in-out";
    scrollIndicator.style.top = "130px";

    // Animate the views layer
    viewsLayer.style.top = "-40px";

    // Dismiss the scroll indicator after 2 seconds
    setTimeout(function() {
        scrollIndicator.style.transition = "all 0.3s ease-in-out";
        scrollIndicator.style.visibility = "hidden";
        scrollIndicator.style.opacity = 0;
    }, 2000);
}

function showContinueViewButtonBelow(element) {
    // Animate to show continue button
    continueViewButton.style.transition = "opacity 1.5s ease, visibility 1.5s ease, color 0.3s";
    continueViewButton.style.visibility = "visible";
    continueViewButton.style.opacity = 1;
}

function displayHandCursorForElement(elementName, show) {
    let layer = document.getElementById(elementName);

    if (Boolean(show) == true) {
        layer.style.cursor = "pointer";
    } else {
        layer.style.cursor = "auto";
    }
}

/*
Controls Layer Methods
*/

function presentControlsLayer() {
    // Dismiss views layer
    viewsLayer.style.transition = "0.8s all ease-in-out";
    viewsLayer.style.opacity = 0;
    viewsLayer.style.visibility = "hidden";
    bigTitleLabel.style.opacity = 0;

    // Shift the iPhone image by animating the viewsDescriptionDiv and the controlsDescriptionDiv
    viewsDescriptionDiv.style.transition = "width 2.5s ease-in-out, opacity 0.8s ease-in-out";
    viewsDescriptionDiv.style.width = "0px";
    viewsDescriptionDiv.style.opacity = 0;
    viewsDescriptionDiv.style.visibility = "hidden";
    controlsDescriptionDiv.style.width = "340px";
    controlsDescriptionDiv.style.padding = "0px 80px 0px 0px";

    // Change the bigTitleLabel's text and show it, and introduce button
    setTimeout(function() {
        bigTitleLabel.innerHTML = "Controls";
        bigTitleLabel.style.opacity = 1;
        introduceButton();
    }, 1500);
}

function introduceButton() {
    continueControlButton.style.visibility = "visible";
    continueControlButton.style.opacity = 1;
    continueControlButton.innerHTML = "Button";
    continueControlButton.style.left = "133px";
}

var newControlElements = [switchDiv, sliderDiv, continueControlButton];

function introduceNewControlElement() {
    // If empty, present conclusion layer
    if (newControlElements.length == 0) {
        presentConclusionLyaer();
        return;
    }

    // Get the next element to introduce
    let element = newControlElements.pop();

    dismissContinueControlButtonToPresent(element);

    // Show the element by changing the opacity and visibility
    if (element != continueControlButton) {
        element.style.visibility = "visible";
        element.style.opacity = 1;
    }
    
    // Show description for element after 1.5 seconds
    setTimeout(function() {
        showControlsDescriptionFor(element);
    }, 1500);
}

function dismissContinueControlButtonToPresent(element) {
    continueControlButton.style.transition = "all 0.3s ease";

    if (element == continueControlButton) {
        // Smoothly fade out the continue button
        continueControlButton.style.opacity = 0;
        setTimeout(function() {
            // adjust the position and text of the continue button when fading animation is completed
            continueControlButton.style.transition = "none";
            continueControlButton.style.left = "125px";
            continueControlButton.innerHTML = "Continue";
        }, 500);
        return;
    } else if (element == sliderDiv) {
        setTimeout(function() {
            // Show placeholder button when the fading animation is completed
            placeholderButton.style.opacity = 1;
            placeholderButton.style.visibility = "visible";
        }, 1000);
    }

    // Animate to hide the continue button
    continueControlButton.style.visibility = "hidden";
    continueControlButton.style.opacity = 0;
    
    // Adjust the position of the control button after the hiding animation is completed
    var top = "";
    if (element == sliderDiv) {
        top = "290px";
    } else if (element == switchDiv) {
        top = "530px";
        setTimeout(function() {
            continueControlButton.innerHTML = "Learn more ...";
            continueControlButton.style.left = "113px";
        }, 500);
        
    }

    setTimeout(function() {
        continueControlButton.style.top = top;
    }, 500);
}

var showSliderDescriptionCount = 0;
var showSwitchDescriptionCount = 0;

function showControlsDescriptionFor(element) {
    var titleLabel = buttonTitleLabel;
    var descriptionLabel = buttonDescriptionLabel;

    if (element == continueControlButton) {
        titleLabel = buttonTitleLabel;
        descriptionLabel = buttonDescriptionLabel;

        // Animate to display the labels and show continue button directly
        titleLabel.style.opacity = 1;
        descriptionLabel.style.opacity = 1;
        showContinueControlButtonBelow(element);
        return;
    } else if (element == sliderDiv) {

        if (showSliderDescriptionCount == 0) {
            showSliderDescriptionCount += 1;
            return;
        } else if (showSliderDescriptionCount >= 2) {
            return;
        }

        titleLabel = sliderTitleLabel;
        descriptionLabel = sliderDescriptionLabel;
    } else if (element == switchDiv) {
        titleLabel = switchTitleLabel;
        descriptionLabel = switchDescriptionLabel;

        if (showSwitchDescriptionCount == 0) {
            showSwitchDescriptionCount += 1;
            return;
        } else if (showSwitchDescriptionCount >= 2) {
            return;
        }
    }

    // Animate to display the labels
    titleLabel.style.opacity = 1;
    descriptionLabel.style.opacity = 1;

    // Show continue button 2 seconds after the description is presented
    setTimeout(function() {
        showContinueControlButtonBelow(element);
    }, 1500);
}

function showContinueControlButtonBelow(element) {
    // Animate to show continue button
    continueControlButton.style.transition = "opacity 1.5s ease, visibility 1.5s ease, color 0.3s";
    continueControlButton.style.visibility = "visible";
    continueControlButton.style.opacity = 1;
}


function sliderValueChanged() {
    // Adjust the minimum track
    minimumTrack.style.width = (slider.value).toString() + "px";
    
    // Change the background Color
    let normalizedValue = slider.value / 573.0 + 0.73;
    iPhoneBackgroundLayer.style.opacity = (1 - normalizedValue);

    // Show description for the slider
    showControlsDescriptionFor(sliderDiv);
}

var ringToneisPaused = true;

function switchTapped() {
    // Toggle the class for all switch elements
    let switchElements = document.getElementsByClassName("switch");
    for (var i = 0; i < switchElements.length; i++) {
      let element = switchElements[i];
      element.classList.toggle("on");
      element.classList.toggle("off");
    }

    // Pause or play audio
    if (ringToneisPaused == true) {
        ringTone.play();
    } else {
        ringTone.pause();
    }
        ringToneisPaused = !ringToneisPaused;

    // Show description for the switch
    showControlsDescriptionFor(switchDiv);
}

function presentConclusionLyaer() {
    ringTone.pause();

    animatedContentsLayer.style.visibility = "hidden";
    animatedContentsLayer.style.opacity = 0;

    conclusionLayer.style.visibility = "visible";
    conclusionLayer.style.opacity = 1;

}

function test() {
    // Introduction Layer
    dismissIntroductionLayer();
    presentAnimatedContentsLayer();

    // Views Layer
    presentViewsLayer();
    introduceLabel();
    introduceNewViewElement();
    introduceNewViewElement();
    introduceNewViewElement();
    showViewsDescriptionFor(textView);
    dismissContinueViewButtonToPresent(scrollIndicator);

    // Transition from views layer to controls layer
    setTimeout(function() {
        introduceNewViewElement();
    }, 2000);

    // Controls Layer
    introduceNewControlElement();
    introduceNewControlElement();
    introduceNewControlElement();
    introduceNewControlElement();

}

//test();