const oldModels = {};

const newModels = {};

for (const alias in oldModels) {
  if (!newModels[alias]) delete oldModels[alias];

  else oldModels[alias] = newModels[alias];
}

for (const alias in newModels) {
  oldModels[alias] = newModels[alias]
}

const news = {};
Object.keys(oldModels).sort().forEach(function (v, i) {
  news[v] = oldModels[v]
});

const fileOutput = JSON.stringify(news, null, 2);
console.log(fileOutput);