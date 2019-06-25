import Title from './ui/title';
import Card from './ui/card';
import Paragraph from './ui/paragraph';

function Testimonials() {
  return (
    <>
      <div className="mb-10">
        <Title>Who uses us?</Title>
      </div>
      <Card className="flex mb-10" noPadding>
        {/* TODO: change backgroundImage url with dynamic image */}
        <div
          className="bg-cover w-5/12 rounded-l-2 overflow-hidden bg-no-repeat"
          style={{ backgroundImage: 'url(static/img/me.jpg)' }}
        />
        <div className="w-7/12 p-18">
          <Title className="w-9/12 mb-4">
            The guys who doesn’t know anything about UI design
          </Title>
          <article>
            <Paragraph className="mb-4">
              Hey guys! I am looking for a front-end developer job in Ankara and
              abroad but I can’t say it anywhere on the “public internet”
              because of fear. As you know, internet isn’t safe place after
              social medias become big.
            </Paragraph>
            <Paragraph className="mb-4">
              There is big problems. I went to university 2 times and it was too
              boring. So, I quit. I don’t have any degree and I don’t recommend
              this act to anyone. Education is important. Also, I need visa
              sponsorship to come to...
            </Paragraph>
          </article>
          <div>
            <Paragraph className="font-bold">@mustaphaturhan</Paragraph>
            <Paragraph>The guys who can’t think in English</Paragraph>
          </div>
        </div>
      </Card>
    </>
  );
}

export default Testimonials;
