/* eslint-disable react-hooks/exhaustive-deps */
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Timeline from '@material-ui/lab/Timeline';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
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
  root: {
    paddingTop: '8px',
    width: '100%',
  },
  rootContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  itemContainer: {
    flexDirection: 'column',
  },
  itemContainerTwo: {
    flexDirection: 'column',
    width: '50%',
  },
  itemContainerThree: {
    flexDirection: 'column',
    width: '33%',
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
  heading: {
    fontSize: '2rem',
  },
  oppositeInButton: {
    flex: '0.14',
  },
  addButton: {
    boxShadow: 'none',
    paddingLeft: '14px',
    paddingRight: '14px',
  },
  description: {
    padding: '8px',
    fontSize: '1.5em',
    textOverflow: 'ellipsis',
    border: 'none',
  },
  addButtonText: {
    color: 'white',
    backgroundColor: '#007ABA',
    fontSize: '1.3rem',
  },
}));

const ColumnComponent = (props) => {
  const classes = useStyles();
  const [columnData, setColumnData] = React.useState(
    props.data.events.length > 0 ? props.data : DEFAULT_INITIAL_DATA
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

  const onContentChange = (index, fieldName) => {
    return (e) => {
      const newData = {
        ...columnData,
      };
      if (e.currentTarget.value && e.currentTarget.value.length > 0) {
        newData.events[index][fieldName] = e.currentTarget.value;
      } else {
        newData.events[index][fieldName] = e.currentTarget.textContent;
      }

      updateColumnData(newData);
    };
  };

  return (
    <React.Fragment>
      <Box className={classes.root}>
        <Timeline align="left" className={classes.rootContainer}>
          {columnData.events.map((event, index) => (
            <TimelineItem
              className={
                columnData.events.length < 3
                  ? classes.itemContainerTwo
                  : classes.itemContainerThree
              }
              key={index}
            >
              <TimelineOppositeContent className={classes.headingContainer}>
                <Typography
                  className={classes.heading}
                  color="textSecondary"
                  onBlur={onContentChange(index, 'heading')}
                  suppressContentEditableWarning={!props.readOnly}
                  contentEditable={!props.readOnly}
                >
                  {event.heading}
                </Typography>
              </TimelineOppositeContent>
              <textarea
                name="body"
                className={classes.description}
                disabled={props.readOnly}
                id="body"
                cols="30"
                rows="10"
                onBlur={onContentChange(index, 'body')}
              >
                {event.body}
              </textarea>
              {/* <TimelineContent>
                <Typography
                  className={classes.description}
                  color="primary"
                  onBlur={onContentChange(index, 'body')}
                  suppressContentEditableWarning={!props.readOnly}
                  contentEditable={!props.readOnly}
                >
                  {event.body}
                </Typography>
              </TimelineContent> */}
            </TimelineItem>
          ))}
          {!props.readOnly && columnData.events.length < 3 && (
            <TimelineItem>
              <TimelineOppositeContent className={classes.oppositeInButton} />
              <TimelineSeparator>
                <TimelineDot
                  color="primary"
                  className={classes.addButton}
                  onClick={onAddEvent}
                >
                  <Typography className={classes.addButtonText}> + </Typography>
                </TimelineDot>
              </TimelineSeparator>
              <TimelineContent />
            </TimelineItem>
          )}
        </Timeline>
      </Box>
    </React.Fragment>
  );
};

export default ColumnComponent;
