/**
 * SePay webhook payload type
 * Based on SePay transaction notification structure
 */
export type SePayWebhookPayload = {
  /** ID giao dịch trên SePay */
  id: number;
  
  /** Brand name của ngân hàng */
  gateway: string;
  
  /** Thời gian xảy ra giao dịch phía ngân hàng */
  transactionDate: string;
  
  /** Số tài khoản ngân hàng */
  accountNumber: string;
  
  /** Mã code thanh toán (sepay tự nhận diện dựa vào cấu hình tại Công ty -> Cấu hình chung) */
  code: string | null;
  
  /** Nội dung chuyển khoản */
  content: string;
  
  /** Loại giao dịch. in là tiền vào, out là tiền ra */
  transferType: "in";
  
  /** Số tiền giao dịch */
  transferAmount: number;
  
  /** Số dư tài khoản (lũy kế) */
  accumulated: number;
  
  /** Tài khoản ngân hàng phụ (tài khoản định danh) */
  subAccount: string | null;
  
  /** Mã tham chiếu của tin nhắn sms */
  referenceCode: string;
  
  /** Toàn bộ nội dung tin nhắn sms */
  description: string;
};

