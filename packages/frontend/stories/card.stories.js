import React from 'react';
import { text } from '@storybook/addon-knobs';

import { storiesOf } from '@storybook/react';
import Card from '../components/ui/card';
import CampaignIcon from '../icons/campaign-icon';
import Title from '../components/ui/title';
import Paragraph from '../components/ui/paragraph';

storiesOf('Cards', module)
  .add('Default Card', () => (
    <Card
      icon={CampaignIcon}
      className={text('Classname', 'max-w-md mt-10 ml-10')}
      title={text('Title', 'Hello World!')}
    >
      <div className="text-lg leading-relaxed w-full mt-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, quas
        repellat? Nisi asperiores quam nobis mollitia soluta blanditiis impedit
        obcaecati eveniet recusandae dolor commodi magnam, explicabo, debitis
        in! Voluptas, molestiae.
      </div>
    </Card>
  ))
  .add('Card without Icon', () => (
    <Card
      className={text('Classname', 'max-w-md mt-10 ml-10')}
      title={text('Title', 'Hello World!')}
    >
      <div className="text-lg leading-relaxed w-full mt-6">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, quas
        repellat? Nisi asperiores quam nobis mollitia soluta blanditiis impedit
        obcaecati eveniet recusandae dolor commodi magnam, explicabo, debitis
        in! Voluptas, molestiae.
      </div>
    </Card>
  ))
  .add('Success Story Card', () => (
    <Card className="container mt-10 ml-10 flex mb-13 min-h-md" noPadding>
      <div
        className="bg-cover w-5/12 rounded-l-2 overflow-hidden bg-no-repeat"
        style={{ backgroundImage: `url(img/placeholder-image-02.jpg)` }}
      />
      <div className="w-7/12 p-18 flex justify-center flex-col">
        <Title className="w-9/12 mb-4">They buy me a coffee</Title>
        <article>
          <Paragraph className="mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            asperiores quas officia, nulla architecto accusamus inventore nemo
            similique delectus libero eum dolores ipsa illum molestiae saepe
            debitis suscipit porro facere?
          </Paragraph>
        </article>
        <div>
          <Paragraph className="font-bold">Ella Ana Lopez</Paragraph>
          <Paragraph>Heidelberg Ruprecht Karls University</Paragraph>
        </div>
      </div>
    </Card>
  ));
