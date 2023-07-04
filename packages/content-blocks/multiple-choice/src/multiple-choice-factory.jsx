import React from 'react';
import ReactDOM from 'react-dom';
import MultipleChoiceComponent from './multiple-choice-component';
import './_styles.scss';

export default class MultipleChoiceFactory {
  static get toolbox() {
    return {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 15v4H5v-4h14m1-2H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 18.5c-.82 0-1.5-.67-1.5-1.5s.68-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM19 5v4H5V5h14m1-2H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM7 8.5c-.82 0-1.5-.67-1.5-1.5S6.18 5.5 7 5.5s1.5.68 1.5 1.5S7.83 8.5 7 8.5z"/></svg>`,
      title: 'Multiple Choice',
    };
  }

  static get isReadOnlySupported() {
    return true;
  }

  constructor({ data, config, api, readOnly }) {
    this.api = api;
    this.readOnly = readOnly;
    this.data = {
      events: data.events || [],
    };

    this.CSS = {
      wrapper: 'column-block-multiple-choice',
    };

    this.nodes = {
      holder: null,
    };

    console.log('contructor data: ', this.data);
  }

  render() {
    const rootNode = document.createElement('div');
    rootNode.setAttribute('class', this.CSS.wrapper);
    this.nodes.holder = rootNode;

    const onDataChange = (newData) => {
      // console.log('new Data: ', newData);
      this.data = {
        ...newData,
      };
      // console.log('this.data: ', this.data);
    };

    ReactDOM.render(
      <MultipleChoiceComponent
        onDataChange={onDataChange}
        readOnly={this.readOnly}
        data={this.data}
      />,
      rootNode
    );

    return this.nodes.holder;
  }

  save() {
    return this.data;
  }

  static get sanitize() {
    return {
      br: true,
    };
  }
}
