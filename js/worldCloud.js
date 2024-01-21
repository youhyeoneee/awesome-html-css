// 워드클라우드 모듈불러오기
zingchart.MODULESDIR = 'https://cdn.zingchart.com/modules/';

// 많이 나온 단어 많이 뽑기
function getMostWords(callback) {
    // HTML 요소 선택
    var articleElement = document.getElementById('article');
    // HTML 요소의 텍스트 내용 가져오기
    var textData = articleElement.innerText || articleElement.textContent;
    // 텍스트에서 단어 빈도수 계산
    var wordCount = {};
    var words = textData.split(/\s+/);
    var result = [];

    words.forEach(function (word) {
        word = word.toLowerCase();

        if (word.length != 0)
        {
            if (!wordCount[word]) {
                wordCount[word] = 1;
            } else {
                wordCount[word]++;
            }
        } 
    });

    for(var word in wordCount)
    {
        var jsonData = {
            "text" : word,
            "count" : wordCount[word]
        }
        result.push(jsonData);
    }

    console.log(result);

    if (typeof callback === 'function') {
        callback(result);
    }
}

//워드클라우드 환경설정
var myConfig = {
    type: 'wordcloud',
    options: {
        words: [],
        minLength: 5,
        ignore: [""],
        maxItems: 40,
        aspect: 'spiral', // 'flow-top' | 'flow-center'

        colorType: 'palette',
        palette: [
            '#33FFCC',
            '#003300',
            '#009966',
            '#009933',
            '#99CC99',
            '#8D6E63',
            '#5D4037',
            '#000000',
            '#333333',
            '#666666',
            '#999999',
            '#CCCCCC',
        ],

        style: {
            fontFamily: 'Crete Round',

            hoverState: {
                backgroundColor: '#D32F2F',
                borderRadius: 2,
                fontColor: 'white'
            },
            tooltip: {
                text: '%text: %hits',
                visible: true,
                alpha: 0.9,
                backgroundColor: '#1976D2',
                borderRadius: 2,
                borderColor: 'none',
                fontColor: 'white',
                fontFamily: 'Georgia',
                textAlpha: 1
            }
        }
    },

    source: {
        // text: '--President Barack Obama<br> Selma 50th anniversary speech<br>March 7,
        // 2015', Source:
        // https://obamawhitehouse.archives.gov/the-press-office/2015/03/07/remarks-president-50th-anniversary-selma-montgomery-marches
        fontColor: '#64B5F6',
        fontSize: 10,
        fontFamily: 'Georgia',
        fontWeight: 'normal',
        marginBottom: '10%'
    }
};

// 호출할 콜백 함수
function renderWordCloud(words) {
    myConfig.options.words = words;

    // 워드클라우드 렌더링
    zingchart.render({
        id: 'wordCloudContainer',
        data: myConfig,
        height: 400,
        width: '100%'
    });
}

// getMostWords 함수 호출
getMostWords(renderWordCloud);