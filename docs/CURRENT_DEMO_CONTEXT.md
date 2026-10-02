# LifeOS demo — mốc yêu cầu và tiến độ

Cập nhật: 2026-10-03. Đây là mốc làm việc cho các lượt tiếp theo. Sau mỗi thay đổi, cập nhật trạng thái bằng bằng chứng cụ thể; không suy ra “đã xong” chỉ từ việc có mã hoặc build thành công.

## 1. Mục tiêu đã chốt

Làm **demo tương tác** đủ rõ để trình bày LifeOS, thay vì triển khai hệ thống đầy đủ. Giao diện **tiếng Anh**, ưu tiên **desktop**, dùng **React** và giữ hướng giao diện sáng, gọn, dễ biết bước tiếp theo. Dùng mock data ở mức đủ demo khi cần, nhưng roadmap do chatbot tạo phải thực sự dùng Gemini qua API key phía server.

Luồng cốt lõi: `Chat với Arcana → Gemini sinh roadmap và đề quest cụ thể → xem trước/chấp nhận → mở và làm quest → chấm, cập nhật BKT → AI phân tích và tư vấn cách điều chỉnh → người dùng trao đổi/chấp nhận hoặc từ chối → áp dụng roadmap phù hợp → lặp lại.`

## 2. Hợp đồng chức năng — tiêu chí nghiệm thu

| ID | Yêu cầu | Tiêu chí kiểm tra được | Trạng thái hiện tại |
| --- | --- | --- | --- |
| R1 | UI tiếng Anh, desktop, dễ hiểu; React | Today, Learning Path, Skills có nhiệm vụ rõ; modal và nội dung thu gọn giảm rối; không dành công cho mobile riêng. | **Một phần** — React/ba trang đã render; chưa nghiệm thu UX tổng thể. |
| R2 | Chỉ giữ các lĩnh vực học thuật, đủ đa dạng để show | 17 nhánh: Python, DSA, Java, Object-Oriented Design, RAG Engineering, JavaScript, AI Fundamentals, Electronics, ESP32, Sensors & Circuits, Internet of Things, Xiaozhi Assistant, Psychology, Critical Thinking, Communication, English, IELTS Academic. Không hiện cầu lông/fitness. | **Có trong mã và UI** — 17 nhánh đã hiện ở Learning Path. |
| R3 | Cây Learning Path/roadmap nhiều nhánh, có đường nối và tương tác | Chọn lĩnh vực thấy nhánh con; chọn roadmap thấy chương/quest; bấm node mở nội dung. Mỗi lần sinh có thể tạo cây khác hoặc cập nhật cây cũ. Lựa chọn hiện tại: **cây mới, giữ cây cũ**. | **Một phần** — graph và chọn cây có trong mã; chưa kiểm tra trọn vẹn với roadmap Gemini thật. |
| R4 | Learning Path khác Skills/Knowledge Path | Learning Path lưu **kế hoạch cần học/làm** và đề quest. Skills chỉ có **khái niệm đã ghi nhận**, mức độ và bằng chứng; bấm node Skills vẫn ở Skills. | **Có trong mã, đã kiểm tra UI cơ bản**; dữ liệu thực sau nhiều quest cần kiểm tra thêm. |
| R5 | Một quest là một gói học, không phải bốn quest rời | Mỗi quest có `Learn` (giải thích + ví dụ), `Practice` (tình huống + bước làm), rồi **một trong hai** `Assessment` hoặc `Project`. | **Có trong schema và component**. |
| R6 | Quest phải là bài thật, sinh **cùng roadmap** | Bấm quest hiện ngay câu hỏi/lựa chọn/dữ liệu; hoặc đề project/vật liệu bắt đầu/yêu cầu/tiêu chí. Preview cho xem đề trước khi chấp nhận. Nhãn chung chung không đạt. | **Có trong luồng mã Gemini**; chưa kiểm chứng end-to-end với Gemini/account thật. |
| R7 | Chatbot dùng Gemini tạo roadmap | Arcana hỏi mục tiêu, thời gian, trình độ; API server gọi Gemini, tạo proposal có quest; người dùng xem trước và chấp nhận/bỏ. Key ở server. | **Có trong mã**; local chưa chạy API/Gemini để kiểm chứng live. |
| R8 | Kết quả quest điều khiển vòng lặp BKT | Chấm thành bằng chứng theo concept; BKT cập nhật. Roadmap sau dùng BKT **và** trạng thái quest roadmap cũ để ưu tiên lỗ hổng, đổi đề, giữ cây cũ. Tránh lặp nguyên văn đề cũ. | **Có trong mã**: quiz chấm từ đáp án lưu sẵn; Project cần Gemini; server tái dựng BKT từ các lần chấm. Chưa kiểm chứng live cả vòng. |
| R9 | Demo không có Gemini vẫn có thứ để show | Có dữ liệu mẫu đủ mở quest cụ thể và xem các nhánh; phân biệt mẫu với Gemini; không nhận vơ mock là AI đã chấm. | **Chưa đạt ở UI hiện tại** — `DEMO_QUESTS` đã có nhưng Learning Path không liệt kê/nối lối mở khi chưa có roadmap server. |
| R10 | Lưu cây lớn mà không trộn hai loại dữ liệu | Roadmap: `journey → chapter → quest`, đề trong `quest.metadata.learningPackage`. Skills: `domain → concept → conceptProgress` và bằng chứng. Vị trí/đường nối graph tính ở UI. | **Có trong mô hình dữ liệu**; chưa đánh giá tải lớn. |
| R11 | AI phân tích BKT và **tư vấn trước khi đổi lộ trình** | Sau khi có kết quả quest, Arcana giải thích bằng ngôn ngữ dễ hiểu điểm mạnh/yếu từ BKT, đề xuất các thay đổi cụ thể và lý do; người dùng được trao đổi mục tiêu/nhịp học hoặc phản hồi đề xuất. Chỉ áp dụng roadmap sau khi người dùng chấp nhận; từ chối thì lộ trình hiện tại giữ nguyên. | **Một phần** — mã đã đưa BKT và roadmap cũ vào lời gọi Gemini, có preview/chấp nhận/bỏ; chưa có bước tư vấn hai chiều và giải thích thay đổi dựa trên BKT cho người dùng. Chưa kiểm chứng live. |

