const Footer = () => {
  return (
    <footer className="bg-[#2C3E50] text-white py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 
              className="font-bold text-lg mb-2" 
              style={{ fontFamily: '"IBM Plex Sans", sans-serif' }}
            >
              Cybersecurity Risk Assessment Tool
            </h3>
            <p className="text-sm text-gray-300">Helping organizations quantify and manage cybersecurity risk</p>
          </div>
          <div className="text-sm text-gray-300">
            <p>© {new Date().getFullYear()} Risk Analysis Platform. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
