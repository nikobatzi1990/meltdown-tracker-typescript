interface ButtonProps {
  onClick: React.MouseEventHandler,
  text: string,
  title: string,
  type: "button" | "submit" | "reset"

}

export default function Button({
  onClick,
  text,
  title,
  type
}: ButtonProps) {

  return (
    <button
      title = { title }
      type = { type }
      onClick = { onClick } > { text }
    </button>
  )
};
