import Header from '@/components/Header';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Header />
      <main className="flex justify-center items-center mt-12">{children}</main>
    </div>
  );
};

export default DashboardLayout;
