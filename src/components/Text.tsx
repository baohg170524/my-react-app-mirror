interface TextProps {
  content: string
  size?: number      // kích thước chữ (px), do props quyết định — mặc định 16
  style?: string     // class Tailwind bổ sung (màu, độ đậm, margin...)
}

function Text({ content, size = 16, style }: TextProps) {
  return (
    <div
      className={style}
      style={{
        fontFamily: "var(--font-space-grotesk), sans-serif",
        fontSize: size,
      }}
    >
      {content}
    </div>
  )
}

export default Text
