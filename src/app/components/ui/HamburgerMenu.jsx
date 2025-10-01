function HamburgerMenu({
    isOpen,
    onClick
}) {
    const barClass = "h-0.5 w-10 transition-all duration-300 ease-in-out" + (isOpen ? " bg-black" : " bg-primary");

    return (
        <div className="space-y-1.5" onClick={onClick}>
            <div className={barClass + (isOpen ? " rotate-45 translate-y-2" : "")}></div>
            <div className={barClass + (isOpen ? " -rotate-45 -translate-y-2" : "")}></div>
        </div>
    );
}

export default HamburgerMenu;