**Quy tắc trạng thái:** “Có trong mã” chỉ xác nhận đường mã hiện diện; “đã kiểm tra UI” là thao tác trên bản chạy; “đã kiểm chứng live” cần cả API, database và Gemini. Không dùng các nhãn này thay nhau.

## 3. Các quyết định đã đổi hướng

- Hệ thống đầy đủ → **demo tương tác** để kịp trình bày.
- Frontend JavaScript cũ → **React**.
- Các lĩnh vực rất rộng gồm thể thao → **17 lĩnh vực học thuật**; IoT/ESP32/cảm biến/Xiaozhi, tâm lý và IELTS vẫn trong demo.
- Bốn nhãn dễ hiểu nhầm thành bốn quest → **Learn + Practice + một Assessment hoặc Project trong mỗi quest**.
- Quest chỉ có khung UI → **đề cụ thể được sinh cùng roadmap**, có thể làm và chấm.
- Skills mở Learning Path → **hai cây tách vai trò** như R4.
- Roadmap tĩnh → **vòng lặp Gemini + quest + BKT + roadmap sau**. Bản hiện tại tạo cây mới và giữ cây cũ; đây là một trong hai cách người dùng đã chấp nhận.
- Vòng lặp tự điều chỉnh → **AI phải phân tích và tư vấn với người dùng trước khi thay đổi** (R11). BKT là tín hiệu để đề xuất, không phải quyền tự động áp dụng kế hoạch mới.

