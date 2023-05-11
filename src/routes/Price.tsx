import { useQuery } from "react-query";
import { fetchCoinTicker } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowTrendUp,
  faArrowTrendDown,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Loader = styled.span`
  text-align: center;
  display: block;
  color: ${(props) => props.theme.loaderColor};
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.tabBgColor};
  padding: 20px 20px;
  border-radius: 10px;
  color: ${(props) => props.theme.cntTextColor};
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span`
  text-align: center;
  text-transform: uppercase;
  font-size: 15px;
  font-weight: 400;
  background-color: ${(props) => props.theme.tabBgColor};
  padding: 15px 0px;
  border-radius: 10px;
  color: ${(props) => props.theme.cntTextColor};
`;

interface PriceProps {
  coinId: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function setUpDownMark(time: number) {
  if (time.toString().includes("-")) {
    return faArrowTrendDown;
  }
  return faArrowTrendUp;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<PriceData>(["tickers", coinId], () =>
    fetchCoinTicker(coinId)
  );

  const detail = data?.quotes.USD;

  return (
    <div>
      {isLoading ? (
        <Loader>Loading price...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>최고가</span>
              <span>$ {detail?.ath_price.toFixed(2)}</span>
            </OverviewItem>
            <OverviewItem>
              <span>최고가 갱신일</span>
              <span>{detail?.ath_date.substr(0, 10)}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab>
              <FontAwesomeIcon
                size="2x"
                className="upDownMark"
                icon={setUpDownMark(detail?.percent_change_12h as number)}
              />
              <span> 12시간 전보다 {detail?.percent_change_12h} </span>
            </Tab>
            <Tab>
              <FontAwesomeIcon
                size="2x"
                className="upDownMark"
                icon={setUpDownMark(detail?.percent_change_24h as number)}
              />
              <span> 하루 전보다 {detail?.percent_change_24h}</span>
            </Tab>
            <Tab>
              <FontAwesomeIcon
                size="2x"
                className="upDownMark"
                icon={setUpDownMark(detail?.percent_change_7d as number)}
              />
              <span> 일주일 전보다 {detail?.percent_change_7d}</span>
            </Tab>
            <Tab>
              <FontAwesomeIcon
                size="2x"
                className="upDownMark"
                icon={setUpDownMark(detail?.percent_change_6h as number)}
              />
              <span> 30일 전보다 {detail?.percent_change_6h} </span>
            </Tab>
          </Tabs>
        </>
      )}
    </div>
  );
}

export default Price;
