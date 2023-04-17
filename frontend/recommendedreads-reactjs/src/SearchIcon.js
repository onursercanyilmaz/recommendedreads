export const SearchIcon = ({
    fill = "currentColor",
    size = 24,
    className,
    ...props
  }) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        className={className}
        {...props}
      >
        <path
          fill={fill}
          d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0z"
        />
        <path fill="none" d="M0 0h24v24H0z" />
      </svg>
    );
  };
  