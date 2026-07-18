# Yêu cầu Refactor Giao diện Event (Dành cho Frontend Developer)

Hiện tại, form **Tạo sự kiện** và màn hình **Lịch trình sự kiện (Timeline)** đang gặp lỗi hiển thị sai lệch data hoàn toàn so với Backend. Tài liệu này mô tả chi tiết nguyên nhân và các bước cần thực hiện để đồng bộ logic giữa FE và BE.

## 1. Phân tích Vấn đề (Bug)

- **Màn hình Create Event:** Đang có quá nhiều field thời gian "ảo" (Bắt đầu thi, Phúc khảo, Công bố kết quả...) không hề có trong Entity của Backend. Điều này làm form bị dài, khó nhìn và tạo ra rác trong component state.
- **Màn hình Lịch trình (Timeline):** FE đang tự lấy tổng thời gian của Hạng mục (Track) rồi "băm" ra thành các mốc thời gian lẻ tẻ với các con số vô lý (ví dụ: `18:59`, `11:47`, `02:11`). Data hiển thị trên Timeline hiện tại **không hề khớp** với khoảng thời gian đã được lưu từ Backend.

## 2. Logic Chuẩn từ Backend

Backend được thiết kế rất tối giản và chặt chẽ. Ở cấp độ **Hạng mục (Track)**, BE chỉ quản lý đúng **2 khoảng thời gian (Phase)**:

1. **Thời gian Nộp bài:** 
   - Mapping BE: `startDate` -> `endDate`
2. **Thời gian Chấm điểm:** 
   - Mapping BE: `scoringStartDate` -> `scoringEndDate`

> [!IMPORTANT]
> Tất cả các mốc thời gian khác (Phúc khảo, Bắt đầu thi, Công bố kết quả...) đều không tồn tại trong DB. FE cần tuân thủ triệt để cấu trúc này.

---

## 3. Action Items (Cần xử lý)

### A. Sửa Form `CreateEventForm.tsx`

1. **Dọn dẹp Interface & State:**
   Xóa bỏ hoàn toàn các thuộc tính sau khỏi `TrackForm` (và các chỗ khởi tạo state tương ứng):
   - `windowStartDate`, `windowEndDate`
   - `competeStartDate`, `competeEndDate`
   - `appealStartDate`, `appealEndDate`
   - `resultPublishDate`
   - `announceStartDate`, `announceEndDate` (ở cấp Event)

2. **Dọn dẹp Giao diện (UI):**
   - Xóa bỏ các dòng DatePicker của các trường ảo nói trên.
   - Mỗi Hạng mục (Track) chỉ render đúng 2 dòng DatePicker: **Nộp bài** và **Chấm điểm**.
   - *Khuyến nghị UI:* Đưa Label (nhãn) của DatePicker lên trên hoặc canh lề trái sát với ô input, tránh để Label tuốt bên phải gây khó đọc. Đóng gói 1 Track vào 1 thẻ (Card) có border nhạt để phân biệt thay vì dùng timeline kẻ dọc lồng nhau.

### B. Sửa Màn hình Timeline Lịch trình

1. **Dừng việc fake / tính toán data hiển thị:**
   - Xóa bỏ code "băm" thời gian tự động.
2. **Map trực tiếp từ API Response:**
   Bên trong chi tiết của một Hạng mục (Track), chỉ render 2 node timeline:
   - Node **Nộp bài**: Hiển thị chính xác chuỗi `track.startDate` -> `track.endDate`.
   - Node **Chấm điểm**: Hiển thị chính xác chuỗi `track.scoringStartDate` -> `track.scoringEndDate`.
   - Không render các node rác (Phúc khảo, Bắt đầu thi...).

## 4. Kết quả mong đợi (Acceptance Criteria)

- Khi User tạo Event, Payload JSON gửi đi hoàn toàn sạch sẽ, chỉ chứa các key thực sự tồn tại trong API backend.
- Sau khi tạo xong, xem ở màn hình Lịch trình, thời gian "Nộp bài" và "Chấm điểm" phải khớp 100% từng phút từng giây với lúc nhập (đã trừ hao múi giờ UTC+7). Không còn xuất hiện các mốc giờ lẻ tẻ lạ lùng.
