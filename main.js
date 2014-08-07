
var fs = require("fs"),

    pageFile = "page.html",
    headlinesFile = "headlines.json",

    pageStr = fs.readFileSync(pageFile, "utf8"),
    headlinesStr = fs.readFileSync(headlinesFile, "utf8"),
    headlines = JSON.parse(headlinesStr),

    headlinesByLength = byLength(headlines),
    wordsList = getWordList(headlinesByLength),

    processedPage = processPage(pageStr, headlinesByLength, wordsList);

fs.writeFileSync("result.html", processedPage, "utf8");

function byLength(headlines)
{
  var result = {};

  headlines.forEach(function (headline) {
    var split = headline.split(" "),
        len = split.length,
        col = result[len] || [];

    col.push(split);
    result[len] = col;
  });

  return result;
}

function getWordList(headlinesByLength)
{
  var result = {};

  for(var len in headlinesByLength) {
    result[len] = result[len] || {};

    headlinesByLength[len].forEach(function (splitHeadline) {
      splitHeadline.forEach(function (word, index) {
        var col = result[len][index] || [];
        col.push(word);
        result[len][index] = col;
      });
    });
  }

  return result;
}

function processPage(pageStr, headlinesByLength, wordsList)
{
  var splited = pageStr.split(/{{{|}}}/g);

  for (var i = 1, len = splited.length; i < len; i+=2)
  {
    var requestedLength = parseInt(splited[i]);

    if (!headlinesByLength[requestedLength] ||  headlinesByLength[requestedLength].length < 2) {
      console.log("WARNING: Requested length ", requestedLength, " doesn't have enough samples:\n",
                  headlinesByLength[requestedLength]);
    } else {
      var sampleHeadline = getSampleHeadline(headlinesByLength, requestedLength),
          headline = replaceAWord(sampleHeadline, wordsList, requestedLength);

      splited[i] = headline;
    }
  }

  return splited.join(" ");
}

function getSampleHeadline(headlinesByLength, requestedLength)
{
  var headlines = headlinesByLength[requestedLength],
      random = rand(headlines.length);

  return headlines[random];
}

function replaceAWord(headline, wordsList, requestedLength)
{
  var randomPos = rand(requestedLength),
      words = wordsList[requestedLength][randomPos],
      word = words[rand(words.length)];

  headline[randomPos] = word;
  return headline.join(" ");
}

function rand(num)
{
  return Math.random() * num |0;
}

