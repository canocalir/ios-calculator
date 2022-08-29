import "./CircleButton.css";

const CircleButton = ({ value, onClick }) => {
  return (
    <>
      <button onClick={onClick} className="circle-button">
        {value}
      </button>
    </>
  );
};

export default CircleButton;
