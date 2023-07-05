/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import './_styles.scss';

const DEFAULT_INITIAL_DATA = () => {
  return {
    events: [
      {
        'heading': 'Heading 1',
        'body': 'Body 1',
      },
      {
        'heading': 'Heading 2',
        'body': 'Body 2',
      },
    ],
  };
};

const ColumnComponent = (props) => {
  const loadedData = props.data;
  const parsedProps = JSON.parse(JSON.stringify(loadedData));
  const [columnData, setColumnData] = React.useState(
    props.data.events.length > 0 ? parsedProps : DEFAULT_INITIAL_DATA
  );

  const updateColumnData = (newData) => {
    setColumnData(newData);
    if (props.onDataChange) {
      // Inform editorjs about data change
      props.onDataChange(newData);
    }
  };

  const onAddEvent = (e) => {
    const newData = {
      ...columnData,
    };
    newData.events.push({
      'heading': 'Heading',
      'body': 'Body',
    });
    updateColumnData(newData);
  };

  const onRemoveEvent = (e) => {
    const newData = {
      ...columnData,
    };
    newData.events.pop();
    updateColumnData(newData);
  };

  const onContentChange = (index, fieldName) => {
    return (e) => {
      const newData = {
        ...columnData,
      };

      if (e.currentTarget.innerHTML) {
        newData.events[index][fieldName] = e.currentTarget.innerHTML;
      }

      updateColumnData(newData);
    };
  };

  return (
    <React.Fragment>
      <div className="root-column">
        <div
          className={
            columnData.events.length === 1
              ? 'root-column-container-single'
              : 'root-column-container'
          }
        >
          {columnData.events.map((event, index) => (
            <div
              className={
                columnData.events.length < 3
                  ? 'item-container-two'
                  : 'item-container-three'
              }
              key={index}
            >
              <div className="heading-container">
                <h2
                  className="column-heading"
                  onBlur={onContentChange(index, 'heading')}
                  contentEditable={!props.readOnly}
                  suppressContentEditableWarning={!props.readOnly}
                  dangerouslySetInnerHTML={{ __html: event.heading }}
                ></h2>
              </div>
              <div
                contentEditable={!props.readOnly}
                onBlur={onContentChange(index, 'body')}
                suppressContentEditableWarning={!props.readOnly}
                className="column-body"
                dangerouslySetInnerHTML={{ __html: event.body }}
              />
            </div>
          ))}
          {!props.readOnly && (
            <div>
              {columnData.events.length > 1 && (
                <div
                  className="column-button remove-column-button"
                  onClick={onRemoveEvent}
                >
                  <span className="column-button-text"> - </span>
                </div>
              )}
              {columnData.events.length < 3 && (
                <div
                  className="column-button add-column-button"
                  onClick={onAddEvent}
                >
                  <span className="column-button-text"> + </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ColumnComponent;
