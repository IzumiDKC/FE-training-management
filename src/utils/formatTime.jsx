// src/utils/formatTime.js

export const formatTime = (time) => {
  if (!time) return "";
  
  // Date
  if (time instanceof Date) {
    return time.toLocaleTimeString("vi-VN", { hour: '2-digit', minute: '2-digit' });
  }

  // Chuỗi "08:00:00"
  const parts = time.toString().split(":");
  if (parts.length >= 2) {
    return `${parts[0].padStart(2, "0")}:${parts[1].padStart(2, "0")}`;
  }

  return time;
};

export const formatDate = (date) => {
  if (!date) return "";
  
  const d = new Date(date);
  return d.toLocaleDateString("vi-VN"); 
};

export const formatDateTime = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return `${formatDate(d)} ${formatTime(d)}`;
};
