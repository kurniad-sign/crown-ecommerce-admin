import { Heading } from '~/components/atom';

export default function Home() {
  return (
    <div className="mt-10 max-w-6xl px-6 lg:mx-auto lg:p-0">
      <Heading component="h1" variant="title-3">
        Your Store
      </Heading>
    </div>
  );
}
