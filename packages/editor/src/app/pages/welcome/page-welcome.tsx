import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as css from './page-welcome.scss';
import { animations } from '../../components';
import { Projects, Users, Workspaces } from '../../models';
import { menu } from '../../services';
import { useOAuth } from '../../contexts/oauth';
import { User } from '../../../server/api/users';

export const Path = '/welcome';

export const Page = () => {
  const oauth = useOAuth();
  const [inProgress, setProgress] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isReady = useRef(false);
  const navigator = useNavigate();

  const handleCreateCourse = () => {
    if (inProgress) {
      return;
    }

    setProgress(true);
    Users.create().then((userRes) => {
      if (userRes.error) {
        return;
      }

      const user = userRes.data as User;

      oauth?.login(user).then((authRes) => {
        Users.setData(userRes.data);
        Workspaces.create(userRes.data.id).then((workspaceRes) => {
          if (workspaceRes.error) {
            return;
          }

          Workspaces.setData(workspaceRes.data);
          Projects.create({
            workspaceId: workspaceRes.data.id,
          }).then((projectRes) => {
            if (projectRes.error) {
              console.error(projectRes);
              return;
            }

            menu.API.enableProjectActions().then(() => {
              setProgress(false);
              navigator(`/workspace/${workspaceRes.data.id}`);
            });
          });
        });
      });
    });
  };

  useEffect(() => {
    if (isReady.current) {
      return;
    }

    menu.API.disableProjectActions().then(() => {
      isReady.current = false;
      setIsLoading(false);
    });

    return () => {
      isReady.current = true;
    };
  }, [isLoading, isReady]);

  return (
    <motion.div
      className={css.firstWelcome}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      exit={{ opacity: 0, transition: { delay: 0.2 } }}
      style={inProgress ? { pointerEvents: 'none' } : {}}
    >
      <img
        src="/api/assets/7de1f01e8d427210ff38bac8647efbb3.jpg"
        className="test-asset"
      />
      <div className="body">
        <motion.h1
          initial={{ transform: 'translate(0,-80px)' }}
          animate={{ transform: 'translate(0,0px)' }}
          transition={{ duration: 0.5 }}
          exit={{
            transform: 'translate(0,-150px)',
            opacity: 0,
            transition: { delay: 0.1 },
          }}
        >
          Create the future, in Scrowl
        </motion.h1>
        <motion.h2
          initial={{ transform: 'translate(0,-180px)' }}
          animate={{ transform: 'translate(0,0px)' }}
          transition={{ duration: 0.5 }}
          exit={{
            transform: 'translate(0,-110px)',
            opacity: 0,
            transition: { delay: 0.1 },
          }}
        >
          Unleash your imagination and get ready to design your best course
          ever.
        </motion.h2>
        <motion.button
          className="btn btn-primary btn-lg"
          onMouseDown={() => handleCreateCourse()}
          onClick={() => handleCreateCourse()}
          whileHover={{
            scale: 1.03,
            transition: { duration: 0.1 },
          }}
          animate={
            inProgress
              ? { boxShadow: '0 0 0 30px rgba(0, 122, 186, 0)' }
              : { scale: 1 }
          }
          transition={
            inProgress
              ? {
                  boxShadow: {
                    duration: 0.3,
                    from: '0 0 0 4px rgba(0, 122, 186, 0.5)',
                  },
                }
              : {
                  from: 1.03,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: 0.7,
                }
          }
        >
          Design My First Course
        </motion.button>

        <motion.div
          className="hello-animation"
          style={{ cursor: 'pointer' }}
          onMouseDown={() => handleCreateCourse()}
          onClick={() => handleCreateCourse()}
          exit={{ transform: 'translate(0,50vh)', transition: { delay: 0.3 } }}
        >
          <animations.HelloEnvelope />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default {
  Path,
  Page,
};
