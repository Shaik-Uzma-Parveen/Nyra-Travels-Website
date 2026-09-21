const Header = () => {
  return (
    <header className="fixed top-4 left-4 z-50">
      <a href="#home" aria-label="Nyra Tours and Travels" className="block">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white shadow-2xl ring-4 ring-primary/40 overflow-hidden flex items-center justify-center hover:scale-105 transition-transform">
          <img
            src="/nyra-logo-v3.png"
            alt="Nyra Tours and Travels"
            className="w-full h-full object-contain p-2"
          />
        </div>
      </a>
    </header>
  );
};

export default Header;
