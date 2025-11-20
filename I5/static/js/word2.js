// 탭 전환 기능
const tabButtons = document.querySelectorAll('.tab-btn');

tabButtons.forEach(button => {
    button.addEventListener('click', function() {
        // 모든 탭에서 active 클래스 제거
        tabButtons.forEach(btn => btn.classList.remove('active'));
        // 클릭된 탭에 active 클래스 추가
        this.classList.add('active');
        
        // 탭에 따라 제목과 설명 변경
        const searchTitle = document.querySelector('.search-word-tabs h2');
        const searchDesc = document.querySelector('.search-word-tabs p');
        const searchInput = document.querySelector('.mian-search-input-wrapper input');
        
        if(this.textContent === '단어') {
            window.location.href = '/words/dictionary/';
        } else {
            searchTitle.textContent = '문서 검색';
            searchDesc.textContent = '문서를 업로드하면 어려운 표현을 쉽게 변환해드립니다.';
            searchInput.placeholder = '문서를 검색하세요...';
        }
    });
});

// 검색 입력 기능
const searchInput = document.querySelector('.mian-search-input-wrapper input');
const headerSearchInput = document.querySelector('.search-box input');

// 메인 검색창 엔터키 이벤트
if(searchInput) {
    searchInput.addEventListener('keypress', function(e) {
        if(e.key === 'Enter') {
            performSearch(this.value);
        }
    });
}

// 헤더 검색창 엔터키 이벤트
if(headerSearchInput) {
    headerSearchInput.addEventListener('keypress', function(e) {
        if(e.key === 'Enter') {
            performSearch(this.value);
        }
    });
}

// 헤더 검색 버튼 클릭 이벤트
const headerSearchBtn = document.querySelector('.search-btn');
if(headerSearchBtn) {
    headerSearchBtn.addEventListener('click', function() {
        performSearch(headerSearchInput.value);
    });
}

// 검색 실행 함수
function performSearch(query) {
    if(query.trim() === '') {
        alert('검색어를 입력해주세요.');
        return;
    }
    
    console.log('검색어:', query);
    showSearchResult(query);
}

// 검색 결과 표시 함수
function showSearchResult(word) {
    const searchArea = document.querySelector('.search-area');
    
    // 결과 컨테이너가 없으면 생성
    let resultContainer = document.querySelector('.result-container');
    if(!resultContainer) {
        resultContainer = document.createElement('div');
        resultContainer.className = 'result-container';
        searchArea.parentNode.insertBefore(resultContainer, searchArea.nextSibling);
    }
    
    // 예시 결과 데이터 (실제로는 API에서 받아옴)
    const exampleData = {
        word: word,
        type: '명사',
        definition: '실제로는 여기에 검색하신 단어에 대한 자세한 정의와 설명이 표시됩니다. 단어의 의미를 명확하게 이해할 수 있도록 도와드립니다.',
        relatedWords: ['심플 등', '쉬운 설명'],
        alternatives: '이 단어 대신 사용할 수 있는 더 쉽고 명확한 표현들을 제공합니다. 일상적인 언어로 바꿔서 더 많은 사람들이 이해할 수 있도록 돕습니다.',
        examples: '단어를 활용한 예문과 실제 사용 사례를 통해 맥락 속에서 어떻게 사용되는지 보여드립니다.'
    };
    
    // 결과 HTML 생성
    resultContainer.innerHTML = `
        <div class="result-header">
            <div class="result-word-info">
                <h3>${exampleData.word}</h3>
                <span class="word-badge">${exampleData.type}</span>
                <p class="word-definition">${exampleData.definition}</p>
            </div>
            <div class="result-sidebar">
                <h4>단어</h4>
                <ul>
                    ${exampleData.relatedWords.map(w => `<li>${w}</li>`).join('')}
                </ul>
            </div>
        </div>
        
        <div class="section-box">
            <h4>대체 표현</h4>
            <p>${exampleData.alternatives}</p>
        </div>
        
        <div class="action-buttons">
            <button class="btn btn-secondary" onclick="showMore()">단어 학습 (4건 기반)</button>
            <button class="btn btn-primary" onclick="applyEasyExplanation()">쉬운 설명</button>
        </div>
    `;
    
    // 검색 영역 숨기고 결과 영역 표시
    searchArea.style.display = 'none';
    resultContainer.classList.add('active');
}

// 검색으로 돌아가기
function resetSearch() {
    const searchArea = document.querySelector('.search-area');
    const resultContainer = document.querySelector('.result-container');
    
    if(resultContainer) {
        resultContainer.classList.remove('active');
    }
    searchArea.style.display = 'block';
    
    // 검색어 초기화
    document.querySelector('.mian-search-input-wrapper input').value = '';
}

// 더보기 기능
function showMore() {
    alert('단어 학습 페이지로 이동합니다.');
}

// 쉬운 설명 적용
function applyEasyExplanation() {
    alert('쉬운 설명이 적용되었습니다.');
}