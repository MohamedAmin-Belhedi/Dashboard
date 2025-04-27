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
        // Open and close modal logic
        const openFormBtn = document.getElementById('openFormBtn');
        const closeBtn = document.getElementById('closebtn');
        const addMedicineModal = document.getElementById('addmedicine');

        openFormBtn.addEventListener('click', function(event) {
            event.preventDefault();
            addMedicineModal.style.display = 'flex';
        });

        closeBtn.addEventListener('click', function() {
            addMedicineModal.style.display = 'none';
        });

        window.addEventListener('click', function(event) {
            if (event.target === addMedicineModal) {
                addMedicineModal.style.display = 'none';
            }
        });

        // Handle form submission to add a new customer
        const customerForm = document.getElementById('customerForm');
        const productTableBody = document.querySelector('#CustomersTable tbody');

        customerForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form from refreshing the page

            // Get form data
            const customerName = document.getElementById('customerName').value;
            const customerEmail = document.getElementById('customerEmail').value;
            const customerPhone = document.getElementById('customerPhone').value;
            const customerAddress = document.getElementById('customerAddress').value;
            const customerCategory = document.getElementById('customerCategory').value;

            // Generate a unique ID for the new customer
            const customerId = `#${Math.random().toString(36).substr(2, 5)}`;

            // Default total spend for a new customer
            const totalSpend = '$0';

            // Create a new row
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${customerId}</td>
                <td>${customerName}</td>
                <td>${customerEmail}</td>
                <td>${customerPhone}</td>
                <td>${customerAddress}</td>
                <td>${customerCategory}</td>
                <td>${totalSpend}</td>
                <td>
                    <button class="see"><i class="fa-solid fa-eye"></i></button>
                    <button class="delete"><i class="fa-solid fa-trash"></i></button>
                </td>
            `;

            // Append the new row to the end of the table
            productTableBody.appendChild(newRow);

            // Reset the form
            customerForm.reset();

            // Close the modal
            addMedicineModal.style.display = 'none';

            // Recalculate pagination
            updatePagination();
        });

        // Function to update pagination after adding a new customer
        function updatePagination() {
            tableRows = document.querySelectorAll('#CustomersTable tbody tr'); // Update tableRows dynamically
            displayRows(); // Reapply pagination logic
            currentPage = Math.ceil(tableRows.length / rowsPerPage); // Move to the last page
            displayRows(); // Display rows for the last page
        }

        // Pagination logic
        const rowsPerPage = 5; // Number of rows per page
        let currentPage = 1;
        let tableRows = document.querySelectorAll('#CustomersTable tbody tr'); // Declare tableRows as a dynamic variable
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

        // Floating icon click event
        const floatingIcon = document.getElementById('floatingIcon');
        floatingIcon.addEventListener('click', () => {
            alert('Opening notifications or chat with clients...');
            // You can replace this alert with logic to open a chat or notifications modal
        });

        // Make the floating icon draggable
        let isDragging = false;
        let offsetX, offsetY;

        floatingIcon.addEventListener('mousedown', (event) => {
            isDragging = true;
            offsetX = event.clientX - floatingIcon.getBoundingClientRect().left;
            offsetY = event.clientY - floatingIcon.getBoundingClientRect().top;
            floatingIcon.style.transition = 'none'; // Disable transition during drag
        });

        document.addEventListener('mousemove', (event) => {
            if (isDragging) {
                const x = event.clientX - offsetX;
                const y = event.clientY - offsetY;
                floatingIcon.style.left = `${x}px`;
                floatingIcon.style.top = `${y}px`;
                floatingIcon.style.position = 'fixed';
            }
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                floatingIcon.style.transition = ''; // Re-enable transition after drag
            }
        });
        document.getElementById("searchCustomer").addEventListener("keyup", function () {
            const search = this.value.toLowerCase();
            const rows = document.querySelectorAll("#CustomersTable tbody tr");
        
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
          window.onload = function () {
            // Add any initialization logic here if needed
            console.log("Page loaded successfully");
          };

