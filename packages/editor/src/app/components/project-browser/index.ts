import projectBrowser from "./project-browser";
import projectSearch from "./project-search";

export * from './project-browser.types';

export const ProjectBrowser = projectBrowser;
export const ProjectSearch = projectSearch;

export default {
  ProjectBrowser,
  ProjectSearch,
};