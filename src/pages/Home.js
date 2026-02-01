import Welcome from "../components/Welcome";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-transparent flex flex-col items-center justify-start">
      <section className="w-full max-w-screen-lg flex flex-col items-center text-center gap-8 py-8">
        <Welcome />
      </section>
    </div>
  );
};

export default Home;
