const Footer = () => {
  return (
    <div className="h-[220px] bg-[#0b0b0b] flex items-center justify-between p-[30px] text-[#ffd400]">
     <div className="flex flex-col">
  {/* ShipFloww Logo */}
  <div className="flex items-center gap-2">
    <img src="/logo3.jpg" alt="ShipFloww Logo" className="h-16 w-auto" />
    <span className="text-2xl font-bold text-white">ShipFloww</span>
  </div>

  {/* Subtitle */}
  <span className="w-[70%] text-[#ccc] mt-2">
    We understand that your parcels carry more than just items — they carry your trust.
  </span>
</div>

      <div className="flex flex-col text-right">
        <span className="text-[#ffd400]">ShipFloww ❤️ </span>
        <span className="text-[#ccc]">&copy; copyright 2025</span>
      </div>
    </div>
  );
};

export default Footer;
