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

        // Global array to store all rows
        let allRows = Array.from(document.querySelectorAll('#productTable tbody tr'));

        // Function to calculate the next medicine ID based on all rows
        function calculateNextMedicineId() {
            let maxId = 0;

            allRows.forEach(row => {
                const idCell = row.querySelector('td:first-child');
                if (idCell) {
                    const id = parseInt(idCell.textContent.replace('#', ''), 10);
                    if (!isNaN(id) && id > maxId) {
                        maxId = id;
                    }
                }
            });

            return maxId + 1;
        }

        // Function to determine the status based on quantity
        function getStatus(quantity) {
            if (quantity > 50) {
                return { text: 'In Stock', className: 'Instock' };
            } else if (quantity > 0 && quantity <= 50) {
                return { text: 'Low Stock', className: 'lowstock' };
            } else {
                return { text: 'Out of Stock', className: 'outstock' };
            }
        }

        // Form submission logic
        document.getElementById('medicineForm').addEventListener('submit', function(event) {
            event.preventDefault();

            // Retrieve form values
            const medicineName = document.getElementById('medicinename').value;
            const category = document.getElementById('category').value;
            const quantity = parseInt(document.getElementById('quantity').value, 10);
            const price = document.getElementById('price').value;
            const expiryDate = document.getElementById('expiryDate').value;
            const requiresPrescription = document.getElementById('requiresPrescription').value;
            const productPhoto = document.getElementById('productPhoto').files[0];

            // Calculate the next medicine ID
            const nextMedicineId = calculateNextMedicineId();

            // Determine the status based on quantity
            const status = getStatus(quantity);

            // Create an image URL for the uploaded photo
            const photoURL = productPhoto ? URL.createObjectURL(productPhoto) : '';

            // Add a new row to the table
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>#${String(nextMedicineId).padStart(3, '0')}</td>
                <td>${medicineName}</td>
                <td>${quantity} Units</td>
                <td>${price}$</td>
                <td>${expiryDate}</td>
                <td><img src="${photoURL}" alt="Product Photo" style="width: 50px; height: 50px; object-fit: cover;"></td>
                <td>${requiresPrescription === 'yes' ? 'Oui' : 'Non'}</td>
                <td><span class="status ${status.className}">${status.text}</span></td>
                <td>
                    <button class="see"><i class="fa-solid fa-eye"></i></button>
                    <button class="delete"><i class="fa-solid fa-trash"></i></button>
                </td>
            `;

            // Append the new row to the table and update the global array
            const tbody = document.querySelector('#productTable tbody');
            tbody.appendChild(newRow);
            allRows.push(newRow);

            // Reset the form and close the modal
            document.getElementById('medicineForm').reset();
            addMedicineModal.style.display = 'none';

            // Update pagination
            rows.push(newRow);
            displayRows();
        });

        // Pagination logic
        const rowsPerPage = 5;
        let currentPage = 1;

        const table = document.getElementById('productTable');
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        const pageInfo = document.getElementById('pageInfo');
        const prevPageBtn = document.getElementById('prevPage');
        const nextPageBtn = document.getElementById('nextPage');

        function displayRows() {
            tbody.innerHTML = '';
            const start = (currentPage - 1) * rowsPerPage;
            const end = start + rowsPerPage;
            const rowsToDisplay = rows.slice(start, end);

            rowsToDisplay.forEach(row => tbody.appendChild(row));
            pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(rows.length / rowsPerPage)}`;

            prevPageBtn.disabled = currentPage === 1;
            nextPageBtn.disabled = currentPage === Math.ceil(rows.length / rowsPerPage);
        }

        prevPageBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                displayRows();
            }
        });

        nextPageBtn.addEventListener('click', () => {
            if (currentPage < Math.ceil(rows.length / rowsPerPage)) {
                currentPage++;
                displayRows();
            }
        });

        displayRows();
        //navigation with side bar

         // Floating icon click event
         const floatingIcon = document.getElementById('floatingIcon');

         floatingIcon.addEventListener('click', () => {
             const menu = document.createElement('div');
             menu.id = 'floatingMenu';
             menu.style.position = 'fixed';
             menu.style.bottom = '80px';
             menu.style.right = '20px';
             menu.style.backgroundColor = '#fff';
             menu.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
             menu.style.borderRadius = '8px';
             menu.style.padding = '10px';
             menu.style.zIndex = '1000';

             menu.innerHTML = `
                 <button id="openMessages" style="display: block; margin-bottom: 10px;">Messages</button>
                 <button id="openHelp" style="display: block;">Help</button>
             `;

             document.body.appendChild(menu);

             document.getElementById('openMessages').addEventListener('click', () => {
                 alert('Opening Messages Page...');
                 // Logic to open Messages modal or navigate to Messages page
             });

             document.getElementById('openHelp').addEventListener('click', () => {
                 alert('Opening Help Page...');
                 // Logic to open Help modal or navigate to Help page
             });

             // Close menu when clicking outside
             const closeMenu = (event) => {
                 if (!menu.contains(event.target) && event.target !== floatingIcon) {
                     menu.remove();
                     window.removeEventListener('click', closeMenu);
                 }
             };

             setTimeout(() => {
                 window.addEventListener('click', closeMenu);
             }, 0); // Delay to ensure the click event doesn't immediately close the menu
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
         document.getElementById("searchProduct").addEventListener("keyup", function () {
            const search = this.value.toLowerCase();
            const rows = document.querySelectorAll("#productTable tbody tr");
        
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