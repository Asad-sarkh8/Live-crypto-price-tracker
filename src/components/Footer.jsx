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
          {data.map((data, id) => (
            <span className="list" key={id}>
              {data.label}
            </span>
          ))}
        </div>
      </div>
      <div className="rights">
        Copyright ©{" "}
        <a
          href="https://github.com/Asad-sarkh8?tab=repositories"
          className="github"
        >
          ASAD_RAFIQUE
        </a>
      </div>
    </footer>
  );
};
export default Footer;
