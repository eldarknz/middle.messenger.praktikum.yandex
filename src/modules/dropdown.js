export const dropdownHandler = () => {
    const dropdownHide = (dropdowns) => {
        dropdowns.forEach(dropdown => {
            if (dropdown.classList.contains('show')) {
                let button = dropdown.querySelector('#dropdownMenuButton');
                button.classList.remove('active');
                dropdown.classList.remove('show');
            }
        });
    }
  
    window.addEventListener('DOMContentLoaded', () => {
        let dropdowns = document.querySelectorAll('.dropdown');

        dropdowns.forEach(dropdown => {
            let button = dropdown.querySelector('#dropdownMenuButton');
            button.addEventListener("click", () => {
            if (dropdown.classList.contains('show')) {
                dropdownHide(dropdowns);
                button.classList.remove('active');
                dropdown.classList.remove('show');
            } else {
                button.classList.add('active');
                dropdown.classList.add('show');
            }
            });
        });

        

        window.onclick = (event) => {
            if (event.target.closest('.dropdown-menu') || event.target.closest('#dropdownMenuButton')) {
                if (!event.target.closest('.dropdown-item')) {
                    return;
                }
            };

            dropdownHide(dropdowns);
        }
  });
}