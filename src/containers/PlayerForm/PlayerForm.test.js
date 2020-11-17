import { render, fireEvent } from "@testing-library/react";
import PlayerForm from "./PlayerForm";
import { Provider } from "react-redux";
import store from "../../redux/store";

beforeEach(() => {
  jest.spyOn(global.Math, "random").mockReturnValue(0.75);
  fetch.mockClear();
});

afterEach(() => {
  jest.spyOn(global.Math, "random").mockRestore();
});

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        user: { name: "my user name", totalPoints: 150, clicks: 5, avg: 30 },
      }),
  })
);

it("generate score", () => {
  const $ = render(
    <Provider store={store}>
      <PlayerForm />
    </Provider>
  );
  const generateButton = $.getByText("generate score");
  fireEvent.click(generateButton);
  let score = $.getByTestId("score");
  expect(score.textContent.trim()).toBe("Score 50");
  fireEvent.click(generateButton);
  score = $.getByTestId("score");
  expect(score.textContent.trim()).toBe("Score 100");
});

it("render error message when input name is empty", () => {
  const $ = render(
    <Provider store={store}>
      <PlayerForm />
    </Provider>
  );
  const submitButton = $.getByText("send");
  fireEvent.click(submitButton);
  let errorMessage = $.getByTestId("error-message");
  expect(errorMessage.textContent).toBe(
    "Please enter your name and generate score before submiting"
  );
  expect(fetch).toHaveBeenCalledTimes(0);
});

it("stop generating score after 10 clicks", () => {
  const $ = render(
    <Provider store={store}>
      <PlayerForm />
    </Provider>
  );
  const generateButton = $.getByText("generate score");
  for (var i = 0; i < 10; i++) {
    fireEvent.click(generateButton);
  }
  const score = $.getByTestId("score");
  expect(score.textContent.trim()).toBe("Score 500");
  fireEvent.click(generateButton);
  expect(score.textContent.trim()).toBe("Score 500");
});

it("call fetch and send score to api", () => {
  const $ = render(
    <Provider store={store}>
      <PlayerForm />
    </Provider>
  );
  const generateButton = $.getByText("generate score");
  fireEvent.click(generateButton);
  const inputName = $.getByTestId("input-user-name");
  fireEvent.change(inputName, { target: { value: "my user name" } });
  const send = $.getByText("send");
  fireEvent.click(send);
  expect(fetch).toHaveBeenCalledTimes(1);
});
