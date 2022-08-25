import { useState, useEffect } from "react";
import "./components/coin.css";
import Coin from "./components/Coin";
import { Pagination } from "@mui/material";
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from "react-alice-carousel";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [filteredItem, setFIlteredItem] = useState([]);

  const [date, setDate] = useState(new Date());
  function refreshClock() {
    setDate(new Date());
  }
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_HOST,
      },
    };

    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C30d%2C1y",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setCoins(response);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [date?.getMinutes()]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setFilteredCoins(
      coins.filter((coin) =>
        coin.name?.toLocaleLowerCase()?.includes(search.toLocaleLowerCase())
      )
    );
  }, [coins, search]);

  useEffect(() => {
    const item = coins.slice(0, 9);
    setFIlteredItem(item);
  }, [coins]);

  const items = filteredItem.map((coin) => {
    return (
      <div className="carouselItem">
        <img
          src={coin?.image}
          alt={coin.name}
          height="60"
          style={{ marginBottom: 10 }}
        />
        <span className="detail">
          <span className="symbols">
            <span className="symbolDetail">{coin.symbol}</span>
            {coin.price_change_percentage_1h_in_currency > 0 ? (
              <span className="percentage green">
                {coin?.price_change_percentage_1h_in_currency
                  ?.toFixed(2)
                  ?.toLocaleString()}
                %
              </span>
            ) : (
              <span className="percentage red">
                {coin?.price_change_percentage_1h_in_currency
                  ?.toFixed(2)
                  ?.toLocaleString()}
                %
              </span>
            )}
          </span>
          <span className="prices">
            ${coin?.current_price?.toFixed(2)?.toLocaleString()}
          </span>
        </span>
      </div>
    );
  });

  const response = {
    0: {
      items: 2,
    },
    400: {
      items: 3,
    },
    550: {
      items: 5,
    },
  };

  return (
    <div className="app">
      <header className="header">
        <div className="head">
          <div className="text">Crypto Tracker</div>
          <span className="small-text">(real-time)</span>
        </div>
      </header>
      <div className="slider">
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={400}
          animationDuration={400}
          disableDotsControls
          disableButtonsControls
          responsive={response}
          autoPlay
          autoPlayStrategy
          items={items}
        />
      </div>
      <div className="search">
        <input
          type="text"
          className="input"
          placeholder="Search a Currency"
          onChange={handleChange}
        />
      </div>
      <div className="cards-structure">
        {filteredCoins
          .slice((page - 1) * 10, (page - 1) * 10 + 10)
          .map((coin) => (
            <Coin
              key={coin.id}
              name={coin.name}
              symbol={coin.symbol}
              image={coin.image}
              fdv={coin.fully_diluted_valuation}
              marketcap={coin.market_cap}
              volume={coin.total_volume}
              hourly={coin.price_change_percentage_1h_in_currency}
              daily={coin.price_change_percentage_24h_in_currency}
              monthly={coin.price_change_percentage_30d_in_currency}
              ath={coin.ath_change_percentage}
              price={coin.current_price}
            />
          ))}
      </div>
      <Pagination
        className="pages"
        count={(filteredCoins?.length / 10).toFixed(0)}
        color="secondary"
        size="small"
        onChange={(_, value) => {
          setPage(value);
          window.scrollTo(0, "smooth");
        }}
      />
    </div>
  );
}
export default App;
