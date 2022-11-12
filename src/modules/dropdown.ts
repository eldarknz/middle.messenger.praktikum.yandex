export const dropdownHandler = () => {
    const dropdownHide = (dropdowns: NodeListOf<HTMLElement>) => {
        dropdowns.forEach((dropdown: HTMLElement) => {
            if (dropdown.classList.contains('show')) {
                let button = <HTMLElement>dropdown.querySelector('#dropdownMenuButton');
                button.classList.remove('active');
                dropdown.classList.remove('show');
            }
        });
    }
  
    window.addEventListener('DOMContentLoaded', () => {
        const dropdowns: NodeListOf<HTMLElement> = document.querySelectorAll('.dropdown');

        dropdowns.forEach(dropdown => {
            let button = <HTMLElement>dropdown.querySelector('#dropdownMenuButton');
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

        

        window.onclick = (event: Event) => {
            const target = event.target as HTMLElement;
            if (target.closest('.dropdown-menu') || target.closest('#dropdownMenuButton')) {
                if (!target.closest('.dropdown-item')) {
                    return;
                }
            };

            dropdownHide(dropdowns);
        }
  });
};
