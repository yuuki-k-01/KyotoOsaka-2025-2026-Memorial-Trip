document.addEventListener('DOMContentLoaded', () => {
    // 1. メインタブ切り替え
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.tab-section');

    navItems.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            navItems.forEach(i => i.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    // 2. 日付切り替え
    const dayBtns = document.querySelectorAll('.day-btn');
    const dayContents = document.querySelectorAll('.day-content');

    dayBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const dayId = btn.getAttribute('data-day');
            dayBtns.forEach(b => b.classList.remove('active'));
            dayContents.forEach(c => c.style.display = 'none');
            btn.classList.add('active');
            document.getElementById(dayId).style.display = 'block';
        });
    });

    // 3. 持ち物保存機能
    const checkboxes = document.querySelectorAll('.save-cb');
    checkboxes.forEach((cb, index) => {
        const key = `item_${index}`;
        // 読み込み
        cb.checked = localStorage.getItem(key) === 'true';
        // 保存
        cb.addEventListener('change', () => {
            localStorage.setItem(key, cb.checked);
        });
    });

    // 4. マップフィルター
    const mapSearch = document.getElementById('mapSearch');
    const dayFilter = document.getElementById('dayFilter');
    const mapItems = document.querySelectorAll('.map-item');

    function filterMap() {
        const query = mapSearch.value.toLowerCase();
        const day = dayFilter.value;
        mapItems.forEach(item => {
            const name = item.getAttribute('data-name').toLowerCase();
            const itemDay = item.getAttribute('data-day');
            const matchQuery = name.includes(query);
            const matchDay = (day === 'all' || itemDay === day);
            item.style.display = (matchQuery && matchDay) ? 'block' : 'none';
        });
    }
    mapSearch.addEventListener('input', filterMap);
    dayFilter.addEventListener('change', filterMap);
});