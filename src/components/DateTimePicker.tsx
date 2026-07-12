import React from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import { Vietnamese } from "flatpickr/dist/l10n/vn";

interface Props {
  value: string;
  onChange: (isoValue: string) => void;
  placeholder?: string;
  id?: string;
}

export function DateTimePicker({ value, onChange, placeholder, id }: Props) {
  return (
    <Flatpickr
      id={id}
      className="text-input"
      value={value ? new Date(value) : ""}
      options={{
        enableTime: true,
        dateFormat: "d/m/Y H:i",
        time_24hr: true,
        locale: Vietnamese,
        allowInput: true,
      }}
      placeholder={placeholder || "Chọn ngày giờ..."}
      onChange={([date]) => {
        // Nếu date không hợp lệ (ví dụ người dùng xóa trắng input), trả về chuỗi rỗng
        onChange(date && !isNaN(date.getTime()) ? date.toISOString() : "");
      }}
    />
  );
}
