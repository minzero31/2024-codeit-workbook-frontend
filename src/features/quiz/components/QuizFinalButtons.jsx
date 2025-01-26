import PropTypes from 'prop-types';

const QuizFinalButtons = ({ onSave, onDiscard }) => {
  return (
    <div className="flex justify-between p-4">
      <button
        onClick={onDiscard}
        className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        폐기
      </button>
      <button
        onClick={onSave}
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        저장
      </button>
    </div>
  );
};

QuizFinalButtons.propTypes = {
  onSave: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired
};

export default QuizFinalButtons;