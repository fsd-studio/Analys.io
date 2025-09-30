function Message({
    message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    primary = true,
}) {
  return (
    <>
        <div className={`p-3 ${primary ? "bg-green-100 text-green-800 border-green-200 ms-auto" : "me-auto bg-sky-100 text-sky-800 border-sky-200"} h-fit border rounded-2xl w-[80%]`}>
            { message }
        </div>
    </>
  );
}

export default Message;