export const dropdownHandler = () => {
    const dropdownHide = (dropdowns: NodeListOf<HTMLElement>) => {
        dropdowns.forEach((dropdown: HTMLElement) => {
            if (dropdown.classList.contains('show')) {
                const button = <HTMLElement>(
                    dropdown.querySelector('#dropdownMenuButton')
                );
                button.classList.remove('active');
                dropdown.classList.remove('show');
            }
        });
    };

    window.addEventListener('DOMContentLoaded', () => {
        const dropdowns: NodeListOf<HTMLElement> =
            document.querySelectorAll('.dropdown');

        dropdowns.forEach((dropdown) => {
            const button = <HTMLElement>(
                dropdown.querySelector('#dropdownMenuButton')
            );
            button.addEventListener('click', () => {
                dropdownHide(dropdowns);
                if (dropdown.classList.contains('show')) {
                    button.classList.remove('active');
                    dropdown.classList.remove('show');
                } else {
                    button.classList.add('active');
                    dropdown.classList.add('show');
                }
            });
        });

        const dropdowmHidehandler = (event: Event) => {
            const target = event.target as HTMLElement;
            if (
                target.closest('.dropdown-menu') ||
                target.closest('#dropdownMenuButton')
            ) {
                if (!target.closest('.dropdown-item')) {
                    return;
                }
            }

            dropdownHide(dropdowns);
        };

        window.addEventListener('click', dropdowmHidehandler);
    });
};
