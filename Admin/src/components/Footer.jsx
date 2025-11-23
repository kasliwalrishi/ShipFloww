const Footer = () => {
  return (
    <div className="flex items-center bg-[#E9EB77] justify-between h-[100px] px-6">
      
      {/* ShipFloww Logo */}
      <div className="flex items-center gap-2">
        <img
          src="/logo3.png"
          alt="ShipFloww Logo"
          className="h-14 w-auto object-contain"
        />
        <span className="text-xl font-bold text-[#0b0b0b]">ShipFloww</span>
      </div>

      {/* Footer Right Side */}
      <ul className="m-[20px] text-[#0b0b0b] font-semibold">
        <li>Admin</li>
        <li>&copy; 2025</li>
      </ul>

    </div>
  );
};

export default Footer;
