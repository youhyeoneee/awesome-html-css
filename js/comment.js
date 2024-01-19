// 댓글 작성 버튼 클릭 이벤트 핸들러
document
    .getElementById('comment_submit')
    .addEventListener('click', function (event) {
        event.preventDefault();

        // 작성된 댓글 내용 가져오기
        var commentText = document
            .getElementById('comment')
            .value;

        // 댓글을 추가할 부모 요소
        var commentsContainer = document.getElementById('comments');

        // 새로운 댓글을 담을 div 요소 생성
        var newCommentDiv = document.createElement('div');
        newCommentDiv.className = 'd-flex mb-4';

        // 댓글 작성자 이미지 추가
        var commenterImage = document.createElement('div');
        commenterImage.className = 'flex-shrink-0';
        commenterImage.innerHTML = '<img class="rounded-circle" src="https://dummyimage.com/50x50/ced4da/6c757d.jp' +
                'g" alt="..." />';
        newCommentDiv.appendChild(commenterImage);

        // 댓글 내용과 작성자 정보를 추가할 div 요소 생성
        var commentInfo = document.createElement('div');
        commentInfo.className = 'ms-3';

        // 댓글 작성자명을 추가
        var commenterName = document.createElement('div');
        commenterName.className = 'fw-bold';
        commenterName.textContent = '댓글 작성자'; // 원하는 댓글 작성자명으로 변경
        commentInfo.appendChild(commenterName);

        // 댓글 내용을 추가
        var commentContent = document.createElement('div');
        commentContent.textContent = commentText;
        commentInfo.appendChild(commentContent);

        // 새로 작성된 댓글을 부모 요소에 추가
        newCommentDiv.appendChild(commentInfo);
        commentsContainer.appendChild(newCommentDiv);

        // 댓글 작성 후 텍스트 에어리어 내용 초기화
        document
            .getElementById('comment')
            .value = '';
    });