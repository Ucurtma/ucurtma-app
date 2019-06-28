import IntroduceSteps from '../components/student-journey/introduce-steps';
import Header from '../components/header';

function CreateJourney() {
  return (
    <div className="container mx-auto mt-8">
      <Header />
      <IntroduceSteps />
    </div>
  );
}

export default CreateJourney;
