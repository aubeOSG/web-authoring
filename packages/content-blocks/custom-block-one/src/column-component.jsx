/* eslint-disable react-hooks/exhaustive-deps */
import { makeStyles } from '@material-ui/core/styles';
import { default as React } from 'react';

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

const useStyles = makeStyles((theme) => ({
  rootColumn: {
    paddingTop: '8px',
    width: '100%',
  },
  rootColumnContainerSingle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  rootColumnContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  itemContainerTwo: {
    flexDirection: 'column',
    width: '50%',
    marginRight: '1.5rem',
  },
  itemContainerThree: {
    flexDirection: 'column',
    width: '33%',
    marginRight: '1rem',
  },
  timelinedot: {
    boxShadow: 'none',
    marginTop: '20px',
  },
  headingContainer: {
    flex: '0.2',
    padding: '8px',
    marginTop: '6px',
    textOverflow: 'ellipsis',
  },
  columnHeading: {
    fontSize: '2rem',
    outline: 'none',
  },
  oppositeInButton: {
    flex: '0.14',
  },
  buttonContainer: {
    display: 'flex',
  },
  addColumnButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    width: '2.5rem',
    height: '2.5rem',
    boxShadow: 'none',
    position: 'absolute',
    right: '-4rem',
    backgroundColor: '#007ABA',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  removeColumnButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: 'none',
    borderRadius: '50%',
    width: '2.5rem',
    height: '2.5rem',
    position: 'absolute',
    right: '-1rem',
    backgroundColor: '#007ABA',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  columnBody: {
    padding: '8px',
    fontSize: '1em',
    textOverflow: 'ellipsis',
    border: 'none',
    outline: 'none',
    resize: 'none',
  },
  addColumnButtonText: {
    color: 'white',
    fontSize: '1.3rem',
  },
}));

const ColumnComponent = (props) => {
  const classes = useStyles();
  const [columnData, setColumnData] = React.useState(
    props.data.events.length > 0 ? props.data : DEFAULT_INITIAL_DATA
  );

  const updateColumnData = (newData) => {
    console.log('update new data: ', newData);
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
      console.log('column data: ', columnData);
      console.log('e.currentTarget ', e.currentTarget);
      console.log('e.currentTarget.value ', e.currentTarget.value);
      console.log('e.currentTarget.innerText ', e.currentTarget.innerText);
      console.log('e.currentTarget.innerHtml ', e.currentTarget.innerHTML);
      console.log('e.currentTarget.textContent ', e.currentTarget.textContent);

      if (e.currentTarget.innerText) {
        newData.events[index][fieldName] = e.currentTarget.innerText;
      } else {
        newData.events[index][fieldName] = e.currentTarget.textContent;
      }

      console.log('new data: ', newData);

      updateColumnData(newData);
    };
  };

  return (
    <React.Fragment>
      <div className={classes.rootColumn}>
        <div
          className={
            columnData.events.length === 1
              ? classes.rootColumnContainerSingle
              : classes.rootColumnContainer
          }
        >
          {columnData.events.map((event, index) => (
            <div
              className={
                columnData.events.length < 3
                  ? classes.itemContainerTwo
                  : classes.itemContainerThree
              }
              key={index}
            >
              <div className={classes.headingContainer}>
                <h2
                  className={classes.columnHeading}
                  color="textSecondary"
                  onBlur={onContentChange(index, 'heading')}
                  contentEditable={!props.readOnly}
                  suppressContentEditableWarning={!props.readOnly}
                >
                  {event.heading}
                </h2>
              </div>
              <div
                className={classes.columnBody}
                contentEditable={!props.readOnly}
                id="body"
                onBlur={onContentChange(index, 'body')}
                suppressContentEditableWarning={!props.readOnly}
              >
                {event.body}
              </div>
            </div>
          ))}
          {!props.readOnly && (
            <div className={classes.buttonContainer}>
              {columnData.events.length > 1 && (
                <div
                  className={classes.removeColumnButton}
                  onClick={onRemoveEvent}
                >
                  <span className={classes.addColumnButtonText}> - </span>
                </div>
              )}
              {columnData.events.length < 3 && (
                <div className={classes.addColumnButton} onClick={onAddEvent}>
                  <span className={classes.addColumnButtonText}> + </span>
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
