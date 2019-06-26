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
      imagePath: 'static/img/me.jpg',
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
      imagePath: 'static/img/placeholder-image-01.jpg',
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
      imagePath: 'static/img/placeholder-image-02.jpg',
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
      <div className="mb-10">
        <Title>Who uses us?</Title>
      </div>
      <Card className="flex mb-13 min-h-md" noPadding>
        {activeStory && (
          <>
            <div
              className="bg-cover w-5/12 rounded-l-2 overflow-hidden bg-no-repeat"
              style={{ backgroundImage: `url(${activeStory.imagePath})` }}
            />
            <div className="w-7/12 p-18 flex justify-center flex-col">
              <Title className="w-9/12 mb-4">{activeStory.title}</Title>
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
      <div className="flex mb-8">
        {stories.map(story => (
          <Button
            type="bg"
            className="shadow-light stories-button mx-4 w-full"
            color={story.id === activeStoryIndex ? '#F7F7F7' : '#f1f1f1'}
            key={story.id}
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
          type="bg"
          className="shadow-light stories-button mx-4 w-full"
          color="#F4F4F4"
        >
          SEE MORE
        </Button>
      </div>
    </>
  );
}

export default SuccessStories;
