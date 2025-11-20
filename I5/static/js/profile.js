document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('profileModal');
    const openBtn = document.getElementById('openModalBtn');
    const closeBtn = document.getElementById('closeModalBtn');

    // '프로필 수정' 버튼 클릭 시 모달 열기
    openBtn.addEventListener('click', function() {
        modal.classList.add('active');
        // 모달이 열릴 때 스크롤 방지 (선택 사항)
        document.body.style.overflow = 'hidden';
    });

    // 'X' 닫기 버튼 클릭 시 모달 닫기
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('active');
        // 스크롤 방지 해제
        document.body.style.overflow = 'auto';
    });

    // 모달 외부 영역 클릭 시 모달 닫기
    modal.addEventListener('click', function(e) {
        // 클릭된 요소가 모달 오버레이(배경) 자체인지 확인
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});