//Menu Toggle
let toggle = document.querySelector('.toggle');
let navigation = document.querySelector('.navigation');
let main = document.querySelector('.main');
toggle.onclick = function(){
    navigation.classList.toggle('active');
    main.classList.toggle('active');
}
//add hovered class in selected list item
let list = document.querySelectorAll('.navigation li');
function activeLink(){
    list.forEach((item) =>
    item.classList.remove('hovered'));
    this.classList.add('hovered');
}
list.forEach((item) =>
item.addEventListener('mouseover', activeLink));
// Pagination logic
const rowsPerPage = 9; // Number of rows per page
let currentPage = 1;
let tableRows = document.querySelectorAll('.recentorders table tbody tr'); // Get all rows dynamically
const paginationControls = document.getElementById('paginationControls');
const prevPageBtn = document.getElementById('prevPage');
const nextPageBtn = document.getElementById('nextPage');
const pageInfo = document.getElementById('pageInfo');

// Function to display rows for the current page
function displayRows() {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    tableRows.forEach((row, index) => {
        row.style.display = index >= start && index < end ? '' : 'none';
    });
    pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(tableRows.length / rowsPerPage)}`;
}

// Event listeners for pagination buttons
prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayRows();
    }
});

nextPageBtn.addEventListener('click', () => {
    if (currentPage < Math.ceil(tableRows.length / rowsPerPage)) {
        currentPage++;
        displayRows();
    }
});

// Initial display
displayRows();
document.getElementById("searchOrder").addEventListener("keyup", function () {
    const search = this.value.toLowerCase();
    const rows = document.querySelectorAll("#orderTable tbody tr");

    rows.forEach(row => {
      const cells = row.querySelectorAll("td");
      let match = false;

      // Parcours de toutes les cellules de la ligne
      cells.forEach(cell => {
        if (cell.textContent.toLowerCase().includes(search)) {
          match = true;
        }
      });

      // Affiche ou masque la ligne selon le résultat
      row.style.display = match ? "" : "none";
    });
  });