// accessing the integration script
const integrationScript = document.getElementById("integration-script");

// storing the tenant name defined in the script to the variable
const tenantName = integrationScript.getAttribute("client");

// FUNCTION THAT STORES THE CSS PROPERTY
(function () {
  // Create a new style element
  var style = document.createElement("style");

  style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

      #embedded-container {
          font-family: "Poppins", serif;
          font-weight: 400;
          font-style: normal;
      }
  `;

  // append the style element to the head of the document
  document.head.appendChild(style);
})();

(function () {
  // Function to create and inject elements dynamically
  function injectCustomElements() {
    // triggers when user clicks on the *Search SAP material code* button
    window.btn1 = function () {
      const embeddedContainer = document.getElementById("embedded-container");

      // check that if the embedded container is already present on the UI that renders the search field and table
      // if present then removing it from the screen
      if (embeddedContainer) {
        const clientContainer = embeddedContainer.parentNode;
        clientContainer.removeChild(embeddedContainer);
      }

      // parent container that will store the materialCode **heading** and the **input field**
      const materialCodePromptContainer = document.createElement("div");

      // assigning an unique id to the parent container
      materialCodePromptContainer.setAttribute(
        "id",
        "material-code-prompt-container"
      );

      // Get the keys from the first object to create headers
      function createTable(data) {
        // Create table element
        const table = document.createElement("table");
        table.style =
          "margin-top: 2rem; width: 100%; border: 1px solid #CDCDCD; border-radius: 0.25rem;";

        // Create table header
        const thead = document.createElement("thead");
        thead.style =
          "background-color: #F6F6F6; color: #9F9F9F; font-size: 0.85rem;";
        const headerRow = document.createElement("tr");
        const headers = Object.keys(data[0]);

        headers.forEach((headerText) => {
          const th = document.createElement("th");
          th.textContent = headerText;
          th.style = "padding: 0.5rem 0;";
          headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create table body
        const tbody = document.createElement("tbody");

        data.forEach((item) => {
          const row = document.createElement("tr");
          row.style = "background-color: #FFFFFF; font-size: 0.85rem;";

          headers.forEach((header) => {
            const cell = document.createElement("td");
            cell.textContent = item[header];
            cell.style =
              "text-align: center; color: #6B7280; padding: 0.5rem 0 !important;";
            row.appendChild(cell);
          });

          tbody.appendChild(row);
        });

        table.appendChild(tbody);

        // parent container that will store the table in it
        const tableParentContainer = document.createElement("div");
        tableParentContainer.setAttribute("id", "table-container");
        tableParentContainer.style =
          "width: 100%; margin-top: 1rem; max-height: 400px; overflow-y: auto;";
        tableParentContainer.appendChild(table);

        // Add table to the document
        if (
          !document
            .querySelector("#embedded-container")
            .querySelector("#table-container")
        ) {
          document
            .querySelector("#embedded-container")
            .appendChild(tableParentContainer);
        }
        // removing the table if already present and adding the new table
        else {
          const embeddedContainer = document.querySelector(
            "#embedded-container"
          );
          embeddedContainer.querySelector("#table-container").remove();
        }
      }

      // triggers when user clicks on the *Search* button
      async function submitMaterialCode() {
        // accessing the input field value and storing it to a variable
        const inputFieldValue = document.getElementById(
          "material-code-search-field"
        ).value;

        // if the value is provided in the input field then we are making an API request to get the data
        if (inputFieldValue) {
          const api =
            "https://datausa.io/api/data?drilldowns=Nation&measures=Population";

          try {
            // making an API request
            const result = await fetch(api);

            if (result.ok) {
              const tableData = await result.json();

              await createTable(tableData.data);
            }
          } catch (err) {
            console.error(err);
          }
        } else {
          window.alert("Please enter the material code");
        }
      }

      // main heading of the material code
      const materialCodeHeading = document.createElement("span");
      materialCodeHeading.textContent = "Search Material Code";
      materialCodeHeading.style = "font-size: 1.5rem; color: #9F9F9F;";

      // container that will store the **prompt title** and the **input field**
      const promptArea = document.createElement("div");
      promptArea.style =
        "display: flex; align-items: center; margin-top: 0.5rem;";

      // prompt title
      const promptTitle = document.createElement("span");
      promptTitle.textContent = "Enter your Search Prompt here*";
      promptTitle.style = "font-size: 1.15rem; color: #9F9F9F;";

      // prompt text field
      const promptTextField = document.createElement("input");
      promptTextField.setAttribute("id", "material-code-search-field");
      promptTextField.setAttribute("type", "text");

      promptTextField.style =
        "width: 35%; margin-left: 1rem; padding: 4px 8px; font-size: 0.95rem; outline: none; border: 1px solid #E5E7EB; border-radius: 0.25rem 0 0 0.25rem;";

      // prompt search button
      const promptSearchBtn = document.createElement("button");
      promptSearchBtn.textContent = "Search";

      promptSearchBtn.style =
        "cursor: pointer; padding: 5px 8px; font-size: 0.95rem; color: #FFFFFF; border: none; border-radius: 0 0.25rem 0.25rem 0; background-color: #1C64F2";

      promptSearchBtn.addEventListener("click", submitMaterialCode);

      // appending the **prompt title text** to the main promptarea container
      promptArea.appendChild(promptTitle);

      // appening the **textfield** to the promptarea container
      promptArea.appendChild(promptTextField);

      // appening the **search button** to the promptarea container
      promptArea.appendChild(promptSearchBtn);

      // appending the *main heading* and the prompt are to the main heading container
      materialCodePromptContainer.appendChild(materialCodeHeading);
      materialCodePromptContainer.appendChild(promptArea);

      // creating a new div inside the parent div container that will store everything in it
      const childParentElement = document.createElement("div");
      childParentElement.setAttribute("id", "embedded-container");
      childParentElement.style = "width: 60%; margin: 2.5rem auto 1rem auto;";

      // targetting the client container where will be integrating
      const clientSideContainer = document.querySelector(".container");

      // Inject the container into the body of the page if not present
      !childParentElement.querySelector("#material-code-prompt-container") &&
        childParentElement.appendChild(materialCodePromptContainer);

      // injecting the embedded container to the parent website
      !clientSideContainer.querySelector("#embedded-container") &&
        clientSideContainer.appendChild(childParentElement);
    };

    // triggers on click of the second dropdown option
    window.btn2 = function () {
      const embeddedContainer = document.getElementById("embedded-container");

      // check that if the embedded container is already present on the UI that renders the search field and table
      // if present then removing it from the screen
      if (embeddedContainer) {
        const clientContainer = embeddedContainer.parentNode;
        clientContainer.removeChild(embeddedContainer);
      }

      // triggers when user clicks on the *Search* button
      async function submitMaterialCode() {
        // accessing the input field value and storing it to a variable
        const inputFieldValue = document.getElementById(
          "duplicate-material-search-field"
        ).value;

        // if the value is provided in the input field then we are making an API request to get the data
        if (inputFieldValue) {
          const api =
            "https://datausa.io/api/data?drilldowns=Nation&measures=Population";

          try {
            // making an API request
            const result = await fetch(api);

            if (result.ok) {
              const tableData = await result.json();

              await createTable(tableData.data);
            }
          } catch (err) {
            console.error(err);
          }
        } else {
          window.alert("Please enter the material code");
        }
      }

      // Get the keys from the first object to create headers
      function createTable(data) {
        // Create table element
        const table = document.createElement("table");
        table.style =
          "margin-top: 2rem; width: 100%; border: 1px solid #CDCDCD; border-radius: 0.25rem;";

        // Create table header
        const thead = document.createElement("thead");
        thead.style =
          "background-color: #F6F6F6; color: #9F9F9F; font-size: 0.85rem;";
        const headerRow = document.createElement("tr");
        const headers = Object.keys(data[0]);

        headers.forEach((headerText) => {
          const th = document.createElement("th");
          th.textContent = headerText;
          th.style = "padding: 0.5rem 0;";
          headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create table body
        const tbody = document.createElement("tbody");

        data.forEach((item) => {
          const row = document.createElement("tr");
          row.style = "background-color: #FFFFFF; font-size: 0.85rem;";

          headers.forEach((header) => {
            const cell = document.createElement("td");
            cell.textContent = item[header];
            cell.style =
              "text-align: center; color: #6B7280; padding: 0.5rem 0 !important;";
            row.appendChild(cell);
          });

          tbody.appendChild(row);
        });

        table.appendChild(tbody);

        // parent container that will store the table in it
        const tableParentContainer = document.createElement("div");
        tableParentContainer.setAttribute("id", "table-container");
        tableParentContainer.style =
          "width: 100%; margin-top: 1rem; max-height: 400px; overflow-y: auto;";
        tableParentContainer.appendChild(table);

        // Add table to the document
        if (
          !document
            .querySelector("#embedded-container")
            .querySelector("#table-container")
        ) {
          document
            .querySelector("#embedded-container")
            .appendChild(tableParentContainer);
        }
        // removing the table if already present and adding the new table
        else {
          const embeddedContainer = document.querySelector(
            "#embedded-container"
          );
          embeddedContainer.querySelector("#table-container").remove();
        }
      }

      // parent container that will store the materialCode **heading** and the **input field**
      const duplicateMaterialPromptContainer = document.createElement("div");

      // assigning an unique id to the parent container
      duplicateMaterialPromptContainer.setAttribute(
        "id",
        "duplicate-material-prompt-container"
      );

      // main heading of the duplicate material
      const duplicateMaterialHeading = document.createElement("span");
      duplicateMaterialHeading.textContent = "Find Duplicate Material";
      duplicateMaterialHeading.style = "font-size: 1.5rem; color: #9F9F9F;";

      // container that will store the **prompt title** and the **input field**
      const promptArea = document.createElement("div");
      promptArea.style =
        "display: flex; align-items: center; margin-top: 0.5rem;";

      // prompt title
      const promptTitle = document.createElement("span");
      promptTitle.textContent = "Enter Material code*";
      promptTitle.style = "font-size: 1.15rem; color: #9F9F9F;";

      // prompt text field
      const promptTextField = document.createElement("input");
      promptTextField.setAttribute("id", "duplicate-material-search-field");
      promptTextField.setAttribute("type", "text");

      promptTextField.style =
        "width: 35%; margin-left: 1rem; padding: 4px 8px; font-size: 0.95rem; outline: none; border: 1px solid #E5E7EB; border-radius: 0.25rem 0 0 0.25rem;";

      // prompt search button
      const promptSearchBtn = document.createElement("button");
      promptSearchBtn.textContent = "Search";

      promptSearchBtn.style =
        "cursor: pointer; padding: 5px 8px; font-size: 0.95rem; color: #FFFFFF; border: none; border-radius: 0 0.25rem 0.25rem 0; background-color: #1C64F2";

      promptSearchBtn.addEventListener("click", submitMaterialCode);

      // appending the **prompt title text** to the main promptarea container
      promptArea.appendChild(promptTitle);

      // appening the **textfield** to the promptarea container
      promptArea.appendChild(promptTextField);

      // appening the **search button** to the promptarea container
      promptArea.appendChild(promptSearchBtn);

      // appending the *main heading* and the prompt are to the main heading container
      duplicateMaterialPromptContainer.appendChild(duplicateMaterialHeading);
      duplicateMaterialPromptContainer.appendChild(promptArea);

      // creating a new div inside the parent div container that will store everything in it
      const childParentElement = document.createElement("div");
      childParentElement.setAttribute("id", "embedded-container");
      childParentElement.style = "width: 60%; margin: 2.5rem auto 1rem auto;";

      // targetting the client container where will be integrating
      const clientSideContainer = document.querySelector(".container");

      // Inject the container into the body of the page if not present
      !childParentElement.querySelector(
        "#duplicate-material-prompt-container"
      ) && childParentElement.appendChild(duplicateMaterialPromptContainer);

      // injecting the embedded container to the parent website
      !clientSideContainer.querySelector("#embedded-container") &&
        clientSideContainer.appendChild(childParentElement);
    };
  }

  // Ensure the DOM is fully loaded before injecting elements
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    injectCustomElements();
  } else {
    window.addEventListener("DOMContentLoaded", injectCustomElements);
  }
})();
