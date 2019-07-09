import React from 'react';
import { storiesOf } from '@storybook/react-native';
import {
  CardVerticalStory,
  CardHorizontalStory
} from '../src/components/Card/Layout/index.story';

storiesOf('Card', module).add('Horizontal', () => <CardHorizontalStory />);
storiesOf('Card', module).add('Vertical', () => <CardVerticalStory />);
