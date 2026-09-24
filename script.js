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

    const keyword = searchInput.value.toLowerCase().trim();

    let selectedNeed = needFilter.value;
    let selectedLocation = locationFilter.value;
    let selectedPrice = priceFilter.value;

    // =========================
    // PHÂN TÍCH CÂU TÌM KIẾM
    // =========================

    if (keyword !== "") {

        // ----- NHU CẦU -----

        if (
            keyword.includes("học bài") ||
            keyword.includes("học tập") ||
            keyword.includes("học")
        ) {
            selectedNeed = "study";
        }

        else if (
            keyword.includes("làm việc") ||
            keyword.includes("work")
        ) {
            selectedNeed = "work";
        }

        else if (
            keyword.includes("hẹn hò") ||
            keyword.includes("hẹn hò")
        ) {
            selectedNeed = "date";
        }

        else if (
            keyword.includes("view đẹp") ||
            keyword.includes("view") ||
            keyword.includes("sống ảo")
        ) {
            selectedNeed = "view";
        }

        else if (
            keyword.includes("24h") ||
            keyword.includes("mở khuya") ||
            keyword.includes("khuya")
        ) {
            selectedNeed = "late";
        }


        // ----- KHU VỰC -----

        if (keyword.includes("cầu giấy")) {
            selectedLocation = "cau-giay";
        }

        else if (
            keyword.includes("hồ tây") ||
            keyword.includes("tây hồ")
        ) {
            selectedLocation = "tay-ho";
        }

        else if (keyword.includes("hoàn kiếm")) {
            selectedLocation = "hoan-kiem";
        }

        else if (keyword.includes("ba đình")) {
            selectedLocation = "ba-dinh";
        }


        // ----- GIÁ -----

        if (
            keyword.includes("dưới 50k") ||
            keyword.includes("dưới 50 k") ||
            keyword.includes("dưới 50")
        ) {
            selectedPrice = "under-50";
        }

        else if (
            keyword.includes("50k-100k") ||
            keyword.includes("50k đến 100k") ||
            keyword.includes("50k 100k")
        ) {
            selectedPrice = "50-100";
        }

        else if (
            keyword.includes("trên 100k") ||
            keyword.includes("trên 100")
        ) {
            selectedPrice = "over-100";
        }
    }


    // =========================
    // LỌC QUÁN
    // =========================

    let count = 0;

    cafeCards.forEach(function(card) {

        const name =
            card.getAttribute("data-name")?.toLowerCase() || "";

        const location =
            card.getAttribute("data-location") || "";

        const needs =
            card.getAttribute("data-needs") || "";

        const price =
            card.getAttribute("data-price") || "";


        // Nếu có câu tìm kiếm nhưng không nhận diện
        // được điều kiện nào thì tìm theo tên quán
        const hasNaturalFilter =
            selectedNeed !== needFilter.value ||
            selectedLocation !== locationFilter.value ||
            selectedPrice !== priceFilter.value;


        const matchKeyword =
            keyword === "" ||
            hasNaturalFilter ||
            name.includes(keyword);


        const matchNeed =
            selectedNeed === "all" ||
            needs.includes(selectedNeed);


        const matchLocation =
            selectedLocation === "all" ||
            location === selectedLocation;


        const matchPrice =
            selectedPrice === "all" ||
            price === selectedPrice;


        if (
            matchKeyword &&
            matchNeed &&
            matchLocation &&
            matchPrice
        ) {

            card.style.display = "block";
            count++;

        } else {

            card.style.display = "none";

        }

    });


    resultCount.textContent = count;
    // =========================
// HIỂN THỊ YÊU CẦU GEO
// =========================

const understanding = document.getElementById("search-understanding");
const intentNeed = document.getElementById("intent-need");
const intentLocation = document.getElementById("intent-location");
const intentPrice = document.getElementById("intent-price");
const intentDescription = document.getElementById("intent-description");

if (
    keyword !== "" &&
    (
        selectedNeed !== "all" ||
        selectedLocation !== "all" ||
        selectedPrice !== "all"
    )
) {

    understanding.style.display = "block";

    const needText = {
        study: "📚 Học bài",
        work: "💻 Làm việc",
        date: "❤️ Hẹn hò",
        view: "📸 View đẹp",
        late: "🌙 Mở khuya"
    };

    const locationText = {
        "cau-giay": "📍 Cầu Giấy",
        "tay-ho": "📍 Tây Hồ",
        "hoan-kiem": "📍 Hoàn Kiếm",
        "ba-dinh": "📍 Ba Đình"
    };

    const priceText = {
        "under-50": "💰 Dưới 50K",
        "50-100": "💰 50K–100K",
        "over-100": "💰 Trên 100K"
    };

    intentNeed.textContent =
        needText[selectedNeed] || "";

    intentLocation.textContent =
        locationText[selectedLocation] || "";

    intentPrice.textContent =
        priceText[selectedPrice] || "";

    intentDescription.textContent =
        `Website đã phân tích yêu cầu và tìm thấy ${count} quán phù hợp.`;

} else {

    understanding.style.display = "none";

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