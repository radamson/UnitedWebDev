export const questionsReducer = (state = { questions: [], loading: false, error: [] }, action) => {
    switch (action.type) {
        case 'FETCH_QUESTIONS_PENDING':
            return {
                ...state,
                questions: [...state.questions],
                loading: true,
                error: []
            }
        case 'FETCH_QUESTIONS_FULFILLED':
            return {
                ...state,
                questions: state.questions.concat(action.payload),
                loading: false,
                error: []
            }
        case 'POST_QUESTION_REJECTED':
            return {
                ...state,
                questions: [...state.questions],
                loading: false,
                error: state.error.concat(action.payload)
            }
        case 'ADD_QUESTION':
            return {
                ...state,
                questions: state.questions.concat(action.payload),
                loading: false,
                error: []
            }
        case 'UPDATE_QUESTION':
            const newQuestionList = state.questions.map(question => (
                question.id === action.payload.id ? action.payload : question
            ))
            return {...state, questions: newQuestionList }
        case 'ADD_ANSWER_VOTE':
            const newQuestions = state.questions.map(question => {
                if (question.id === action.payload.question.id) {
                    question.answers = question.answers.map(answer => {
                        if (answer.id === action.payload.id) {
                            answer = action.payload;
                            return answer
                        } else { return answer }
                    });

                    return question
                } else {
                    return question
                }
            })
            return {...state, questions: newQuestions }
        case 'DELETE_QUESTION_VOTE':
            return {
                ...state,
                questions: state.questions.map(question => {
                    question.votes = question.votes.filter(vote => vote.id !== action.payload.id)
                    return question
                })
            }
        case 'DELETE_ANSWER_VOTE':
            return {
                ...state,
                questions: state.questions.map(question => {
                    question.answers = question.answers.map(answer => {
                        answer.votes = answer.votes.filter(vote => vote.id !== action.payload.id);
                        return answer
                    })
                    return question
                })
            }
        case 'DELETE_QUESTION':
            return {
                ...state,
                questions: state.questions.filter(question => question.id !== action.payload)

            }
        case 'ADD_ANSWER':
            const newList = state.questions.map(question => {
                if (question.id === action.payload.questionId) {
                    question.answers = question.answers.concat(action.payload.answer)
                    return question
                } else {
                    return question
                };
            })
            return {
                ...state,
                questions: newList
            }
        case 'DELETE_ANSWER':
            return {
                ...state,
                questions: state.questions.map(question => {
                    question.answers = question.answers.filter(answer => answer.id !== action.payload)
                    return question
                })
            }
        default:
            return state
    }
}