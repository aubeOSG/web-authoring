import React, { useEffect } from 'react';
import { useNavigate, generatePath } from 'react-router-dom';
import { Projects, Users, Workspaces } from '../../models';
import { config as workspaceConfig } from '../workspace';
import { useOAuth } from '../../contexts/oauth';
import type { User } from '../../../server/api/users';
import { Loader } from '../../components/loader';

export const Path = '/bypass';

export const Page = () => {
  const navigator = useNavigate();
  const oauth = useOAuth();

  useEffect(() => {
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

            const navTo = generatePath(workspaceConfig.Path, {
              id: workspaceRes.data.id,
            });

            navigator(navTo);
          });
        });
      });
    });
  }, []);

  return <Loader />;
};

export default {
  Path,
  Page,
};
