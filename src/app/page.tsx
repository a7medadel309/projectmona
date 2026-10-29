import HomePage from '@/components/HomePage/HomePage';
import WebPlans from '@/components/HomePage/WebPlans/WebPlans';
import UserOrderTracker from '@/components/UserOrderTracker';

export default function Home() {
  return (
    <>
      <UserOrderTracker />
      <HomePage />
    </>
  );
}