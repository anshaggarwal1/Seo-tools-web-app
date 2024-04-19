import { Fragment } from "react";
import { Hero } from "../components/Hero";
import { HowItWorks } from "../components/HowItWorks";

const Home = () => {
  return (
    <Fragment>
      <Hero />
      <HowItWorks />
    </Fragment>
  );
};

export default Home;
