# Kế hoạch Tích hợp FE - Tính năng Phúc khảo (Appeal)

Tài liệu này mô tả chi tiết các bước Frontend (FE) cần thực hiện để kết nối với các API Phúc khảo đã được Backend hoàn thiện.

---

## 1. Phân quyền Hiển thị Tab Phúc Khảo (Role-Based Visibility)

Hoàn toàn đồng ý với định hướng UI/UX hiện tại: **Judge và Mentor không có quyền quyết định kết quả nên không cần thấy tab Phúc Khảo, tránh gây rối giao diện.**

FE cần xử lý logic phân quyền hiển thị (Render logic) cho tab "Phúc Khảo" trong trang Chi tiết Sự kiện như sau:

| Vai trò (Role) | Tab Phúc Khảo | Hành động FE cần làm |
| :--- | :--- | :--- |
| **Admin / EC** | **Hiển thị** | Thay thế Mock Data hiện tại bằng API gọi Data thật. Cung cấp UI để duyệt/từ chối đơn. |
| **Team Leader / Member**| **Hiển thị** | Thêm mới tab này cho sinh viên. Tab này chỉ hiển thị danh sách đơn phúc khảo **của nhóm mình**. Cung cấp UI cho Leader tạo đơn mới. |
| **Judge / Mentor** | **Ẩn** | Chặn render hoàn toàn (Hide element). |

---

## 2. API Cần Tích hợp cho Admin & EC (Ban tổ chức)

Hiện tại FE đang dùng data mock. Cần thay thế bằng các API sau:

### Lấy danh sách Phúc khảo của 1 Vòng thi
*   **Endpoint:** `GET /api/Appeals/round/{roundId}`
*   **Params:** `pageIndex`, `pageSize` (Có hỗ trợ phân trang).
*   **Mô tả:** Lấy toàn bộ đơn phúc khảo của các nhóm nộp trong vòng thi đó.

### Phản hồi đơn Phúc khảo (Duyệt / Từ chối)
*   **Endpoint:** `PUT /api/Appeals/{id}/respond`
*   *Lưu ý: `{id}` là ID của đơn phúc khảo.*
*   **Payload:**
    ```json
    {
      "status": 1, // 1 = Approved (Chấp nhận), 2 = Rejected (Từ chối)
      "response": "Nội dung giải thích/phản hồi cho sinh viên..."
    }
    ```
*   **Luồng xử lý:** Mở 1 Modal cho Admin nhập `response` và chọn nút "Chấp nhận" hoặc "Từ chối" -> Gọi API -> Đóng Modal -> Reload lại bảng danh sách.

---

## 3. API Cần Tích hợp cho Sinh viên (Team Leader & Member)

Bổ sung tab Phúc Khảo trong không gian quản lý của Nhóm.

### Lấy danh sách lịch sử Phúc khảo của Nhóm
*   **Endpoint:** `GET /api/Appeals/team/{teamId}`
*   **Params:** `pageIndex`, `pageSize`.
*   **Mô tả:** Hiển thị danh sách các đơn nhóm đã nộp để member/leader có thể theo dõi tiến độ (Pending, Approved, Rejected).

### Tạo Đơn Phúc khảo Mới (Chỉ Leader)
*   **Endpoint:** `POST /api/Appeals`
*   **Payload:**
    ```json
    {
      "submitResultId": "string", // ID của bài nộp/kết quả điểm mà nhóm muốn phúc khảo
      "reason": "Lý do phúc khảo chi tiết..."
    }
    ```
*   **Validation quan trọng từ FE:** 
    *   FE **KHÔNG CẦN** phải viết logic để ẩn/hiện nút "Gửi phúc khảo". Hãy cứ hiển thị nút này cho Team Leader (miễn là bài nộp đã có điểm).
    *   Backend đã xử lý toàn bộ logic chặn (thời gian diễn ra sự kiện, đã công bố kết quả hay chưa). Nếu sinh viên bấm nộp đơn sai thời điểm, Backend sẽ trả về HTTP 400 kèm câu thông báo lỗi (ví dụ: "Chưa đến thời gian phúc khảo", "Kết quả vòng thi đã được công bố..."). FE chỉ cần bắt lỗi và hiển thị câu Toast/Alert cho người dùng là xong.

---

## 4. Bỏ qua Cấu hình Thời gian Phúc khảo riêng

Nhằm giúp thao tác tạo Sự kiện nhanh gọn nhất, Backend đã đồng bộ **thời gian cho phép phúc khảo = thời gian diễn ra Vòng thi (`StartDate` đến `EndDate`)**. 

FE **KHÔNG CẦN** đẻ thêm các field `appealStartDate` hay `appealEndDate` vào Form cấu hình Event / Round. Mọi logic chặn về thời gian (từ `StartDate` đến `EndDate`) sẽ do Backend xử lý 100%.

---

> **Note cho FE:** Backend đã thả lỏng (không chặn cứng) khi Admin bấm "Tính/Công bố kết quả". Nên FE cần bắt sự kiện: Nếu Admin bấm công bố mà vẫn chưa qua `EndDate`, FE nên hiển thị một Pop-up Alert hỏi xác nhận: *"Vòng thi vẫn đang diễn ra, bạn có chắc chắn muốn chốt kết quả và công bố luôn không?"*
