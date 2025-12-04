function DashboardSection({
    children,
}) {
  return (
        <div className="bg-gray-100 flex flex-col max-h-screen h-screen py-12 px-4 overflow-hidden">
          <div className="lg:max-w-[1400px] w-full mx-auto flex flex-col h-full">
            {children}
          </div>
        </div>
  );
}

export default DashboardSection;