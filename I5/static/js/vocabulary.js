document.addEventListener('DOMContentLoaded', () => {

    const filterButtons = document.querySelectorAll('.filter-btn');
    const wordGrid = document.getElementById('wordGrid');
    const allCards = document.querySelectorAll('.word-card');
    const pageNumbersContainer = document.getElementById('pageNumbers');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    
    // 페이지네이션
    let currentPage = 1;
    let totalPages = 0;

   
    function initFilters() {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
               
                filterButtons.forEach(btn => btn.classList.remove('active'));
               
                button.classList.add('active');
                
                
            });
        });
    }

   
    function initBookmarks() {
      
        wordGrid.addEventListener('click', (event) => {
        
            if (event.target.classList.contains('bookmark-icon')) {
                const icon = event.target;
                
              
                if (icon.textContent === '🔖') {
                    icon.textContent = ''; // 비어있는 상태 
                    icon.textContent = '🔖'; // 채워진 상태
                }
            }
        });
    }

  
   
     /* @param {number} page - 보여줄 페이지 번호
     */
    function showPage(page) {
        allCards.forEach(card => {
            // 카드의 data-page 속성값이 현재 페이지와 일치하는지 확인
            if (parseInt(card.dataset.page) === page) {
                card.style.display = ''; // CSS 그리드 기본값으로 복원
            } else {
                card.style.display = 'none'; 
            }
        });
    }

   
    function updateNavButtons() {
        // 현재 페이지가 1페이지면 '이전' 버튼 비활성화
        prevPageBtn.disabled = (currentPage === 1);
        // 현재 페이지가 마지막 페이지면 '다음' 버튼 비활성화
        nextPageBtn.disabled = (currentPage === totalPages);
    }

   
     /* @param {number} page - 이동할 페이지 번호
     */
    function goToPage(page) {
        // 페이지 범위 유효성 검사
        if (page < 1 || page > totalPages) return;
        
        currentPage = page; 
        showPage(currentPage);
        
        // 페이지 번호 버튼의 'active' 상태 업데이트
       
        document.querySelector('.page-number.active').classList.remove('active');
       
        document.querySelector(`.page-number[data-page-num="${currentPage}"]`).classList.add('active');
        
        updateNavButtons();
    }

    /**
     * 페이지네이션 초기 설정 함수
     */
    function initPagination() {
        // 1. 전체 페이지 수 계산
        
        totalPages = Math.max(...Array.from(allCards).map(card => parseInt(card.dataset.page || 1)));

      
        if (totalPages <= 1) {
            document.querySelector('.pagination').style.display = 'none';
            showPage(1); // 1페이지만 표시
            return;
        }

        // 2. '이전', '다음' 버튼 텍스트/이벤트 설정
        prevPageBtn.textContent = '<';
        nextPageBtn.textContent = '>';
        
        prevPageBtn.addEventListener('click', () => goToPage(currentPage - 1));
        nextPageBtn.addEventListener('click', () => goToPage(currentPage + 1));

        // 3. 페이지 번호 버튼 동적 생성
        pageNumbersContainer.innerHTML = ''; // 기존 내용 초기화
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.textContent = i;
            pageBtn.className = 'page-number';
            pageBtn.dataset.pageNum = i;
            
            if (i === 1) {
                pageBtn.classList.add('active'); // 첫 페이지를 활성 상태로
            }
            
            // 각 페이지 번호 버튼에 클릭 이벤트 추가
            pageBtn.addEventListener('click', () => goToPage(i));
            pageNumbersContainer.appendChild(pageBtn);
        }

        //  초기 상태 설정 (1페이지 표시)
        showPage(1);
        updateNavButtons();
    }

   
    if (allCards.length > 0) {
        initPagination(); // 페이지네이션 초기화
    }
    initFilters(); // 필터 버튼 초기화
    initBookmarks(); // 북마크 기능 초기화

});

