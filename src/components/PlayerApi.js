const PlayerApi = {
  players: [
    {number: 23, name: "Lebron James", position: "F"},
    {number: 24, name: "Kobe Bryant", position: "G"},
    {number: 15, name: "Carmelo Anthony", position: "F"},
    {number: 3, name: "Dwyane Wade", position: "G"},
    {number: 5, name: "Chris Paul", position: "G"},
    {number: 1, name: "Chris Bosh", position: "F"}
  ],
  all: function() { return this.players},
  get: function(id) {
    const isPlayer = p => p.number === id;
    return this.players.find(isPlayer);
  }
};

export default PlayerApi;