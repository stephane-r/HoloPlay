import React from 'react';
import { storiesOf } from '@storybook/react-native';
import {
  InputStory,
  InputLabelStory
} from '../src/components/Forms/Input/index.story';
import { TextStory, TextBoldStory } from '../src/components/Text/index.story';
import {
  TitleH1Story,
  TitleH2Story,
  TitleH3Story
} from '../src/components/Title/index.story';
import { IconStory } from '../src/components/Icon/index.story';
import {
  CardVerticalStory,
  CardHorizontalStory
} from '../src/components/Card/Layout/index.story';
import ButtonStory from '../src/components/Forms/Button/index.story';

storiesOf('Forms', module)
  .add('Input', () => <InputStory />)
  .add('Input with label', () => <InputLabelStory />)
  .add('Button', () => <ButtonStory />);

storiesOf('App', module)
  .add('Text', () => <TextStory />)
  .add('Text bold', () => <TextBoldStory />);

storiesOf('Title', module)
  .add('Level 1', () => <TitleH1Story />)
  .add('Level 2', () => <TitleH2Story />)
  .add('Level 3', () => <TitleH3Story />);

storiesOf('Icon', module).add('List', () => <IconStory />);

storiesOf('Card', module).add('Horizontal', () => <CardHorizontalStory />);
storiesOf('Card', module).add('Vertical', () => <CardVerticalStory />);