document.addEventListener('DOMContentLoaded', function() {
    
    /* -------------------------------------
       1. 기본 UI & 학습 종료 모달 제어
    ------------------------------------- */
    const startModal = document.getElementById('startModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const startBtn = document.getElementById('startStudyBtn');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // 정렬 버튼 클릭 활성화
    filterBtns.forEach(btn => {
        btn.onclick = function () {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        };
    });

    // 학습 종료 모달 닫기
    if (closeModalBtn) closeModalBtn.onclick = () => startModal.style.display = "none";
    if (startBtn) startBtn.onclick = () => startModal.style.display = "none";


    /* -------------------------------------
       2. 통합 플래시카드 & 상세 보기 로직
    ------------------------------------- */
    const flashcardModal = document.getElementById('flashcardModal');
    const modalBox = document.querySelector('.flashcard-modal-box');
    
    const openFlashcardBtn = document.getElementById('openFlashcardBtn'); // 플래시카드 버튼
    const closeFlashcardBtn = document.getElementById('closeFlashcardBtn'); // X 버튼

    // DOM 요소
    const prevBtn = document.getElementById('cardPrevBtn');
    const nextBtn = document.getElementById('cardNextBtn');
    const showMeaningBtn = document.getElementById('showMeaningBtn');
    
    const flashcardWord = document.querySelector('.flashcard-word');
    const flashcardHalf = document.querySelector('.flashcard-half');
    const flashcardDetail = document.querySelector('.flashcard-detail');

    // 데이터 상태
    let words = [];
    let currentIndex = 0;
    let isMeaningShown = false;

    // [함수] HTML에서 단어 데이터 읽어오기
    function loadWords() {
        const cardNodes = document.querySelectorAll('.word-card');
        if (cardNodes.length === 0) return false;

        words = Array.from(cardNodes).map(card => {
            // 1. 단어 텍스트
            const headerText = card.querySelector('.word-header').innerText.trim().split('\n')[0];
            
            // 2. 뜻 가져오기 (HTML에 숨겨진 .full-meaning 우선)
            let meaningText = "";
            const fullMeaningEl = card.querySelector('.full-meaning');
            
            if (fullMeaningEl) {
                const rawText = fullMeaningEl.textContent.trim();
                // 구분자 | 로 나누고 빈 값 제거
                const parts = rawText.split('|').map(t => t.trim()).filter(t => t.length > 0);
                
                // [요청사항] 뜻도 그냥 하나만 보여주게 (첫 번째 뜻만 사용)
                if (parts.length > 0) {
                    meaningText = parts[0];
                }
            } else {
                // 백업: 보이는 텍스트 사용
                const detailEl = card.querySelector('.word-detail');
                if (detailEl) meaningText = detailEl.innerText.replace('...', '').trim();
            }

            return { word: headerText, meaning: meaningText };
        });
        return true;
    }

    // [함수] 화면 그리기
    function renderFlashcard() {
        if (words.length === 0) return;
        const data = words[currentIndex];

        // 1. 단어 표시
        flashcardWord.textContent = data.word;

        // 2. 상세 보기 모드일 때 (뜻 바로 표시)
        if (modalBox.classList.contains('detail-mode')) {
            flashcardDetail.innerHTML = `
                <hr class="card-divider" style="width:80%; border-top:2px solid #eee; margin:20px 0;">
                <div class="meaning-content" style="padding:0 20px;">
                    ${data.meaning}
                </div>
            `;
            flashcardDetail.style.display = "flex";
            // 파란 가림막, 화살표 등은 CSS(.detail-mode)에서 display:none 처리됨
        } 
        // 3. 플래시카드 모드일 때 (가리기/보이기 토글)
        else {
            if (!isMeaningShown) {
                flashcardHalf.style.display = "block"; // 가림막 보이기
                flashcardDetail.style.display = "none";
                showMeaningBtn.textContent = "의미보기 | SPACE";
            } else {
                flashcardHalf.style.display = "none"; // 가림막 숨기기
                flashcardDetail.innerHTML = `
                    <hr class="card-divider" style="width:80%; border-top:2px solid #eee; margin:20px 0;">
                    <div class="meaning-content" style="padding:0 20px;">
                        ${data.meaning}
                    </div>
                `;
                flashcardDetail.style.display = "flex";
                showMeaningBtn.textContent = "단어보기 | SPACE";
            }
            
            // 화살표 활성 상태
            prevBtn.disabled = (currentIndex === 0);
            nextBtn.disabled = (currentIndex === words.length - 1);
            prevBtn.style.opacity = (currentIndex === 0) ? "0.3" : "1";
            nextBtn.style.opacity = (currentIndex === words.length - 1) ? "0.3" : "1";
        }
    }

    // -------------------------------------------------
    // [이벤트 1] 개별 카드 클릭 -> 상세 보기 (Detail Mode)
    // -------------------------------------------------
    const cardNodes = document.querySelectorAll('.word-card');
    cardNodes.forEach((card, index) => {
        card.addEventListener('click', function(e) {
            if (e.target.classList.contains('bookmark-icon')) return;

            if (loadWords()) {
                currentIndex = index;
                modalBox.classList.add('detail-mode'); // 상세 모드 ON
                renderFlashcard();
                flashcardModal.style.display = "flex";
            }
        });
    });

    // -------------------------------------------------
    // [이벤트 2] '플래시 카드로 보기' -> 학습 모드 (Flashcard Mode)
    // -------------------------------------------------
    if (openFlashcardBtn) {
        openFlashcardBtn.onclick = function() {
            if (loadWords()) {
                currentIndex = 0;
                isMeaningShown = false;
                modalBox.classList.remove('detail-mode'); // 상세 모드 OFF
                renderFlashcard();
                flashcardModal.style.display = "flex";
            } else {
                alert("학습할 단어가 없습니다.");
            }
        };
    }

    // -------------------------------------------------
    // [이벤트 3] 공통 기능 (닫기, 화살표, 의미보기)
    // -------------------------------------------------
    
    // 닫기 버튼
    if (closeFlashcardBtn) {
        closeFlashcardBtn.onclick = function() {
            flashcardModal.style.display = "none";
            modalBox.classList.remove('detail-mode');
        };
    }

    // 배경 클릭 닫기
    flashcardModal.addEventListener('mousedown', (e) => {
        if (e.target === flashcardModal) {
            flashcardModal.style.display = "none";
            modalBox.classList.remove('detail-mode');
        }
    });

    // 의미 보기 버튼 (플래시카드 모드 전용)
    if (showMeaningBtn) {
        showMeaningBtn.onclick = function() {
            isMeaningShown = !isMeaningShown;
            renderFlashcard();
        };
    }

    // 화살표 이동 (플래시카드 모드 전용)
    if (prevBtn) prevBtn.onclick = () => {
        if (currentIndex > 0) { currentIndex--; isMeaningShown = false; renderFlashcard(); }
    };
    if (nextBtn) nextBtn.onclick = () => {
        if (currentIndex < words.length - 1) { currentIndex++; isMeaningShown = false; renderFlashcard(); }
    };

    // 키보드 단축키
    window.addEventListener('keydown', (e) => {
        if (flashcardModal.style.display === "flex") {
            if (e.code === "Escape") {
                flashcardModal.style.display = "none";
                modalBox.classList.remove('detail-mode');
            }
            // 플래시카드 모드일 때만 작동
            if (!modalBox.classList.contains('detail-mode')) {
                if (e.code === "Space") { e.preventDefault(); showMeaningBtn.click(); }
                else if (e.code === "ArrowRight" && !nextBtn.disabled) nextBtn.click();
                else if (e.code === "ArrowLeft" && !prevBtn.disabled) prevBtn.click();
            }
        }
    });
});