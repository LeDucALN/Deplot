import productApi from "../api/productAPI";
import { renderProductList } from "../utils/productRender";
import { renderPagination } from "../utils/renderPagination";

const itemsPerPage = 9; // Số mục trên mỗi trang

// Hàm để lấy và hiển thị dữ liệu từ trang cụ thể
async function getDataForPage(page, priceRange) {
    try {
        const startIndex = (page - 1) * itemsPerPage; // Tính toán vị trí bắt đầu

        const { arrayProduct, pagination } = await productApi.getAll(
            priceRange,
            page,
            itemsPerPage
        );
        renderProductList("product__List", arrayProduct);
        renderPagination("pagination", page, pagination.totalPages, onPageClick);
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu sản phẩm: ", error);
    }
}

// Hàm xử lý sự kiện khi người dùng nhấp vào một trang cụ thể
function onPageClick(page) {
    const selectPriceRange = document.querySelector('input[name="price-filter"]:checked').value;
    getDataForPage(page, selectPriceRange);
}

const priceFilterOptions = document.querySelectorAll('input[name="price-filter"]');
priceFilterOptions.forEach(option => {
    option.addEventListener('change',(e) => {
        e.preventDefault();
        const selectPriceRange = document.querySelector('input[name="price-filter"]:checked').value;
        getDataForPage(1, selectPriceRange);

    });
});
// Khởi đầu: Lấy dữ liệu cho trang đầu tiên
getDataForPage(1,1);
