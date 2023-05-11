import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
import styled from "styled-components";

interface ChartProps {
  coinId: string;
}

interface IHistory {
  close: string;
  high: string;
  low: string;
  market_cap: number;
  open: string;
  time_close: number;
  time_open: number;
  volume: string;
}

const Loader = styled.span`
  text-align: center;
  display: block;
  color: ${(props) => props.theme.loaderColor};
`;

function Chart({ coinId }: ChartProps) {
  // isDark atom의 값을 반환
  const isDark = useRecoilValue(isDarkAtom);

  const { isLoading, data } = useQuery<IHistory[]>(
    [coinId],
    () => fetchCoinHistory(coinId)
    // { refetchInterval: 10000 }
  );

  const date = data?.map((time) =>
    new Date(time.time_close * 1000).toISOString()
  );

  return (
    <div>
      {isLoading ? (
        <Loader>Loading chart...</Loader>
      ) : (
        <div>
          <ApexChart
            type="line"
            series={[
              {
                name: "Price",
                data: data?.map((price) => Number(price.close)) as number[],
              },
            ]}
            options={{
              theme: {
                mode: isDark ? "dark" : "light",
              },
              chart: {
                height: 300,
                width: 500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              grid: { show: false },
              stroke: {
                curve: "smooth",
                width: 4,
              },
              yaxis: { show: false },
              xaxis: {
                labels: { show: false },
                axisTicks: { show: false },
                type: "datetime",
                categories: date,
              },
              fill: {
                type: "gradient",
                gradient: { gradientToColors: ["blue"], stops: [0, 50, 100] },
              },
              colors: ["#a6ddc2"],
              tooltip: {
                y: {
                  formatter: (value) => `$ ${value.toFixed(2)}`,
                },
              },
            }}
          ></ApexChart>
          <ApexChart
            type="candlestick"
            series={
              [
                {
                  data: data?.map((price) => {
                    return {
                      x: new Date(price.time_close * 1000).toISOString(),
                      y: [price.open, price.high, price.low, price.close],
                    };
                  }),
                },
              ] as any
            }
            options={{
              theme: {
                mode: isDark ? "dark" : "light",
              },
              chart: {
                height: 300,
                width: 500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              grid: { show: false },
              yaxis: { show: false },
              xaxis: {
                labels: { show: false },
                axisTicks: { show: false },
                type: "datetime",
                categories: date,
              },
              tooltip: {
                y: {
                  formatter: (value) => `$ ${value.toFixed(2)}`,
                },
              },
              plotOptions: {
                candlestick: {
                  colors: {
                    upward: "#3C90EB",
                    downward: "#DF7D46",
                  },
                },
              },
            }}
          ></ApexChart>
        </div>
      )}
    </div>
  );
}

export default Chart;
