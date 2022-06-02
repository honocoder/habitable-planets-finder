const { parse } = require("csv-parse");
const fs = require("fs");

const habitablePlanets = [];

const isHabitable = (planet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};

fs.createReadStream("kepler_data.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (data) => {
    if (isHabitable(data)) {
      habitablePlanets.push(data);
    }
  })
  .on("error", (err) => {
    console.log(err);
  })
  .on("end", () => {
    console.log(`${habitablePlanets.length} habitable planets found!`);
    console.log(
      "Those planets are: " +
        habitablePlanets.map((planet) => {
          return planet["kepler_name"];
        })
    );
    console.log(
      "Interesting fact: Kepler 442b is known as 'superhabitable', it means that with its conditions, this planet is more habitable than ours!"
    );
  });
