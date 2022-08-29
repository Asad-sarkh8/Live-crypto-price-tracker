const Footer = () => {
  const data = [
    { label: "Coin data" },
    { label: "Live price update" },
    { label: "Charts" },
    { label: "Statistics" },
  ];

  return (
    <footer className="footer">
      <div className="foot-list">
        <div>
          <div className="text crypto">
            Crpto
            <br />
            Tracker
          </div>
        </div>
        <div className="explore-list">
          <span className="explore">Explore</span>
          {data.map((data) => (
            <span className="list">{data.label}</span>
          ))}
        </div>
      </div>
      <div className="rights">Copyright © 2022</div>
    </footer>
  );
};
export default Footer;
