import React, { useState } from 'react';
import { INTERESTS } from '../data/interests';
import QuestionCard from './QuestionCard';

const QuestionFlow = ({ selectedIds, onComplete }) => {
    // Flatten all questions from selected interests into a single queue
    const questionsQueue = selectedIds.flatMap(id => {
        const interest = INTERESTS.find(i => i.id === id);
        return interest.questions.map((q, index) => ({
            interest,
            question: q,
            index
        }));
    });

    const [currentIndex, setCurrentIndex] = useState(0);
    // Store answers if needed later { questionText: boolean }
    const [answers, setAnswers] = useState({});

    const handleAnswer = (answer) => {
        // Save answer
        setAnswers(prev => ({
            ...prev,
            [questionsQueue[currentIndex].question]: answer
        }));

        handleNext();
    };

    const handleNext = () => {
        if (currentIndex < questionsQueue.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            onComplete();
        }
    };

    const currentItem = questionsQueue[currentIndex];

    if (!currentItem) return null;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '2rem' }}>
            <QuestionCard
                interest={currentItem.interest}
                question={currentItem.question}
                current={currentIndex + 1}
                total={questionsQueue.length}
                onAnswer={handleAnswer}
                onSkip={handleNext}
            />
        </div>
    );
};

export default QuestionFlow;
