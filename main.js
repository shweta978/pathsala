// Function to add rows dynamically for the specified table
function addRows(tableId) {
  const table = document.getElementById(tableId);
  const tbody = table.querySelector("tbody");

  // Create a new row element
  const newRow = document.createElement("tr");

  // Create new cells with input fields and append them to the new row
  newRow.innerHTML = `
        <td><input type="text" name="schoolName[]"></td>
        <td><input type="text" name="address[]"></td>
        <td><input type="text" name="duration[]"></td>
        <td><input type="text" name="grade[]"></td>
        <td><button type="button" class="delete-btn" onclick="deleteRow(this)">Delete</button></td>
    `;

  // Append the new row to the table body
  tbody.appendChild(newRow);
}

// Function to delete a specific row when the delete button is clicked
function deleteRow(button) {
  // Show confirmation alert before deletion
  const confirmDelete = confirm("Are you sure you want to delete this row?");
  if (confirmDelete) {
    const row = button.closest("tr"); // Get the row containing the delete button
    row.remove(); // Remove the row from the table
  }
}

// Function to delete all rows in the specified table (except for the header)
function deleteRows(tableId) {
  // Show confirmation alert before deletion
  const confirmDelete = confirm("Are you sure you want to delete all rows?");
  if (confirmDelete) {
    const table = document.getElementById(tableId);
    const tbody = table.querySelector("tbody");

    // Clear all rows in the table body (except the header)
    tbody.innerHTML = "";
  }
}

// Event listener for file upload preview
document.querySelectorAll('.custom-file-upload').forEach(x => {
  const fileUpload = x.querySelector('input[type="file"]');
  
  fileUpload.addEventListener('change', () => {
      const file = fileUpload.files[0];

      if (file) {
          const reader = new FileReader();

          reader.onload = (e) => {
              const img = new Image();
              img.src = e.target.result;
              img.onload = () => {
                  // Handle image loading and display
                  const container = x.querySelector('.container');
                  container.innerHTML = ''; // Clear previous content
                  container.appendChild(img); // Display the uploaded image
              };
          };

          reader.readAsDataURL(file);
      }
  });
});

  

// Function to add the delete event listener to existing rows (default ones)
function addDeleteEventToRows() {
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      deleteRow(this);
    });
  });
}

// Add the delete functionality to all rows, including the default ones
addDeleteEventToRows();

document
  .getElementById("dynamicForm")
  .addEventListener("submit", function (event) {
    const errors = [];
    const inputs = document.querySelectorAll("#dynamicTable tbody input");

    // Check if all inputs have values
    inputs.forEach((input) => {
      if (!input.value.trim()) {
        const inputName = input.getAttribute("name") || "Field"; // Use "Field" if no name attribute exists
        errors.push(`${inputName} cannot be empty.`);
      }
    });

    // If errors are found, prevent form submission and show errors
    if (errors.length > 0) {
      event.preventDefault(); // Prevent form submission
      alert(errors.join("\n")); // Show all errors in an alert
    }
  });

// Convert AD to BS using NepaliDate library
function AD2BS(year, month, day) {
  const nepaliDate = new NepaliDate(year, month - 1, day);
  return {
    year: nepaliDate.getBSYear(),
    month: nepaliDate.getBSMonth() + 1,
    day: nepaliDate.getBSDay(),
  };
}

function padZero(num) {
  return num < 10 ? "0" + num : num;
}

// Convert AD to BS on button click
document
  .getElementById("convertToBS")
  .addEventListener("click", function (event) {
    event.preventDefault();
    const adInput = document.getElementById("dobad").value;
    if (!adInput) {
      alert("Please select a date in the AD field.");
      return;
    }

    const adDate = new Date(adInput);
    const bsDate = AD2BS(
      adDate.getFullYear(),
      adDate.getMonth() + 1,
      adDate.getDate()
    );
    document.getElementById("dobbs").value = `${bsDate.year}-${padZero(
      bsDate.month
    )}-${padZero(bsDate.day)}`;
  });

// Convert BS to AD on button click
document
  .getElementById("convertToAD")
  .addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission
    const bsInput = document.getElementById("dobbs").value;
    if (!bsInput) {
      alert("Please select a date in the BS field.");
      return;
    }

    const bsDate = bsInput.split("-");
    const adDate = BS2AD(
      parseInt(bsDate[0]), // Year
      parseInt(bsDate[1]), // Month
      parseInt(bsDate[2])
    );
    document.getElementById("dobad").value = `${adDate.year}-${padZero(
      adDate.month
    )}-${padZero(adDate.day)}`;
  });

// Convert BS to AD using NepaliDate library
function BS2AD(year, month, day) {
  const nepaliDate = new NepaliDate(year, month - 1, day);
  nepaliDate.toAD();
  return {
    year: nepaliDate.getADYear(),
    month: nepaliDate.getADMonth() + 1,
    day: nepaliDate.getADDay(),
  };
}
