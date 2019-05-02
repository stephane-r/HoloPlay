import React from 'react';
import { storiesOf } from '@storybook/react-native';
import {
  InputStory,
  InputLabelStory
} from '../src/components/Forms/Input/index.story';
import { TextStory, TextBoldStory } from '../src/components/Text/index.story';

storiesOf('Forms', module)
  .add('Input', () => <InputStory />)
  .add('Input with label', () => <InputLabelStory />);

storiesOf('App', module)
  .add('Text', () => <TextStory />)
  .add('Text bold', () => <TextBoldStory />);
