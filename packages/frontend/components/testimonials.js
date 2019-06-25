import Title from './ui/title';
import Card from './ui/card';

function Testimonials() {
  return (
    <>
      <div className="mb-10">
        <Title>Who uses us?</Title>
      </div>
      <Card className="flex mb-10" noPadding>
        {/* TODO: change backgroundImage url with dynamic image */}
        <div
          className="bg-cover w-4/12 rounded-l-2 h-md overflow-hidden bg-no-repeat"
          style={{ backgroundImage: 'url(static/img/me.jpg)' }}
        />
        <div className="card-content w-8/12">there will be content</div>
      </Card>
    </>
  );
}

export default Testimonials;
