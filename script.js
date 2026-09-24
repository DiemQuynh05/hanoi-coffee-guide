// ==========================================
// HANOI COFFEE GUIDE
// SEARCH + FILTER
// ==========================================


// ==========================================
// 1. LẤY CÁC PHẦN TỬ
// ==========================================

const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

const needFilter = document.getElementById("needFilter");
const locationFilter = document.getElementById("locationFilter");
const priceFilter = document.getElementById("priceFilter");

const resetFilter = document.getElementById("resetFilter");

const resultCount = document.getElementById("resultCount");

const cafeCards = document.querySelectorAll(".cafe-card");


// ==========================================
// 2. HÀM LỌC QUÁN
// ==========================================

function filterCafes() {

    // Lấy giá trị bộ lọc

    const keyword =
        searchInput.value.toLowerCase().trim();

    const selectedNeed =
        needFilter.value;

    const selectedLocation =
        locationFilter.value;

    const selectedPrice =
        priceFilter.value;


    let count = 0;


    // Duyệt qua từng quán

    cafeCards.forEach(function(card) {

        const name =
            card.getAttribute("data-name")
                ?.toLowerCase() || "";

        const location =
            card.getAttribute("data-location")
                || "";

        const needs =
            card.getAttribute("data-needs")
                || "";

        const price =
            card.getAttribute("data-price")
                || "";

        const content =
            card.textContent.toLowerCase();


        // =========================
        // KIỂM TRA TỪ KHÓA
        // =========================

        const matchKeyword =
            keyword === "" ||
            name.includes(keyword) ||
            content.includes(keyword);


        // =========================
        // KIỂM TRA NHU CẦU
        // =========================

        const matchNeed =
            selectedNeed === "all" ||
            needs.includes(selectedNeed);


        // =========================
        // KIỂM TRA KHU VỰC
        // =========================

        const matchLocation =
            selectedLocation === "all" ||
            location === selectedLocation;


        // =========================
        // KIỂM TRA GIÁ
        // =========================

        const matchPrice =
            selectedPrice === "all" ||
            price === selectedPrice;


        // =========================
        // HIỂN THỊ / ẨN
        // =========================

        if (
            matchKeyword &&
            matchNeed &&
            matchLocation &&
            matchPrice
        ) {

            card.style.display = "";

            count++;

        } else {

            card.style.display = "none";

        }

    });


    // Cập nhật số lượng kết quả

    resultCount.textContent = count;


    // Nếu không tìm thấy

    if (count === 0) {

        resultCount.textContent = "0";
    }

}


// ==========================================
// 3. NÚT TÌM KIẾM
// ==========================================

searchButton.addEventListener(
    "click",
    function() {

        filterCafes();

        document
            .getElementById("cafes")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);


// ==========================================
// 4. NHẤN ENTER
// ==========================================

searchInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            filterCafes();

        }

    }
);


// ==========================================
// 5. KHI THAY ĐỔI BỘ LỌC
// ==========================================

needFilter.addEventListener(
    "change",
    filterCafes
);

locationFilter.addEventListener(
    "change",
    filterCafes
);

priceFilter.addEventListener(
    "change",
    filterCafes
);


// ==========================================
// 6. XÓA BỘ LỌC
// ==========================================

resetFilter.addEventListener(
    "click",
    function() {

        searchInput.value = "";

        needFilter.value = "all";

        locationFilter.value = "all";

        priceFilter.value = "all";

        filterCafes();

    }
);


// ==========================================
// 7. TÌM NHANH
// ==========================================

function quickSearch(keyword) {

    searchInput.value = keyword;

    filterCafes();

    document
        .getElementById("cafes")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ==========================================
// 9. CAFE DETAIL MODAL
// ==========================================

const cafeModal = document.getElementById("cafeModal");

const modalClose = document.getElementById("modalClose");

const modalOverlay =
    document.querySelector(".modal-overlay");

const modalName =
    document.getElementById("modalName");

const modalTag =
    document.getElementById("modalTag");

const modalLocation =
    document.getElementById("modalLocation");

const modalDescription =
    document.getElementById("modalDescription");

const modalPrice =
    document.getElementById("modalPrice");

const modalHours =
    document.getElementById("modalHours");

const modalArea =
    document.getElementById("modalArea");

const modalNeeds =
    document.getElementById("modalNeeds");


// ==========================================
// HÀM MỞ POPUP
// ==========================================

function openCafeModal(card) {

    // Lấy thông tin từ card

    const name =
        card.querySelector("h3").textContent.trim();

    const tag =
        card.querySelector(".tag").textContent.trim();

    const location =
        card.querySelector(".location").textContent.trim();

    const description =
        card.querySelector(
            ".cafe-content > p:not(.location)"
        ).textContent.trim();


    // Lấy thông tin giá + giờ

    const info =
        card.querySelectorAll(".cafe-info span");


    const price =
        info[0]
            ? info[0].textContent.trim()
            : "Chưa cập nhật";


    const hours =
        info[1]
            ? info[1].textContent.trim()
            : "Chưa cập nhật";


    // Lấy dữ liệu từ data attribute

    const area =
        card.getAttribute("data-location");


    const needs =
        card.getAttribute("data-needs");


    // Đưa dữ liệu vào popup

    modalName.textContent = name;

    modalTag.textContent = tag;

    modalLocation.textContent = location;

    modalDescription.textContent = description;

    modalPrice.textContent = price;

    modalHours.textContent = hours;

    modalArea.textContent =
        convertArea(area);

    modalNeeds.textContent =
        convertNeeds(needs);


    // Hiện popup

    cafeModal.classList.add("active");

    // Không cho trang cuộn phía sau

    document.body.style.overflow = "hidden";

}


// ==========================================
// CHUYỂN MÃ KHU VỰC → TÊN
// ==========================================

function convertArea(area) {

    const areas = {

        "hoan-kiem": "Hoàn Kiếm",

        "cau-giay": "Cầu Giấy",

        "tay-ho": "Tây Hồ",

        "ba-dinh": "Ba Đình"

    };

    return areas[area] || "Hà Nội";
}


// ==========================================
// CHUYỂN MÃ NHU CẦU → TÊN
// ==========================================

function convertNeeds(needs) {

    if (!needs) {
        return "Đang cập nhật";
    }

    const needNames = {

        "study": "📚 Học bài",

        "work": "💻 Làm việc",

        "date": "❤️ Hẹn hò",

        "view": "📸 View đẹp",

        "late": "🌙 Mở khuya"

    };


    return needs
        .split(",")
        .map(function(need) {

            return needNames[need] || need;

        })
        .join(" • ");

}


// ==========================================
// GẮN SỰ KIỆN CHO NÚT XEM CHI TIẾT
// ==========================================

const detailButtons =
    document.querySelectorAll(".detail-button");


detailButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            const card =
                button.closest(".cafe-card");

            openCafeModal(card);

        }
    );

});


// ==========================================
// ĐÓNG POPUP
// ==========================================

modalClose.addEventListener(
    "click",
    closeCafeModal
);


modalOverlay.addEventListener(
    "click",
    closeCafeModal
);


function closeCafeModal() {

    cafeModal.classList.remove("active");

    document.body.style.overflow = "";

}


// ==========================================
// NHẤN ESC ĐỂ ĐÓNG
// ==========================================

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Escape" &&
            cafeModal.classList.contains("active")
        ) {

            closeCafeModal();

        }

    }
);