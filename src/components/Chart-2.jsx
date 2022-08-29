import { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import Button from "./Button";

const Chart = ({ id }) => {
  const [data, setData] = useState([]);
  const [days, setDays] = useState(1);

  const api = (ids, day) =>
    `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${day}`;

  const fetchChartData = async () => {
    const { data } = await axios.get(api(id, days));
    setData(data.prices);
    console.log(data.prices);
  };
  useEffect(() => {
    // (async () => await fetchChartData())(); // immediately invoked function (IIF)
    fetchChartData();
  }, [days]);

  const chartDays = [
    { label: "24 hours", value: 1 },
    { label: "7 days", value: 7 },
    { label: "14 days", value: 14 },
  ];

  return (
    <div>
      <div className="button">
        {chartDays.map((day) => (
          <Button
            key={day.value}
            onClick={() => setDays(day.value)}
            label={day.label}
          >
            {day.label}
          </Button>
        ))}
      </div>
      <div className="chart">
        <Line
          data={{
            labels: data.map((coin) => {
              let date = new Date(coin[0]);
              return days === 1 ? date?.getHours() : date.toLocaleDateString();
            }),

            datasets: [
              {
                data: data.map((coin) => coin[1]),
                label: `Price ( past ${days} days)`,
                backgroundColor: "rgb(218, 165, 32)",
                borderColor: "rgb(218, 165, 32)",
              },
            ],
          }}
          options={{
            elements: {
              point: {
                radius: 1,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Chart;
