import withAuth from "@/hoc/withAuthentication";

const Home = () => {
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
};

export default withAuth(Home);
