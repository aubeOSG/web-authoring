/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

const DEFAULT_INITIAL_DATA = () => {
  return {
    // question: 'What does AODA stand for?',
    events: [
      {
        'content': 'What does AODA stand for?',
      },
      {
        'content': 'Accessibility for Ontarians with Disabilities Act',
      },
      {
        'content': "Association for Ontario's Disabled Adults.",
      },
      {
        'content': 'Act for Ontarians with Disabilities and Afflictions',
      },
    ],
  };
};

const MultipleChoiceComponent = (props) => {
  // const classes = useStyles();
  const [questionsData, setQuestionsData] = React.useState(
    props.data.events.length > 0 ? props.data : DEFAULT_INITIAL_DATA
  );

  const updateColumnData = (newData) => {
    console.log('update new data: ', newData);
    setQuestionsData(newData);
    if (props.onDataChange) {
      // Inform editorjs about data change
      props.onDataChange(newData);
    }
  };

  const onAddEvent = (e) => {
    const newData = {
      ...questionsData,
    };
    newData.events.push({
      'content': 'Answer text here...',
    });
    updateColumnData(newData);
  };

  const onRemoveEvent = (e) => {
    const newData = {
      ...questionsData,
    };
    newData.events.pop();
    updateColumnData(newData);
  };

  const onContentChange = (index, fieldName) => {
    return (e) => {
      const newData = {
        ...questionsData,
      };

      if (e.currentTarget.innerHTML) {
        newData.events[index][fieldName] = e.currentTarget.innerHTML;
      }

      updateColumnData(newData);
    };
  };

  return (
    <React.Fragment>
      <div className="root-multiple-choice">
        <div className="root-multiple-choice-container">
          {questionsData.events.map((event, index) => (
            <div className="event-container" key={index}>
              {index === 0 && (
                <h4
                  className="question-content"
                  onBlur={onContentChange(index, 'content')}
                  contentEditable={!props.readOnly}
                  suppressContentEditableWarning={!props.readOnly}
                  dangerouslySetInnerHTML={{ __html: event.content }}
                ></h4>
              )}
              {index !== 0 && (
                <div
                  contentEditable={!props.readOnly}
                  onBlur={onContentChange(index, 'content')}
                  suppressContentEditableWarning={!props.readOnly}
                  className="answer-content"
                  dangerouslySetInnerHTML={{ __html: event.content }}
                />
              )}
            </div>
          ))}
          {!props.readOnly && (
            <div>
              {questionsData.events.length > 3 && (
                <div
                  className="answer-button remove-answer-button"
                  onClick={onRemoveEvent}
                >
                  <span className="answer-button-text"> - </span>
                </div>
              )}
              {questionsData.events.length < 6 && (
                <div
                  className="answer-button add-answer-button"
                  onClick={onAddEvent}
                >
                  <span className="answer-button-text"> + </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default MultipleChoiceComponent;