## 4. Bằng chứng và giới hạn hiện tại

- UI React: `src/react/main.jsx`, `src/react/GeneratedQuest.jsx`, `src/react/BranchPathGraph.jsx`, `src/react/KnowledgeGraph.jsx`.
- Dữ liệu mẫu: `src/academic-quest-data.js`. File này **không chứng minh** quest mẫu đã truy cập được ở UI.
- Sinh roadmap và đề: `server/ai/roadmap.ts`; preview/nhận roadmap: `server/journeys/service.ts`; lưu/đọc đề: `server/state/service.ts`.
- Chấm và ghi bằng chứng: `server/assessments/routes.ts`; đọc roadmap cũ, tái dựng BKT: `server/journeys/adaptation.ts`; API tạo roadmap: `server/journeys/routes.ts`.
- Lần kiểm tra gần nhất: `pnpm typecheck` và `pnpm build` đạt; Learning Path render không có lỗi trình duyệt. **Chưa** chạy trọn vòng Gemini trên local: API cổng 4174 dừng, `.env.local` không có database/Gemini cho local, profile trình duyệt không có roadmap đã sinh.
- Gemini generation và Project review cần server, key, database và ngân sách AI. Quiz đã lưu có thể mở/chấm mà không gọi Gemini mới chỉ để hiện câu hỏi. Tạo roadmap sau cần một lần gọi AI theo thao tác người dùng; hiện chưa tự tạo sau mọi đáp án.
- `Adapt this roadmap` hiện tạo ngay một proposal mới để xem trước. Việc chấp nhận là thủ công, nhưng phần AI giải thích kết quả BKT, hỏi ý kiến và chỉnh đề xuất theo phản hồi **chưa có**; không được tính R11 là hoàn tất.

## 5. Việc tiếp theo, theo ưu tiên

1. **P0 — R9:** đưa quest mẫu có đề cụ thể vào Learning Path để demo tương tác được khi local API/Gemini vắng mặt; phân biệt rõ mẫu với Gemini.
2. **P0 — R11:** thêm bước AI diễn giải BKT, nêu thay đổi dự kiến, hỏi và nhận phản hồi của người dùng trước khi lập/chấp nhận roadmap mới; từ chối không đổi lộ trình.
3. **P0 — R6–R8/R11:** ở môi trường đã cấu hình, tạo roadmap, xem đề trong preview, chấp nhận, mở/làm quest, kiểm tra BKT, tư vấn với Arcana và tạo cây sau từ cây cũ. Ghi kết quả hoặc lỗi thật vào file này.
4. **P1 — R3/R4:** bấm từng loại node của hai cây, xác nhận nội dung đúng và không nhảy sai trang; kiểm tra cây lớn trên desktop.
5. **P1 — R1:** giảm phần trùng lặp, đảm bảo hành động tiếp theo rõ, modal/thu gọn dễ dùng và có thao tác bàn phím hợp lý.

## 6. Quy tắc chống lệch ngữ cảnh

- Khi nhận yêu cầu mới, đối chiếu R1–R11; ghi rõ bổ sung, thay thế hay sửa lỗi của mốc nào.
- Sau mỗi thay đổi, cập nhật **trạng thái + bằng chứng + giới hạn**. Không đánh dấu hoàn tất chỉ vì typecheck/build đạt.
- Không xóa hay ghi đè thay đổi hiện có. Không commit, push hoặc deploy nếu người dùng chưa yêu cầu cho lượt đó.
- Ràng buộc từ kế hoạch React đã duyệt: không thêm/chạy automated tests nếu người dùng chưa đổi yêu cầu; dùng build và browser review cho demo.
- Kế hoạch cũ là lịch sử. Nếu mâu thuẫn, ưu tiên yêu cầu mới nhất của người dùng và mốc này; chỉ hỏi lại khi thực sự thiếu quyết định để tiếp tục.
