import Title from './ui/title';
import Card from './ui/card';

function Testimonials() {
  return (
    <>
      <div className="mb-10">
        <Title>Who uses us?</Title>
      </div>
      <Card className="flex" noPadding>
        <div className="card-image w-4/12">there will be image</div>
        <div className="card-content w-8/12">there will be content</div>
      </Card>
    </>
  );
}

export default Testimonials;
