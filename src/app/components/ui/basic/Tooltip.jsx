function Tooltip({ 
    children, 
    message, 
    position = 'top' 
}) {
  const isDisabled = children?.props?.disabled;

  return (
    <div className="relative inline-block group">
      {children}
      {isDisabled && (
        <span
          className={`absolute z-10 whitespace-nowrap bg-gray-50 border-dashed transition-all ease-in transform text-black text-sm rounded-full border p-3 
                      ${position === 'top' ? 'bottom-full left-1/2 -translate-x-1/2 mb-2' : ''}
                      ${position === 'bottom' ? 'top-full left-1/2 -translate-x-1/2 mt-2' : ''}
                      ${position === 'left' ? 'right-full mr-2 top-1/2 -translate-y-1/2' : ''}
                      ${position === 'right' ? 'left-full ml-2 top-1/2 -translate-y-1/2' : ''}
                      hidden group-hover:block`}
        >
          {message}
        </span>
      )}
    </div>
  );
}

export default Tooltip;
