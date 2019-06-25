import { useState } from 'react';
import cls from 'classnames';
import Button from './ui/button';
import ChevronDown from '../icons/chevron-down';
import Card from './ui/card';
import CampaignIcon from '../icons/campaign-icon';
import WalletIcon from '../icons/wallet-icon';
import SuccessIcon from '../icons/success-icon';
import Paragraph from './ui/paragraph';

function Workflows() {
  const [activeItem, setActiveItem] = useState(0);

  const workflows = [
    {
      id: 0,
      title: 'Investor Workflow',
      card: [
        {
          icon: CampaignIcon,
          title: "I didn't",
          desc:
            'Our team invented awesome campaign creator for you. Give us some details about you and your campaign. But this should little longer.',
        },
        {
          icon: WalletIcon,
          title: 'Think About',
          desc:
            'We have awesome system that creates digital wallet for you. Also, I have no words for saying in here. Lets call our marketing team.',
        },
        {
          icon: SuccessIcon,
          title: 'Investor Workflow',
          desc:
            'Success is key for everything. Taking good grades is a success for example. Go step by step, don’t be like me. I need marketing team I guess.',
        },
      ],
    },
    {
      id: 1,
      title: 'Student Workflow',
      card: [
        {
          icon: CampaignIcon,
          title: 'Create Campaign',
          desc:
            'Our team invented awesome campaign creator for you. Give us some details about you and your campaign. But this should little longer.',
        },
        {
          icon: WalletIcon,
          title: 'Take Your Wallet',
          desc:
            'We have awesome system that creates digital wallet for you. Also, I have no words for saying in here. Lets call our marketing team.',
        },
        {
          icon: SuccessIcon,
          title: 'Success',
          desc:
            'Success is key for everything. Taking good grades is a success for example. Go step by step, don’t be like me. I need marketing team I guess.',
        },
      ],
    },
  ];

  // TODO: add icons to front of titles.

  return (
    <>
      <div className="flex justify-center mt-16">
        {workflows.map((workflow, i) => (
          <Button
            type="flat"
            key={i.toString()}
            onClick={() => setActiveItem(workflow.id)}
            className={cls(
              'font-light text-2xl',
              'flex items-center',
              activeItem === workflow.id
                ? 'text-title-color'
                : 'text-disabled-title'
            )}
          >
            {workflow.title}
            {activeItem === workflow.id && (
              <ChevronDown className="ml-3" size="24" />
            )}
          </Button>
        ))}
      </div>
      <div className="flex mr-auto ml-auto my-16 divider h-px bg-text-color max-w-80" />
      <div className="flex mb-16">
        {workflows[activeItem].card.map((cardItem, i) => (
          <Card
            title={cardItem.title}
            icon={cardItem.icon}
            key={i.toString()}
            className={cls('w-1/3 mx-3')}
          >
            <Paragraph className="text-lg leading-relaxed w-full mt-6">
              {cardItem.desc}
            </Paragraph>
          </Card>
        ))}
      </div>
      <div className="flex justify-center mb-8">
        <Button type="bg" color="#FCFCFC">
          CREATE A JOURNEY
        </Button>
        <div className="count border-l border-solid border-text-color ml-8 pl-8 opacity-50">
          <p className="font-light text-text-color">We have</p>
          <p className="font-light text-text-color">2842 investors</p>
        </div>
      </div>
    </>
  );
}

export default Workflows;
