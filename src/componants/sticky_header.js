class Sticky_Header extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    static Create() {
        let sticky_header = document.createElement('sticky-header');
        sticky_header.Init();
        return sticky_header;
    }

    Init() {

        this.attachShadow({ mode: 'open' });
        const styleLink = document.createElement('link');
		styleLink.setAttribute('rel', 'stylesheet');
		styleLink.setAttribute('href', 'style/sticky-header.css');
		this.shadowRoot.appendChild(styleLink);

        const header = document.createElement('header');
        header.setAttribute('id', 'sticky-header');

        // Hamburger menu
        const hamburger = document.createElement('div');
        hamburger.setAttribute('id', 'hamburger');
        hamburger.innerHTML = '&#9776;'; // Unicode for hamburger icon

        // Search bar
        const searchBar = document.createElement('input');
        searchBar.setAttribute('id', 'search-bar');
        searchBar.setAttribute('placeholder', 'Search...');


        // Logo
        const logo = document.createElement('div');
        logo.setAttribute('id', 'logo');
        logo.innerText = 'Logo';
        logo.style.fontSize = '20px';

        // Append elements to the header
        header.appendChild(hamburger);
        header.appendChild(searchBar);
        header.appendChild(logo);

        // Add the header to the shadow DOM
        this.shadowRoot.appendChild(header);

        // Dispatch custom event on hamburger click
        hamburger.addEventListener('click', () => {
            const event = new CustomEvent('togglePanel', {
                detail: { action: 'toggle' },
                bubbles: true, // Allow event to bubble up the DOM
                composed: true // Allow the event to pass through shadow DOM boundaries
            });
            this.dispatchEvent(event);
        });
    }
}

// Define the custom element
customElements.define('sticky-header', Sticky_Header);

export default Sticky_Header;
