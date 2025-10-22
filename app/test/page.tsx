// /app/page.tsx (hoặc file client component của bạn)
'use client';
import Swiper from 'swiper';
import 'swiper/css';

import { useState, FormEvent } from 'react';

export default function Uploader() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setMessage('Vui lòng chọn một file');
      return;
    }

    setStatus('loading');
    setMessage('Đang tải lên...');
    setUploadProgress(0); // Reset tiến trình

    const formData = new FormData();
    formData.append('file-product', file);

    // Dùng XMLHttpRequest thay vì fetch
    const xhr = new XMLHttpRequest();

    // 1. Theo dõi tiến trình upload
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        setUploadProgress(percentComplete);
      }
    };

    // 2. Xử lý khi upload thành công
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        if (data.success) {
          setStatus('success');
          setMessage(`Tải lên thành công! File ID: ${data.fileId}`);
        } else {
          setStatus('error');
          setMessage(`Tải lên thất bại: ${data.message}`);
        }
      } else {
        // Xử lý lỗi từ server (ví dụ: 500)
        setStatus('error');
        setMessage(`Lỗi server: ${xhr.statusText}`);
      }
    };

    // 3. Xử lý khi có lỗi mạng
    xhr.onerror = () => {
      setStatus('error');
      setMessage('Lỗi mạng, không thể tải file lên.');
    };

    // 4. Mở và gửi request
    xhr.open('POST', '/api/products/test'); // Đổi thành URL API của bạn
    xhr.send(formData);
  };

  return (
    <div>
      <h2>Upload File lên Google Drive</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" name='file-product' onChange={handleFileChange} />
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Đang tải...' : 'Upload'}
        </button>
      </form>

      {/* Hiển thị thanh tiến trình */}
      {status === 'loading' && (
        <div>
          <progress value={uploadProgress} max="100"></progress>
          <span style={{ marginLeft: '10px' }}>
            {uploadProgress.toFixed(0)}%
          </span>
        </div>
      )}

      {/* Hiển thị thông báo kết quả */}
      {message && (
        <p style={{ color: status === 'error' ? 'red' : 'green' }}>{message}</p>
      )}
    </div>
  );
}