import "./coin.css";
import Chart from "./Chart-2";

const Coin = ({
  price,
  name,
  symbol,
  image,
  fdv,
  marketcap,
  volume,
  hourly,
  daily,
  monthly,
  ath,
  id,
}) => {
  return (
    <div className="card">
      <div className="top">
        <div className="top-name">
          <img alt="coin-icon" className="coin-icon" src={image} />
          <div>
            <p className="name">{name}</p>
            <p className="code">{symbol}</p>
          </div>
        </div>
        <p className="price">${price?.toFixed(2)}</p>
      </div>

      <div className="bottom">
        {hourly < 0 ? (
          <p className="hourly-change red">
            {hourly?.toFixed(2)}
            <span className="percentage">%</span>
          </p>
        ) : (
          <p className="hourly-change green">
            {hourly?.toFixed(2)}
            <span className="percentage">%</span>
          </p>
        )}

        <div className="details">
          <div className="row">
            <span className="label">24h</span>
            {daily < 0 ? (
              <span className="value red">{daily?.toFixed(4)}%</span>
            ) : (
              <span className="value green">{daily?.toFixed(4)}%</span>
            )}
          </div>
          <div className="row">
            <span className="label">Monthly</span>
            {monthly < 0 ? (
              <span className="value red">
                {Math.round(monthly * 100) / 100}%
              </span>
            ) : (
              <span className="value green">
                {Math.round(monthly * 100) / 100}%
              </span>
            )}
          </div>
          <div className="row">
            <span className="label">ATH</span>
            {ath < 0 ? (
              <span className="value red">{ath?.toFixed(4)}%</span>
            ) : (
              <span className="value green">{ath?.toFixed(4)}%</span>
            )}
          </div>
          <div className="row">
            <span className="label">Capital</span>
            <span className="value">${Math.round(marketcap * 0.000001)}M</span>
          </div>
          <div className="row">
            <span className="label">Volume</span>
            <span className="value">
              ${Math.round(volume * 0.000001).toLocaleString()}M
            </span>
          </div>
          <div className="row">
            <span className="label">FDV</span>
            <span className="value">
              ${Math.round(fdv * 0.000001).toLocaleString()}M
            </span>
          </div>
        </div>
      </div>
      <div>
        <Chart id={id} />
      </div>
    </div>
  );
};

export default Coin;
