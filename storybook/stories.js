import React from 'react';
import { storiesOf } from '@storybook/react-native';
import {
  InputStory,
  InputLabelStory
} from '../src/components/Forms/Input/index.story';
import { TextStory, TextBoldStory } from '../src/components/Text/index.story';
import { TitleH1Story, TitleH2Story, TitleH3Story } from '../src/components/Title/index.story';

storiesOf('Forms', module)
  .add('Input', () => <InputStory />)
  .add('Input with label', () => <InputLabelStory />);

storiesOf('App', module)
  .add('Text', () => <TextStory />)
  .add('Text bold', () => <TextBoldStory />);

storiesOf('Title', module)
  .add('Level 1', () => <TitleH1Story />)
  .add('Level 2', () => <TitleH2Story />)
  .add('Level 3', () => <TitleH3Story />);
