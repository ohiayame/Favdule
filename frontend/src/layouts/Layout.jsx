import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";

function Layout({ title, children, groupId, onFilterChange }) {
  return (
    <>
      <Header title={title} groupId={groupId} onFilterChange={onFilterChange} />

      <main>{children}</main>

      <Footer />
    </>
  );
}

export default Layout;
