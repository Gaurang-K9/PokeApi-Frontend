🎮 Pokédex Web Application
A fully-featured, responsive Pokédex web application built with pure frontend technologies. Browse Pokémon by region, view detailed statistics, abilities, moves, and more with an intuitive, modern interface.

🌐 Live URL: https://gaurang-k9.github.io/PokeApi-Frontend/pages/list-pokemon.html

📸 Screenshots
Desktop View	Mobile View
https://screenshots/pokemon-info.png	https://screenshots/mobile-pokemon-info.jpeg
Pokémon listing by region	Responsive mobile view
https://screenshots/pokemon-list.png	https://screenshots/mobile-pokemon-list.jpeg
Detailed Move statistics	Mobile details view
https://screenshots/move-info.png	https://screenshots/mobile-move-info.jpeg
	
🚀 Features
🎮 Core Functionality
Region-Based Browsing: Explore Pokémon by generation (Kanto through Paldea)

Detailed Pokémon Views: Stats, abilities, moves, sprites, and Pokédex entries

Move Details: Complete move information with effects and mechanics

Shiny Toggle: Switch between normal and shiny sprites

Authentic Type System: Official Pokémon type colors and badges

📊 Pokémon Details Include
Base stats with color-coded progress bars (like PokémonDB)

Official artwork with high-resolution sprites

Height/weight conversions (decimeters/hectograms to standard units)

Ability descriptions with detailed effects

Move lists with links to detailed pages

Pokédex species classification and flavor text

🎨 UI/UX Features
Responsive Bootstrap 5 design (mobile-first)

Smooth animations and hover effects

Loading states with visual feedback

Professional card-based layout

Accessible and keyboard-navigable

🛠️ Technology Stack
Technology	Purpose	Why It's Used
HTML5	Semantic markup and structure	Clean, accessible foundation
CSS3	Custom styling with animations	Official Pokémon colors and smooth UX
JavaScript (ES6+)	Dynamic content and interactivity	Modern, modular code architecture
Bootstrap 5	Responsive UI components	Professional, mobile-ready layout
Axios	HTTP client for API requests	Clean promise-based API calls
PokeAPI	Comprehensive Pokémon data	Free, reliable REST API
📁 Project Structure
text
PokeApi-Frontend/
├── pages/
│   ├── list-pokemon.html       # Main Pokémon listing
│   ├── details-pokemon.html    # Individual Pokémon details
│   ├── details-move.html       # Move details
│   └── about.html              # Project information
├── javascript/
│   ├── list-pokemon.js         # Pokémon listing logic
│   ├── details-pokemon.js      # Pokémon details logic
│   └── details-move.js         # Move details logic
├── styles/
│   ├── main.css               # Custom styles
│   └── type-colors.css        # Official Pokémon type colors
├── screenshots/               # Project screenshots
└── README.md                  # This file
🚦 Getting Started
Prerequisites
Modern web browser (Chrome, Firefox, Edge, Safari)

Internet connection (for API calls)

Running Locally
Clone the repository

bash
git clone https://github.com/Gaurang-K9/PokeApi-Frontend.git
cd PokeApi-Frontend
Open in browser

Simply open pages/list-pokemon.html in your browser

Or use a local server:

bash
# Python
python -m http.server 8000

# Node.js
npx serve .
Visit http://localhost:8000/pages/list-pokemon.html

📖 Usage
Browse Pokémon by Region

Select a generation from the dropdown (Kanto, Johto, etc.)

View Pokémon in a responsive grid with sprites

Click any Pokémon card for detailed information

Explore Pokémon Details

View comprehensive stats with visual progress bars

Toggle between normal and shiny sprites

Read ability descriptions and effects

Browse moves and click for detailed information

See height, weight, and Pokédex entries

Study Move Details

View move statistics (Power, PP, Accuracy, Priority)

See type and category with color-coded badges

Read effect descriptions

Check generation introduced and target information

🔧 Technical Implementation
API Integration
Efficient Data Fetching: Parallel requests for improved performance

Error Handling: Comprehensive error states and user feedback

Data Transformation: Proper unit conversions and formatting

Fallback Systems: Multiple data source attempts

Performance Optimizations
Image Optimization: Lazy loading with fade-in animations

Efficient DOM Updates: Minimal re-renders and batch operations

Progressive Loading: Content loads in stages for better UX

Memory Management: Cleanup of event listeners and data

Code Architecture
Modular JavaScript: Separation of concerns (display vs data logic)

Reusable Components: Utility functions and shared patterns

Clean CSS: BEM-like naming with consistent variables

URL Routing: Parameter-based deep linking

🎯 Skills Demonstrated
Frontend Development: HTML5, CSS3, JavaScript (ES6+)

API Integration: RESTful services, JSON handling, error management

Responsive Design: Mobile-first approach, cross-browser compatibility

UI/UX Design: User-centered design, accessibility principles

Problem Solving: Debugging, optimization, data transformation

Version Control: Git for project management

🌐 API Reference
This project uses the PokeAPI, a free RESTful API for Pokémon data.

Key endpoints used:

https://pokeapi.co/api/v2/pokemon/ - Pokémon data

https://pokeapi.co/api/v2/pokemon-species/ - Species information

https://pokeapi.co/api/v2/move/ - Move data

https://pokeapi.co/api/v2/ability/ - Ability data

🤝 Contributing
Contributions are welcome! Feel free to submit a Pull Request.

Fork the repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

🙏 Acknowledgments
PokeAPI for the comprehensive Pokémon data

Bootstrap for the responsive framework

Pokémon Company for the amazing franchise

All Pokémon fans who keep the community alive!

📧 Contact
Gaurang K - [GitHub](https://github.com/Gaurang-K9)

Project Link: https://github.com/Gaurang-K9/PokeApi-Frontend
