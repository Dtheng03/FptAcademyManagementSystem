export function randomColor() {
    const r = Math.floor(Math.random() * 256); // Giá trị ngẫu nhiên từ 0 đến 255 cho thành phần màu đỏ
    const g = Math.floor(Math.random() * 256); // Giá trị ngẫu nhiên từ 0 đến 255 cho thành phần màu xanh lá cây
    const b = Math.floor(Math.random() * 256); // Giá trị ngẫu nhiên từ 0 đến 255 cho thành phần màu xanh dương
    return `rgb(${r}, ${g}, ${b})`; // Trả về chuỗi màu RGB
}
