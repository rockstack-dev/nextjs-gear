export default function SvgOrImg({ className, icon, title }: { className?: string; icon: string; title?: string }) {
  return (
    <>
      {icon.startsWith("<svg") ? (
        <div dangerouslySetInnerHTML={{ __html: icon.replace("<svg", `<svg class='${className}'`) ?? "" }} />
      ) : icon.includes("http") ? (
        <img className={className} src={icon} alt={title} />
      ) : (
        <></>
      )}
    </>
  );
}
