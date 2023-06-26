/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Clock } from './assets/clock';

const DEFAULT_INITIAL_DATA = () => {
  return {
    events: [
      {
        'title': 'Introduction',
        'subtitle': 'Subtitle Here',
        'time': '15 min',
        'startLabel': 'Start',
      },
    ],
  };
};

const IntroductionComponent = (props) => {
  // const classes = useStyles();
  const [introData, setIntroData] = React.useState(
    props.data.events.length > 0 ? props.data : DEFAULT_INITIAL_DATA
  );

  const updateIntroData = (newData) => {
    setIntroData(newData);
    if (props.onDataChange) {
      // Inform editorjs about data change
      props.onDataChange(newData);
    }
  };

  const onContentChange = (index, fieldName) => {
    return (e) => {
      const newData = {
        ...introData,
      };

      if (e.currentTarget.innerHTML) {
        newData.events[index][fieldName] = e.currentTarget.innerHTML;
      }

      updateIntroData(newData);
    };
  };

  return (
    <React.Fragment>
      <div className="root-introduction">
        {introData.events.map((event, index) => (
          <div className="introduction" key={index}>
            <div className="title-container">
              <h1
                className="introduction-title"
                onBlur={onContentChange(index, 'title')}
                contentEditable={!props.readOnly}
                suppressContentEditableWarning={!props.readOnly}
                dangerouslySetInnerHTML={{ __html: event.title }}
              ></h1>
              <h2
                className="introduction-subtitle"
                onBlur={onContentChange(index, 'subtitle')}
                contentEditable={!props.readOnly}
                suppressContentEditableWarning={!props.readOnly}
                dangerouslySetInnerHTML={{ __html: event.subtitle }}
              ></h2>
            </div>
            <div className="start-container">
              <div className="time-container">
                <span className="time-icon">
                  <Clock />
                </span>
                <p
                  className="introduction-time"
                  onBlur={onContentChange(index, 'time')}
                  contentEditable={!props.readOnly}
                  suppressContentEditableWarning={!props.readOnly}
                  dangerouslySetInnerHTML={{ __html: event.time }}
                ></p>
              </div>

              <button
                className="introduction-start-button"
                onBlur={onContentChange(index, 'startLabel')}
                contentEditable={!props.readOnly}
                suppressContentEditableWarning={!props.readOnly}
                dangerouslySetInnerHTML={{ __html: event.startLabel }}
              ></button>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default IntroductionComponent;
