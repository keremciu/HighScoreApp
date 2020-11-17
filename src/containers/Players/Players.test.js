import { render, fireEvent, wait, within } from "@testing-library/react";
import Players from "./Players";
import { Provider } from "react-redux";
import store from "../../redux/store";
import * as api from "../../api";

beforeEach(() => {
  api.mockGetPlayers = jest.fn(() =>
    Promise.resolve([
      { name: "Jane Doe", totalPoints: 157, clicks: 5 },
      { name: "Lily Allen", totalPoints: 234, clicks: 8 },
      { name: "John Smith", totalPoints: 390, clicks: 10 },
    ])
  );
});

it("players are sorted", async () => {
  const $ = render(
    <Provider store={store}>
      <Players />
    </Provider>
  );
  await wait();

  let playerItems = $.getAllByTestId("playeritem");
  const bestPlayerByTotalPoints = within(playerItems[0]).getByText(
    "John Smith"
  );
  expect(bestPlayerByTotalPoints).not.toBeNull();
});

it("players are sorted by avg", async () => {
  const $ = render(
    <Provider store={store}>
      <Players />
    </Provider>
  );
  await wait();

  const playerItems = $.getAllByTestId("playeritem");
  let secondPlayerByAvg = within(playerItems[2]).getByText("Jane Doe");
  expect(secondPlayerByAvg).not.toBeNull();

  const sortAvgButton = $.getByText("sort total points avg");
  fireEvent.click(sortAvgButton);

  secondPlayerByAvg = within(playerItems[1]).getByText("Jane Doe");
  expect(secondPlayerByAvg).not.toBeNull();
});
