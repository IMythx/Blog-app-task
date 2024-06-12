import Categories from "@/components/layout/categories";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid gap-4 sm:gap-8 my-4 sm:my-10">
      <Categories />
      {children}
    </div>
  );
};

export default Layout;
