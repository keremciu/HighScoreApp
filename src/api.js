export const mockGetPlayers = () => {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve ([
                  {name: "Jane Doe", totalPoints: 157, clicks: 5},
                  {name: "Lily Allen", totalPoints: 234, clicks: 8},
                  {name: "John Smith", totalPoints: 390, clicks: 10}
                ]);
    },500);
  });
}
