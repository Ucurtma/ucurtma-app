import { useState, useEffect } from 'react';
import Title from './ui/title';
import Card from './ui/card';
import Paragraph from './ui/paragraph';
import Button from './ui/button';

function SuccessStories() {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [activeStory, setActiveStory] = useState();

  const stories = [
    {
      id: 0,
      imagePath: '/static/img/me.jpg',
      title: "The guys who doesn't know anything about UI design",
      content: `Hey guys! I am looking for a front-end developer job in Ankara and
      abroad but I can’t say it anywhere on the “public internet”
      because of fear. As you know, internet isn’t safe place after
      social medias become big.`,
      user: {
        name: 'Mustafa Turhan',
        company: {
          name: 'ODTU / Computer Engineering',
          logo: 'static/img/placeholder-logo.png',
        },
      },
    },
    {
      id: 1,
      imagePath: '/static/img/placeholder-image-01.jpg',
      title: 'Lets talk about something',
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque dicta eius beatae aspernatur facilis, nihil labore aliquid ipsum ullam nostrum aliquam distinctio aut fugiat libero, accusamus inventore soluta vitae ipsam.`,
      user: {
        name: 'Fernando Espinozza',
        company: {
          name: 'Uludag University',
          logo: '',
        },
      },
    },
    {
      id: 2,
      imagePath: '/static/img/placeholder-image-02.jpg',
      title: 'They buy me a coffee',
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam asperiores quas officia, nulla architecto accusamus inventore nemo similique delectus libero eum dolores ipsa illum molestiae saepe debitis suscipit porro facere?`,
      user: {
        name: 'Ella Ana Lopez',
        company: {
          name: 'Heidelberg Ruprecht Karls University',
          logo: '',
        },
      },
    },
  ];

  const findStory = id => {
    const storyIndex = stories.findIndex(story => story.id === id);
    setActiveStory(stories[storyIndex]);
  };

  const getFirstLetters = string => {
    const matches = string.match(/\b(\w)/g);
    const acronym = matches.join('');
    return acronym.toString().toUpperCase();
  };

  useEffect(() => {
    findStory(activeStoryIndex);
  }, [activeStoryIndex]);

  return (
    <>
      <div className="mb-4 sm:mb-10 p-4 sm:p-0">
        <Title>Who uses us?</Title>
      </div>
      <Card
        className="flex p-4 sm:p-0 sm:ml-0 sm:mr-0 mr-4 ml-4 mb-4 sm:mb-13 min-h-md"
        noPadding
      >
        {activeStory && (
          <>
            <div
              className="bg-cover w-3/12 sm:w-5/12 rounded-l-2 overflow-hidden bg-no-repeat bg-center"
              style={{ backgroundImage: `url(${activeStory.imagePath})` }}
            />
            <div className="w-full w-9/12 sm:w-7/12 p-4 sm:p-18 flex justify-center flex-col">
              <Title className="w-full sm:w-9/12 mb-4">
                {activeStory.title}
              </Title>
              <article>
                <Paragraph className="mb-4">{activeStory.content}</Paragraph>
              </article>
              <div>
                <Paragraph className="font-bold">
                  {activeStory.user.name}
                </Paragraph>
                <Paragraph>{activeStory.user.company.name}</Paragraph>
              </div>
            </div>
          </>
        )}
      </Card>
      <div className="flex flex-wrap justify-between sm:flex-no-wrap mb-4 mb-8 p-4 sm:p-0">
        {stories.map(story => (
          <Button
            type="custom"
            className="shadow-light stories-button mt-4 h-72 w-5/12 sm:h-auto sm:mr-8"
            color={story.id === activeStoryIndex ? '#FFF' : '#F5F5F5'}
            key={story.id}
            style={{ height: '72px' }}
            onClick={() => setActiveStoryIndex(story.id)}
          >
            {story.user.company.logo ? (
              <img
                className="inline-flex px-3 py-3"
                src={story.user.company.logo}
                alt={story.user.company.name}
              />
            ) : (
              getFirstLetters(story.title)
            )}
          </Button>
        ))}
        <Button
          type="custom"
          className="shadow-light stories-button mt-4 h-72 sm:h-auto sm:mr-8 w-5/12"
          color="#F4F4F4"
        >
          SEE MORE
        </Button>
      </div>
    </>
  );
}

export default SuccessStories;
