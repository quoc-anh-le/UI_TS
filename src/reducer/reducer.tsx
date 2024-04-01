export const initState = {
    survey_title: "Untitle document",
    survey_desc: "Form description",
    questions: [
        title: "Question",
        options: [{title: "Option 1"}],
        open: true,
        required: false
    ]
}

export const actionTypes = {
    SET_QUESTIONS: "SET_QUESTION",
    CHANGE_TYPE: "CHANGE_TYPE",
    SET_SURVEY_TITLE: "SET_SURVEY_TITLE",
    SET_SURVEY_DESC: "SET_SURVEY_DESC"
}

const reducer = (state=initState, action) => {
    switch(action.type){
        case actionTypes.SET_QUESTIONS:
            return {
                ...state, questions: action.question
            }
        case actionTypes.SET_SURVEY_TITLE:
            return {
                ...state, questions: action.survey_title
            }
        case actionTypes.SET_SURVEY_DESC:
            return {
                ...state, questions: action.survey_desc
            }
        default: {
            return state
        }
    }
}

export default reducer