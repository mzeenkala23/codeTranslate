export const Button = ({ children, onClick, ...props }) => {
  return (
    <button
      className="absolute left-2/4 -bottom-1 -translate-x-1/2 bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
      {...props}
    >
      Translate
    </button>
  );
};
