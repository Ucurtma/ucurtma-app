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
      id: 2,
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
      id: 3,
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
  ];

  const findStory = id => {
    const storyIndex = stories.findIndex(story => story.id === id);
    setActiveStory(stories[storyIndex]);
  };

  useEffect(() => {
    findStory(activeStoryIndex);
  }, [activeStoryIndex]);

  return (
    <>
      <div className="mb-10">
        <Title>Who uses us?</Title>
      </div>
      <Card className="flex mb-13" noPadding>
        {activeStory && (
          <>
            <div
              className="bg-cover w-5/12 rounded-l-2 overflow-hidden bg-no-repeat"
              style={{ backgroundImage: `url(${activeStory.imagePath})` }}
            />
            <div className="w-7/12 p-18">
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
      <div className="flex">
        {stories.map(story => (
          <Button
            type="bg"
            className="w-6/12"
            color="#f7f7f7"
            key={story.id}
            onClick={() => setActiveStoryIndex(story.id)}
          >
            <img
              className="inline-flex px-3 py-3"
              src={story.user.company.logo}
              alt={story.user.company.name}
            />
          </Button>
        ))}
      </div>
    </>
  );
}

export default SuccessStories;
