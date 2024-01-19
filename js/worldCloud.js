// HTML 요소 선택
var articleElement = document.getElementById('article');
// HTML 요소의 텍스트 내용 가져오기
var textData = articleElement.innerText || articleElement.textContent;
// 텍스트에서 단어 빈도수 계산
var wordCount = {};
var words = textData.split(/\s+/);

words.forEach(function (word) {
    word = word.toLowerCase();
    if (!wordCount[word]) {
        wordCount[word] = 1;
    } else {
        wordCount[word]++;
    }
});

// 단어 빈도수를 배열로 변환
var wordArray = Object
    .keys(wordCount)
    .map(function (word) {
        return {
            text: word,
            size: wordCount[word] * 10
        };
    });

// Word Cloud 레이아웃 설정
var layout = d3
    .layout
    .cloud()
    .size([800, 400])
    .words(wordArray)
    .padding(5)
    .rotate(function () {
        return ~~ (Math.random() * 2) * 90;
    })
    .font("Impact")
    .fontSize(function (d) {
        return d.size;
    })
    .on("end", draw);

// SVG 요소 생성
var svg = d3
    .select("#wordCloudContainer")
    .append("svg")
    .attr("width", layout.size()[0])
    .attr("height", layout.size()[1])
    .append("g")
    .attr(
        "transform",
        "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")"
    );

// Word Cloud 그리기
layout.start();

// 그리기 함수
function draw(words) {
    svg
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", function (d) {
            return d.size + "px";
        })
        .style("font-family", "Impact")
        .attr("text-anchor", "middle")
        .attr("transform", function (d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function (d) {
            return d.text;
        });
}