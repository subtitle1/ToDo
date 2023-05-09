import {
  Switch,
  Route,
  useLocation,
  useParams,
  Link,
  useRouteMatch,
} from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import { Helmet } from "react-helmet";
import { fetchCoinInfo, fetchCoinTicker } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareCaretLeft } from "@fortawesome/free-solid-svg-icons";

const Loader = styled.span`
  text-align: center;
  display: block;
  color: ${(props) => props.theme.loaderColor};
`;

const Container = styled.div`
  font-family: "Raleway", sans-serif;
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.accentColor};
`;

const TitleContainer = styled.div`
  text-align: center;
  display: block;
`;

const Title = styled.h1`
  font-family: "Bruno Ace", cursive;
  font-size: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
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

const BackBtn = styled.div`
  text-align: center;
  display: block;
  color: white;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => props.theme.tabBgColor};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.cntTextColor};
  font-weight: ${(props) => (props.isActive ? "bold" : "")};
  a {
    display: block;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
  color: ${(props) => props.theme.cntTextColor};
`;

interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
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

interface ICoinProps {
  isDark: boolean;
}

function Coin() {
  const { coinId } = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    // key는 react query 캐시 시스템에서 저장되고 작동하기 위해 고유한 값이어야 한다(info, tickers)
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTicker(coinId)
  );

  const loading = infoLoading || tickersLoading;

  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state?.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <TitleContainer>
          <BackBtn>
            <Link
              to={{
                pathname: `/`,
              }}
            >
              <FontAwesomeIcon size="2x" icon={faSquareCaretLeft} />
            </Link>
          </BackBtn>
          <Title>
            {state?.name
              ? state?.name
              : loading
              ? "Loading..."
              : infoData?.name}
          </Title>
        </TitleContainer>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${tickersData?.quotes.USD.price.toFixed(2)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Switch>
            <Route path={`/:coinId/chart`}>
              <Chart coinId={coinId}></Chart>
            </Route>
            <Route path={`/:coinId/price`}>
              <Price></Price>
            </Route>
          </Switch>
        </>
      )}
    </Container>
  );
}

export default Coin;
