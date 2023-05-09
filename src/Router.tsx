import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId">
          <Coin />
        </Route>
        <Route path="/">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
