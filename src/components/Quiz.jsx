import React, { useEffect, useState } from "react";
import Results from "./Results";

const quizData = [
  {
    question: "Ai là người đọc bản Tuyên ngôn Độc lập khai sinh nước Việt Nam Dân chủ Cộng hòa?",
    options: [
      "Trường Chinh",
      "Võ Nguyên Giáp",
      "Hồ Chí Minh",
      "Phạm Văn Đồng",
    ],
    answer: "Hồ Chí Minh",
  },
  {
    question: "Ngày Quốc khánh của Việt Nam là ngày nào?",
    options: [
      "30/4/1975",
      "2/9/1945",
      "19/8/1945",
      "7/5/1954",
    ],
    answer: "2/9/1945",
  },
  {
    question: "Chiến thắng Điện Biên Phủ diễn ra vào năm nào?",
    options: ["1950", "1952", "1954", "1968"],
    answer: "1954",
  },
  {
    question: "Ai là Tổng Bí thư đầu tiên của Đảng Cộng sản Việt Nam?",
    options: [
      "Hồ Chí Minh",
      "Trần Phú",
      "Lê Duẩn",
      "Trường Chinh",
    ],
    answer: "Trần Phú",
  },
  {
    question: "Cách mạng Tháng Tám ở Việt Nam diễn ra vào năm nào?",
    options: ["1930", "1941", "1945", "1954"],
    answer: "1945",
  },
  {
    question: "Chiến dịch Hồ Chí Minh toàn thắng vào ngày nào?",
    options: [
      "2/9/1945",
      "30/4/1975",
      "7/5/1954",
      "19/12/1946",
    ],
    answer: "30/4/1975",
  },
  {
    question: "Quân đội Nhân dân Việt Nam được thành lập vào năm nào?",
    options: ["1930", "1944", "1945", "1950"],
    answer: "1944",
  },
  {
    question: "Hiệp định Genève về Đông Dương được ký kết vào năm nào?",
    options: ["1950", "1952", "1954", "1956"],
    answer: "1954",
  },
  {
    question: "Thủ đô Hà Nội từng có tên gọi là gì trong lịch sử?",
    options: ["Hoa Lư", "Phú Xuân", "Thăng Long", "Cổ Loa"],
    answer: "Thăng Long",
  },
  {
    question: "Ai là người lãnh đạo cuộc khởi nghĩa Lam Sơn?",
    options: [
      "Nguyễn Trãi",
      "Lê Lợi",
      "Trần Hưng Đạo",
      "Quang Trung",
    ],
    answer: "Lê Lợi",
  },
  {
    question: "Nhà Trần nổi tiếng với chiến công nào sau đây?",
    options: [
      "Đánh bại quân Tống",
      "Đánh bại quân Nguyên - Mông",
      "Đánh bại quân Thanh",
      "Đánh bại quân Pháp",
    ],
    answer: "Đánh bại quân Nguyên - Mông",
  },
  {
    question: "Vua Quang Trung đại phá quân Thanh vào năm nào?",
    options: ["1771", "1785", "1789", "1802"],
    answer: "1789",
  },
];

const Quiz = () => {
  const [optionSelected, setOptionSelected] = useState("");

  const [userAnswers, setUserAnswers] = useState(
    Array.from({ length: quizData.length })
  );

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [isQuizEnded, setIsQuizEnded] = useState(false);

  const [score, setScore] = useState(0);

  const handleSelectedOption = (option, index) => {
    // tính điểm
    if (option === quizData[currentQuestion].answer) {
      setScore((prev) => prev + 1);
    }

    setOptionSelected(option);

    const newUserAnswers = [...userAnswers];
    newUserAnswers[currentQuestion] = index;
    setUserAnswers(newUserAnswers);
  };

  const goNext = () => {
    if (currentQuestion === quizData.length - 1) {
      setIsQuizEnded(true);
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setIsQuizEnded(false);
    setOptionSelected("");
    setScore(0);
    setUserAnswers(Array.from({ length: quizData.length }));
  };

  const rewatchQuiz = () => {
    setCurrentQuestion(0);
    setIsQuizEnded(false);
  };

  useEffect(() => {
    const answer = Number(userAnswers[currentQuestion]);
    const pastOptionSelected = quizData[currentQuestion].options[answer];

    if (answer !== undefined) {
      setOptionSelected(pastOptionSelected);
    } else {
      setOptionSelected("");
    }
  }, [currentQuestion, userAnswers]);

  // useEffect(() => {
  //   if (optionSelected === quizData[currentQuestion].answer) {
  //     setScore((prev) => prev + 1);
  //   }
  // }, [optionSelected]);

  if (isQuizEnded) {
    return (
      <Results
        score={score}
        totalQuestionNum={quizData.length}
        restartQuiz={restartQuiz}
        rewatchQuiz={rewatchQuiz}
      />
    );
  }

  return (
    <div>
      <h2>Câu {currentQuestion + 1}</h2>
      <p className="question">{quizData[currentQuestion].question}</p>

      {quizData[currentQuestion].options.map((option, index) => (
        <button
          key={option}
          className={`option ${optionSelected === option ? "selected" : ""}`}
          disabled={!!optionSelected && optionSelected !== option}
          onClick={() => handleSelectedOption(option, index)}
        >
          {option}
        </button>
      ))}

      {optionSelected ? (
        optionSelected === quizData[currentQuestion].answer ? (
          <p className="correct-answer">Câu trả lời của bạn chính xác</p>
        ) : (
          <p className="incorrect-answer">Câu trả lời của bạn chưa chính xác</p>
        )
      ) : (
        ""
      )}

      <div className="nav-buttons">
        <button
          onClick={goBack}
          disabled={currentQuestion === 0}
        >
          Quay Lại
        </button>
        <button
          onClick={goNext}
          disabled={!optionSelected}
        >
          {currentQuestion === quizData.length - 1 ? "Hoàn Thành Quiz" : "Kế Tiếp"}
        </button>
      </div>
    </div>
  );
};

export default Quiz;