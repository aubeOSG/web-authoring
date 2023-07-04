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
        'correctness': true,
      },
      {
        'content': "Association for Ontario's Disabled Adults.",
        'correctness': false,
      },
      {
        'content': 'Act for Ontarians with Disabilities and Afflictions',
        'correctness': false,
      },
    ],
  };
};

const MultipleChoiceComponent = (props) => {
  // const classes = useStyles();
  const loadedData = props.data;
  let questionsData;
  let setQuestionsData;

  if (loadedData.events.length > 0) {
    [questionsData, setQuestionsData] = React.useState(loadedData);
  } else {
    [questionsData, setQuestionsData] = React.useState(DEFAULT_INITIAL_DATA);
  }

  console.log('loaded data: ', loadedData);
  console.log('questionsData: ', questionsData);

  const updateMultipleChoiceData = (newData) => {
    console.log('update new data: ', newData);
    setQuestionsData(newData);
    if (props.onDataChange) {
      // Inform editorjs about data change
      props.onDataChange(newData);
    }
  };

  // update with useCallback
  const onAddEvent = (e) => {
    const newData = {
      ...questionsData,
    };
    newData.events.push({
      'content': 'Answer text here...',
      'correctness': false,
    });
    updateMultipleChoiceData(newData);
  };

  const onRemoveEvent = (e) => {
    const newData = {
      ...questionsData,
    };
    newData.events.pop();
    updateMultipleChoiceData(newData);
  };

  const onCorrectnessChange = (index) => {
    return (e) => {
      const newData = {
        ...questionsData,
      };

      newData.events[index]['correctness'] =
        !newData.events[index]['correctness'];
      updateMultipleChoiceData(newData);
    };
  };

  const onContentChange = (index, fieldName) => {
    return (e) => {
      const newData = {
        ...questionsData,
      };

      if (e.currentTarget.innerHTML) {
        newData.events[index][fieldName] = e.currentTarget.innerHTML;
        console.log('-----newData: ', newData);
      }

      console.log('content change data: ', newData);
      console.log(
        'content change e.currentTarget.innerHTML: ',
        e.currentTarget.innerHTML
      );
      console.log(
        'content change newData.events[index][fieldName]: ',
        newData.events[index][fieldName]
      );

      updateMultipleChoiceData(newData);
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
                <div className="answer-container">
                  <input
                    value={event.correctness}
                    type="checkbox"
                    checked={event.correctness}
                    onChange={onCorrectnessChange(index)}
                  />
                  <div
                    contentEditable={!props.readOnly}
                    onBlur={onContentChange(index, 'content')}
                    suppressContentEditableWarning={!props.readOnly}
                    className="answer-content"
                    dangerouslySetInnerHTML={{ __html: event.content }}
                  />
                </div>
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
