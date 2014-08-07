
var fs = require("fs"),

    pageFile = "page.html",
    headlinesFile = "headlines.json",

    pageStr = fs.readFileSync(pageFile, "utf8"),
    headlinesStr = fs.readFileSync(headlinesFile, "utf8"),
    headlines = JSON.parse(headlinesStr),

    processedPage = processPage();

fs.writeFileSync("result.html", processedPage, "utf8");

function processPage()
{
  var splited = pageStr.split(/{{{|}}}/g);

  for (var i = 1, len = splited.length; i < len; i+=2)
  {
    var sentence = generateSentence(parseInt(splited[i]));
    splited[i] = sentence;
  }

  return splited.join(" ");
}

function generateSentence(len)
{
  return "{Placeholder}"
}


// var sentences = JSON.parse(rw.readFileSync(sentenceFile, "utf8"));
// var words = JSON.parse(rw.readFileSync(wordsFile, "utf8"));
// var input = JSON.parse(rw.readFileSync(inputFile, "utf8"));
//
// var result = [];
//
//
// input.forEach(function (numWords){
//   var sentSet = sentences[numWords];
//   var randomSentInd = Math.random() * sentSet.length |0;
//   var randSent = sentSet[randomSentInd];
//
//   var sentWords = randSent.split(" ");
//   var randWordInd = Math.random() * numWords |0;
//   var wordSet = [];
//
//   while (wordSet.length <= 1) {
//     wordSet = words[numWords++][randWordInd];
//   }
//
//   var res = replaceWord(sentWords, randWordInd, wordSet);
//
//   result.push(sentWords.join(" "));
// });
//
// function replaceWord(sentenceWords, index, wordSet)
// {
//   var replaceWord = sentenceWords[index];
//
//   while(replaceWord === sentenceWords[index])
//   {
//     randInd = Math.random() * Math.random() * wordSet.length |0;
//     replaceWord = wordSet[randInd];
//   }
//
//   sentenceWords.splice(index, 1, replaceWord);
//   return sentenceWords.join(" ");
// }
//
//
// rw.writeFileSync(outFile, JSON.stringify(result), "utf8");
//
//
//
