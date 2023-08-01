const mainContainer = document.querySelector("main");

let lastScrollY = mainContainer.scrollTop;

const detectScrollUp = () => {
  const currentScrollY = mainContainer.scrollTop;

  if (currentScrollY > lastScrollY) {
    lastScrollY = currentScrollY;
    return false;
  }

  lastScrollY = currentScrollY;
  return true;
};

let categoryContentIDForOffsetMap = new Map();

const getElementPositions = () => {
  document.querySelectorAll("header, section").forEach((element, index) => {
    const rect = element.getBoundingClientRect();
    const yOffset = rect.top + window.scrollY;
    const yOffsetFloored = Math.floor(yOffset / 10);
    categoryContentIDForOffsetMap.set(yOffsetFloored, index + 1);
  });
};

window.onload = () => {
  getElementPositions();

  const education = document.querySelector(".education-intervals");

  const educationFirstElement = document.querySelector(
    ".education-intervals > li:nth-of-type(1)"
  );

  const educationLastElement = document.querySelector(
    ".education-intervals > li:nth-last-of-type(1)"
  );

  const educationLinkContainer = educationFirstElement.querySelector(
    ".education-intervals-links-container"
  );

  // Get the computed styles of the element
  const educationStyles = window.getComputedStyle(educationLinkContainer);

  // Create a new style rule for the ::after pseudo-element
  const bgIntervalsHeight = `
  .education-intervals li:nth-of-type(1) .education-intervals-links::after {
    height:calc(${education.clientHeight}px + 80vh - ${educationFirstElement.clientHeight}px + 5.1rem);
  }
`;

  const lineHeight = `
    .education-intervals li:nth-last-of-type(1) .education-intervals-links::after {
    height:calc(${education.clientHeight}px + 20vh - ${educationLastElement.clientHeight}px + 2.5rem);
  }
`;

  // Create a new <style> element to hold the style rule
  const styleElement = document.createElement("style");
  styleElement.textContent = bgIntervalsHeight + lineHeight;

  // Add the <style> element to the document's <head>
  document.head.appendChild(styleElement);
};

window.onresize = () => {
  location.reload();
};

function reveal(event) {
  if (
    categoryContentIDForOffsetMap.has(Math.floor(mainContainer.scrollTop / 10))
  ) {
    const value = categoryContentIDForOffsetMap.get(
      Math.floor(mainContainer.scrollTop / 10)
    );

    if (!detectScrollUp()) {
      for (let i = 1; i < value; i++) {
        document.querySelector(`.bg-overlay-${i}`).style.opacity = 0;
      }
    }

    document.querySelector(`.bg-overlay-${value}`).style.opacity = 1;
  }
}

mainContainer.addEventListener("scroll", reveal);





// Handling contact form content 

// Get the input and textarea elements
const inputElements = document.querySelectorAll(".contact input, .contact textarea");
const inputLabels = document.querySelectorAll(".content label");

// Add event listeners for input changes and initial check
inputElements.forEach((element) => {
  element.addEventListener("input", () => handleInputFocus(element));
  handleInputFocus(element);
});

// Function to check input and textarea values and apply focus styles
function handleInputFocus(element) {
  if (!element) return;

  const nextSibling = element.nextElementSibling;

  let className = "input-has-content";

  if (element.tagName == "TEXTAREA") {
    className = "textarea-has-content";
  }

  if (element.value.trim() !== '') {
    nextSibling.classList.add(className)
  } else {
    nextSibling.classList.remove(className)
  }
}
